'use client'

import * as React from 'react'

import { Select, SelectItem } from '@nextui-org/react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react'
import { useLocale, useTranslations } from 'next-intl'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'
import { Key } from '@react-types/shared'
import useLocaleNames from '@/app/hooks/useLocaleNames'

export interface ILocaleSwitcherProps {}

export default function LocaleSwitcher(props: ILocaleSwitcherProps) {
    const localeNames = useLocaleNames()
    const t = useTranslations('Layout.header.locale_switcher')

    const { useRouter, usePathname } = createSharedPathnamesNavigation({ locales })
    const router = useRouter()

    const locale = useLocale()
    const pathName = usePathname()

    const switchLocale = (key: Key) => {
        router.push(pathName, { locale: key as string | undefined })
    }
    return (
        <>
            <div>
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="bordered">{t(locale)}</Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Action event example"
                        onAction={(key) => {
                            switchLocale(key)
                        }}>
                        {locales.map((locale) => (
                            <DropdownItem key={locale} value={locale}>
                                {localeNames[locale]}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
        </>
    )
}
