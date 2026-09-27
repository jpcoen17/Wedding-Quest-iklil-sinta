"use client";

import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import SectionHeading from "./SectionHeading";
import PixelCloud from "./PixelCloud";

export default function StorySection() {
  return (
    <section
      id="story"
      className="relative bg-sky-light py-24 px-6 overflow-hidden"
    >
      <PixelCloud className="absolute top-8 left-6 opacity-70" size={56} />
      <PixelCloud className="absolute top-16 right-10 opacity-70" size={44} delay="1.5s" />

      <div className="relative max-w-2xl mx-auto">
        <SectionHeading level="LEVEL 01" title="Our Story" />

        <ol className="space-y-6">
          {wedding.quests.map((quest, i) => (
            <motion.li
              key={quest.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="pixel-panel px-5 py-4 flex gap-4 items-start"
            >
              <span className="font-pixel text-[10px] text-blossom-dark shrink-0 mt-1">
                {quest.id.replace("quest-", "Q")}
              </span>
              <div>
                <h3 className="font-pixel text-xs sm:text-sm mb-2">
                  {quest.title}
                </h3>
                <p className="font-body text-sm sm:text-base text-ink/80 leading-relaxed">
                  {quest.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
