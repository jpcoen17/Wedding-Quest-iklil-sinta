"use client";

import { useEffect, useState } from "react";
import { getTimeLeft, pad, TimeLeft } from "@/lib/utils";
import { wedding } from "@/config/wedding";

const UNITS: { key: keyof Omit<TimeLeft, "done">; label: string }[] = [
  { key: "days", label: "DAYS" },
  { key: "hours", label: "HOURS" },
  { key: "minutes", label: "MIN" },
  { key: "seconds", label: "SEC" },
];

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft(wedding.date));
    const interval = setInterval(() => {
      setTime(getTimeLeft(wedding.date));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return <div className="h-24" aria-hidden />;
  }

  if (time.done) {
    return (
      <p className="font-pixel text-sm sm:text-base text-blossom-dark text-center">
        THE QUEST HAS BEGUN ❤️
      </p>
    );
  }

  return (
    <div className="flex justify-center gap-3 sm:gap-4">
      {UNITS.map((unit) => (
        <div
          key={unit.key}
          className="pixel-panel px-3 py-3 min-w-[64px] text-center"
        >
          <div className="font-pixel text-lg sm:text-2xl">
            {pad(time[unit.key])}
          </div>
          <div className="font-pixel text-[7px] mt-2 text-ink/60">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
