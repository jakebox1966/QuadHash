'use client'

import { useTranslations } from 'next-intl'
import { locales } from '@/i18nconfig'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import * as React from 'react'

export interface INavbarProps {}

const localePrefix = 'always' // Default
const { Link } = createSharedPathnamesNavigation({ locales, localePrefix })
export default function Navbar(props: INavbarProps) {
    const t = useTranslations('Layout.header.nav_bar')
    const menuList = [
        'about',
        'collectable',
        'qh_token',
        'dynamicNFT',
        'fractionalInvest',
        'mypage',
    ]
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
