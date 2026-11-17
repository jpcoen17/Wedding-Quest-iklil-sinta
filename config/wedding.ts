// ============================================================
// WEDDING CONFIG
// Single source of truth for editable wedding content.
// Components only ever READ from this file — no wedding data
// should be hard-coded anywhere else.
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
    time: "08:00 – 12:00 WIB", // EDITABLE
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

  // WhatsApp number used by the RSVP section. Digits only, country code first.
  whatsappNumber: "6285156417380", // EDITABLE

  // Wedding Gift — read by WeddingGift.tsx / BankCard.tsx / EWalletCard.tsx.
  gift: {
    intro: "Your presence is already the greatest gift.",
    bankAccounts: [
      {
        bank: "BNI",
        accountNumber: "2102223246",
        accountName: "Muhammad Iklil Yaumal Fithroh",
      },
      {
        bank: "BCA",
        accountNumber: "8950862387",
        accountName: "Sinta Nur Hidayah",
      },
    ],
    ewallets: [
      {
        provider: "DANA",
        number: "0851 5641 7380",
        accountName: "Sinta Nur Hidayah",
      },
    ],
  },

  audio: {
    // Replace these files with original / royalty-free audio.
    // See /public/audio/README.txt for details. Missing files fail
    // silently — the site keeps working without sound.
    music: "/audio/wedding-chiptune.mp3",
    sfx: {
      buttonClick: "/audio/button-click.mp3",
      gameStart: "/audio/game-start.mp3",
      gameHit: "/audio/game-hit.mp3",
      gameSuccess: "/audio/game-success.mp3",
    },
  },

  seo: {
    title: "Muhammad Iklil & Sinta — Wedding Invitation",
    description:
      "Wedding invitation of Muhammad Iklil Yaumal Fithroh and Sinta Nur Hidayah — 25 November 2026.",
    ogImage: "/images/og-image.jpg", // EDITABLE
  },
} as const;

export type Wedding = typeof wedding;
