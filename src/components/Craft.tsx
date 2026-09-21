import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { alpha } from '@mui/material/styles'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { palette, fonts, scale } from '../theme'
import { languageLevels } from '../config'
import Reveal from './Reveal'
import Kicker from './Kicker'
import Section from './Section'

export default function Craft() {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const items = t('craft.items', { returnObjects: true })
  const languages = t('craft.languages', { returnObjects: true })

  return (
    <Section id="craft" labelledBy="craft-title">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.35fr 0.65fr' }, gap: { xs: 5, md: 7, lg: 9 } }}>
        <Box>
          <Reveal>
            <Kicker index="04">{t('craft.kicker')}</Kicker>
          </Reveal>
          <Reveal delay={0.06}>
            <Typography
              id="craft-title"
              variant="h2"
              sx={{ fontSize: scale.statement, color: palette.ink, mb: { xs: 3.5, md: 6 } }}
            >
              {t('craft.title')}
            </Typography>
          </Reveal>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: { xs: 3, md: 5 } }}>
            {items.map((c, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <Box sx={{ borderTop: '2px solid', borderColor: palette.accent, pt: 2.25 }}>
                  <Typography component="h3" sx={{ fontWeight: 600, fontSize: { xs: '1rem', md: '1.05rem' }, color: palette.ink, m: 0 }}>
                    {c.title}
                  </Typography>
                  <Typography sx={{ color: palette.muted, mt: 1, fontSize: { xs: '0.93rem', md: '0.97rem' }, lineHeight: 1.62 }}>
                    {c.body}
                  </Typography>
                </Box>
              </Reveal>
            ))}
          </Box>
        </Box>

        <Box sx={{ position: { lg: 'sticky' }, top: { lg: 116 }, alignSelf: { lg: 'start' } }}>
          <Reveal delay={0.1}>
            <Typography variant="overline" sx={{ color: palette.accent, display: 'block', mb: 2.5 }}>
              {t('craft.languagesTitle')}
            </Typography>
            <Stack spacing={3}>
              {languages.map((l, i) => {
                const value = languageLevels[i] ?? 0
                return (
                  <Box key={l.name}>
                    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline', gap: 1.5, mb: 1.2 }}>
                      <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: palette.ink }}>{l.name}</Typography>
                      <Typography sx={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.1em', color: palette.muted }}>
                        {l.level}
                      </Typography>
                    </Stack>
                    <Box
                      role="meter"
                      aria-label={l.name}
                      aria-valuenow={value}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuetext={l.level}
                      sx={{ height: 8, bgcolor: alpha(palette.ink, 0.1), overflow: 'hidden', borderRadius: 999 }}
                    >
                      <Box
                        component={motion.div}
                        initial={{ width: reduced ? `${value}%` : 0 }}
                        whileInView={{ width: `${value}%` }}
                        viewport={{ once: true, margin: '-10%' }}
                        transition={{ duration: 1.1, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                        sx={{ height: '100%', bgcolor: palette.accent, borderRadius: 999 }}
                      />
                    </Box>
                  </Box>
                )
              })}
            </Stack>
          </Reveal>
        </Box>
      </Box>
    </Section>
  )
}
