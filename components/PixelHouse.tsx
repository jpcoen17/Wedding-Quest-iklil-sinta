import { cn } from "@/lib/utils";

export default function PixelHouse({
  className,
  size = 220,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 120 100"
      width={size}
      height={(size * 100) / 120}
      className={cn(className)}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {/* roof */}
      <polygon points="10,44 60,10 110,44" fill="#8B5A2B" stroke="#241D2E" strokeWidth="2" />
      <rect x="10" y="40" width="100" height="8" fill="#5C3A1E" />
      {/* body */}
      <rect x="20" y="46" width="80" height="46" fill="#B98452" stroke="#241D2E" strokeWidth="2" />
      {/* door */}
      <rect x="52" y="66" width="16" height="26" fill="#5C3A1E" stroke="#241D2E" strokeWidth="2" />
      <rect x="62" y="78" width="3" height="3" fill="#E8C468" />
      {/* windows */}
      <rect x="28" y="56" width="14" height="14" fill="#BEE7F5" stroke="#241D2E" strokeWidth="2" />
      <rect x="78" y="56" width="14" height="14" fill="#BEE7F5" stroke="#241D2E" strokeWidth="2" />
      <rect x="34" y="62" width="2" height="8" fill="#241D2E" />
      <rect x="28" y="62" width="14" height="2" fill="#241D2E" />
      <rect x="84" y="62" width="2" height="8" fill="#241D2E" />
      <rect x="78" y="62" width="14" height="2" fill="#241D2E" />
      {/* chimney */}
      <rect x="86" y="20" width="10" height="18" fill="#5C3A1E" stroke="#241D2E" strokeWidth="2" />
      {/* flower box */}
      <rect x="26" y="70" width="16" height="4" fill="#4A7C3F" />
      <rect x="28" y="66" width="3" height="4" fill="#F2A6B0" />
      <rect x="33" y="66" width="3" height="4" fill="#E8C468" />
      <rect x="38" y="66" width="3" height="4" fill="#F2A6B0" />
    </svg>
  );
}
