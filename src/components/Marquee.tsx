import Box from '@mui/material/Box'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { palette, fonts } from '../theme'

export default function Marquee() {
  const { t, i18n } = useTranslation()
  const reduced = useReducedMotion()
  const words = t('marquee.words', { returnObjects: true })
  const strip = [...words, ...words]

  return (
    <Box
      aria-hidden
      sx={{ bgcolor: palette.accent, color: palette.paper, py: { xs: 1.4, md: 2.1 }, overflow: 'hidden', whiteSpace: 'nowrap' }}
    >
      <Box
        key={i18n.resolvedLanguage}
        component={motion.div}
        animate={reduced ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 34, ease: 'linear', repeat: Infinity }}
        sx={{ display: 'inline-flex', width: 'max-content' }}
      >
        {strip.map((w, i) => (
          <Box
            key={`${w}-${i}`}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: { xs: 2.5, md: 5 },
              px: { xs: 1.25, md: 2.5 },
              fontFamily: fonts.mono,
              fontSize: { xs: 11, md: 13.5 },
              letterSpacing: { xs: '0.14em', md: '0.18em' },
              textTransform: 'uppercase',
            }}
          >
            {w}
            <Box component="span" sx={{ opacity: 0.55 }}>
              ✦
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
