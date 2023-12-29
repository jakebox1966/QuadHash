'use client'

import { Button, IconButton } from '@material-tailwind/react'
import * as React from 'react'
// import { AlertContext } from '@/app/provider/AlertProvider'
import { ConfirmContext } from '@/app/provider/ConfirmProvider'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import { locales } from '@/i18nconfig'
import { getCoin } from '@/app/api/alchemy/api'

export interface ICoinExchangeProps {}

const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)

export default function CoinExchange(props: ICoinExchangeProps) {
    const { useRouter } = createSharedPathnamesNavigation({ locales })
    // const { $alert } = React.useContext(AlertContext)
    const { $confirm } = React.useContext(ConfirmContext)
    const [coinAmount, setCoinAmount] = React.useState(0)

    const router = useRouter()
    const increaseCoin = () => {
        setCoinAmount((prevCount) => prevCount + 1)
    }

    const decreaseCoin = () => {
        if (coinAmount === 0) {
            return
        }
        setCoinAmount((prevCount) => prevCount - 1)
    }
    const buyCoin = async () => {
        if (await $confirm('구매하시겠습니까?')) {
            try {
                const response = await getCoin(coinAmount)
                console.log(response)
                if (response) {
                    router.push('/buy/success')
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <>
            <div className="border-4 flex flex-col justify-center items-center text-3xl rounded-2xl p-6 w-full">
                <div className="flex flex-row justify-center items-center gap-10">
                    <IconButton placeholder={undefined} onClick={increaseCoin}>
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
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </IconButton>

                    <img className="pb-3" src="/coin.svg" alt="coin" />

                    <IconButton placeholder={undefined} onClick={decreaseCoin}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                    </IconButton>
                </div>
                <div>{coinAmount} COIN</div>
            </div>
            <div className="py-4">
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
                        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                    />
                </svg>
            </div>
            <div className="border-4 flex flex-col justify-center items-center text-3xl rounded-2xl p-6 w-full">
                <img className="pb-3" src="/ethereum.svg" alt="ethereum" />
                <div>0ETH</div>
                <div className="text-lg">ETH balance</div>
            </div>
            <div>
                <Button className="px-20" onClick={buyCoin} placeholder={undefined}>
                    BUY
                </Button>
            </div>
        </>
    )
}
