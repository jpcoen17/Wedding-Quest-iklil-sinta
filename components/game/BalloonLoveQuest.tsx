"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PixelCloud from "@/components/PixelCloud";
import PixelBird from "@/components/PixelBird";
import PixelHouse from "@/components/PixelHouse";
import { useGame } from "@/components/GameContext";
import GameCharacter from "./GameCharacter";
import GameObstacle, { ObstacleConfig } from "./GameObstacle";
import GameControls from "./GameControls";
import GameHUD from "./GameHUD";
import GameDialog from "./GameDialog";
import { cn } from "@/lib/utils";

type Phase = "intro" | "playing" | "failed" | "success";

// Wide gaps, alternating sides — casual and forgiving by design.
const OBSTACLES: ObstacleConfig[] = [
  { id: "o1", topPercent: 20, leftPercent: 28, widthPercent: 24 },
  { id: "o2", topPercent: 42, leftPercent: 70, widthPercent: 24 },
  { id: "o3", topPercent: 62, leftPercent: 30, widthPercent: 24 },
  { id: "o4", topPercent: 80, leftPercent: 68, widthPercent: 24 },
];

const DESCENT_MS = 24000; // ~24s full run — comfortably within 20-40s target
const MOVE_SPEED = 52; // % of track width per second while a direction is held
const X_MIN = 8;
const X_MAX = 92;
const FAIL_LINES: [string, string][] = [
  ["OH NO!", "The umbrella blocked your way!"],
  ["OOPS!", "That umbrella had other plans..."],
  ["WHOOPS!", "Love needs another try. ❤️"],
];

const randomFailIndex = () => Math.floor(Math.random() * FAIL_LINES.length);

