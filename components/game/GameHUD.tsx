import { RefObject } from "react";

export default function GameHUD({
  fillRef,
}: {
  fillRef: RefObject<HTMLDivElement>;
}) {
  return (
    <div className="absolute top-3 inset-x-3 z-20 flex items-center gap-2 pointer-events-none">
      <span className="font-pixel text-[7px] text-cream text-outline shrink-0">
        GROUND
      </span>
      <div className="flex-1 h-3 border-2 border-ink bg-cream/80">
        <div
          ref={fillRef}
          className="h-full bg-blossom-dark"
          style={{ width: "0%" }}
        />
      </div>
      <span className="text-sm shrink-0">🎈</span>
    </div>
  );
}
