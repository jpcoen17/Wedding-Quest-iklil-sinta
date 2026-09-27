"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  onLeftStart: () => void;
  onLeftEnd: () => void;
  onRightStart: () => void;
  onRightEnd: () => void;
};

// Big, thumb-friendly touch zones (spec: playable one-handed on mobile).
// Pointer events are used so both touch and mouse work identically.
export default function GameControls({
  onLeftStart,
  onLeftEnd,
  onRightStart,
  onRightEnd,
}: Props) {
  return (
    <div className="absolute inset-x-0 bottom-3 z-20 flex justify-between px-4 pointer-events-none">
      <button
        aria-label="Move left"
        className="pointer-events-auto w-16 h-16 pixel-panel flex items-center justify-center active:bg-blossom-light"
        onPointerDown={(e) => {
          e.preventDefault();
          onLeftStart();
        }}
        onPointerUp={onLeftEnd}
        onPointerLeave={onLeftEnd}
        onPointerCancel={onLeftEnd}
      >
        <ChevronLeft size={26} />
      </button>
      <button
        aria-label="Move right"
        className="pointer-events-auto w-16 h-16 pixel-panel flex items-center justify-center active:bg-blossom-light"
        onPointerDown={(e) => {
          e.preventDefault();
          onRightStart();
        }}
        onPointerUp={onRightEnd}
        onPointerLeave={onRightEnd}
        onPointerCancel={onRightEnd}
      >
        <ChevronRight size={26} />
      </button>
    </div>
  );
}
