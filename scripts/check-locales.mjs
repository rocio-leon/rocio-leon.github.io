/**
 * Validates the translation files. Runs as part of `npm run build`, so a
 * broken or half-finished translation cannot reach production.
 *
 * Checks:
 *   1. Both locales have exactly the same key structure and array lengths.
 *   2. No empty or whitespace-only strings.
 *   3. No stray double spaces, or leading/trailing whitespace.
 *   4. Interpolation placeholders ({{name}}) match between locales.
 *   5. Strings that are identical in both locales are either proper nouns or
 *      explicitly allowed — anything else is probably untranslated.
 *   6. Spanish conjunction euphony: "y"/"e" and "o"/"u".
 *
 * Run: npm run check:locales
 */
import { readFileSync } from 'node:fs'

const read = (lng) => JSON.parse(readFileSync(new URL(`../src/i18n/locales/${lng}.json`, import.meta.url), 'utf8'))
const en = read('en')
const es = read('es')

const problems = []
const fail = (where, message) => problems.push(`${where}\n    ${message}`)

/* ---------------------------------------------------------------- structure */

function compare(a, b, path = '') {
  const at = Array.isArray(a) ? 'array' : typeof a
  const bt = Array.isArray(b) ? 'array' : typeof b

  if (at !== bt) return fail(path, `type differs: en is ${at}, es is ${bt}`)

  if (at === 'array') {
    if (a.length !== b.length) return fail(path, `array length differs: en has ${a.length}, es has ${b.length}`)
    a.forEach((v, i) => compare(v, b[i], `${path}[${i}]`))
    return
  }

  if (at === 'object') {
    const ak = Object.keys(a)
    const bk = Object.keys(b)
    for (const k of ak) if (!bk.includes(k)) fail(path || '(root)', `key "${k}" is missing from es`)
    for (const k of bk) if (!ak.includes(k)) fail(path || '(root)', `key "${k}" is missing from en`)
    for (const k of ak) if (bk.includes(k)) compare(a[k], b[k], path ? `${path}.${k}` : k)
  }
}

compare(en, es)

/* ------------------------------------------------------------------ strings */

/** Strings that are legitimately the same in both languages. */
const SAME_IN_BOTH = new Set([
  'meta.switchLabel', 'meta.langName',
  'contact.whatsappLabel', 'contact.emailLabel',
  'hero.tags[3]', // Actriz / Actress differ, but the check is per-locale value
])

/** Prefixes whose values are proper nouns, titles or trade names. */
const PROPER_NOUN_PREFIXES = [
  'credits.items', // film and play titles, broadcasters
  'about.school', // RESAD's registered name
  'work.roles[2].org', // broadcaster list
  'work.roles[1].org', // show name
  'marquee.words', // deliberately bilingual
  'hero.location', 'contact.location',
]

function eachString(obj, visit, path = '') {
  if (typeof obj === 'string') return visit(path, obj)
  if (Array.isArray(obj)) return obj.forEach((v, i) => eachString(v, visit, `${path}[${i}]`))
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) eachString(v, visit, path ? `${path}.${k}` : k)
  }
}

const placeholders = (s) => (s.match(/\{\{[^}]+\}\}/g) ?? []).sort().join(',')

for (const [lng, data] of [['en', en], ['es', es]]) {
  eachString(data, (path, value) => {
    if (value.trim() === '') fail(`${lng} ${path}`, 'empty string')
    if (value !== value.trim()) fail(`${lng} ${path}`, 'leading or trailing whitespace')
    if (/ {2}/.test(value)) fail(`${lng} ${path}`, 'double space')
  })
}

eachString(en, (path, value) => {
  const esValue = path.split(/[.[\]]/).filter(Boolean).reduce((o, k) => o?.[k], es)
  if (typeof esValue !== 'string') return

  if (placeholders(value) !== placeholders(esValue)) {
    fail(path, `interpolation placeholders differ: en "${placeholders(value)}" vs es "${placeholders(esValue)}"`)
  }

  const exempt = SAME_IN_BOTH.has(path) || PROPER_NOUN_PREFIXES.some((p) => path.startsWith(p))
  if (!exempt && value === esValue && value.length > 3) {
    fail(path, `identical in both locales — untranslated? "${value}"`)
  }
})

/* --------------------------------------------------- Spanish conjunctions */

/**
 * "y" becomes "e" before a word whose SOUND starts with /i/, and "o" becomes
 * "u" before a word whose sound starts with /o/.
 *
 * The rule is about pronunciation, not spelling, which is why these two lists
 * exist:
 *   - hie-/hia- words (hielo, hierro) keep "y": the sound is /je/, not /i/.
 *   - Foreign words spelled with i- but pronounced otherwise keep "y" too.
 *     "Ice-Cream" is /ais/ — it opens on /a/, so "y Ice-Cream" is correct.
 */
const SOUNDS_LIKE_I = /^(i|hi(?![ae]))/i
const SPELLED_I_BUT_NOT_PRONOUNCED_I = [/^ice\b/i, /^iowa\b/i]
const SOUNDS_LIKE_O = /^(o|ho)/i

const startsWithISound = (word) =>
  SOUNDS_LIKE_I.test(word) && !SPELLED_I_BUT_NOT_PRONOUNCED_I.some((re) => re.test(word))

eachString(es, (path, value) => {
  for (const [, next] of value.matchAll(/\by\s+([\wÁÉÍÓÚÜÑáéíóúüñ-]+)/gi)) {
    if (startsWithISound(next)) fail(`es ${path}`, `"y ${next}" should be "e ${next}" — the next sound is /i/`)
  }
  for (const [, next] of value.matchAll(/\be\s+([\wÁÉÍÓÚÜÑáéíóúüñ-]+)/gi)) {
    if (!startsWithISound(next)) fail(`es ${path}`, `"e ${next}" should be "y ${next}" — the next sound is not /i/`)
  }
  for (const [, next] of value.matchAll(/\bo\s+([\wÁÉÍÓÚÜÑáéíóúüñ-]+)/gi)) {
    if (SOUNDS_LIKE_O.test(next)) fail(`es ${path}`, `"o ${next}" should be "u ${next}" — the next sound is /o/`)
  }
})

/* ------------------------------------------------------------------ report */

if (problems.length > 0) {
  console.error(`\n✗ ${problems.length} locale problem(s):\n`)
  for (const p of problems) console.error(`  ${p}\n`)
  process.exit(1)
}

let count = 0
eachString(en, () => (count += 1))
console.log(`✓ locales valid — ${count} keys, en + es in sync`)
