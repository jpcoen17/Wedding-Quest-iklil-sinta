"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { wedding } from "@/config/wedding";

type GameContextValue = {
  started: boolean;
  startGame: () => void;
  musicOn: boolean;
  toggleMusic: () => void;
  volume: number;
  setVolume: (v: number) => void;
  playSfx: (name: SfxName) => void;
};

type SfxName = "click" | "select" | "start" | "hit" | "success";

const SFX_PATHS: Record<SfxName, string> = {
  click: wedding.audio.sfx.buttonClick,
  select: wedding.audio.sfx.buttonClick,
  start: wedding.audio.sfx.gameStart,
  hit: wedding.audio.sfx.gameHit,
  success: wedding.audio.sfx.gameSuccess,
};

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [started, setStarted] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const ensureAudio = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioRef.current) {
      const audio = new Audio(wedding.audio.music);
      audio.loop = true;
      audio.volume = volume;
      audioRef.current = audio;
    }
    return audioRef.current;
  }, [volume]);

  const startGame = useCallback(() => {
    setStarted(true);
    const audio = ensureAudio();
    if (audio) {
      audio
        .play()
        .then(() => setMusicOn(true))
        .catch(() => {
          // Autoplay can still be blocked on some mobile browsers.
          // The music toggle lets the player start it manually.
          setMusicOn(false);
        });
    }
  }, [ensureAudio]);

  const toggleMusic = useCallback(() => {
    const audio = ensureAudio();
    if (!audio) return;
    if (musicOn) {
      audio.pause();
      setMusicOn(false);
    } else {
      audio.play().catch(() => {});
      setMusicOn(true);
    }
  }, [musicOn, ensureAudio]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  const playSfx = useCallback(
    (name: SfxName) => {
      if (typeof window === "undefined") return;
      try {
        const sfx = new Audio(SFX_PATHS[name]);
        sfx.volume = volume;
        // Sound effects are optional polish. If the file is missing or the
        // browser blocks playback, this fails silently and the site keeps
        // working exactly as before.
        sfx.play().catch(() => {});
      } catch {
        // Swallow any Audio construction errors (e.g. unsupported env).
      }
    },
    [volume]
  );

  return (
    <GameContext.Provider
      value={{
        started,
        startGame,
        musicOn,
        toggleMusic,
        volume,
        setVolume,
        playSfx,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
