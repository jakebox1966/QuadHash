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
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Input,
    Popover,
    PopoverContent,
    PopoverHandler,
} from '@material-tailwind/react'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { useTranslations } from 'next-intl'
import { locales } from '@/i18nconfig'
import LocaleSwitcher from './LocaleSwitcher'

import mobileWhiteLogo from '/public/mobile_white_logo.png'
import mobileMenuIcon from '/public/mobile_menu_icon.png'
import logout from '/public/logout.png'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
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
export default function MobileNavMenu({
    profileNFT,
    open,
    setOpen,
    disconnect,
}: IMobileNavMenuProps) {
    const t = useTranslations('Layout.header.nav_bar')

    const { handleSignInModalOpen } = useSignInModal()
    const menuList = [
        'about',
        'collection',
        'saza_gaza',
        'qh_token',
        'dynamicNFT',
        'fractional_investment',
    ]

    const closeDrawer = () => setOpen(false)

    const { data: session } = useSession()
    const { wallet } = useMetaMask()
    const imageUrl = profileNFT?.image
    // console.log(profileNFT)

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
                        strokeWidth="2"
                        stroke="currentColor"
                        className="h-10 w-10">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>
                <div className="px-10 flex flex-col justify-center items-start gap-10 text-white font-black">
                    <div className="flex flex-row justify-start w-full">
                        <Image src={mobileWhiteLogo} alt={'mobile_white_logo'} />
                    </div>

                    {wallet.accounts[0] && session && (
                        <div className="flex flex-col justify-center items-start">
                            <div>
                                {imageUrl && (
                                    <Image
                                        src={imageUrl}
                                        width={77}
                                        height={77}
                                        alt="profile_image"
                                        className="rounded-full"
                                    />
                                )}
                            </div>
                            <div className="mt-5">{profileNFT?.name.split(':')[1].trim()}</div>
                            <div className="font-normal text-gray-300">
                                {formatAddress(wallet.accounts[0])}
                            </div>
                        </div>
                    )}

                    <Popover placement="bottom-end">
                        <PopoverHandler>
                            <div className="flex flex-row justify-center items-center gap-14 cursor-pointer">
                                Connect Wallet
                            </div>
                        </PopoverHandler>
                        <PopoverContent
                            className="z-[9999] flex flex-col justify-center items-center text-xl font-black text-black gap-7 p-0 overflow-hidden"
                            placeholder={undefined}>
                            <div>
                                <div className="text-center py-4">Connect to a wallet</div>
                                <div className="flex flex-col gap-2 w-full bg-[#FAFAFA] px-7 py-10 ">
                                    <div
                                        className="flex flex-row items-center justify-center border-2 py-2 px-10 gap-3 rounded-xl cursor-pointer hover:border-[#F46221]"
                                        onClick={handleSignInModalOpen}>
                                        <img
                                            src="https://docs.material-tailwind.com/icons/metamask.svg"
                                            alt="metamast"
                                            className="h-6 w-6"
                                        />
                                        <div>Metamask</div>
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    {menuList.map((item) => (
                        <Link
                            key={item}
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
                    {wallet.accounts[0] && session && (
                        <Button
                            className="bg-[#FFFFFF] font-medium text-xs text-[#F46221] py-3 px-4 rounded-lg flex flex-row items-center justify-center gap-3"
                            onClick={disconnect}
                            placeholder={undefined}>
                            <Image src={logout} alt={'logout_icon'} />
                            Logout
                        </Button>
                    )}
                </div>
            </Drawer>
        </ThemeProvider>
        // </React.Fragment>
    )
}
