import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/MenuRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'
import { alpha } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { palette, line, fonts } from '../theme'
import { profile, sections } from '../config'
import LanguageSwitcher from './LanguageSwitcher'
import { useWhatsAppHref } from '../useWhatsApp'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

export default function Nav() {
  const { t } = useTranslation()
  const whatsapp = useWhatsAppHref()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLink = {
    fontFamily: fonts.mono,
    fontSize: 12.5,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    color: palette.ink,
    position: 'relative' as const,
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: -5,
      height: '1px',
      width: '100%',
      bgcolor: palette.accent,
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      transition: 'transform .35s cubic-bezier(.16,1,.3,1)',
    },
    '&:hover::after': { transform: 'scaleX(1)' },
  }

  return (
    <>
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          pt: 'env(safe-area-inset-top, 0px)',
          transition: 'background-color .4s ease, border-color .4s ease',
          // Opaque rather than translucent: the blur picked up the ember strip
          // beneath it and tinted the whole bar pink.
          backgroundColor: solid ? palette.paper : 'transparent',
          borderBottom: '1px solid',
          borderColor: solid ? line.onPaper : 'transparent',
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            px: { xs: 2, sm: 3, md: 5, lg: 6 },
            height: { xs: 62, md: 74 },
          }}
        >
          <Link
            href="#top"
            underline="none"
            sx={{
              color: palette.ink,
              fontFamily: fonts.display,
              fontWeight: 500,
              fontSize: { xs: 21, md: 25 },
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            {profile.name}
          </Link>

          <Stack direction="row" spacing={{ md: 2.5, lg: 3.5 }} sx={{ alignItems: 'center' }}>
            <Stack direction="row" spacing={{ md: 2.5, lg: 3.5 }} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {sections.map((id) => (
                <Link key={id} href={`#${id}`} underline="none" sx={navLink}>
                  {t(`nav.${id}` as const)}
                </Link>
              ))}
            </Stack>

            <LanguageSwitcher />

            <Button
              href={`mailto:${profile.email}`}
              variant="contained"
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                fontSize: 12,
                py: 0.9,
                '&:hover': { bgcolor: palette.accent },
              }}
            >
              {t('nav.contact')}
            </Button>

            <IconButton
              onClick={() => setOpen(true)}
              aria-label={t('nav.openMenu')}
              sx={{ display: { xs: 'inline-flex', md: 'none' }, color: palette.ink, mr: -1 }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: { xs: '86vw', sm: 360 },
              maxWidth: 420,
              bgcolor: palette.ink,
              color: palette.paper,
              backgroundImage: 'none',
              px: 3,
              pt: 'calc(18px + env(safe-area-inset-top, 0px))',
              pb: 'calc(28px + env(safe-area-inset-bottom, 0px))',
            },
          },
        }}
      >
        <Stack sx={{ height: '100%' }}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
            <Typography sx={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 22 }}>{profile.name}</Typography>
            <IconButton onClick={() => setOpen(false)} aria-label={t('nav.closeMenu')} sx={{ color: palette.paper, mr: -1 }}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack component="nav" spacing={0.5}>
            {sections.map((id) => (
              <Link
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                underline="none"
                sx={{
                  color: palette.paper,
                  fontFamily: fonts.display,
                  fontWeight: 500,
                  fontSize: { xs: '2rem', sm: '2.3rem' },
                  lineHeight: 1.35,
                  '&:active': { opacity: 0.7 },
                }}
              >
                {t(`nav.${id}` as const)}
              </Link>
            ))}
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          <Stack spacing={2.5} sx={{ pt: 4, borderTop: '1px solid', borderColor: line.onInk }}>
            <Link
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{
                color: palette.paper,
                fontFamily: fonts.mono,
                fontSize: 14,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <WhatsAppIcon sx={{ fontSize: 18 }} />
              {t('contact.whatsappLabel')}
            </Link>
            <Link
              href={`mailto:${profile.email}`}
              underline="hover"
              sx={{ color: palette.paper, fontFamily: fonts.mono, fontSize: 14, wordBreak: 'break-all' }}
            >
              {profile.email}
            </Link>
            <Link
              href={`tel:${profile.phoneHref}`}
              underline="hover"
              sx={{ color: alpha(palette.paper, 0.8), fontFamily: fonts.mono, fontSize: 14 }}
            >
              {profile.phone}
            </Link>
            <Box>
              <Typography variant="overline" sx={{ color: alpha(palette.paper, 0.6), display: 'block', mb: 1 }}>
                {t('nav.language')}
              </Typography>
              <Box sx={{ display: 'inline-flex' }}>
                <LanguageSwitcher light />
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Drawer>
    </>
  )
}
