'use client'

import { IconButton, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'

import ThemeSwitcher from './ThemeSwitcher'
import useLocaleNames from '@/app/hooks/useLocaleNames'
import { useLocale, useTranslations } from 'next-intl'
import { locales } from '@/i18nconfig'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { ILocale } from '@/app/interfaces/locale/interface'
import { useEffect, useRef } from 'react'
import { signOut } from 'next-auth/react'

export interface ISettingProps {}

export default function Setting(props: ISettingProps) {
    const localeNames = useLocaleNames()
    const t = useTranslations('Layout.header.locale_switcher')

    const { useRouter, usePathname } = createSharedPathnamesNavigation({ locales })
    const router = useRouter()

    const locale = useLocale()
    const pathName = usePathname()

    const switchLocale = (key: string | undefined) => {
        router.push(pathName, { locale: key as string | undefined })
    }

    const headerColorRef = useRef(null)

    const handleScroll = () => {
        if (window && window.scrollY > 80) {
            // console.log(123)

            headerColorRef.current.className = `dark:text-white text-black transition duration-700`
        } else {
            headerColorRef.current.className = 'dark:text-white text-white transition duration-700'
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll) //clean up
        }
    }, [])

    return (
        <>
            <div>
                <Menu dismiss={{ itemPress: false }} allowHover placement="bottom-end">
                    <MenuHandler>
                        <IconButton className="bg-white/20">
                            <i ref={headerColorRef}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </i>
                        </IconButton>
                    </MenuHandler>
                    <MenuList>
                        <MenuItem>My Profile</MenuItem>
                        <hr className="my-3" />
                        <MenuItem>
                            <ThemeSwitcher />
                        </MenuItem>
                        <Menu placement="right-start" allowHover offset={15}>
                            <MenuHandler className="flex items-center justify-between">
                                <MenuItem>{localeNames[locale as ILocale['locale']]}</MenuItem>
                            </MenuHandler>
                            <MenuList>
                                {locales.map((locale) => (
                                    <MenuItem key={locale} onClick={() => switchLocale(locale)}>
                                        {localeNames[locale]}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                        <hr className="my-3" />
                        <MenuItem
                            className="flex flex-row items-center justify-between"
                            onClick={() => signOut()}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                />
                            </svg>
                            <span>Sign Out</span>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </>
    )
}
