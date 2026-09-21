import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { alpha } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { palette, line, fonts, scale } from '../theme'
import { profile } from '../config'
import { useWhatsAppHref } from '../useWhatsApp'
import Reveal from './Reveal'
import Kicker from './Kicker'
import Section from './Section'

export default function Contact() {
  const { t } = useTranslation()
  const whatsapp = useWhatsAppHref()

  return (
    <Section id="contact" labelledBy="contact-title" sx={{ bgcolor: palette.ink, color: palette.paper }}>
      <Reveal>
        <Kicker light index="05">{t('contact.kicker')}</Kicker>
      </Reveal>

      <Reveal delay={0.06}>
        <Typography
          id="contact-title"
          variant="h2"
          sx={{ fontSize: scale.closing, color: palette.paper, maxWidth: 900 }}
        >
          {t('contact.title')}
        </Typography>
      </Reveal>

      <Reveal delay={0.12}>
        <Typography sx={{ color: alpha(palette.paper, 0.68), maxWidth: 560, mt: 2.5, fontSize: scale.lead, lineHeight: 1.7 }}>
          {t('contact.body')}
        </Typography>
      </Reveal>

      <Reveal delay={0.18}>
        <Box sx={{ mt: { xs: 4.5, md: 7 } }}>
          <Button
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            size="large"
            startIcon={<WhatsAppIcon />}
            sx={{
              bgcolor: palette.accent,
              color: palette.paper,
              fontSize: 14,
              py: 1.3,
              px: 3,
              '&:hover': { bgcolor: palette.accentDeep },
            }}
          >
            {t('contact.whatsappLabel')} · {profile.phone}
          </Button>
        </Box>
      </Reveal>

      <Reveal delay={0.24}>
        <Box sx={{ mt: { xs: 4, md: 5.5 } }}>
          <Link
            href={`mailto:${profile.email}`}
            underline="none"
            sx={{
              display: 'inline-block',
              fontFamily: fonts.display,
              fontWeight: 500,
              fontStyle: 'italic',
              fontSize: 'clamp(1.45rem, 5.8vw, 3.4rem)',
              lineHeight: 1.15,
              color: palette.paper,
              overflowWrap: 'anywhere',
              borderBottom: '1px solid',
              borderColor: line.onInkStrong,
              transition: 'color .35s ease, border-color .35s ease',
              '&:hover': { color: palette.accentOnInk, borderColor: palette.accentOnInk },
            }}
          >
            {profile.email}
          </Link>
        </Box>
      </Reveal>

      <Reveal delay={0.3}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 2.5, sm: 6 }}
          sx={{ mt: { xs: 4.5, md: 7 }, pt: 4, borderTop: '1px solid', borderColor: line.onInk }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: alpha(palette.paper, 0.52), display: 'block', mb: 0.8 }}>
              {t('contact.callLabel')}
            </Typography>
            <Link href={`tel:${profile.phoneHref}`} underline="hover" sx={{ color: palette.paper, fontFamily: fonts.mono, fontSize: 15 }}>
              {profile.phone}
            </Link>
          </Box>
          <Box>
            <Typography variant="overline" sx={{ color: alpha(palette.paper, 0.52), display: 'block', mb: 0.8 }}>
              {t('contact.basedLabel')}
            </Typography>
            <Typography sx={{ color: palette.paper, fontFamily: fonts.mono, fontSize: 15 }}>{t('contact.location')}</Typography>
          </Box>
        </Stack>
      </Reveal>
    </Section>
  )
}
