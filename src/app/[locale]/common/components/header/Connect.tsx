'use client'

import { useMetaMask } from '@/app/hooks/useMetaMask'
import { formatAddress } from '@/app/utils/ethUtils'
import {
    Button,
    Drawer,
    Popover,
    PopoverContent,
    PopoverHandler,
    ThemeProvider,
    Typography,
} from '@material-tailwind/react'
import { signOut, useSession } from 'next-auth/react'
import { useLocale, useTranslations } from 'next-intl'

import * as React from 'react'
import { SignInModal } from './SignInModal'
import { useSignInModal } from '@/app/hooks/useSignInModal'
import { ILocale } from '@/app/interfaces/locale/interface'
import { localeNames, locales } from '@/i18nconfig'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import useLocaleNames from '@/app/hooks/useLocaleNames'
import { drawerTheme } from '../../materialUI/theme'

import QhTokenModalComponent from './QhTokenModalComponent'
import MobileUserInterfaceComponent from './MobileUserInterfaceComponent'
import PCUserInterfaceComponent from './PCUserInterfaceComponent'
import { getQhTokenBalance } from '@/app/api/alchemy/api'
import { Utils } from 'alchemy-sdk'

export interface IConnectProps {
    profileNFT: any
}

const { Link, useRouter, usePathname } = createSharedPathnamesNavigation({ locales })
export default function Connect({ profileNFT }: IConnectProps) {
    const localeNames = useLocaleNames()
    const locale = useLocale()
    const router = useRouter()
    const headerColorRef = React.useRef<HTMLInputElement>(null)
    const { data: session } = useSession()
    const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask()
    const pathName = usePathname()
    const imageUrl = profileNFT?.image

    const t = useTranslations('Layout.header.connect')
    const { handleSignInModalOpen } = useSignInModal()

    const [qhTokenBalance, setQhTokenBalance] = React.useState(0)

    /**
     * Mobile User Interface Modal Control
     */
    const [isOpenMobileModal, setIsOpenMobileModal] = React.useState(false)
    const openMobileModal = () => setIsOpenMobileModal(true)
    const closeMobileModal = () => setIsOpenMobileModal(false)

    /**
     * PC User Interface Modal Control
     */
    const [isOpenPCModal, setIsOpenPCModal] = React.useState(false)
    const openPCModal = () => setIsOpenPCModal(true)
    const closePCModal = () => setIsOpenPCModal(false)

    /**
     * PC QH Token Interface Modal Control
     */
    const [isQhTokenModalOpen, setIsQhTokenModalOpen] = React.useState(false)
    const handleQhTokenModal = () => {
        setQhTokenModalTap('ticket')
        setIsQhTokenModalOpen(!isQhTokenModalOpen)
    }
    const [QhTokenModalTap, setQhTokenModalTap] = React.useState('ticket')
    const handleQhTokenModalTap = (value: string) => {
        setQhTokenModalTap(value)
    }

    const switchLocale = (key: string | undefined) => {
        router.push(pathName, { locale: key as string | undefined })
    }

    const moveToPage = (isLoginRequired: boolean, path: string) => {
        if (isLoginRequired && !session) {
            handleSignInModalOpen()
            return
        }
        router.push(`/${path}`)
    }

    const disconnect = async () => {
        await window.ethereum.request({
            method: 'wallet_revokePermissions',
            params: [
                {
                    eth_accounts: wallet.accounts[0],
                },
            ],
        })
        signOut({ redirect: true, callbackUrl: '/' })
    }

    React.useEffect(() => {
        if (session && wallet.accounts[0]) {
            getTokenBalance()
        }
    }, [wallet.accounts])

    const getTokenBalance = async () => {
        const response = await getQhTokenBalance(wallet.accounts[0])
        // console.log(response)
        // console.log(parseInt(response.tokenBalances[0].tokenBalance, 16) / 10 ** 18)
        setQhTokenBalance(parseInt(response.tokenBalances[0].tokenBalance, 16) / 10 ** 18)
    }

    return (
        <>
            {(hasProvider && wallet.accounts.length < 1) || !session ? (
                <button
                    className="rounded-full min-w-[100px] text-[10px] lg:text-[15px] lg:min-w-[167px] p-[7px] lg:p-[16px] bg-[#F46221] shadow-lg text-white"
                    disabled={isConnecting}
                    onClick={handleSignInModalOpen}>
                    Connect Wallet
                </button>
            ) : (
                <>
                    {/* PC 메뉴 */}
                    <PCUserInterfaceComponent
                        qhTokenBalance={qhTokenBalance}
                        isOpenPCModal={isOpenPCModal}
                        setIsOpenPCModal={setIsOpenPCModal}
                        openPCModal={openPCModal}
                        closePCModal={closePCModal}
                        isQhTokenModalOpen={isQhTokenModalOpen}
                        profileNFT={profileNFT}
                        handleQhTokenModal={handleQhTokenModal}
                        disconnect={disconnect}
                    />

                    {/* 모바일 메뉴 */}
                    <MobileUserInterfaceComponent
                        qhTokenBalance={qhTokenBalance}
                        openMobileModal={openMobileModal}
                        isQhTokenModalOpen={isQhTokenModalOpen}
                        isOpenMobileModal={isOpenMobileModal}
                        closeMobileModal={closeMobileModal}
                        profileNFT={profileNFT}
                        handleQhTokenModal={handleQhTokenModal}
                        disconnect={disconnect}
                    />

                    <QhTokenModalComponent
                        qhTokenBalance={qhTokenBalance}
                        isQhTokenModalOpen={isQhTokenModalOpen}
                        handleQhTokenModal={handleQhTokenModal}
                        QhTokenModalTap={QhTokenModalTap}
                        handleQhTokenModalTap={handleQhTokenModalTap}
                    />
                </>
            )}
        </>
    )
}
