import { Suspense } from "react";
import { GameProvider } from "@/components/GameContext";
import { GuestGreeting } from "@/components/GuestGreeting";
import GameIntro from "@/components/GameIntro";
import MusicPlayer from "@/components/MusicPlayer";
import LevelNav from "@/components/LevelNav";
import StorySection from "@/components/StorySection";
import EventSection from "@/components/EventSection";
import BalloonLoveQuest from "@/components/game/BalloonLoveQuest";
import RSVP from "@/components/RSVP";
import WeddingGift from "@/components/WeddingGift";
import FinalQuest from "@/components/FinalQuest";

export default function Home() {
  return (
    // Suspense boundary is required here because GuestGreeting reads the
    // ?to= query param via useSearchParams(). Fallback matches the opening
    // screen's sky background so there's no flash of blank content.
    <Suspense fallback={<div className="fixed inset-0 bg-sky" />}>
      <GuestGreeting>
        <GameProvider>
          <GameIntro />
          <LevelNav />
          <MusicPlayer />

          <main>
            <StorySection />
            <EventSection />
            <BalloonLoveQuest />
            <RSVP />
            <WeddingGift />
            <FinalQuest />
          </main>
        </GameProvider>
      </GuestGreeting>
    </Suspense>
  );
}
