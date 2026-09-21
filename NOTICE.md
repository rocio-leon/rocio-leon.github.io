# Licences and attribution

This repository mixes three different kinds of material. They are **not** all
under the same licence — please read before reusing anything.

## 1. Source code — MIT

Everything under `src/`, `scripts/`, `.github/`, and the build configuration is
released under the MIT Licence. See [LICENSE](LICENSE). You may reuse the code,
the theme system and the i18n setup freely, with attribution.

## 2. Content and likeness — © Rocío León, all rights reserved

**Not** covered by the MIT licence:

- `src/assets/rocio.png` and `public/og.png` — photographs of Rocío León.
- All biography, career history, credits and contact details in
  `src/i18n/locales/*.json`.
- The name "Rocío León".

These are personal data and a personal likeness. They may not be copied,
redistributed or reused, in whole or in part, without Rocío León's written
permission. If you fork this repository as a template, **delete these files and
replace the locale content with your own.**

## 3. Fonts — SIL Open Font License 1.1

`public/fonts/` contains Bodoni Moda and Jost, both by indestructible type*,
both under the SIL Open Font License 1.1. The full licence and copyright
notices are in [public/fonts/OFL.txt](public/fonts/OFL.txt). The OFL permits
redistribution bundled with this site; it does not permit selling the fonts on
their own.

## 4. Dependencies

All runtime dependencies are MIT-licensed: React, MUI (Material UI), Emotion,
Framer Motion, i18next and react-i18next. Run `npm run licenses` to print the
current dependency licence breakdown.
