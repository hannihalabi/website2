# AtalantaLabs Website (Vite + React)

This is a Vite/React single-page marketing site with animated hero/feature sections, localized copy, and custom visual effects.

## Getting started
1) Install deps: `npm install`
2) Run dev server: `npm run dev`
3) Build: `npm run build`
4) Preview build: `npm run preview`

## Project structure
- `src/main.jsx` – wraps the app with the i18n provider.
- `src/App.jsx` – composes sections (Hero, FeatureGrid, Showcase, Pricing, etc.) using localized content.
- `src/content.js` – `useContent()` hook that pulls strings from the current locale.
- `src/i18n.jsx` – simple locale context (autodetects browser locale, fallback to `en`; persists to `localStorage`).
- `src/locales/en.json`, `src/locales/sv.json` – translation files.
- `src/sections/*` – page sections.
- `src/components/*` – reusable pieces (Header, Button, Hyperspeed background, etc.).
- `src/styles/global.css` – global styling + custom section styles.
- `src/lib/reflect-desktop.mov` – video used in hero/showcase.

## Localization
- Auto-detects via `navigator.languages` / `navigator.language`. If none match, falls back to English.
- Manual override: in the browser console run `localStorage.setItem('locale','sv')` (or `en`) and reload.
- Add/edit copy in `src/locales/*.json`; `useContent()` will surface it to components.

## Visual effects
- Hero background: `Hyperspeed` (Three.js/postprocessing) with slowed-down preset; memozied options to avoid restart.
- Feature grid: cards start rotated/offset and align when they enter the viewport.
- Pricing: “orb” layout with radial gradients inspired by the provided reference.
- Logo: Lottie animation via `@lottiefiles/dotlottie-react`.

## Notes
- If you see missing module errors for `@lottiefiles/dotlottie-react` or other deps, rerun `npm install`.
- Videos auto-play muted (`heroVideo` / `showcaseContent.video`); posters fall back to the image URLs.
