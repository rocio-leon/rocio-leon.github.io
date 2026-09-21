import Box from '@mui/material/Box'
import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

interface SectionProps {
  id?: string
  children: ReactNode
  sx?: SxProps<Theme>
  labelledBy?: string
}

export default function Section({ id, children, sx, labelledBy }: SectionProps) {
  return (
    <Box
      id={id}
      component="section"
      aria-labelledby={labelledBy}
      sx={[
        {
          px: { xs: 2, sm: 3, md: 5, lg: 6 },
          py: { xs: 7, sm: 9, md: 13, lg: 15 },
          scrollMarginTop: { xs: 62, md: 74 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={{ maxWidth: 1240, mx: 'auto', width: '100%' }}>{children}</Box>
    </Box>
  )
}
