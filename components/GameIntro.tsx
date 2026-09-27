"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { useGame } from "./GameContext";
import { useGuest } from "./GuestGreeting";
import PixelButton from "./PixelButton";
import PixelCloud from "./PixelCloud";
import PixelBird from "./PixelBird";
import PixelHouse from "./PixelHouse";
import PixelCharacter from "./PixelCharacter";
import PixelDialog from "./PixelDialog";

type Stage = "title" | "transition" | "walk" | "dialog" | "revealed";

export default function GameIntro() {
  const [stage, setStage] = useState<Stage>("title");
  const { startGame, playSfx } = useGame();
  const { guestName, isKnownGuest } = useGuest();

  const handleStart = () => {
    playSfx("start");
    startGame();
    setStage("transition");
    setTimeout(() => setStage("walk"), 900);
    setTimeout(() => setStage("dialog"), 2600);
  };

  if (stage === "revealed") return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-sky">
      {/* sky + parallax background, present through every stage */}
      <PixelCloud className="absolute top-10 left-10" size={64} />
      <PixelCloud className="absolute top-24 right-16" size={90} delay="1.2s" />
      <PixelCloud className="absolute top-6 left-1/2" size={54} delay="2s" />
      <PixelBird top="18%" delay="0s" />
      <PixelBird top="30%" delay="6s" />

      {/* mountains */}
      <svg
        viewBox="0 0 400 100"
        className="absolute bottom-40 left-0 w-full h-40 opacity-80"
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
      >
        <polygon points="0,100 60,30 130,100" fill="#5B6EA8" />
        <polygon points="90,100 170,15 250,100" fill="#4A90C4" />
        <polygon points="210,100 290,40 370,100" fill="#5B6EA8" />
        <polygon points="330,100 400,25 400,100" fill="#4A90C4" />
      </svg>

      {/* ground */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-grass" />
      <div className="absolute bottom-36 left-0 w-full h-4 bg-grass-dark" />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <PixelHouse size={200} />
      </div>

      <AnimatePresence mode="wait">
        {stage === "title" && (
          <motion.div
            key="title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
          >
            <div className="text-4xl mb-3">❤️</div>
            <h2 className="font-pixel text-xs sm:text-sm text-cream text-outline mb-4 tracking-widest">
              THE WEDDING QUEST
            </h2>

            {isKnownGuest && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="pixel-panel px-4 py-3 mb-5 max-w-[240px]"
              >
                <p className="font-pixel text-[7px] text-blossom-dark mb-2">
                  NEW QUEST RECEIVED!
                </p>
                <div className="border-t-2 border-ink/20 mb-2" />
                <p className="font-pixel text-[7px] text-ink/50">PLAYER</p>
                <p className="font-body text-sm mb-2">{guestName}</p>
                <p className="font-pixel text-[7px] text-ink/50">QUEST</p>
                <p className="font-body text-sm">Attend the Wedding</p>
              </motion.div>
            )}

            <h1 className="font-pixel text-base sm:text-2xl text-ink bg-cream/90 px-4 py-3 pixel-border leading-relaxed">
              {wedding.groom.shortName}
              <br />
              <span className="text-blossom-dark">&amp;</span>
              <br />
              {wedding.bride.shortName}
            </h1>
            <p className="font-pixel text-[10px] sm:text-xs text-ink mt-4 bg-cream/90 px-3 py-2 pixel-border">
              25 • 11 • 2026
            </p>

            <div className="mt-10">
              <PixelButton onClick={handleStart}>▶ Start Game</PixelButton>
            </div>
            <p className="font-pixel text-[8px] text-ink/70 mt-4 animate-blink">
              Press Start to Begin
            </p>
          </motion.div>
        )}

        {stage === "transition" && (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-ink flex items-center justify-center"
          >
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-pixel text-cream text-xs"
            >
              LOADING QUEST...
            </motion.span>
          </motion.div>
        )}

        {(stage === "walk" || stage === "dialog") && (
          <motion.div
            key="walk"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 h-full"
          >
            <motion.div
              className="absolute bottom-14"
              initial={{ left: "8%" }}
              animate={{ left: "42%" }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            >
              <PixelCharacter variant="groom" pose="walk" size={72} />
            </motion.div>
            <motion.div
              className="absolute bottom-14"
              initial={{ right: "8%" }}
              animate={{ right: "42%" }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            >
              <PixelCharacter variant="bride" pose="walk" size={72} flip />
            </motion.div>

            {stage === "dialog" && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-4 px-4"
              >
                <PixelDialog
                  speaker="???"
                  lines={[
                    "Welcome, Adventurer!",
                    `Dear ${guestName},`,
                    "Your next quest is about to begin...",
                  ]}
                  onDone={() => {}}
                />
                <PixelButton onClick={() => setStage("revealed")}>
                  ▶ Enter Wedding
                </PixelButton>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
