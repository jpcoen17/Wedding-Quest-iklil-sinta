"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  lines: string[];
  speaker?: string;
  className?: string;
  typingSpeedMs?: number;
  onDone?: () => void;
};

export default function PixelDialog({
  lines,
  speaker,
  className,
  typingSpeedMs = 28,
  onDone,
}: Props) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const currentLine = lines[lineIndex] ?? "";

  useEffect(() => {
    if (charIndex >= currentLine.length) return;
    const t = setTimeout(() => setCharIndex((c) => c + 1), typingSpeedMs);
    return () => clearTimeout(t);
  }, [charIndex, currentLine, typingSpeedMs]);

  const handleAdvance = () => {
    if (charIndex < currentLine.length) {
      setCharIndex(currentLine.length);
      return;
    }
    if (lineIndex < lines.length - 1) {
      setLineIndex((i) => i + 1);
      setCharIndex(0);
    } else {
      onDone?.();
    }
  };

  const isLastLineDone =
    lineIndex === lines.length - 1 && charIndex >= currentLine.length;

  return (
    <button
      type="button"
      onClick={handleAdvance}
      className={cn(
        "pixel-panel w-full max-w-md text-left px-5 py-4 cursor-pointer",
        className
      )}
      aria-live="polite"
    >
      {speaker && (
        <div className="font-pixel text-[9px] text-blossom-dark mb-2">
          {speaker}
        </div>
      )}
      <p className="font-body text-base sm:text-lg leading-relaxed min-h-[3lh]">
        {currentLine.slice(0, charIndex)}
        <span className="animate-blink">▌</span>
      </p>
      <div className="mt-2 text-right font-pixel text-[8px] text-ink/50">
        {isLastLineDone ? "▶ continue" : "▶ tap"}
      </div>
    </button>
  );
}
