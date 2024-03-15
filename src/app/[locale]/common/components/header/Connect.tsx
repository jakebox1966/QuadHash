'use client'

import { useMetaMask } from '@/app/hooks/useMetaMask'
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
import { Network, Utils } from 'alchemy-sdk'
import useBodyScrollLock from '@/app/hooks/useBodyScrollLock'
import { ConfirmContext } from '@/app/provider/ConfirmProvider'
import { AlertContext } from '@/app/provider/AlertProvider'

export interface IConnectProps {
    profileNFT: any
}

declare enum Networks {
    ETH_MAINNET = '0x1',
    ETH_SEPOLIA = '0xaa36a7',
}
const { Link, useRouter, usePathname } = createSharedPathnamesNavigation({ locales })
export default function Connect({ profileNFT }: IConnectProps) {
    const localeNames = useLocaleNames()
    const locale = useLocale()
    const router = useRouter()

    const { lockScroll, openScroll } = useBodyScrollLock()
    const headerColorRef = React.useRef<HTMLInputElement>(null)
    const { data: session } = useSession()
    const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask()
    const pathName = usePathname()
    const imageUrl = profileNFT?.image

    const t = useTranslations('Layout.header.connect')
    const { handleSignInModalOpen } = useSignInModal()

    const [qhTokenBalance, setQhTokenBalance] = React.useState(0)

    const [isMainNetwork, setIsMainNetwork] = React.useState(true)
    /**
     * Mobile User Interface Modal Control
     */
    const [isOpenMobileModal, setIsOpenMobileModal] = React.useState(false)
    const openMobileModal = () => setIsOpenMobileModal(true)
    const closeMobileModal = () => setIsOpenMobileModal(false)

    const { $alert } = React.useContext(AlertContext)
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
    const handleQhTokenModal = async () => {
        console.log(wallet)
        console.log(process.env.NEXT_PUBLIC_NETWORK)
        console.log(Networks[process.env.NEXT_PUBLIC_NETWORK])
        if (wallet.chainId !== Networks[process.env.NEXT_PUBLIC_NETWORK]) {
            await $alert('이더리움 네트워크로 연결해 주세요.')
            return
        }
        setQhTokenModalTap('ticket')
        setIsQhTokenModalOpen(!isQhTokenModalOpen)
    }
    const [QhTokenModalTap, setQhTokenModalTap] = React.useState('ticket')
    const handleQhTokenModalTap = async (value: string) => {
        setQhTokenModalTap(value)
    }

    React.useEffect(() => {
        if (isOpenMobileModal || isQhTokenModalOpen) {
            lockScroll()
            return
        }
        openScroll()
    }, [isOpenMobileModal, isQhTokenModalOpen])

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
            method: 'eth_requestAccounts',
            params: [{ eth_accounts: {} }],
        })
        signOut({ redirect: true, callbackUrl: '/' })
    }

    React.useEffect(() => {
        const getTokenBalance = async () => {
            const response = await getQhTokenBalance(wallet.accounts[0])

            setQhTokenBalance(parseInt(response.tokenBalances[0].tokenBalance, 16) / 10 ** 6)
        }
        if (session && wallet.accounts[0]) {
            getTokenBalance()
        }
    }, [wallet?.accounts[0], session])

    return (
        <>
            {(hasProvider && wallet?.accounts.length < 1) || !session ? (
                <button
                    className="rounded-full min-w-[110px] text-[10px] lg:text-[15px] lg:min-w-[170px] p-[7px] lg:p-[16px] bg-[#F46221] shadow-lg text-white"
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
