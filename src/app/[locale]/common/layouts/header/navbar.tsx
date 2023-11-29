'use client'

// import Link from 'next/link'

import * as React from 'react'
import { locales } from '@/i18nconfig'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { useTranslations } from 'next-intl'

export interface INavBarProps {}

export default function NavBar(props: INavBarProps) {
    const t = useTranslations('Layout.header.nav_bar')
    const { Link, useRouter, usePathname } = createSharedPathnamesNavigation({ locales })

    const menus = ['about', 'gallery', 'crew', 'buy', 'sns']

    return (
        <>
            <nav className="flex-2">
                <div className="flex flex-row justify-center items-center gap-10">
                    {menus.map((menu) => (
                        <Link key={menu} href={`${menu}`}>
                            {t(`${menu}`)}
                        </Link>
                    ))}
                </div>
            </nav>
        </>
    )
}
