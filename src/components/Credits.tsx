import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { palette, scale } from '../theme'
import { useDevice } from '../hooks/useDevice'
import Reveal from './Reveal'
import Kicker from './Kicker'
import Section from './Section'
import CreditCard from './CreditCard'
import CreditsCarousel from './CreditsCarousel'

export default function Credits() {
  const { t } = useTranslation()
  const { isPhone } = useDevice()
  const items = t('credits.items', { returnObjects: true })

  return (
    <Section id="credits" labelledBy="credits-title" sx={{ bgcolor: palette.ink, color: palette.paper }}>
      <Reveal>
        <Kicker light index="03">
          {t('credits.kicker')}
        </Kicker>
      </Reveal>
      <Reveal delay={0.06}>
        <Typography
          id="credits-title"
          variant="h2"
          sx={{ fontSize: scale.sectionTitle, color: palette.paper, mb: { xs: 3.5, md: 8 }, fontStyle: 'italic' }}
        >
          {t('credits.title')}
        </Typography>
      </Reveal>

      {/* Adaptive, not just responsive: phones get a swipe rail, larger screens a grid. */}
      {isPhone ? (
        <Reveal delay={0.1}>
          <CreditsCarousel items={items} label={t('credits.title')} />
        </Reveal>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
            gap: { xs: 1.5, md: 2 },
          }}
        >
          {items.map((credit, i) => (
            <Reveal key={credit.title} delay={0.04 * i} sx={{ height: '100%' }}>
              <CreditCard credit={credit} />
            </Reveal>
          ))}
        </Box>
      )}
    </Section>
  )
}
