'use client'
import { getUuidByAccount, signUpUser } from '@/app/api/auth/api'
import { getAccounts, getChainId, personalSign } from '@/app/api/wallet/api'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { formatAddress } from '@/app/utils/ethUtils'
import { Button } from '@material-tailwind/react'
import { signIn, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import SignInModal from './SignInModal'

export interface IConnectProps {}

export default function Connect(props: IConnectProps) {
    const headerColorRef = useRef(null)
    const { data: session } = useSession()
    const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask()
    const t = useTranslations('Layout.header.connect')
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen((cur) => !cur)

    const handleScroll = () => {
        if (window && window.scrollY > 80) {
            // console.log(123)
            headerColorRef.current.className = 'dark:text-white text-black transition duration-700'
        } else {
            headerColorRef.current.className = `dark:text-white text-white transition duration-700`
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll) //clean up
        }
    }, [])

    useEffect(() => {
        console.log('로그인', wallet)
    }, [wallet])

    const connect = async () => {
        try {
            await connectMetaMask()

            const accounts = await getAccounts()
            const hex_chain_id = await getChainId()
            console.log(hex_chain_id)

            //TODO 기존 프로세스는 회원가입 이력을 확인하는 로직이 들어가있지만, 새로운 로직에서는 필요가 없으므로 nonce값을 통해 처리하는 로직이 없어야한다.

            const chain_id = parseInt(hex_chain_id, 16)
            const result = await getUuidByAccount(accounts[0], chain_id)
            console.log(result)

            if (result.status === 'NotFound') {
                const formData = new FormData()
                formData.append('wallet_address', accounts[0])
                formData.append('chain_id', chain_id)
                const response = await signUpUser(formData)
                console.log(response)
            }

            const signature = await personalSign(accounts[0], result.eth_nonce)

            console.log(signature)
            signIn('Credentials', {
                eth_address: accounts[0],
                eth_signature: signature,
                chain_id: chain_id,
                redirect: false,
                callbackUrl: '/',
            })
        } catch (error) {
            throw new Error('Error occured.')
        }
    }

    return (
        <>
            {!hasProvider && (
                <Button className="bg-white/20">
                    <a ref={headerColorRef} href="https://metamask.io" target="_blank">
                        {t('install_metamask')}
                    </a>
                </Button>
            )}

            {(hasProvider && wallet.accounts.length < 1) ||
                (!session && (
                    <Button className="bg-white/20" disabled={isConnecting} onClick={connect}>
                        <span ref={headerColorRef}>{t('sign_in')}</span>
                    </Button>
                ))}

            {hasProvider && wallet.accounts.length > 0 && session && (
                <Button className="bg-white/20">
                    <a
                        ref={headerColorRef}
                        className="text_link tooltip-bottom"
                        href={`https://etherscan.io/address/${wallet.accounts[0]}`}
                        target="_blank"
                        data-tooltip="Open in Block Explorer">
                        {formatAddress(wallet.accounts[0])}
                    </a>
                </Button>
            )}

            {/* <SignInModal /> */}
        </>
    )
}
