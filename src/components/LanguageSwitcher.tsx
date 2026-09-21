import Button from '@mui/material/Button'
import { alpha } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { palette, fonts } from '../theme'
import { supportedLngs } from '../i18n'

interface Props {
  light?: boolean
  fullWidth?: boolean
}

export default function LanguageSwitcher({ light = false, fullWidth = false }: Props) {
  const { t, i18n } = useTranslation()
  const current = i18n.resolvedLanguage ?? i18n.language
  const next = supportedLngs.find((l) => l !== current) ?? 'en'
  const tone = light ? palette.paper : palette.accent

  return (
    <Button
      onClick={() => void i18n.changeLanguage(next)}
      lang={next}
      aria-label={t('meta.switchTo')}
      title={t('meta.switchTo')}
      fullWidth={fullWidth}
      sx={{
        minWidth: 0,
        px: 1.6,
        py: 0.55,
        border: '1px solid',
        borderColor: alpha(tone, 0.4),
        color: tone,
        fontFamily: fonts.mono,
        fontSize: 11.5,
        letterSpacing: '0.14em',
        lineHeight: 1.6,
        '&:hover': {
          bgcolor: tone,
          color: light ? palette.ink : palette.paper,
          borderColor: tone,
        },
      }}
    >
      {t('meta.switchLabel')}
    </Button>
  )
}
