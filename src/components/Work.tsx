import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { palette, line, fonts, scale } from '../theme'
import { useDevice } from '../hooks/useDevice'
import Reveal from './Reveal'
import Kicker from './Kicker'
import Section from './Section'

interface Role {
  period: string
  title: string
  org?: string
  note?: string
  bullets: string[]
}

function RoleBody({ role }: { role: Role }) {
  return (
    <Box>
      <Typography
        component="h3"
        sx={{ fontFamily: fonts.display, fontWeight: 500, fontSize: scale.entry, lineHeight: 1.15, color: palette.ink, m: 0 }}
      >
        {role.title}
      </Typography>

      {role.org ? (
        <Typography
          sx={{ fontFamily: fonts.mono, fontSize: { xs: 12, md: 13 }, letterSpacing: '0.08em', color: palette.accent, mt: 1 }}
        >
          {role.org}
        </Typography>
      ) : null}

      {role.note ? (
        <Typography sx={{ color: palette.muted, mt: 1.5, maxWidth: 680, fontSize: { xs: '0.95rem', md: '1rem' } }}>
          {role.note}
        </Typography>
      ) : null}

      {role.bullets.length > 0 ? (
        <Box component="ul" sx={{ m: 0, mt: 2, pl: 0, listStyle: 'none', display: 'grid', gap: 1 }}>
          {role.bullets.map((b, j) => (
            <Box
              key={j}
              component="li"
              sx={{
                display: 'flex',
                gap: 1.25,
                color: alpha(palette.ink, 0.74),
                fontSize: { xs: '0.93rem', md: '0.98rem' },
                lineHeight: 1.6,
              }}
            >
              <Box component="span" aria-hidden sx={{ color: palette.accent, mt: '1px', flexShrink: 0 }}>
                —
              </Box>
              {b}
            </Box>
          ))}
        </Box>
      ) : null}
    </Box>
  )
}

/**
 * Phones: a vertical rail with the date as a marker on it. A date column would
 * collapse to a lonely line of text above each title, so the shape changes
 * rather than just narrowing.
 */
function PhoneTimeline({ roles }: { roles: Role[] }) {
  return (
    <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, position: 'relative' }}>
      {roles.map((role, i) => (
        <Reveal key={i} delay={0.04 * i}>
          <Box
            component="li"
            sx={{
              position: 'relative',
              pl: 3,
              pb: 4,
              // The rail, drawn per item so it stops at the last one.
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 4,
                top: 14,
                bottom: 4,
                width: '1px',
                bgcolor: line.onPaperStrong,
              },
              '&:last-of-type': { pb: 0, '&::before': { display: 'none' } },
            }}
          >
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                left: 0,
                top: 5,
                width: 9,
                height: 9,
                borderRadius: '50%',
                bgcolor: palette.accent,
              }}
            />
            <Typography variant="overline" sx={{ color: palette.accent, display: 'block', mb: 1 }}>
              {role.period}
            </Typography>
            <RoleBody role={role} />
          </Box>
        </Reveal>
      ))}
    </Box>
  )
}

/** Tablet and up: a two-column ledger, dates ranged left against a rule. */
function LedgerTimeline({ roles }: { roles: Role[] }) {
  return (
    <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {roles.map((role, i) => (
        <Reveal key={i} delay={0.04 * i}>
          <Box
            component="li"
            sx={{
              display: 'grid',
              gridTemplateColumns: { sm: '140px minmax(0, 1fr)', md: '180px minmax(0, 1fr)' },
              gap: { sm: 3, md: 4, lg: 5 },
              py: { sm: 3.5, md: 4.5 },
              borderTop: '1px solid',
              borderColor: line.onPaper,
              transition: 'padding-left .45s cubic-bezier(.16,1,.3,1)',
              '@media (hover: hover)': { '&:hover': { pl: { md: 2 } } },
              '&:last-of-type': { borderBottom: '1px solid', borderColor: line.onPaper },
            }}
          >
            <Typography variant="overline" sx={{ color: palette.accent, pt: { md: 1 }, whiteSpace: 'nowrap' }}>
              {role.period}
            </Typography>
            <RoleBody role={role} />
          </Box>
        </Reveal>
      ))}
    </Box>
  )
}

export default function Work() {
  const { t } = useTranslation()
  const { isPhone } = useDevice()
  const roles = t('work.roles', { returnObjects: true })

  return (
    <Section id="work" labelledBy="work-title" sx={{ bgcolor: palette.paperAlt }}>
      <Reveal>
        <Kicker index="02">{t('work.kicker')}</Kicker>
      </Reveal>
      <Reveal delay={0.06}>
        <Typography
          id="work-title"
          variant="h2"
          sx={{ fontSize: scale.sectionTitle, color: palette.ink, mb: { xs: 4, md: 8 } }}
        >
          {t('work.title')}
        </Typography>
      </Reveal>

      {isPhone ? <PhoneTimeline roles={roles} /> : <LedgerTimeline roles={roles} />}
    </Section>
  )
}
