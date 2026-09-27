import { cn } from "@/lib/utils";

export type ObstacleConfig = {
  id: string;
  /** vertical position as % of the track, 0 = top, 100 = ground */
  topPercent: number;
  /** horizontal center as % of the game width */
  leftPercent: number;
  /** visual width as % of the game width */
  widthPercent: number;
};

export default function GameObstacle({
  leftPercent,
  widthPercent,
  className,
}: {
  leftPercent: number;
  widthPercent: number;
  className?: string;
}) {
  return (
    <div
      className={cn("absolute -translate-x-1/2", className)}
      style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
      aria-hidden
    >
      <svg
        viewBox="0 0 40 32"
        className="w-full h-auto"
        shapeRendering="crispEdges"
      >
        {/* canopy */}
        <rect x="4" y="6" width="32" height="6" fill="#D9727F" />
        <rect x="0" y="12" width="8" height="4" fill="#D9727F" />
        <rect x="8" y="10" width="8" height="4" fill="#F2A6B0" />
        <rect x="16" y="8" width="8" height="4" fill="#D9727F" />
        <rect x="24" y="10" width="8" height="4" fill="#F2A6B0" />
        <rect x="32" y="12" width="8" height="4" fill="#D9727F" />
        {/* pole */}
        <rect x="18" y="14" width="4" height="16" fill="#241D2E" />
        {/* handle */}
        <rect x="14" y="28" width="4" height="4" fill="#241D2E" />
        <rect x="10" y="24" width="4" height="8" fill="#241D2E" />
      </svg>
    </div>
  );
}
