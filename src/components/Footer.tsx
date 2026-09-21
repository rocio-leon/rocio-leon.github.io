import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { alpha } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { palette, fonts } from '../theme'
import { profile } from '../config'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: palette.ink,
        color: alpha(palette.paper, 0.55),
        px: { xs: 2, sm: 3, md: 5, lg: 6 },
        // Phones carry a fixed action bar over the bottom of the page.
        pb: {
          xs: 'calc(76px + env(safe-area-inset-bottom, 0px))',
          md: 'calc(28px + env(safe-area-inset-bottom, 0px))',
        },
        pt: 1,
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        sx={{
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          maxWidth: 1240,
          mx: 'auto',
        }}
      >
        <Typography sx={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: '0.06em' }}>
          © {new Date().getFullYear()} {profile.name}. {t('footer.rights')}
        </Typography>
        <Link
          href="#top"
          underline="hover"
          sx={{ color: alpha(palette.paper, 0.55), fontFamily: fonts.mono, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase' }}
        >
          ↑ {t('footer.toTop')}
        </Link>
      </Stack>
    </Box>
  )
}
