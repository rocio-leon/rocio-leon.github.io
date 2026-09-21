import { createTheme, alpha } from '@mui/material/styles'

/**
 * Design tokens. Semantic names only — components never hard-code a hex value,
 * so the whole identity can be re-pitched from this one file.
 */
export const palette = {
  /** Page ground. */
  paper: '#FBFAF8',
  /** Alternating section ground, one step down from paper. */
  paperAlt: '#F1EFEA',
  /** Primary type and the dark inverted sections. */
  ink: '#121214',
  /** Raised panels inside a dark section. */
  inkAlt: '#1C1C20',
  /** Secondary type on paper. */
  muted: '#55555C',
  /** The single accent. Used sparingly: rules, kickers, one CTA. */
  accent: '#E4572E',
  accentDeep: '#C43F1B',
  /** Accent tuned for legibility on a dark ground. */
  accentOnInk: '#FF7A4D',
} as const

/** Hairlines. Neutral, never accent-tinted — accent stays rare enough to mean something. */
export const line = {
  onPaper: alpha(palette.ink, 0.14),
  onPaperStrong: alpha(palette.ink, 0.26),
  onInk: alpha(palette.paper, 0.18),
  onInkStrong: alpha(palette.paper, 0.32),
}

/**
 * Bodoni Moda — a high-contrast fashion-editorial didone, the register of
 * Vogue / Harper's mastheads. Jost carries everything else: a geometric sans
 * with enough warmth to sit under a didone without fighting it.
 */
const display = "'Bodoni Moda', 'Didot', 'Bodoni MT', Georgia, serif"
const label = "'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
const body = "'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

export const fonts = { display, mono: label, label, body }

/** Fluid type ramp — one source of truth for every oversized heading. */
export const scale = {
  hero: 'clamp(3.25rem, 12.5vw, 8.5rem)',
  sectionTitle: 'clamp(2.1rem, 6.5vw, 4rem)',
  statement: 'clamp(1.75rem, 4.4vw, 2.9rem)',
  closing: 'clamp(2.4rem, 8.5vw, 5rem)',
  entry: 'clamp(1.45rem, 3.4vw, 2.15rem)',
  card: 'clamp(1.35rem, 2.6vw, 1.95rem)',
  lead: 'clamp(1rem, 1.4vw, 1.2rem)',
  body: 'clamp(0.95rem, 1.1vw, 1.0625rem)',
}

export const easing = [0.16, 1, 0.3, 1] as const

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: palette.ink, dark: '#000', contrastText: palette.paper },
    secondary: { main: palette.accent, dark: palette.accentDeep, contrastText: palette.paper },
    background: { default: palette.paper, paper: palette.paper },
    text: { primary: palette.ink, secondary: palette.muted },
    divider: line.onPaper,
  },
  shape: { borderRadius: 2 },
  typography: {
    fontFamily: body,
    h1: { fontFamily: display, fontWeight: 500, lineHeight: 0.94, letterSpacing: '-0.015em' },
    h2: { fontFamily: display, fontWeight: 500, lineHeight: 1.06, letterSpacing: '-0.01em' },
    h3: { fontFamily: display, fontWeight: 500, lineHeight: 1.16 },
    h4: { fontFamily: body, fontWeight: 600, letterSpacing: '-0.01em' },
    h5: { fontFamily: body, fontWeight: 600 },
    h6: { fontFamily: body, fontWeight: 600 },
    overline: {
      fontFamily: label,
      fontSize: '0.6875rem',
      fontWeight: 500,
      letterSpacing: '0.24em',
      textTransform: 'uppercase',
      lineHeight: 1.4,
    },
    body1: { fontSize: scale.body, lineHeight: 1.72, fontWeight: 400 },
    body2: { fontSize: '0.9375rem', lineHeight: 1.6 },
    button: { fontFamily: label, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'none' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '::selection': { background: palette.accent, color: palette.paper },
        html: { scrollBehavior: 'smooth', WebkitFontSmoothing: 'antialiased' },
        // `clip`, not `hidden`: hidden makes body a scroll container, which
        // silently breaks every `position: sticky` on the page.
        body: { overflowX: 'clip' },
        ':focus-visible': { outline: `2px solid ${palette.accent}`, outlineOffset: 3 },
        '@media (prefers-reduced-motion: reduce)': { html: { scrollBehavior: 'auto' } },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 999, paddingInline: 22, paddingBlock: 11 } },
    },
  },
})
