"use client";

import { FormEvent, useState } from "react";
import { MessageCircle } from "lucide-react";
import { wedding } from "@/config/wedding";
import SectionHeading from "./SectionHeading";
import PixelButton from "./PixelButton";
import PixelCharacter from "./PixelCharacter";
import { useGame } from "./GameContext";
import { useGuest } from "./GuestGreeting";

type Attendance = "yes" | "no" | null;

export default function RSVP() {
  const { guestId, guestName } = useGuest();
  const [attendance, setAttendance] = useState<Attendance>(null);
  const [submitted, setSubmitted] = useState(false);
  // Prefilled from the personalized invitation link when recognized —
  // the guest can still freely edit it before submitting.
  const [name, setName] = useState(guestId ? guestName : "");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const { playSfx } = useGame();

  const handleChoice = (choice: Attendance) => {
    playSfx("select");
    setAttendance(choice);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    playSfx("success");
    setSubmitted(true);
  };

  const whatsappHref = `https://wa.me/${wedding.whatsappNumber}?text=${encodeURIComponent(
    `Halo! Saya ${name || "___"}, konfirmasi kehadiran: ${
      attendance === "yes" ? "Hadir" : attendance === "no" ? "Tidak hadir" : "-"
    }, jumlah tamu: ${guests}. Ucapan: ${message || "-"}`
  )}`;

  return (
    <section id="rsvp" className="relative bg-dusk py-24 px-6">
      <div className="max-w-md mx-auto">
        <SectionHeading level="LEVEL 04" title="RSVP" light />

        <div className="flex justify-center mb-6">
          <PixelCharacter variant="bride" size={60} />
        </div>

        {!attendance && (
          <div className="pixel-panel px-5 py-5 text-center">
            <p className="font-body text-lg mb-6">
              &ldquo;Will you join our quest?&rdquo;
            </p>
            <div className="flex flex-col gap-3">
              <PixelButton onClick={() => handleChoice("yes")}>
                Yes, I&apos;ll Be There ❤️
              </PixelButton>
              <PixelButton
                variant="secondary"
                onClick={() => handleChoice("no")}
              >
                Sorry, I Can&apos;t Come
              </PixelButton>
            </div>
          </div>
        )}

        {attendance && !submitted && (
          <form onSubmit={handleSubmit} className="pixel-panel px-5 py-5 space-y-4">
            <p className="font-pixel text-[9px] text-blossom-dark">
              {attendance === "yes"
                ? "Quest accepted!"
                : "Noted — you'll be missed."}
            </p>

            <label className="block">
              <span className="font-pixel text-[8px] text-ink/60">NAMA</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full border-2 border-ink px-3 py-2 font-body bg-cream"
                placeholder="Nama kamu"
              />
            </label>

            {attendance === "yes" && (
              <label className="block">
                <span className="font-pixel text-[8px] text-ink/60">
                  JUMLAH TAMU
                </span>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="mt-1 w-full border-2 border-ink px-3 py-2 font-body bg-cream"
                />
              </label>
            )}

            <label className="block">
              <span className="font-pixel text-[8px] text-ink/60">UCAPAN</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="mt-1 w-full border-2 border-ink px-3 py-2 font-body bg-cream"
                placeholder="Tulis ucapan & doa..."
              />
            </label>

            <PixelButton type="submit" className="w-full">
              Record Response
            </PixelButton>
          </form>
        )}

        {submitted && (
          <div className="pixel-panel px-5 py-6 text-center space-y-4">
            <p className="font-pixel text-xs text-blossom-dark">
              Quest response recorded!
            </p>
            <p className="font-body text-sm text-ink/70">
              Kirim juga ucapanmu langsung lewat WhatsApp ya.
            </p>
            <a href={whatsappHref} target="_blank" rel="noreferrer noopener">
              <PixelButton
                variant="secondary"
                className="w-full flex items-center justify-center gap-2"
              >
                <MessageCircle size={14} /> Send via WhatsApp
              </PixelButton>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
