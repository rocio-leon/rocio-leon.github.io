# Rocío León — Portfolio

Single-page portfolio for Rocío León (production direction, assistant direction, art direction).
Vite + React + TypeScript + MUI, bilingual EN/ES.

**Live:** https://saeed99madi.github.io/rocio-leon-portfolio/

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

## Security

- **Content-Security-Policy** is set via a meta tag in `index.html` and allows
  **no third-party origin at all**. `style-src` keeps `'unsafe-inline'` because Emotion
  (MUI's styling engine) injects `<style>` elements at runtime and a static host cannot
  mint per-request nonces; `img-src` keeps `data:` for the inline SVG paper grain.
  If this moves to a host that can set real headers (Netlify, Cloudflare), move the CSP
  to a response header and add `frame-ancestors` and `X-Content-Type-Options`, which
  meta tags cannot express.
- **Fonts are self-hosted** in `public/fonts`. Hotlinking Google Fonts sends every
  visitor's IP address to Google, which EU courts have treated as a GDPR violation —
  relevant for a Madrid-based freelancer. Regenerate with `npm run fonts:fetch`.
- **No analytics, no cookies, no third-party scripts.** Nothing to consent to, so there
  is no cookie banner. `localStorage` holds one key (`rl-lang`) and never leaves the browser.
- External links carry `rel="noopener noreferrer"`.
- `npm run audit` checks production dependencies. Dependabot opens grouped monthly PRs.
- An error boundary catches render crashes and still shows Rocío's contact details,
  using dependency-free inline markup so it works even if the theme or i18n layer broke.

## Licensing

Three different licences apply — see [NOTICE.md](NOTICE.md) before reusing anything.

| Material | Licence |
|---|---|
| Source code | MIT ([LICENSE](LICENSE)) |
| Rocío's photo, biography, credits, contact details | © Rocío León, all rights reserved |
| Bodoni Moda, Jost | SIL OFL 1.1 ([public/fonts/OFL.txt](public/fonts/OFL.txt)) |
| Dependencies | MIT — run `npm run licenses` |

**Forking this as a template?** Delete `src/assets/rocio.png`, `public/og.png` and
replace the locale content. The code is yours to reuse; her likeness and personal
data are not.

## Deploying

`npm run build` produces a fully static `dist/` — no server, no runtime secrets.
Pushing to `main` deploys to GitHub Pages via [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

The deployed URL lives in **one place**: `VITE_SITE_URL`. `index.html` interpolates it,
and `scripts/site-files.ts` generates `robots.txt` and the hreflang `sitemap.xml` from
it at build time.

### Moving to another host

1. Edit `.env`:
   - `VITE_SITE_URL` — the new public URL, with a trailing slash.
   - `BASE_PATH` — `/` for any host serving from a domain root (Netlify, Vercel,
     Cloudflare Pages, a custom domain); `/<repo>/` for a GitHub Pages project site.
2. Mirror both values in the `env:` block of the deploy workflow.
3. Regenerate the share image if the wording changes (see below).

Nothing else references the domain.

### Regenerating the share image

`public/og.png` is the 1200x630 card that WhatsApp, LinkedIn and Slack show when the
link is shared. It was rendered from a standalone HTML template; if Rocío's photo or
title changes, re-render it at 1200x630 and keep it under ~300 KB — WhatsApp silently
skips larger images.

## Accessibility

- Skip link, landmark regions, and `aria-labelledby` on every section.
- Language proficiency bars expose `role="meter"` with `aria-valuetext`.
- `prefers-reduced-motion` is respected: reveals fade without movement, the marquee stops.
- Touch targets are at least 48px on the mobile action bar.
- Colour contrast: display type is set at weight 500+ because the didone's hairlines
  break up at 400, and the stat numerals deliberately use the sans for the same reason.