export default function BalloonLoveQuest({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [shaking, setShaking] = useState(false);
  const [dialogDismissed, setDialogDismissed] = useState(false);
  const [failLineIdx, setFailLineIdx] = useState(0);
  const { playSfx } = useGame();

  const phaseRef = useRef<Phase>("intro");
  const characterRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);
  const xRef = useRef(50);
  const movingLeft = useRef(false);
  const movingRight = useRef(false);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const applyPosition = useCallback((progress: number) => {
    if (characterRef.current) {
      characterRef.current.style.top = `${progress * 100}%`;
      characterRef.current.style.left = `${xRef.current}%`;
    }
    if (fillRef.current) {
      fillRef.current.style.width = `${progress * 100}%`;
    }
  }, []);

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const fail = useCallback(() => {
    stopLoop();
    playSfx("hit");
    setFailLineIdx(randomFailIndex());
    setShaking(true);
    setTimeout(() => setShaking(false), 400);
    setPhase("failed");
  }, [stopLoop, playSfx]);

  const succeed = useCallback(() => {
    stopLoop();
    playSfx("success");
    setPhase("success");
  }, [stopLoop, playSfx]);

  const loop = useCallback(
    (now: number) => {
      if (phaseRef.current !== "playing") return;

      if (startTimeRef.current === null) startTimeRef.current = now;
      if (lastFrameRef.current === null) lastFrameRef.current = now;

      const dt = (now - lastFrameRef.current) / 1000;
      lastFrameRef.current = now;

      // horizontal movement
      if (movingLeft.current) xRef.current -= MOVE_SPEED * dt;
      if (movingRight.current) xRef.current += MOVE_SPEED * dt;
      xRef.current = Math.min(X_MAX, Math.max(X_MIN, xRef.current));

      // vertical descent progress, 0 -> 1
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(1, elapsed / DESCENT_MS);

      applyPosition(progress);

      const currentTop = progress * 100;
      const collided = OBSTACLES.some((ob) => {
        const inBand =
          currentTop >= ob.topPercent - 2 && currentTop <= ob.topPercent + 7;
        if (!inBand) return false;
        const forgivingHalfWidth = (ob.widthPercent / 2) * 0.5;
        return Math.abs(xRef.current - ob.leftPercent) <= forgivingHalfWidth;
      });

      if (collided) {
        fail();
        return;
      }

      if (progress >= 1) {
        succeed();
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    },
    [applyPosition, fail, succeed]
  );

  const startGame = useCallback(() => {
    xRef.current = 50;
    startTimeRef.current = null;
    lastFrameRef.current = null;
    movingLeft.current = false;
    movingRight.current = false;
    applyPosition(0);
    setDialogDismissed(false);
    setPhase("playing");
    playSfx("start");
    stopLoop();
    rafRef.current = requestAnimationFrame(loop);
  }, [applyPosition, loop, playSfx, stopLoop]);

  // Keyboard controls — bound once; gated by phaseRef so we don't need to
  // re-bind listeners every time the phase changes.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (phaseRef.current !== "playing") return;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A")
        movingLeft.current = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D")
        movingRight.current = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A")
        movingLeft.current = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D")
        movingRight.current = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  // Cleanup on unmount — no dangling rAF, no leaked listeners.
  useEffect(() => {
    return () => stopLoop();
  }, [stopLoop]);

  const handleContinue = () => {
    playSfx("click");
    setDialogDismissed(true);
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
    onComplete?.();
  };

  const showCharacter =
    phase === "playing" || phase === "failed" || phase === "success";

  return (
    <section
      id="balloonquest"
      className="relative bg-sky py-24 px-6 overflow-hidden"
    >
      <PixelCloud className="absolute top-8 left-4 opacity-70" size={50} />
      <PixelCloud
        className="absolute top-14 right-6 opacity-70"
        size={40}
        delay="1.6s"
      />
      <PixelBird top="16%" delay="2s" />

      <div className="relative max-w-md mx-auto">
        <div className="text-center mb-8">
          <p className="font-pixel text-[10px] text-cream/90 text-outline tracking-widest">
            LEVEL 03
          </p>
          <h2 className="font-pixel text-lg sm:text-2xl mt-2 text-cream text-outline">
            Balloon Love Quest
          </h2>
          <p className="font-body text-cream/90 mt-3">
            Help the bride &amp; groom reach the ground safely!
          </p>
        </div>

        <div
          className={cn(
            "relative w-full h-[440px] sm:h-[520px] pixel-border bg-gradient-to-b from-sky-light to-sky overflow-hidden",
            shaking && "animate-shake"
          )}
        >
          {/* decorative parallax mountains */}
          <svg
            viewBox="0 0 300 60"
            className="absolute bottom-16 left-0 w-full h-20 opacity-70"
            preserveAspectRatio="none"
            shapeRendering="crispEdges"
          >
            <polygon points="0,60 50,15 110,60" fill="#5B6EA8" />
            <polygon points="80,60 150,10 220,60" fill="#4A90C4" />
            <polygon points="180,60 250,20 300,60" fill="#5B6EA8" />
          </svg>

          {/* background decorative clouds inside the play area */}
          <PixelCloud className="absolute top-6 left-6 opacity-80" size={38} />
          <PixelCloud
            className="absolute top-24 right-4 opacity-70"
            size={30}
            delay="1s"
          />
          <PixelCloud
            className="absolute top-1/2 left-1/3 opacity-50"
            size={26}
            delay="0.5s"
          />

          {/* ground */}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-grass" />
          <div className="absolute bottom-14 left-0 w-full h-2 bg-grass-dark" />
          <PixelHouse size={72} className="absolute bottom-2 left-2 opacity-95" />
          <div className="absolute bottom-3 right-4 text-lg">🌸</div>
          <div className="absolute bottom-3 right-10 text-lg">🌼</div>

          {/* obstacles */}
          {OBSTACLES.map((ob) => (
            <div
              key={ob.id}
              className="absolute w-full"
              style={{ top: `${ob.topPercent}%` }}
            >
              <GameObstacle
                leftPercent={ob.leftPercent}
                widthPercent={ob.widthPercent}
                className="z-10"
              />
            </div>
          ))}

          {/* the couple — position is driven imperatively via ref, not React state */}
          {showCharacter && (
            <div
              ref={characterRef}
              className="absolute z-10 -translate-x-1/2"
              style={{ top: "0%", left: "50%" }}
            >
              <GameCharacter />
            </div>
          )}

          {phase === "playing" && <GameHUD fillRef={fillRef} />}

          {phase === "playing" && (
            <GameControls
              onLeftStart={() => (movingLeft.current = true)}
              onLeftEnd={() => (movingLeft.current = false)}
              onRightStart={() => (movingRight.current = true)}
              onRightEnd={() => (movingRight.current = false)}
            />
          )}

          {phase === "success" && !dialogDismissed && <Confetti />}

          {phase === "intro" && (
            <GameDialog
              eyebrow="LEVEL 03"
              title="Balloon Love Quest"
              lines={["Guide us safely to the ground!"]}
              buttonLabel="▶ Start Quest"
              onButtonClick={startGame}
            />
          )}

          {phase === "failed" && (
            <GameDialog
              title={FAIL_LINES[failLineIdx][0]}
              lines={[FAIL_LINES[failLineIdx][1]]}
              buttonLabel="▶ Try Again"
              onButtonClick={startGame}
            />
          )}

          {phase === "success" && !dialogDismissed && (
            <GameDialog
              eyebrow="QUEST COMPLETE!"
              title="You made it safely!"
              lines={["Love always finds a way. ❤️"]}
              buttonLabel="▶ Continue"
              onButtonClick={handleContinue}
            />
          )}

          {phase === "success" && dialogDismissed && (
            <div className="absolute inset-x-0 bottom-20 flex justify-center">
              <button
                onClick={startGame}
                className="font-pixel text-[8px] bg-cream/90 border-2 border-ink px-3 py-2"
              >
                ↻ Play Again
              </button>
            </div>
          )}
        </div>

        <p className="text-center font-pixel text-[7px] text-cream/70 mt-4">
          ← / → or A / D on desktop • tap the arrows on mobile
        </p>
      </div>
    </section>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 16 });
  const colors = ["#F2A6B0", "#E8C468", "#7EC8E3", "#6BAA5C", "#FBF3DE"];
  return (
    <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
      {pieces.map((_, i) => (
        <span
          key={i}
          className="absolute top-0 w-2 h-2 animate-fall-fade"
          style={{
            left: `${(i * 6.2) % 100}%`,
            backgroundColor: colors[i % colors.length],
            animationDelay: `${(i % 8) * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
}
