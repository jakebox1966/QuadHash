// app/_hooks/useLocaleNames.ts

import { useTranslations } from 'next-intl'
import { locales } from '../../i18nconfig'
import { ILocale } from '../interfaces/locale/interface'
// Returns a localized map of locale names
// in the shape: { "en-US": "English", ... }
export default function useLocaleNames(): Record<ILocale['locale'], string> {
    const t = useTranslations('Layout.header.locale_switcher')

    return locales.reduce(
        (acc, locale) => {
            acc[locale] = t(locale) as string
            return acc
        },
        {} as Record<ILocale['locale'], string>,
    )
}
