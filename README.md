# The Wedding Quest 🎮❤️

A retro pixel-art, video-game-styled digital wedding invitation for
**Muhammad Iklil Yaumal Fithroh & Sinta Nur Hidayah** — 25 November 2026.

Built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

To build for production:

```bash
npm run build
npm start
```

This project is Vercel-ready — push it to a Git repo and import it at
vercel.com, or run `vercel` from this folder.

## Editing the content

Almost everything you'll want to change lives in **`config/wedding.ts`**:

- Groom / bride names
- Wedding date & countdown target
- Event time, venue, address, Google Maps link
- The "Our Story" quest log text
- WhatsApp number for RSVP
- Bank accounts & e-wallet details for the Wedding Gift section
- Audio file paths (music + sound effects)
- SEO title, description, Open Graph image

No need to touch any component code for basic edits — components only
ever read from this file.

## Replacing placeholder assets

- **Open Graph image**: replace `public/images/og-image.jpg`.
- **Background music & sound effects**: see `public/audio/README.txt`
  — you must add your own original/royalty-free audio files. None are
  bundled, for copyright reasons. The site works perfectly without
  them (every sound fails silently if the file is missing).

## Personalized guest invitation

Add `?to=<guest-id>` to the URL to personalize the opening screen and
pre-fill the RSVP name for a specific guest — e.g.:

```
https://yourdomain.com/?to=ulfa
```

- The guest list lives in **`config/guests.ts`** — add, remove, or
  rename guests there. Each guest has a URL-safe `id` (used in the
  link) and a `name` (what's actually shown).
- Visiting without `?to=`, or with an unrecognized id, always falls
  back to "Guest" — the site never errors and never shows the full
  guest list to visitors.
- `lib/getGuest.ts` resolves the raw query value into a known guest.
  Only names that exist in `config/guests.ts` are ever rendered — the
  raw query string itself is never displayed.
- `components/GuestGreeting.tsx` reads `?to=` once (via
  `useSearchParams`, wrapped in a `<Suspense>` boundary in
  `app/page.tsx`) and exposes it to the whole app through a
  `useGuest()` hook — no need to re-parse the URL in every component.
- The opening screen (`GameIntro.tsx`) shows a small "NEW QUEST
  RECEIVED!" card with the guest's name for recognized guests, and
  personalizes the welcome dialogue ("Dear {name},"). The core wedding
  info (couple names + date) is never displaced by this.
- The RSVP name field (`RSVP.tsx`) is pre-filled for recognized guests
  but stays fully editable.
- A copyable personalized link ("INVITATION LINK") appears at the end
  of the Final Quest section (`InvitationLinkCard.tsx`) — but only for
  recognized guests, so there's nothing to copy on a generic visit.

To generate links for all 28 guests for distribution, combine each
guest's `id` from `config/guests.ts` with your domain, e.g.
`https://yourdomain.com/?to=mas-kevin-kak-imon`.

## Project structure

```
app/
  layout.tsx        Root layout, fonts, SEO metadata
  page.tsx           Assembles the intro + all level sections
  globals.css        Pixel-art design tokens & utility classes
components/
  GameContext.tsx    Shared state: game started?, music on/off, volume, sfx
  GuestGreeting.tsx  Reads ?to= and exposes the resolved guest via useGuest()
  InvitationLinkCard.tsx  Copyable personalized link (Final Quest section)
  GameIntro.tsx       Opening title screen + "Start Game" sequence
  PixelButton.tsx     Reusable RPG-style button
  PixelDialog.tsx     Typing-effect dialogue box
  PixelCharacter.tsx  Original pixel-art groom & bride sprites (SVG)
  PixelHouse.tsx      Pixel-art house illustration
  PixelCloud.tsx / PixelBird.tsx   Background scenery
  LevelNav.tsx        Sticky side navigation between levels
  SectionHeading.tsx  "LEVEL 0X" heading style
  StorySection.tsx    Level 01 — Our Story (quest log)
  EventSection.tsx    Level 02 — The Wedding (details + map button)
  Countdown.tsx       Countdown timer used inside EventSection
  RSVP.tsx            Level 04 — RSVP (NPC-dialogue style form)
  WeddingGift.tsx     "Item Shop" — assembles BankCard / EWalletCard
  BankCard.tsx        Single bank account card + copy button
  EWalletCard.tsx     Single e-wallet card + copy button
  CopyButton.tsx      Clipboard copy button with manual-copy fallback
  FinalQuest.tsx      Ending section
  MusicPlayer.tsx     Floating music on/off + volume control
  game/
    BalloonLoveQuest.tsx  Level 03 — orchestrates the whole mini-game
    GameCharacter.tsx     Groom + bride riding balloons (visual only)
    GameObstacle.tsx      Pixel-art umbrella obstacle
    GameControls.tsx      Touch left/right buttons for mobile
    GameHUD.tsx            "Distance to ground" progress bar
    GameDialog.tsx         Shared intro / fail / success dialog panel
config/
  wedding.ts          ⭐ All editable wedding content lives here
  guests.ts           Guest list for the ?to= personalized invitation
lib/
  utils.ts            Countdown math + small helpers
  getGuest.ts          Resolves ?to= into a known guest, safely
```

### Level 03 — Balloon Love Quest

A small, forgiving arcade mini-game: the couple drifts down on
balloons and the player nudges them left/right (arrow keys / A-D on
desktop, tap-and-hold buttons on mobile) to dodge floating umbrellas.
It's tuned to be easy and quick (~20–30 seconds per run, no scoring,
no lives, just "try again" on a hit) so any wedding guest can finish
it in one go. All positioning during play is done by writing directly
to the DOM via refs inside a single `requestAnimationFrame` loop
(`BalloonLoveQuest.tsx`) rather than through React state, so it stays
smooth even on low-end phones. The loop and all event listeners are
cleaned up on unmount.

## Design notes

- All pixel art (clouds, house, characters) is original, hand-drawn as
  flat-colored SVG rectangles — no copyrighted game assets are used.
- Two Google Fonts are used: **Press Start 2P** for pixel headings/UI
  labels, and **Pixelify Sans** for longer, more readable body text.
- Motion is kept deliberately light (Framer Motion) so the site stays
  smooth on mobile.
- `prefers-reduced-motion` is respected globally in `globals.css`.

## Notes on the audio

The "Start Game" button calls `startGame()` (see
`components/GameContext.tsx`), which is the only place playback is
triggered automatically — this respects mobile browsers' autoplay
restrictions, which usually require a user gesture. If autoplay is
still blocked, the visitor can tap the floating music button in the
bottom-right corner.
