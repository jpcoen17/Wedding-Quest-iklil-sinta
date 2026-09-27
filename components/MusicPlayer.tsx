"use client";

import { useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { useGame } from "./GameContext";
import { cn } from "@/lib/utils";

export default function MusicPlayer() {
  const { musicOn, toggleMusic, volume, setVolume } = useGame();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
      {expanded && (
        <div className="pixel-panel px-3 py-3 flex items-center gap-2">
          <VolumeX size={14} />
          <input
            aria-label="Music volume"
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-24 accent-blossom-dark"
          />
          <Volume2 size={14} />
        </div>
      )}
      <button
        onClick={() => {
          toggleMusic();
          setExpanded(true);
        }}
        aria-label={musicOn ? "Mute music" : "Play music"}
        className={cn(
          "w-12 h-12 pixel-panel flex items-center justify-center",
          musicOn && "bg-blossom-light"
        )}
      >
        <Music size={18} className={cn(musicOn && "animate-bob")} />
      </button>
      <span className="font-pixel text-[7px] bg-ink text-cream px-2 py-1">
        {musicOn ? "MUSIC ON" : "MUSIC OFF"}
      </span>
    </div>
  );
}
