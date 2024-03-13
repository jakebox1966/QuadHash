'use client'

import { getUuidByAccount, signUpUser } from '@/app/api/auth/api'
import { getAccounts, personalSign } from '@/app/api/wallet/api'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { Button, MenuItem, Spinner, Typography } from '@material-tailwind/react'
import { locales } from '@/i18nconfig'
import { signIn } from 'next-auth/react'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'

import { useSearchParams } from 'next/navigation'
import * as React from 'react'
import { AlertContext } from '@/app/provider/AlertProvider'
import { formatBalance } from '@/app/utils/ethUtils'

export interface ISignInProps {}

interface WalletState {
    accounts: any[]
    balance: string
    chainId: string
}

const disconnectedState: WalletState = { accounts: [], balance: '', chainId: '' }

export default function SignIn(props: ISignInProps) {
    const { $alert } = React.useContext(AlertContext)
    const [isConnecting, setIsConnecting] = React.useState(false)
    const { wallet, hasProvider, connectMetaMask, setWallet, setPrevWallet } = useMetaMask()
    const callbackUrlParams = useSearchParams()

    const callbackUrl = callbackUrlParams.get('callbackUrl')

    const connect = async (walletType: string) => {
        if (walletType === 'metamask') {
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
                // await connectMetaMask()

                const accounts = await getAccounts()

                // //TODO 기존 프로세스는 회원가입 이력을 확인하는 로직이 들어가있지만, 새로운 로직에서는 필요가 없으므로 nonce값을 통해 처리하는 로직이 없어야한다.

                let result = await getUuidByAccount(accounts[0])
                // console.log('result', result)

                if (result.status === 'NotFound') {
                    const formData = new FormData()
                    formData.append('wallet_address', accounts[0])

                    const response = await signUpUser(formData)

                    result = await getUuidByAccount(accounts[0])
                }

                const signature = await personalSign(accounts[0], result.eth_nonce)

                // console.log('signature', signature)

                const signInResult = await signIn('Credentials', {
                    wallet_address: accounts[0],
                    wallet_signature: signature,
                    redirect: false,
                    // redirect: false,
                    // callbackUrl: callbackUrl,
                })

                if (accounts.length === 0) {
                    console.log('accounts', accounts)
                    // If there are no accounts, then the user is disconnected
                    setWallet(disconnectedState)
                    return
                }

                console.log('넘어옴')
                const balance = formatBalance(
                    await window.ethereum.request({
                        method: 'eth_getBalance',
                        params: [accounts[0], 'latest'],
                    }),
                )
                const chainId = await window.ethereum.request({
                    method: 'eth_chainId',
                })
                console.log('chainId', chainId)
                console.log('balance', balance)
                setWallet({ accounts, balance, chainId })
                setPrevWallet(accounts[0])

                console.log('signInResult', signInResult)
            } catch (error) {
                console.error(error)
                // throw new Error('Error occured.')
            }
            setIsConnecting(false)
        } else if ('konkrit') {
            await $alert('현재 서비스 준비중 입니다.')
            return
        }
    }
    return (
        <>
            <div className="min-h-[50%] w-full flex flex-col justify-center items-center mt-10 lg:mt-20">
                <div className="bg-white/60 w-full p-6 rounded-lg max-w-[700px]">
                    <div className="flex flex-col justify-center items-center w-full">
                        <img className="w-[60%] max-w-[335px]" src="/com_saza.png" alt="" />
                        <div className="font-black lg:text-4xl mt-5">Connect a Wallet</div>
                        <div className="font-medium text-xs lg:text-2xl text-gray-700 mt-3">
                            Choose a wallet to connect
                        </div>
                    </div>

                    {/* <div className="mb-6">
                        <Button
                            onClick={connect}
                            className="mt-3 flex flex-row items-center justify-center w-full gap-3 rounded-full"
                            placeholder={undefined}>
                            <img
                                src="https://docs.material-tailwind.com/icons/metamask.svg"
                                alt="metamast"
                                className="h-6 w-6"
                            />
                            Connect with MetaMask
                            {isConnecting && <Spinner className="h-6 w-6" />}
                        </Button>
                    </div> */}

                    <div className="w-full flex flex-col justify-center items-center">
                        <ul className="mt-10 -ml-2 flex flex-col w-full">
                            <MenuItem
                                className="mb-4 flex items-center justify-center gap-6 !py-4 shadow-md"
                                onClick={() => {
                                    connect('metamask')
                                }}
                                placeholder={undefined}>
                                <img
                                    src="https://docs.material-tailwind.com/icons/metamask.svg"
                                    alt="metamask"
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
                        <ul className="mt-3 -ml-2 flex flex-col w-full">
                            <MenuItem
                                className="mb-4 flex items-center justify-center gap-6 !py-4 shadow-md"
                                onClick={() => {
                                    connect('konkrit')
                                }}
                                placeholder={undefined}>
                                <img src="/konkrit.svg" alt="konkrit" className="h-6 w-6" />
                                <Typography
                                    className="uppercase"
                                    color="blue-gray"
                                    variant="h6"
                                    placeholder={undefined}>
                                    Connect with Konkrit
                                </Typography>
                                {/* {isConnecting && <Spinner className="h-6 w-6" />} */}
                            </MenuItem>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
