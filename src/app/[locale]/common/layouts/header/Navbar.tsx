'use client'

import { useTranslations } from 'next-intl'
import { locales } from '@/i18nconfig'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import * as React from 'react'

export interface INavbarProps {}

export default function Navbar(props: INavbarProps) {
    const t = useTranslations('Layout.header.nav_bar')
    const { Link } = createSharedPathnamesNavigation({ locales })
    const menuList = ['about', 'buy', 'dynamicNFT', 'fractionalInvest', 'admin']
    return (
        <div className="relative flex items-center gap-12 pr-4 font-bold">
            {menuList.map((menu) => (
                <Link key={menu} href={`/${menu}`} className="cursor-pointer hover:opacity-40">
                    {t(menu)}
                </Link>
            ))}
        </div>
    )
}
