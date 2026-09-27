import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: number;
  delay?: string;
  opacity?: number;
};

// A simple blocky cloud made of stacked rectangles, drawn crisp (no anti-aliasing)
// to match the pixel-art aesthetic.
export default function PixelCloud({
  className,
  size = 80,
  delay = "0s",
  opacity = 1,
}: Props) {
  return (
    <svg
      viewBox="0 0 64 32"
      width={size}
      height={size / 2}
      className={cn("animate-cloud-drift", className)}
      style={{ animationDelay: delay, opacity }}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <g fill="#FFFFFF" stroke="#241D2E" strokeWidth="1.5">
        <rect x="8" y="16" width="48" height="10" />
        <rect x="16" y="8" width="20" height="8" />
        <rect x="32" y="10" width="20" height="6" />
        <rect x="4" y="20" width="8" height="6" />
        <rect x="52" y="20" width="8" height="6" />
      </g>
    </svg>
  );
}
