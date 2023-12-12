'use client'

import { getUuidByAccount, signUpUser } from '@/app/api/auth/api'
import { getAccounts, personalSign } from '@/app/api/wallet/api'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { Button } from '@material-tailwind/react'
import { locales } from '@/i18nconfig'
import { signIn } from 'next-auth/react'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'

import { redirect, useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'

export interface ISignInProps {}

export default function SignIn(props: ISignInProps) {
    const { useRouter } = createSharedPathnamesNavigation({ locales })
    const router = useRouter()
    const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask()
    const callbackUrlParams = useSearchParams()

    const callbackUrl = callbackUrlParams.get('callbackUrl')

    const connect = async () => {
        // 메타마스크가 설치안되어있으면 크롬 확장팩 메타마스크 설치페이지로 이동하게한다.
        if (!hasProvider) {
            window.open(
                'https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
                '_blank',
            )
            return
        }
        try {
            await connectMetaMask()

            const accounts = await getAccounts()

            //TODO 기존 프로세스는 회원가입 이력을 확인하는 로직이 들어가있지만, 새로운 로직에서는 필요가 없으므로 nonce값을 통해 처리하는 로직이 없어야한다.

            const result = await getUuidByAccount(accounts[0])

            if (result.status === 'NotFound') {
                const formData = new FormData()
                formData.append('wallet_address', accounts[0])

                const response = await signUpUser(formData)
            }

            const signature = await personalSign(accounts[0], result.eth_nonce)

            const signInResult = await signIn('Credentials', {
                wallet_address: accounts[0],
                wallet_signature: signature,
                redirect: true,
                callbackUrl: `${callbackUrl}`,
            })
        } catch (error) {
            throw new Error('Error occured.')
        }
    }
    return (
        <>
            <div className="min-h-[50%] w-full flex flex-col justify-center items-center">
                <div className="bg-white/60 dark:bg-gray-800 w-[60%] p-6 rounded-lg">
                    <div className="flex flex-col justify-center items-center ">
                        <div>Connect a Wallet</div>
                        <div>Choose which card you want to connect</div>
                    </div>

                    <div className="mb-6">
                        <Button
                            onClick={connect}
                            className="mt-3 flex flex-row items-center justify-center w-full gap-3 rounded-full">
                            <img
                                src="https://docs.material-tailwind.com/icons/metamask.svg"
                                alt="metamast"
                                className="h-6 w-6"
                            />
                            Connect with MetaMask
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
