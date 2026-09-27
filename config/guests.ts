// ============================================================
// GUEST LIST
// Used to resolve the ?to= query parameter into a display name
// for the Personalized Guest Invitation feature.
//
// IMPORTANT: this list is never rendered in full anywhere in the
// UI — guests only ever see the single name that matches their
// own ?to= link (see lib/getGuest.ts).
// ============================================================

export type Guest = {
  /** URL-safe slug used in ?to=<id> links. Lowercase, hyphenated. */
  id: string;
  /** Display name shown on the opening screen and prefilled in RSVP. */
  name: string;
};

export const guests: Guest[] = [
  { id: "ulfa", name: "Ulfa & Suami" },
  { id: "nita", name: "Nita & Partner" },
  { id: "ayu-ago", name: "Ayu & Ago" },
  { id: "lala-iman", name: "Lala & Iman" },
  { id: "ica", name: "Ica & Suami" },
  { id: "rena", name: "Rena & Partner" },
  { id: "shofi", name: "Shofi & Partner" },
  { id: "winda-neza", name: "Winda & Neza" },
  { id: "mara-aldo", name: "Mara & Aldo" },
  { id: "angel-afi", name: "Angel & Afi" },
  { id: "widia", name: "Widia" },
  { id: "sheva", name: "Sheva" },
  { id: "dinda-bang-wahyu", name: "Dinda & Bang Wahyu" },
  { id: "mami", name: "Mami & Suami" },
  { id: "genis", name: "Genis" },
  { id: "tasya", name: "Tasya" },
  { id: "berlin", name: "Berlin & Partner" },
  { id: "nisa", name: "Nisa" },
  { id: "anggi", name: "Anggi" },
  { id: "kak-nia", name: "Kak Nia" },
  { id: "yakuf", name: "Yakuf & Partner" },
  { id: "bang-sixma", name: "Bang Sixma & Partner" },
  { id: "abid-nisa", name: "Abid & Nisa" },
  { id: "mas-kevin-kak-imon", name: "Mas Kevin & Kak Imon" },
  { id: "yana", name: "Yana & Suami" },
  { id: "pamungkas", name: "Pamungkas & Partner" },
  { id: "vena", name: "Vena" },
  { id: "fauzi", name: "Fauzi" },
];
