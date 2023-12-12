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
            headerColorRef.current!.className = 'dark:text-white text-black transition duration-700'
        } else {
            headerColorRef.current!.className = `dark:text-white text-white transition duration-700`
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
            {(hasProvider && wallet.accounts.length < 1) || !session ? (
                <Button
                    className="bg-white/20"
                    disabled={isConnecting}
                    onClick={handleSignInModalOpen}>
                    <span ref={headerColorRef}>{t('sign_in')}</span>
                </Button>
            ) : (
                <Button className="bg-white/20" disabled={isConnecting}>
                    <span ref={headerColorRef}>{formatAddress(wallet.accounts[0])}</span>
                </Button>
            )}
        </>
    )
}