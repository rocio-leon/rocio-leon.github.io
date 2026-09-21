/** Language-independent facts. Everything translatable lives in src/i18n/locales. */
export const profile = {
  name: 'Rocío León',
  first: 'Rocío',
  last: 'León',
  email: 'rrocioleonn@gmail.com',
  phone: '+34 625 208 458',
  phoneHref: '+34625208458',
  portrait: '/rocio.png',
  /** wa.me wants the international number with no '+' or separators. */
  whatsapp: '34625208458',
} as const

/** Proficiency bar values pair positionally with craft.languages in the locales. */
export const languageLevels = [100, 96, 42] as const

export const sections = ['about', 'work', 'credits', 'contact'] as const
