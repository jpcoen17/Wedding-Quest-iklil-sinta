"use client";

import { Compass } from "lucide-react";
import { wedding } from "@/config/wedding";
import SectionHeading from "./SectionHeading";
import Countdown from "./Countdown";
import PixelButton from "./PixelButton";
import PixelCharacter from "./PixelCharacter";

const DETAILS = [
  { label: "DATE", value: wedding.dateLabel },
  { label: "TIME", value: wedding.event.time },
  { label: "VENUE", value: wedding.event.venue },
  { label: "ADDRESS", value: wedding.event.address },
];

export default function EventSection() {
  return (
    <section
      id="wedding"
      className="relative bg-grass py-24 px-6 overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-6 bg-grass-dark" />

      <div className="relative max-w-xl mx-auto">
        <SectionHeading level="LEVEL 02" title="The Wedding" light />

        <div className="flex justify-center gap-2 mb-8">
          <PixelCharacter variant="groom" size={56} />
          <PixelCharacter variant="bride" size={56} flip />
        </div>

        <div className="pixel-panel px-6 py-6 mb-8">
          <p className="font-pixel text-[10px] text-center text-blossom-dark mb-4">
            THE WEDDING QUEST
          </p>
          <p className="font-body text-center text-lg sm:text-xl mb-6">
            {wedding.groom.fullName}
            <br />
            <span className="text-blossom-dark">&amp;</span>
            <br />
            {wedding.bride.fullName}
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DETAILS.map((d) => (
              <div key={d.label} className="border-2 border-ink/20 px-3 py-2">
                <dt className="font-pixel text-[8px] text-ink/50 mb-1">
                  {d.label}
                </dt>
                <dd className="font-body text-sm sm:text-base">{d.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex justify-center">
            <a
              href={wedding.event.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              <PixelButton variant="secondary" className="flex items-center gap-2">
                <Compass size={14} /> Open Map
              </PixelButton>
            </a>
          </div>
        </div>

        <Countdown />
      </div>
    </section>
  );
}
