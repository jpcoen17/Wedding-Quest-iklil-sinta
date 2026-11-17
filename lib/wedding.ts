// ============================================================
// WEDDING CONFIG
// Edit everything about the invitation from this single file.
// ============================================================

export const wedding = {
  groom: {
    fullName: "Muhammad Iklil Yaumal Fithroh",
    shortName: "Iklil",
  },
  bride: {
    fullName: "Sinta Nur Hidayah",
    shortName: "Sinta",
  },

  // ISO date used by the countdown. Keep the time in 24h format.
  date: "2026-11-25T08:00:00+07:00",
  dateLabel: "25 November 2026",

  event: {
    time: "13:00 – 15:00 WIB", // EDITABLE
    venue: "Kediaman Mempelai", // EDITABLE
    address: "Dusun Pucanganom C RT 03 RW 03, Desa Pucanganom, Kecamatan Rongkop, Kabupaten Gunungkidul", // EDITABLE
    mapsUrl: "https://maps.app.goo.gl/7o2YY3NeU88jA65A9",
  },

  // Quest log / love story timeline — placeholder copy, easy to replace.
  quests: [
    {
      id: "quest-01",
      title: "Where It All Started",
      description:
        "Two players spawn in the same neighborhood, unaware their storylines are about to cross.",
    },
    {
      id: "quest-02",
      title: "Two Paths Become One",
      description:
        "Side quests turn into a shared journey — texts, calls, and long conversations that never felt long enough.",
    },
    {
      id: "quest-03",
      title: "The Journey",
      description:
        "Levels get harder, but so does the teamwork. Every challenge cleared makes the bond stronger.",
    },
    {
      id: "quest-04",
      title: "The Final Quest",
      description:
        "One last quest remains before the credits roll on chapter one — and chapter two begins together.",
    },
  ],

  // Gallery placeholders — swap the src with real photos later.
  gallery: [
    { id: "photo-1", src: "/images/placeholder-1.jpg", alt: "Our moment 1" },
    { id: "photo-2", src: "/images/placeholder-2.jpg", alt: "Our moment 2" },
    { id: "photo-3", src: "/images/placeholder-3.jpg", alt: "Our moment 3" },
    { id: "photo-4", src: "/images/placeholder-4.jpg", alt: "Our moment 4" },
    { id: "photo-5", src: "/images/placeholder-5.jpg", alt: "Our moment 5" },
    { id: "photo-6", src: "/images/placeholder-6.jpg", alt: "Our moment 6" },
  ],

  // WhatsApp number used by the RSVP section. Digits only, country code first.
  whatsappNumber: "6281234567890", // EDITABLE

  gift: [
    {
      id: "bank",
      label: "Bank Transfer",
      bank: "BANK NAME", // EDITABLE
      account: "0000 0000 0000", // EDITABLE
      name: "Muhammad Iklil Yaumal Fithroh",
    },
    {
      id: "ewallet",
      label: "E-Wallet",
      bank: "E-WALLET NAME", // EDITABLE
      account: "0000 0000 0000", // EDITABLE
      name: "Sinta Nur Hidayah",
    },
  ],

  audio: {
    // Replace this file with an original / royalty-free chiptune track.
    // See /public/audio/README.txt for details.
    src: "/audio/wedding-chiptune.mp3",
  },

  seo: {
    title: "Muhammad Iklil & Sinta — Wedding Invitation",
    description:
      "Wedding invitation of Muhammad Iklil Yaumal Fithroh and Sinta Nur Hidayah — 25 November 2026.",
    ogImage: "/images/og-image.jpg", // EDITABLE
  },
} as const;

export type Wedding = typeof wedding;
