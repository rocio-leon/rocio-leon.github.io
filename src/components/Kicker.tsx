import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { palette, fonts } from '../theme'

interface KickerProps {
  children: string
  /** Section number, e.g. "01". Rendered as a quiet editorial marker. */
  index?: string
  light?: boolean
}

export default function Kicker({ children, index, light = false }: KickerProps) {
  const accent = light ? palette.accentOnInk : palette.accent
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: { xs: 2, md: 3 } }}>
      {index ? (
        <Typography
          component="span"
          sx={{
            fontFamily: fonts.mono,
            fontSize: 11,
            letterSpacing: '0.18em',
            color: light ? alpha(palette.paper, 0.45) : alpha(palette.ink, 0.38),
          }}
        >
          {index}
        </Typography>
      ) : null}
      <Box sx={{ width: { xs: 22, md: 34 }, height: 2, bgcolor: accent }} />
      <Typography variant="overline" sx={{ color: accent }}>
        {children}
      </Typography>
    </Box>
  )
}
