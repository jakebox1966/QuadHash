'use client'
import * as React from 'react'
import {
    Drawer,
    Button,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    ThemeProvider,
} from '@material-tailwind/react'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { useTranslations } from 'next-intl'
import { locales } from '@/i18nconfig'
import LocaleSwitcher from './LocaleSwitcher'

import mobileWhiteLogo from '/public/mobile_white_logo.png'
import mobileMenuIcon from '/public/mobile_menu_icon.png'
import logout from '/public/logout.png'
import Image from 'next/image'

export interface IMobileNavMenuProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const customTheme = {
    drawer: {
        defaultProps: {
            size: 2000,
            overlay: true,
            placement: 'left',
            overlayProps: undefined,
            className: '',
            dismiss: undefined,
            onClose: undefined,
            transition: {
                type: 'tween',
                duration: 0.3,
            },
        },
        styles: {
            base: {
                drawer: {
                    position: 'fixed',
                    zIndex: 'z-[9999]',
                    pointerEvents: 'pointer-events-auto',
                    backgroundColor: 'bg-none',
                    boxSizing: 'box-border',
                    width: '!w-full',
                    height: '!h-full',
                    boxShadow: 'shadow-2xl shadow-blue-gray-900/10',
                },
                overlay: {
                    position: 'absolute',
                    inset: 'inset-0',
                    width: 'w-full',
                    height: 'h-full',
                    pointerEvents: 'pointer-events-auto',
                    zIndex: 'z-[9995]',
                    backgroundColor: 'bg-black',
                    backgroundOpacity: 'bg-opacity-60',
                    backdropBlur: 'backdrop-blur-sm',
                },
            },
        },
    },
}

const { Link } = createSharedPathnamesNavigation({ locales })
export default function MobileNavMenu({ open, setOpen }: IMobileNavMenuProps) {
    const t = useTranslations('Layout.header.nav_bar')
    const menuList = [
        'about',
        'collectable',
        'saza_gaza',
        'qh_token',
        'dynamicNFT',
        'fractionalInvestment',
    ]

    const closeDrawer = () => setOpen(false)

    return (
        // <React.Fragment>

        <ThemeProvider value={customTheme}>
            <Drawer
                open={open}
                onClose={closeDrawer}
                placeholder={undefined}
                className="overflow-y-auto pb-10">
                <div
                    className="text-[#FFFFFF] px-3 pt-3 flex flex-row justify-end"
                    onClick={closeDrawer}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        className="h-10 w-10">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>
                <div className="px-10 flex flex-col justify-center items-start gap-10 text-white font-black">
                    <div className="flex flex-row justify-start w-full">
                        <Image src={mobileWhiteLogo} alt={'mobile_white_logo'} />
                    </div>
                    <div className="flex flex-row justify-center items-center gap-14">
                        {/* <Image src={mobileMenuIcon} alt={'mobile_menu_icon'} /> */}
                        Connect Wallet
                    </div>
                    {menuList.map((item) => (
                        <Link
                            href={item}
                            className="flex flex-row justify-center items-center gap-14">
                            {/* <Image src={mobileMenuIcon} alt={'mobile_menu_icon'} /> */}
                            {t(item)}
                        </Link>
                    ))}
                    <Link
                        href={'https://discord.gg/quadhash'}
                        target={'_blank'}
                        className="flex flex-row justify-center items-center gap-14">
                        {/* <Image src={mobileMenuIcon} alt={'mobile_menu_icon'} /> */}
                        DISCORD
                    </Link>
                    <Link
                        href={'https://twitter.com/QUADHASH'}
                        target={'_blank'}
                        className="flex flex-row justify-center items-center gap-14">
                        {/* <Image src={mobileMenuIcon} alt={'mobile_menu_icon'} /> */}
                        TWITTER
                    </Link>
                    <Link
                        href={'https://www.instagram.com/saza.gaza/'}
                        target={'_blank'}
                        className="flex flex-row justify-center items-center gap-14">
                        {/* <Image src={mobileMenuIcon} alt={'mobile_menu_icon'} /> */}
                        Saza&Gaza Instagram
                    </Link>

                    <div className="bg-[#FFFFFF] font-medium text-xs text-[#F46221] py-3 px-4 rounded-lg flex flex-row items-center justify-center gap-3">
                        <Image src={logout} alt={'logout_icon'} />
                        Logout
                    </div>
                </div>
            </Drawer>
        </ThemeProvider>
        // </React.Fragment>
    )
}
