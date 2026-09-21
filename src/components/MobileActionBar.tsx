import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import MailIcon from '@mui/icons-material/MailOutlineRounded'
import { useTranslation } from 'react-i18next'
import { palette, line, fonts } from '../theme'
import { profile } from '../config'
import { useDevice } from '../hooks/useDevice'
import { useWhatsAppHref } from '../useWhatsApp'

/**
 * Touch-only: a thumb-reachable action bar that appears once the hero (which
 * already carries these actions) has scrolled away. Pointer devices never see
 * it — there the header CTA is always in reach.
 */
export default function MobileActionBar() {
  const { t } = useTranslation()
  const { isPhone, isTouch } = useDevice()
  const whatsapp = useWhatsAppHref()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return
    const observer = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting), { threshold: 0 })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  if (!isPhone && !isTouch) return null

  const item = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    // 48px minimum target on touch.
    minHeight: 48,
    fontFamily: fonts.mono,
    fontSize: 13,
    letterSpacing: '0.06em',
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1150,
        display: 'flex',
        bgcolor: palette.ink,
        borderTop: '1px solid',
        borderColor: line.onInk,
        pb: 'env(safe-area-inset-bottom, 0px)',
        transform: shown ? 'translateY(0)' : 'translateY(110%)',
        transition: 'transform .45s cubic-bezier(.16,1,.3,1)',
      }}
    >
      <Link
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
        sx={{ ...item, bgcolor: palette.accent, color: palette.paper }}
      >
        <WhatsAppIcon sx={{ fontSize: 19 }} />
        {t('contact.whatsappLabel')}
      </Link>
      <Link href={`mailto:${profile.email}`} underline="none" sx={{ ...item, color: palette.paper }}>
        <MailIcon sx={{ fontSize: 19 }} />
        {t('contact.emailLabel')}
      </Link>
    </Box>
  )
}
