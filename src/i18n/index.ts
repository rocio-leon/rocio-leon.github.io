import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import es from './locales/es.json'

export const supportedLngs = ['en', 'es'] as const
export type AppLanguage = (typeof supportedLngs)[number]

export const defaultNS = 'translation'
export const resources = { en: { translation: en }, es: { translation: es } } as const

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    fallbackLng: 'en',
    supportedLngs: [...supportedLngs],
    // Treat es-ES / es-419 etc. as "es" rather than falling back to English.
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    detection: {
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'rl-lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
    returnNull: false,
  })

export default i18n
