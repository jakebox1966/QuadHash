'use client'

import { useMetaMask } from '@/app/hooks/useMetaMask'
import { formatAddress } from '@/app/utils/ethUtils'
import { Button } from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

import { useEffect, useRef, useState } from 'react'
import { SignInModal } from './SignInModal'
import { useSignInModal } from '@/app/hooks/useSignInModal'

export interface IConnectProps {}

export default function Connect(props: IConnectProps) {
    const headerColorRef = useRef<HTMLInputElement>(null)
    const { data: session } = useSession()

    const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask()
    const t = useTranslations('Layout.header.connect')
    const { handleSignInModalOpen } = useSignInModal()

    const handleScroll = () => {
        if (window && window.scrollY > 80) {
            headerColorRef.current!.className = 'text-black transition duration-700'
        } else {
            headerColorRef.current!.className = `text-white transition duration-700`
        }
    }
    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll)
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll) //clean up
    //     }
    // }, [])

    // useEffect(() => {
    //     console.log(session)
    // }, [session])

    return (
        <>
            {(hasProvider && wallet.accounts.length < 1) || !session ? (
                <Button
                    variant="text"
                    className="rounded-full bg-[#F46221] shadow-lg text-white"
                    disabled={isConnecting}
                    onClick={handleSignInModalOpen}
                    placeholder={undefined}>
                    <span ref={headerColorRef}>{t('sign_in')}</span>
                </Button>
            ) : (
                <Button
                    variant="text"
                    className="rounded-full bg-[#F46221] shadow-lg text-white"
                    disabled={isConnecting}
                    placeholder={undefined}>
                    <span ref={headerColorRef}>{formatAddress(wallet.accounts[0])}</span>
                </Button>
            )}
        </>
    )
}
