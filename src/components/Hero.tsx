import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { alpha } from '@mui/material/styles'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { palette, line, fonts, scale, easing } from '../theme'
import { profile } from '../config'
import { useWhatsAppHref } from '../useWhatsApp'
import { useDevice } from '../hooks/useDevice'
import Marquee from './Marquee'

const MotionBox = motion.create(Box)

const rise = (delay: number, reduced: boolean | null) => ({
  initial: reduced ? { opacity: 0 } : { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: easing },
})

export default function Hero() {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const whatsapp = useWhatsAppHref()
  const { isLandscapeCompact } = useDevice()
  const tags = t('hero.tags', { returnObjects: true })

  return (
    <Box
      id="top"
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Quiet tonal band behind the portrait column — depth without a colour slab. */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          right: 0,
          top: { md: 74 },
          bottom: { xs: 0, md: 0 },
          width: { xs: 0, md: '30vw' },
          bgcolor: palette.paperAlt,
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          pt: { xs: 8, sm: 12, md: 12 },
          pb: { xs: 3, md: 8 },
          px: { xs: 2, sm: 3, md: 5, lg: 6 },
        }}
      >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1440,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: isLandscapeCompact
            ? 'minmax(0, 0.35fr) minmax(0, 0.65fr)'
            : { xs: '1fr', md: 'minmax(0, 1.1fr) minmax(0, 0.9fr)' },
          gap: { xs: 2.5, sm: 4, md: 6, lg: 8 },
          alignItems: 'center',
        }}
      >
        <Box sx={{ order: { xs: 2, md: 1 } }}>
          <MotionBox {...rise(0.05, reduced)}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: { xs: 1.25, md: 3 } }}>
              <Box sx={{ width: { xs: 22, md: 34 }, height: 2, bgcolor: palette.accent }} />
              <Typography variant="overline" sx={{ color: palette.accent }}>
                {t('hero.location')} — {t('hero.role')}
              </Typography>
            </Stack>
          </MotionBox>

          <MotionBox {...rise(0.14, reduced)}>
            <Typography variant="h1" sx={{ color: palette.ink, fontSize: isLandscapeCompact ? 'clamp(1.9rem, 9svh, 3rem)' : scale.hero }}>
              {profile.first}
              <Box component="span" sx={{ display: 'block', fontStyle: 'italic', color: palette.ink }}>
                {profile.last}
              </Box>
            </Typography>
          </MotionBox>

          <MotionBox {...rise(0.26, reduced)} sx={{ mt: { xs: 1.75, md: 4 }, maxWidth: 560 }}>
            <Typography sx={{ fontSize: isLandscapeCompact ? '0.95rem' : scale.lead, lineHeight: 1.55, color: alpha(palette.ink, 0.78) }}>
              {t('hero.headline')}
            </Typography>
          </MotionBox>

          <MotionBox {...rise(0.36, reduced)} sx={{ mt: { xs: 3, md: 4.5 }, display: isLandscapeCompact ? 'none' : { xs: 'none', sm: 'block' } }}>
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
              {tags.map((tag) => (
                <Box
                  key={tag}
                  sx={{
                    px: { xs: 1.4, md: 1.8 },
                    py: 0.65,
                    borderRadius: 999,
                    border: '1px solid',
                    borderColor: line.onPaperStrong,
                    fontFamily: fonts.mono,
                    fontSize: { xs: 10.5, md: 11.5 },
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: palette.ink,
                  }}
                >
                  {tag}
                </Box>
              ))}
            </Stack>
          </MotionBox>

          <MotionBox {...rise(0.46, reduced)} sx={{ mt: { xs: 2.5, md: 5 } }}>
            <Stack direction="row" sx={{ flexWrap: 'wrap', alignItems: 'center', gap: { xs: 1.5, sm: 3 } }}>
              <Button
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                color="secondary"
                startIcon={<WhatsAppIcon />}
                sx={{ fontSize: 13, '&:hover': { bgcolor: palette.accentDeep } }}
              >
                {t('contact.whatsappLabel')}
              </Button>
              <Link
                href={`mailto:${profile.email}`}
                underline="hover"
                sx={{ color: palette.ink, fontFamily: fonts.mono, fontSize: { xs: 13, md: 14 }, wordBreak: 'break-all' }}
              >
                {profile.email}
              </Link>
            </Stack>
          </MotionBox>
        </Box>

        <MotionBox
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 36, scale: 1.02 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: easing }}
          sx={{
            order: { xs: 1, md: 2 },
            position: 'relative',
            justifySelf: isLandscapeCompact ? 'center' : { xs: 'center', sm: 'start', md: 'end' },
            width: '100%',
            // Width is capped by viewport HEIGHT on phones (the portrait is
            // 324:440), so the skills strip below stays above the fold even
            // on short screens.
            maxWidth: isLandscapeCompact
              ? 'min(150px, 52svh)'
              : { xs: 'min(196px, 22svh)', sm: 'min(260px, 30svh)', md: 380, lg: 420 },
          }}
        >
          {/* Offset ember rule frame — the accent as a line, not a field. */}
          <Box
            aria-hidden
            sx={{
              // Hidden on phones, where it crowds the kicker rule below it.
              display: { xs: 'none', sm: 'block' },
              position: 'absolute',
              inset: 0,
              transform: { sm: 'translate(12px, 12px)', md: 'translate(18px, 18px)' },
              border: '1px solid',
              borderColor: palette.accent,
              pointerEvents: 'none',
            }}
          />
          <Box
            sx={{
              position: 'relative',
              aspectRatio: '324 / 440',
              overflow: 'hidden',
              bgcolor: palette.paperAlt,
            }}
          >
            <Box
              component="img"
              src={profile.portrait}
              alt={t('hero.portraitAlt')}
              width={324}
              height={440}
              fetchPriority="high"
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </Box>
          <Typography
            variant="overline"
            aria-hidden
            sx={{
              display: { xs: 'none', lg: 'block' },
              position: 'absolute',
              top: '50%',
              left: -46,
              transform: 'rotate(-90deg) translateX(-50%)',
              transformOrigin: 'left center',
              color: palette.muted,
              whiteSpace: 'nowrap',
            }}
          >
            {t('hero.scroll')} ↓
          </Typography>
        </MotionBox>
      </Box>
      </Box>

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Marquee />
      </Box>
    </Box>
  )
}
