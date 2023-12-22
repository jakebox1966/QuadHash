'use client'

import { IconButton, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'

import ThemeSwitcher from './ThemeSwitcher'
import useLocaleNames from '@/app/hooks/useLocaleNames'
import { useLocale, useTranslations } from 'next-intl'
import { locales } from '@/i18nconfig'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { ILocale } from '@/app/interfaces/locale/interface'
import { useEffect, useRef } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useSignInModal } from '@/app/hooks/useSignInModal'

export interface ISettingProps {}

export default function Setting(props: ISettingProps) {
    const { data: session } = useSession()
    const localeNames = useLocaleNames()
    const t = useTranslations('Layout.header.locale_switcher')
    const { Link, useRouter, usePathname } = createSharedPathnamesNavigation({ locales })
    const router = useRouter()
    const locale = useLocale()
    const pathName = usePathname()
    const { handleSignInModalOpen } = useSignInModal()
    const headerColorRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll) //clean up
        }
    }, [])

    const switchLocale = (key: string | undefined) => {
        router.push(pathName, { locale: key as string | undefined })
    }

    const handleScroll = () => {
        if (window && window.scrollY > 80) {
            headerColorRef.current!.className = `dark:text-white text-black transition duration-700`
        } else {
            headerColorRef.current!.className = 'dark:text-white text-white transition duration-700'
        }
    }

    const myProfile = () => {
        if (!session) {
            handleSignInModalOpen()
        }
    }

    return (
        <>
            {/* <div> */}
            <Menu dismiss={{ itemPress: false }} allowHover placement="bottom-end">
                <MenuHandler>
                    <IconButton variant="outlined">
                        <i ref={headerColorRef}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-black dark:text-white">
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
                <MenuList className="p-5 min-w-[300px] dark:bg-gray-800 dark:border-gray-800 dark:text-white">
                    <Link href="/user">
                        <MenuItem
                            className="flex flex-row items-center justify-between"
                            onClick={myProfile}>
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
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                />
                            </svg>
                            My Profile
                        </MenuItem>
                    </Link>
                    <Link href="/report">
                        <MenuItem className="flex flex-row items-center justify-between">
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
                                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                                />
                            </svg>
                            해킹신고센터
                        </MenuItem>
                    </Link>
                    <hr className="my-3" />
                    <MenuItem className="flex flex-row items-center justify-between">
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
                                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                            />
                        </svg>
                        <ThemeSwitcher />
                        Dark Mode
                    </MenuItem>
                    <Menu placement="right-start" allowHover offset={15}>
                        <MenuHandler className="flex items-center justify-between">
                            <MenuItem>
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
                                        d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
                                    />
                                </svg>
                                {localeNames[locale as ILocale['locale']]}
                            </MenuItem>
                        </MenuHandler>
                        <MenuList>
                            {locales.map((locale) => (
                                <MenuItem key={locale} onClick={() => switchLocale(locale)}>
                                    {localeNames[locale]}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    {session && (
                        <>
                            <hr className="my-3" />
                            <MenuItem
                                className="flex flex-row items-center justify-between"
                                onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
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
                        </>
                    )}
                </MenuList>
            </Menu>
            {/* </div> */}
        </>
    )
}
