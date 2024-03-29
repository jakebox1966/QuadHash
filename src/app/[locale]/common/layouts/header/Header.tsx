'use client'

import Logo from '../../components/header/Logo'
import React, { useState } from 'react'
import Navbar from '@/app/[locale]/common/components/header/Navbar'
import Setting from '@/app/[locale]/common/components/header/Setting'
import Connect from '@/app/[locale]/common/components/header/Connect'
import { useEffect, useRef } from 'react'
import { SignInModal } from '../../components/header/SignInModal'
import { useSignInModal } from '@/app/hooks/useSignInModal'
import MobileNavMenu from '../../components/header/MobileNavMenu'
import useBodyScrollLock from '@/app/hooks/useBodyScrollLock'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'

import mobileLogo from '/public/mobile_logo.png'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { getMetadata } from '@/app/api/dynamicNFT/api'

export interface IHeaderProps {}
const { usePathname, Link } = createSharedPathnamesNavigation({ locales })

export default function Header(props: IHeaderProps) {
    const headerColorRef = useRef<HTMLInputElement>(null)

    const pathName = usePathname()

    const { data: session } = useSession()
    const { wallet } = useMetaMask()

    const [profileNFT, setProfileNFT] = React.useState(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState<boolean>(false)
    const { signInModalopen, handleSignInModalOpen } = useSignInModal()
    const { lockScroll, openScroll } = useBodyScrollLock()

    const handleScroll = () => {
        if (window && window.scrollY > 80) {
            headerColorRef.current!.className = `sticky top-0 w-full z-50 h-[70px] bg-white text-black transition duration-700`
        } else {
            headerColorRef.current!.className =
                'sticky top-0 w-full z-50 h-[70px] text-white transition duration-700'
        }
    }

    const handleResize = () => {
        if (window && window.innerWidth > 1024) {
            setIsMobileMenuOpen(false)
        }
    }
    const handleOpen = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    useEffect(() => {
        if (isMobileMenuOpen) {
            lockScroll()
            return
        }
        openScroll()
    }, [isMobileMenuOpen])

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    React.useEffect(() => {
        init()
    }, [session])

    const init = async () => {
        // console.log('start init')
        // if (wallet.accounts[0]) {
        if (session?.user?.token_type && session?.user?.token_id) {
            let NFTType = session?.user.token_type
            let tokenId = session?.user.token_id

            let metadata = null
            if (tokenId && NFTType) {
                if (NFTType === 'saza') {
                    metadata = await getMetadata({ nftType: NFTType, tokenId: tokenId })
                    setProfileNFT(metadata)
                } else if (NFTType === 'gaza') {
                    metadata = await getMetadata({ nftType: NFTType, tokenId: tokenId })
                    setProfileNFT(metadata)
                } else if (NFTType === 'reset') {
                    setProfileNFT(null)
                }
            }
        }
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

    return (
        <>
            <header
                className={`${
                    pathName === '/' || pathName === '/about' || pathName === '/saza_gaza'
                        ? 'bg-[#FFCD19]'
                        : 'bg-[#FFFFFF]'
                } flex flex-row  lg:justify-center sticky top-0 items-center w-full z-50 h-[78px] lg:h-[140px] px-5 lg:px-0`}>
                <div className="lg:hidden flex flex-row justify-between w-full">
                    <div className=" cursor-pointer w-full rounded-full flex flex-row gap-2 items-center">
                        <div onClick={handleOpen}>
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
                                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                                />
                            </svg>
                        </div>
                        <Link href={'/'}>
                            <Image src={mobileLogo} alt={'mobile_logo'} width={28} height={28} />
                        </Link>
                        <div className="w-full flex flex-row justify-end">
                            <Connect profileNFT={profileNFT} />
                        </div>
                    </div>
                </div>

                <div className="hidden lg:flex lg:flex-row justify-between items-center max-w-[1400px] w-full px-[50px]">
                    <div className="w-full flex flex-row justify-between items-center max-w-[1300px]">
                        <Logo />
                        <Navbar />
                        <Connect profileNFT={profileNFT} />
                    </div>
                </div>
            </header>
            <MobileNavMenu
                disconnect={disconnect}
                profileNFT={profileNFT}
                open={isMobileMenuOpen}
                setOpen={setIsMobileMenuOpen}
            />

            <SignInModal open={signInModalopen} handleOpen={handleSignInModalOpen} />
        </>
    )
}
