import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { palette, line, fonts, scale } from '../theme'

export interface CreditItem {
  title: string
  network: string
  kind: string
}

export default function CreditCard({ credit, compact = false }: { credit: CreditItem; compact?: boolean }) {
  return (
    <Box
      sx={{
        height: '100%',
        p: compact ? 2.5 : { xs: 2.5, md: 3.5 },
        bgcolor: palette.inkAlt,
        border: '1px solid',
        borderColor: line.onInk,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: compact ? 172 : { xs: 128, md: 200 },
        transition: 'border-color .4s ease, transform .4s cubic-bezier(.16,1,.3,1)',
        '@media (hover: hover)': {
          '&:hover': { borderColor: palette.accentOnInk, transform: 'translateY(-4px)' },
        },
      }}
    >
      <Typography variant="overline" sx={{ color: palette.accentOnInk }}>
        {credit.kind}
      </Typography>
      <Box sx={{ mt: { xs: 2, md: 3 } }}>
        <Typography
          component="h3"
          sx={{ fontFamily: fonts.display, fontWeight: 500, fontSize: scale.card, lineHeight: 1.12, color: palette.paper, m: 0 }}
        >
          {credit.title}
        </Typography>
        <Typography
          sx={{
            fontFamily: fonts.mono,
            fontSize: { xs: 11, md: 12 },
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: alpha(palette.paper, 0.6),
            mt: 1.2,
          }}
        >
          {credit.network}
        </Typography>
      </Box>
    </Box>
  )
}
