import PixelCharacter from "@/components/PixelCharacter";

// Purely presentational — the parent (BalloonLoveQuest) controls this
// component's position by animating the wrapper element it's placed in.
export default function GameCharacter() {
  return (
    <div className="relative flex flex-col items-center pointer-events-none select-none">
      {/* balloons */}
      <div className="flex gap-1 mb-1">
        <Balloon color="#F2A6B0" delay="0s" />
        <Balloon color="#E8C468" delay="0.3s" />
        <Balloon color="#7EC8E3" delay="0.15s" />
      </div>
      {/* strings */}
      <svg
        viewBox="0 0 40 14"
        className="w-16 h-5 -mb-1"
        shapeRendering="crispEdges"
        aria-hidden
      >
        <rect x="6" y="0" width="2" height="14" fill="#241D2E" />
        <rect x="19" y="0" width="2" height="14" fill="#241D2E" />
        <rect x="32" y="0" width="2" height="14" fill="#241D2E" />
      </svg>
      {/* couple */}
      <div className="flex items-end -space-x-3">
        <PixelCharacter variant="groom" size={34} />
        <PixelCharacter variant="bride" size={34} flip />
      </div>
    </div>
  );
}

function Balloon({ color, delay }: { color: string; delay: string }) {
  return (
    <svg
      viewBox="0 0 12 16"
      width={20}
      height={26}
      className="animate-bob"
      style={{ animationDelay: delay }}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <rect x="2" y="0" width="8" height="2" fill={color} />
      <rect x="0" y="2" width="12" height="8" fill={color} />
      <rect x="2" y="10" width="8" height="2" fill={color} />
      <rect x="5" y="12" width="2" height="2" fill="#241D2E" />
    </svg>
  );
}
