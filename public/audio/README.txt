AUDIO FILES NEEDED
==================

No audio files are included in this template — the site works perfectly
fine without them (every play() call fails silently if a file is
missing), but adding them makes the experience much more immersive.

You must add your own ORIGINAL or ROYALTY-FREE audio. Do NOT use
soundtracks or sound effects from existing commercial games (Stardew
Valley, Zelda, Mario, etc.) — those are copyrighted.

Expected files, all in this folder (/public/audio/):

  wedding-chiptune.mp3   Looping background music (see direction below)
  button-click.mp3       Short blip for buttons / RSVP choices
  game-start.mp3         Plays when "Start Quest" is pressed
  game-hit.mp3           Plays when the couple hits an umbrella
  game-success.mp3       Plays when the couple lands safely

All paths are configured in config/wedding.ts under `audio` — if you'd
rather use different filenames, just update them there.

Suggested direction for the track:
- 8-bit / 16-bit chiptune
- Nostalgic RPG adventure feel that eases into a warm, romantic theme
- Medium tempo, not too busy
- Seamless loop (no silence/gap at the start or end)

Good royalty-free sources to search:
- Pixabay Music (pixabay.com/music) — filter by "chiptune" / "8-bit"
- Free Music Archive (freemusicarchive.org)
- OpenGameArt.org (audio section)
- Your own composition (e.g. made in Bfxr, FamiTracker, or a DAW)

Once you have a track:
1. Rename it to: wedding-chiptune.mp3
2. Place it in this folder (public/audio/)
3. Keep the file small (under ~2-3MB) so the site stays fast on mobile

Optional sound effects (button click, select, success) can be added the
same way — see the `playSfx` function in components/GameContext.tsx for
where to wire them in.
