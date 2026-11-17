"use client";

import { cn } from "@/lib/utils";

type Variant = "groom" | "bride";
type Pose = "stand" | "walk" | "sit";

type Props = {
  variant: Variant;
  pose?: Pose;
  size?: number;
  flip?: boolean;
  className?: string;
};

const PALETTE = {
  hair: "#2A2130",
  skin: "#F2C29B",
  ink: "#241D2E",
  suit: "#2E3140",
  suitDark: "#20222D",
  shirt: "#FBF3DE",
  tie: "#D9727F",
  dress: "#FFFFFF",
  dressShade: "#F2A6B0",
  veil: "#F7ECEC",
  shoe: "#20222D",
};

// Each character is drawn on a 64x96 pixel grid using flat rectangles only —
// no gradients or curves — to keep the crisp, blocky retro-RPG look.
export default function PixelCharacter({
  variant,
  pose = "stand",
  size = 96,
  flip = false,
  className,
}: Props) {
  const legOffset = pose === "walk" ? 4 : 0;

  return (
    <svg
      viewBox="0 0 64 96"
      width={size}
      height={size * 1.5}
      className={cn(pose === "walk" && "animate-bob", className)}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {variant === "groom" ? (
        <GroomSprite legOffset={legOffset} sit={pose === "sit"} />
      ) : (
        <BrideSprite legOffset={legOffset} sit={pose === "sit"} />
      )}
    </svg>
  );
}

function GroomSprite({ legOffset, sit }: { legOffset: number; sit: boolean }) {
  const legY = sit ? 68 : 64;
  const legH = sit ? 14 : 20;
  return (
    <g>
      {/* hair */}
      <rect x="16" y="0" width="32" height="16" fill={PALETTE.hair} />
      {/* face */}
      <rect x="16" y="14" width="32" height="18" fill={PALETTE.skin} />
      <rect x="24" y="24" width="4" height="4" fill={PALETTE.ink} />
      <rect x="36" y="24" width="4" height="4" fill={PALETTE.ink} />
      {/* neck */}
      <rect x="28" y="31" width="8" height="5" fill={PALETTE.skin} />
      {/* jacket body */}
      <rect x="12" y="36" width="40" height="28" fill={PALETTE.suit} />
      <rect x="12" y="36" width="40" height="4" fill={PALETTE.suitDark} />
      {/* shirt + tie */}
      <rect x="26" y="36" width="12" height="18" fill={PALETTE.shirt} />
      <rect x="29" y="40" width="6" height="10" fill={PALETTE.tie} />
      {/* arms */}
      <rect
        x="4"
        y={40 + legOffset / 2}
        width="8"
        height="24"
        fill={PALETTE.suit}
      />
      <rect
        x="52"
        y={40 - legOffset / 2}
        width="8"
        height="24"
        fill={PALETTE.suit}
      />
      <rect x="4" y="62" width="8" height="6" fill={PALETTE.skin} />
      <rect x="52" y="62" width="8" height="6" fill={PALETTE.skin} />
      {/* legs */}
      {!sit && (
        <>
          <rect
            x="16"
            y={legY}
            width="12"
            height={legH}
            fill={PALETTE.suitDark}
          />
          <rect
            x="36"
            y={legY - legOffset}
            width="12"
            height={legH + legOffset}
            fill={PALETTE.suitDark}
          />
          <rect x="14" y={legY + legH} width="16" height="8" fill={PALETTE.ink} />
          <rect
            x="34"
            y={legY - legOffset + legH}
            width="16"
            height="8"
            fill={PALETTE.ink}
          />
        </>
      )}
      {sit && (
        <rect x="14" y="64" width="36" height="16" fill={PALETTE.suitDark} />
      )}
    </g>
  );
}

function BrideSprite({ legOffset, sit }: { legOffset: number; sit: boolean }) {
  return (
    <g>
      {/* veil, behind hair */}
      <rect x="8" y="0" width="48" height="14" fill={PALETTE.veil} />
      {/* hair sides */}
      <rect x="10" y="10" width="8" height="26" fill={PALETTE.hair} />
      <rect x="46" y="10" width="8" height="26" fill={PALETTE.hair} />
      {/* hair top */}
      <rect x="16" y="2" width="32" height="14" fill={PALETTE.hair} />
      {/* face */}
      <rect x="18" y="14" width="28" height="18" fill={PALETTE.skin} />
      <rect x="25" y="24" width="4" height="4" fill={PALETTE.ink} />
      <rect x="35" y="24" width="4" height="4" fill={PALETTE.ink} />
      {/* neck */}
      <rect x="28" y="31" width="8" height="5" fill={PALETTE.skin} />
      {/* bodice */}
      <rect x="20" y="36" width="24" height="18" fill={PALETTE.dress} />
      <rect x="26" y="40" width="12" height="6" fill={PALETTE.dressShade} />
      {/* sleeves */}
      <rect
        x="8"
        y={40 + legOffset / 2}
        width="8"
        height="18"
        fill={PALETTE.dress}
      />
      <rect
        x="48"
        y={40 - legOffset / 2}
        width="8"
        height="18"
        fill={PALETTE.dress}
      />
      <rect x="8" y="56" width="8" height="6" fill={PALETTE.skin} />
      <rect x="48" y="56" width="8" height="6" fill={PALETTE.skin} />
      {/* skirt */}
      {!sit ? (
        <>
          <rect x="14" y="52" width="36" height="14" fill={PALETTE.dressShade} />
          <rect x="6" y="64" width="52" height="24" fill={PALETTE.dress} />
          <rect x="24" y="88" width="7" height="5" fill={PALETTE.shoe} />
          <rect x="33" y="88" width="7" height="5" fill={PALETTE.shoe} />
        </>
      ) : (
        <rect x="10" y="52" width="44" height="30" fill={PALETTE.dress} />
      )}
    </g>
  );
}
