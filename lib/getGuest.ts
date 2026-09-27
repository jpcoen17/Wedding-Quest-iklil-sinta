import { guests, Guest } from "@/config/guests";

export const DEFAULT_GUEST_NAME = "Guest";

/**
 * Resolve a raw `?to=` query value into a known guest.
 * Always returns null for anything that doesn't match the guest list —
 * the raw value is only ever used for a lookup, never rendered directly.
 */
export function getGuestByParam(raw: string | null | undefined): Guest | null {
  if (!raw) return null;
  const normalized = raw.trim().toLowerCase();
  if (!normalized) return null;
  return guests.find((g) => g.id === normalized) ?? null;
}

/** Display name for a raw `?to=` value, falling back to "Guest". Never errors. */
export function getGuestDisplayName(raw: string | null | undefined): string {
  return getGuestByParam(raw)?.name ?? DEFAULT_GUEST_NAME;
}

/** Builds the shareable relative invitation path for a known guest id. */
export function getInvitationPath(id: string): string {
  return `/?to=${encodeURIComponent(id)}`;
}
