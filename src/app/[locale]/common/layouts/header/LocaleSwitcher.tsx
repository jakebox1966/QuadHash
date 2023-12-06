'use client'

import useLocaleNames from '@/app/hooks/useLocaleNames'
import { useLocale, useTranslations } from 'next-intl'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'
import * as React from 'react'
import {
    Button,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Option,
    Select,
} from '@material-tailwind/react'
import { ILocale } from '@/app/interfaces/locale/interface'

export interface ILocaleSwitcherProps {}

export default function LocaleSwitcher(props: ILocaleSwitcherProps) {
    const localeNames = useLocaleNames()
    const t = useTranslations('Layout.header.locale_switcher')

    const { useRouter, usePathname } = createSharedPathnamesNavigation({ locales })
    const router = useRouter()

    const locale = useLocale()
    const pathName = usePathname()

    const switchLocale = (key: string | undefined) => {
        router.push(pathName, { locale: key as string | undefined })
    }
    return (
        <>
            <Menu>
                <MenuHandler>
                    <Button
                        className="bg-gray-200 dark:bg-black text-black dark:text-white"
                        size="sm">
                        {localeNames[locale as ILocale['locale']]}
                    </Button>
                </MenuHandler>
                <MenuList>
                    {locales.map((locale) => (
                        <MenuItem key={locale} onClick={() => switchLocale(locale)}>
                            {localeNames[locale]}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </>
    )
}
