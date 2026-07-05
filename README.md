# Thirsty Machines

An independent estimate of how much water hyperscale data centers consume — a live running counter plus a map of major campuses sized by estimated annual water use.

Built with Vite, React, TypeScript, and D3.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Project structure

- `src/data.ts` — curated per-site water-use estimates and operator colors
- `src/components/Hero.tsx` — the animated liter counter
- `src/components/MapSection.tsx` — the D3 world map, filter chips, and detail panel
- `src/components/Methodology.tsx` — the methodology writeup
- `public/data/countries-110m.json` — world topology (from the `world-atlas` package) used to draw the map

All figures are educated, order-of-magnitude estimates, not audited data — see the in-app Methodology section for sourcing notes.
