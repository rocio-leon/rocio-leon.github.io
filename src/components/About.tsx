import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { alpha } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { palette, fonts, scale } from '../theme'
import Reveal from './Reveal'
import Kicker from './Kicker'
import Section from './Section'

export default function About() {
  const { t } = useTranslation()
  const paragraphs = t('about.paragraphs', { returnObjects: true })
  const stats = t('about.stats', { returnObjects: true })

  return (
    <Section id="about" labelledBy="about-title">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.8fr 1.2fr' }, gap: { xs: 3.5, md: 6, lg: 8 } }}>
        {/* On tall pointer screens the statement holds while the prose scrolls
            past it. Below lg it is a plain stacked block — sticky on a short
            or touch screen just steals the viewport. */}
        <Box sx={{ position: { lg: 'sticky' }, top: { lg: 116 }, alignSelf: { lg: 'start' } }}>
          <Reveal>
            <Kicker index="01">{t('about.kicker')}</Kicker>
          </Reveal>
          <Reveal delay={0.06}>
            <Typography
              id="about-title"
              variant="h2"
              sx={{ fontSize: scale.statement, color: palette.ink, maxWidth: 460 }}
            >
              {t('about.title')}
            </Typography>
          </Reveal>
        </Box>

        <Box>
          {paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.08 + i * 0.08}>
              <Typography
                sx={{ fontSize: scale.lead, lineHeight: 1.72, color: alpha(palette.ink, 0.8), mb: 3 }}
              >
                {p}
              </Typography>
            </Reveal>
          ))}

          <Reveal delay={0.22}>
            <Divider sx={{ my: { xs: 3.5, md: 5 } }} />
            <Stack
              direction={{ xs: 'row' }}
              sx={{ flexWrap: 'wrap', gap: { xs: 3, sm: 5, md: 6 }, rowGap: { xs: 3 } }}
            >
              {stats.map((s) => (
                <Box key={s.value} sx={{ minWidth: { xs: 96, sm: 'auto' } }}>
                  <Typography
                    sx={{
                      // Deliberately the sans, not the didone: at this size a
                      // didone's thin strokes (the 4, the +) read as broken.
                      fontFamily: fonts.label,
                      fontWeight: 500,
                      fontSize: { xs: '2.5rem', md: '3.3rem' },
                      letterSpacing: '-0.02em',
                      color: palette.accentDeep,
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </Typography>
                  <Typography variant="overline" sx={{ color: palette.ink, mt: 1, display: 'block', lineHeight: 1.5, letterSpacing: '0.16em' }}>
                    {s.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
            <Divider sx={{ my: { xs: 3.5, md: 5 } }} />
          </Reveal>

          <Reveal delay={0.28}>
            <Typography variant="overline" sx={{ color: palette.accent, display: 'block', mb: 1.5 }}>
              {t('about.educationTitle')}
            </Typography>
            <Typography sx={{ fontFamily: fonts.display, fontWeight: 500, fontSize: { xs: '1.35rem', md: '1.75rem' }, color: palette.ink }}>
              {t('about.degree')}
            </Typography>
            <Typography sx={{ color: palette.muted, mt: 0.5, fontSize: { xs: '0.95rem', md: '1rem' } }}>
              {t('about.school')}
            </Typography>
          </Reveal>
        </Box>
      </Box>
    </Section>
  )
}
