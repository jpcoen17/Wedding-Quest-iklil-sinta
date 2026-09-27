"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import {
  getGuestByParam,
  getInvitationPath,
  DEFAULT_GUEST_NAME,
} from "@/lib/getGuest";

type GuestContextValue = {
  /** Known guest slug, or null if ?to= is missing/unrecognized. */
  guestId: string | null;
  /** Resolved display name — always safe to render, falls back to "Guest". */
  guestName: string;
  /** True only when ?to= matched a real guest in config/guests.ts. */
  isKnownGuest: boolean;
  invitationPath: (id: string) => string;
};

const GuestContext = createContext<GuestContextValue | null>(null);

/**
 * Reads the `?to=` query parameter (via useSearchParams, which is why this
 * component must be rendered inside a <Suspense> boundary — see app/page.tsx)
 * and makes the resolved guest available to the whole tree via useGuest().
 *
 * Only ever renders a name that exists in config/guests.ts, or the literal
 * fallback "Guest" — the raw query string itself is never rendered.
 */
export function GuestGreeting({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const rawParam = searchParams.get("to");

  const value = useMemo<GuestContextValue>(() => {
    const guest = getGuestByParam(rawParam);
    return {
      guestId: guest?.id ?? null,
      guestName: guest?.name ?? DEFAULT_GUEST_NAME,
      isKnownGuest: Boolean(guest),
      invitationPath: getInvitationPath,
    };
  }, [rawParam]);

  return (
    <GuestContext.Provider value={value}>{children}</GuestContext.Provider>
  );
}

export function useGuest() {
  const ctx = useContext(GuestContext);
  if (!ctx) {
    throw new Error("useGuest must be used within <GuestGreeting>");
  }
  return ctx;
}
