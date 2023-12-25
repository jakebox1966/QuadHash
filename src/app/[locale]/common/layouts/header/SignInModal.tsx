'use client'

import React, { useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Typography,
    MenuItem,
    Spinner,
} from '@material-tailwind/react'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { getAccounts, personalSign } from '@/app/api/wallet/api'
import { getUuidByAccount, signUpUser } from '@/app/api/auth/api'
import { useSearchParams } from 'next/navigation'

export interface ISignInModalProps {
    open: boolean
    handleOpen: () => void
}

export function SignInModal({ open, handleOpen }: ISignInModalProps) {
    const [isConnecting, setIsConnecting] = useState(false)
    const callbackUrlParams = useSearchParams()
    let callbackUrl = '/'

    if (callbackUrlParams.get('callbackUrl')) {
        callbackUrl = callbackUrlParams.get('callbackUrl')
    }
    const { wallet, hasProvider, connectMetaMask } = useMetaMask()

    // const router = useRouter()
    const t = useTranslations('Layout.header.connect')

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
            setIsConnecting(true)
            await connectMetaMask()

            const accounts = await getAccounts()

            //TODO 기존 프로세스는 회원가입 이력을 확인하는 로직이 들어가있지만, 새로운 로직에서는 필요가 없으므로 nonce값을 통해 처리하는 로직이 없어야한다.

            let result = await getUuidByAccount(accounts[0])

            if (result.status === 'NotFound') {
                const formData = new FormData()
                formData.append('wallet_address', accounts[0])

                const response = await signUpUser(formData)

                result = await getUuidByAccount(accounts[0])
            }

            const signature = await personalSign(accounts[0], result.eth_nonce)

            const signInResult = await signIn('Credentials', {
                wallet_address: accounts[0],
                wallet_signature: signature,
                redirect: true,
                // redirect: false,
                callbackUrl: callbackUrl,
            })
        } catch (error) {
            throw new Error('Error occured.')
        }
        setIsConnecting(false)
    }
    return (
        <>
            <Dialog size="xs" open={open} handler={handleOpen} placeholder={undefined}>
                <DialogHeader className="justify-between" placeholder={undefined}>
                    <div>
                        <Typography variant="h5" color="blue-gray" placeholder={undefined}>
                            Connect a Wallet
                        </Typography>
                        <Typography color="gray" variant="paragraph" placeholder={undefined}>
                            Choose which card you want to connect
                        </Typography>
                    </div>
                    <IconButton
                        color="blue-gray"
                        size="sm"
                        variant="text"
                        onClick={handleOpen}
                        placeholder={undefined}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-5 w-5">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </DialogHeader>
                <DialogBody className="!px-5" placeholder={undefined}>
                    <div className="mb-6">
                        <Typography
                            variant="paragraph"
                            color="blue-gray"
                            className="py-3 font-semibold uppercase opacity-70"
                            placeholder={undefined}>
                            Popular
                        </Typography>
                        <ul className="mt-3 -ml-2 flex flex-col">
                            <MenuItem
                                className="mb-4 flex items-center justify-center gap-6 !py-4 shadow-md"
                                onClick={connect}
                                placeholder={undefined}>
                                <img
                                    src="https://docs.material-tailwind.com/icons/metamask.svg"
                                    alt="metamast"
                                    className="h-6 w-6"
                                />
                                <Typography
                                    className="uppercase"
                                    color="blue-gray"
                                    variant="h6"
                                    placeholder={undefined}>
                                    Connect with MetaMask
                                </Typography>
                                {isConnecting && <Spinner className="h-6 w-6" />}
                            </MenuItem>
                        </ul>
                    </div>
                </DialogBody>
                <DialogFooter className="justify-between gap-2" placeholder={undefined}>
                    <Typography
                        variant="small"
                        color="gray"
                        className="font-normal"
                        placeholder={undefined}>
                        New to Ethereum wallets?
                    </Typography>
                    <Button variant="outlined" size="sm" placeholder={undefined}>
                        Learn More
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}
