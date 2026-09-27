import { wedding } from "@/config/wedding";
import PixelCharacter from "./PixelCharacter";
import SectionHeading from "./SectionHeading";
import InvitationLinkCard from "./InvitationLinkCard";

export default function FinalQuest() {
  return (
    <section
      id="finalquest"
      className="relative py-28 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #5B6EA8 0%, #E8734A 55%, #2B2340 100%)",
      }}
    >
      {/* pixel sun */}
      <div className="absolute left-1/2 -translate-x-1/2 top-16 w-16 h-16 bg-gold pixel-border" />

      <div className="relative max-w-xl mx-auto text-center">
        <SectionHeading level="FINAL QUEST" title="See You There" light />

        <div className="flex justify-center gap-2 mb-8">
          <PixelCharacter variant="groom" pose="sit" size={70} />
          <PixelCharacter variant="bride" pose="sit" size={70} flip />
        </div>

        <p className="font-body text-lg text-cream/90 mb-2">
          &ldquo;Every adventure has an ending...&rdquo;
        </p>
        <p className="font-body text-lg text-cream mb-8">
          &ldquo;But ours is just beginning.&rdquo;
        </p>

        <p className="font-pixel text-sm sm:text-base text-cream mb-2">
          {wedding.groom.fullName}
        </p>
        <p className="font-pixel text-xs text-blossom mb-2">&amp;</p>
        <p className="font-pixel text-sm sm:text-base text-cream mb-6">
          {wedding.bride.fullName}
        </p>
        <p className="font-body text-cream/80 mb-8">{wedding.dateLabel}</p>

        <p className="font-body text-cream/90">
          Thank you for being part of our story.
        </p>
        <p className="text-3xl mt-4">❤️</p>

        <InvitationLinkCard />
      </div>
    </section>
  );
}
