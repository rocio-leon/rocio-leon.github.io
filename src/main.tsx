import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { I18nextProvider } from 'react-i18next'
import { theme } from './theme'
import i18n from './i18n'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </I18nextProvider>
    </ThemeProvider>
  </StrictMode>,
)
