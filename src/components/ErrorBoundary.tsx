import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  failed: boolean
}

/**
 * Last line of defence. A render crash in any section would otherwise leave a
 * blank white page with no way to contact Rocío — which is the one thing this
 * site exists to do. The fallback is deliberately dependency-free inline
 * markup, so it still renders if the theme or i18n layer is what broke.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // No analytics or error service is wired up, by design — no third-party
    // scripts, no cookie banner. The console is the only sink.
    console.error('Unhandled render error:', error, info.componentStack)
  }

  render() {
    if (!this.state.failed) return this.props.children

    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          background: '#FBFAF8',
          color: '#121214',
          fontFamily: "'Jost', system-ui, sans-serif",
          textAlign: 'center',
        }}
      >
        <main>
          <h1 style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 500, fontSize: 'clamp(2rem, 8vw, 3rem)', margin: 0 }}>
            Rocío León
          </h1>
          <p style={{ color: '#55555C', marginTop: 16 }}>
            Something went wrong loading this page.
          </p>
          <p style={{ marginTop: 24 }}>
            <a href="mailto:rrocioleonn@gmail.com" style={{ color: '#C43F1B' }}>
              rrocioleonn@gmail.com
            </a>
            <br />
            <a href="tel:+34625208458" style={{ color: '#C43F1B' }}>
              +34 625 208 458
            </a>
          </p>
          <p style={{ marginTop: 24 }}>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 24px',
                borderRadius: 99,
                border: 'none',
                background: '#121214',
                color: '#FBFAF8',
                font: 'inherit',
                letterSpacing: '0.08em',
                cursor: 'pointer',
              }}
            >
              Reload
            </button>
          </p>
        </main>
      </div>
    )
  }
}
