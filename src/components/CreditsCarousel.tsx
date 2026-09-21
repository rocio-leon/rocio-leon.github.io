import { useCallback, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { palette, fonts } from '../theme'
import CreditCard from './CreditCard'
import type { CreditItem } from './CreditCard'

/**
 * Phone-only presentation of the credits: a swipeable snap rail instead of a
 * six-card vertical stack. Swiping is the native gesture on a touch device, and
 * it keeps the section to one screen rather than six screens of scrolling.
 */
export default function CreditsCarousel({ items, label }: { items: CreditItem[]; label: string }) {
  const railRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const onScroll = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.firstElementChild as HTMLElement | null
    if (!card) return
    const stride = card.offsetWidth + 12
    setActive(Math.min(items.length - 1, Math.max(0, Math.round(rail.scrollLeft / stride))))
  }, [items.length])

  return (
    <Box>
      <Box
        ref={railRef}
        onScroll={onScroll}
        role="group"
        aria-label={label}
        sx={{
          display: 'flex',
          gap: 1.5,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          // Full-bleed rail: cards run to the screen edge, so the next one peeks.
          mx: -2,
          px: 2,
          // Without this, snapping ignores the padding and parks the first card
          // flush against the screen edge, out of line with the headings.
          scrollPaddingInlineStart: '16px',
          pb: 0.5,
        }}
      >
        {items.map((credit) => (
          <Box key={credit.title} sx={{ flex: '0 0 76%', scrollSnapAlign: 'start' }}>
            <CreditCard credit={credit} compact />
          </Box>
        ))}
      </Box>

      <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, mt: 2.5 }}>
        <Stack direction="row" sx={{ gap: 0.75, flexGrow: 1 }} aria-hidden>
          {items.map((credit, i) => (
            <Box
              key={credit.title}
              sx={{
                height: 2,
                flex: 1,
                bgcolor: i === active ? palette.accentOnInk : alpha(palette.paper, 0.22),
                transition: 'background-color .3s ease',
              }}
            />
          ))}
        </Stack>
        <Typography
          aria-live="polite"
          sx={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.16em', color: alpha(palette.paper, 0.6) }}
        >
          {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </Typography>
      </Stack>
    </Box>
  )
}
