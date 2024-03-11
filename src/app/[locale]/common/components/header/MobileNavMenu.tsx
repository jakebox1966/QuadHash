'use client'
import * as React from 'react'
import {
    Drawer,
    Button,
    ThemeProvider,
    PopoverHandler,
    Popover,
    PopoverContent,
} from '@material-tailwind/react'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { useTranslations } from 'next-intl'
import { locales } from '@/i18nconfig'

import mobileWhiteLogo from '/public/mobile_white_logo.png'

import logout from '/public/logout.png'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { formatAddress } from '@/app/utils/ethUtils'
import { useSignInModal } from '@/app/hooks/useSignInModal'

export interface IMobileNavMenuProps {
    profileNFT: any
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    disconnect: () => Promise<void>
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
                    width: '!w-screen',
                    height: '!h-screen',
                    boxShadow: 'shadow-2xl shadow-blue-gray-900/10',
                },
                overlay: {
                    position: 'fixed',
                    inset: 'inset-0',
                    width: 'w-screen',
                    height: 'h-screen',
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
export default function MobileNavMenu({
    profileNFT,
    open,
    setOpen,
    disconnect,
}: IMobileNavMenuProps) {
    const t = useTranslations('Layout.header.nav_bar')

    const { handleSignInModalOpen } = useSignInModal()
    const menuList = ['about', 'saza_gaza', 'collectables', 'dynamicNFT', 'NFTDividr']
    const closeDrawer = () => setOpen(false)

    const { data: session } = useSession()
    const { wallet } = useMetaMask()
    const imageUrl = profileNFT?.image

    return (
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
                        strokeWidth="2"
                        stroke="currentColor"
                        className="h-10 w-10 hover:opacity-65 cursor-pointer">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>
                <div className="px-10 flex flex-col justify-center items-start gap-10 text-white font-black">
                    <Link
                        href={'/'}
                        className="flex flex-row justify-start w-full transition-all hover:opacity-65 active:opacity-65">
                        <Image src={mobileWhiteLogo} alt={'mobile_white_logo'} />
                    </Link>

                    {menuList.map((item) => (
                        <Link
                            key={item}
                            href={`/${item}`}
                            className="flex flex-row justify-center items-center gap-14 transition-all hover:opacity-65 active:opacity-65">
                            {/* <Image src={mobileMenuIcon} alt={'mobile_menu_icon'} /> */}
                            {t(item)}
                        </Link>
                    ))}
                </div>
            </Drawer>
        </ThemeProvider>
    )
}
