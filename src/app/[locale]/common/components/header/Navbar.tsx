'use client'

import { useTranslations } from 'next-intl'
import { locales } from '@/i18nconfig'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import * as React from 'react'
import { useSearchParams } from 'next/navigation'

export interface INavbarProps {}

const localePrefix = 'always' // Default
const { Link, usePathname } = createSharedPathnamesNavigation({ locales, localePrefix })
export default function Navbar(props: INavbarProps) {
    const pathname = usePathname()
    const params = useSearchParams()
    const queryString = params.get('callbackUrl')
    const t = useTranslations('Layout.header.nav_bar')
    const menuList = [
        'about',
        'saza_gaza',
        'collection',
        'qh_token',
        'dynamicNFT',
        'fractional_investment',
    ]
    return (
        <div className="relative flex items-center gap-[50px] text-[16px] mx-3">
            {menuList.map((menu) => (
                <Link
                    key={menu}
                    href={`/${menu}`}
                    className={`cursor-pointer text-nowrap hover:text-[#F46221] ${
                        (pathname.includes(menu) || queryString?.includes(menu)) && 'text-[#F46221]'
                    }`}>
                    {t(menu)}
                </Link>
            ))}
        </div>
    )
}
