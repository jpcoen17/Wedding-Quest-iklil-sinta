"use client";

import { useEffect, useState } from "react";

const LEVELS = [
  { id: "story", label: "01" },
  { id: "wedding", label: "02" },
  { id: "balloonquest", label: "03" },
  { id: "rsvp", label: "04" },
  { id: "finalquest", label: "05" },
];

export default function LevelNav() {
  const [active, setActive] = useState("story");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    LEVELS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3">
      {LEVELS.map((l) => (
        <a
          key={l.id}
          href={`#${l.id}`}
          aria-label={`Level ${l.label}`}
          className={`w-8 h-8 flex items-center justify-center font-pixel text-[8px] border-2 border-ink transition-colors ${
            active === l.id ? "bg-blossom text-ink" : "bg-cream/70 text-ink/50"
          }`}
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}
