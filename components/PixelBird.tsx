import { cn } from "@/lib/utils";

type Props = { className?: string; delay?: string; top?: string };

export default function PixelBird({ className, delay = "0s", top = "20%" }: Props) {
  return (
    <svg
      viewBox="0 0 16 8"
      width={24}
      height={12}
      className={cn("absolute animate-fly-across", className)}
      style={{ animationDelay: delay, top }}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <g fill="#241D2E">
        <rect x="0" y="4" width="4" height="2" />
        <rect x="4" y="2" width="4" height="2" />
        <rect x="8" y="2" width="4" height="2" />
        <rect x="12" y="4" width="4" height="2" />
      </g>
    </svg>
  );
}
