import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'

const MotionBox = motion.create(Box)

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  sx?: SxProps<Theme>
}

export default function Reveal({ children, delay = 0, y = 26, sx }: RevealProps) {
  const reduced = useReducedMotion()
  return (
    <MotionBox
      sx={sx}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -8% 0px' }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionBox>
  )
}
