import Box from '@mui/material/Box'
import { useDocumentLanguage } from './i18n/useDocumentLanguage'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Credits from './components/Credits'
import Craft from './components/Craft'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SkipLink from './components/SkipLink'
import MobileActionBar from './components/MobileActionBar'

export default function App() {
  useDocumentLanguage()

  return (
    <Box sx={{ position: 'relative' }}>
      <SkipLink />
      <Nav />
      <Box component="main" id="main">
        <Hero />
        <About />
        <Work />
        <Credits />
        <Craft />
        <Contact />
      </Box>
      <Footer />
      <MobileActionBar />
    </Box>
  )
}
