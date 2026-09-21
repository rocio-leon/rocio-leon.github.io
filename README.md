# Rocío León — Portfolio

Single-page portfolio for Rocío León (production direction, assistant direction, art direction).
Vite + React + TypeScript + MUI, bilingual EN/ES.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production bundle into dist/
npm run preview  # serve the built bundle
```

## Where things live

| What | File |
|---|---|
| Colours, type scale, MUI theme | [src/theme.ts](src/theme.ts) |
| Non-translatable facts (email, phone, WhatsApp) | [src/config.ts](src/config.ts) |
| All copy, both languages | [src/i18n/locales/en.json](src/i18n/locales/en.json), [src/i18n/locales/es.json](src/i18n/locales/es.json) |
| i18n runtime + language detection | [src/i18n/index.ts](src/i18n/index.ts) |
| Sections | [src/components/](src/components/) |

## Editing the content

**All text is in the two locale files** — nothing is hard-coded in components.
The files are key-for-key identical; if you add a key to one, add it to the other
or the build will fail the typecheck (English is the source of truth for types).

To change a job, a credit, a skill: edit the matching array in both JSON files.
Arrays pair positionally, so keep the same order in both languages.

The three language proficiency bars read their percentages from `languageLevels`
in [src/config.ts](src/config.ts), matched by position to `craft.languages`.

### Adding a third language

1. Add `src/i18n/locales/fr.json`, copied from `en.json` and translated.
2. Register it in [src/i18n/index.ts](src/i18n/index.ts): add `'fr'` to `supportedLngs`
   and `fr: { translation: fr }` to `resources`.
3. Nothing else changes — the switcher, `<html lang>`, the document title, the meta
   description, the hreflang tags and the WhatsApp prefilled message all follow.

The language switcher currently toggles between two languages; with three or more,
turn it into a menu.

## How the language layer works

- **Detection order**: `?lang=` query string → `localStorage` → browser language → `<html lang>`.
  So `?lang=es` forces Spanish and is shareable; otherwise a Spanish-speaking
  visitor lands on Spanish and everyone else on English.
- `es-ES`, `es-419` etc. all resolve to `es` (`nonExplicitSupportedLngs`).
- The choice is remembered in `localStorage` under `rl-lang`.
- [src/i18n/useDocumentLanguage.ts](src/i18n/useDocumentLanguage.ts) keeps `<html lang>`,
  `<html dir>`, the document title, the meta + OG description, `og:locale` and the
  `hreflang` alternates in sync — so link previews and search engines see the right language.
- Resources are typed: `t('work.roles', { returnObjects: true })` returns a typed array,
  and a typo in a key is a compile error.

## Design notes

- **Palette**: near-white paper `#FBFAF8`, charcoal `#121214`, one ember accent `#E4572E`.
  The accent is deliberately rare — kickers, rules, one CTA — so it still means something.
  Everything is a semantic token in `theme.ts`; no component hard-codes a hex value.
- **Type**: Bodoni Moda (fashion-editorial didone) for display, Jost for everything else.
  Display type is set at weight 500+ throughout: a didone's hairlines break up at 400.
  The stat numerals use the sans on purpose — at that size the didone's `4` and `+`
  read as broken strokes.
- **Rhythm**: light sections with two dark blocks (Credits, Contact) and an ember
  strip at the fold.

## Responsive

- The hero is exactly one viewport tall at every size, so the scrolling skills strip
  is always visible without scrolling. On phones the portrait is capped by viewport
  *height* (`min(196px, 22svh)`) so it still fits on short screens, and the discipline
  pills are hidden because the strip already names them.
- Navigation collapses to a full-height drawer below 900px. The language switcher
  stays in the header at every size.
- Respects `prefers-reduced-motion`: reveals fade without movement and the marquee stops.
- Safe-area insets are handled for notched phones.

## Replacing the portrait

`public/rocio.png` was cropped from the supplied CV PDF and is only 324×440 — it is
soft on large screens. **Drop in a higher-resolution portrait at the same 324:440
aspect ratio** (or update `aspectRatio` in [src/components/Hero.tsx](src/components/Hero.tsx)).
Around 900×1200 would be ideal.

## Deploying

`npm run build` produces a fully static `dist/`. It can be served from any static host
(Netlify, Vercel, GitHub Pages, Railway static). No server, no environment variables.
