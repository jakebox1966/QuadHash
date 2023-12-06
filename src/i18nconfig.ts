// i18nconfig.ts
// (Not to be confused with i18n.ts)

// Remember the Locale type is just a
// union: "en-US" | "ar-EG"

import { ILocale } from './app/interfaces/locale/interface'
export const defaultLocale: ILocale['locale'] = 'ko'

export const locales: ILocale['locale'][] = ['ko', 'en']

export const localeNames: Record<ILocale['locale'], string> = {
    ko: '한국어',
    en: 'English',
}
