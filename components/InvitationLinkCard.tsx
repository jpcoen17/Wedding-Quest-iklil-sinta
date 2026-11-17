"use client";

import { useEffect, useState } from "react";
import { useGuest } from "./GuestGreeting";
import CopyButton from "./CopyButton";

/**
 * Lets a recognized guest (and admins/developers testing links) copy their
 * own personalized invitation URL. Renders nothing when ?to= didn't match
 * a known guest — there's no specific link to show in that case.
 */
export default function InvitationLinkCard() {
  const { guestId, guestName, invitationPath } = useGuest();
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  if (!guestId) return null;

  const path = invitationPath(guestId);
  const fullUrl = origin ? `${origin}${path}` : path;

  return (
    <div className="pixel-panel px-5 py-4 max-w-sm mx-auto mt-10 flex items-center gap-4">
      <span className="text-xl shrink-0">🔗</span>
      <div className="flex-1 min-w-0">
        <p className="font-pixel text-[7px] text-ink/50 mb-1">
          INVITATION LINK
        </p>
        <p className="font-body text-sm break-all">{fullUrl}</p>
        <p className="font-body text-xs text-ink/50 mt-1">For {guestName}</p>
      </div>
      <CopyButton
        value={fullUrl}
        label="Copy invitation link"
        successLabel="LINK COPIED! ✓"
      />
    </div>
  );
}
