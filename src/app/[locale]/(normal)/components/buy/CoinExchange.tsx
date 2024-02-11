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
                // console.log(response)
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
            <div className="flex flex-col border-4 rounded-xl">
                <div className="flex flex-col lg:flex-row justify-center text-3xl w-full font-black">
                    <div className="w-full hidden lg:block lg:flex-[1_1_40%] text-center">
                        <img src="/qh_token.png" alt="" className="w-full" />
                    </div>
                    <div className="w-full text-xs lg:flex-[1_1_60%] flex flex-col justify-between items-center gap-10 p-2 lg:p-6">
                        <div className="w-full flex flex-col gap-4">
                            <div className="flex flex-row justify-between items-center text-sm lg:text-xl">
                                <div>Select Quantity :</div>
                                <div className="flex flex-row justify-center items-center gap-4 mx-3">
                                    <IconButton
                                        className="w-6 h-6 lg:w-10 lg:h-10"
                                        placeholder={undefined}
                                        onClick={decreaseCoin}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="lg:w-6 h-6">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 12h14"
                                            />
                                        </svg>
                                    </IconButton>
                                    <div className="min-w-[20px] text-sm lg:text-xl text-center">
                                        {coinAmount}
                                    </div>
                                    <IconButton
                                        className="w-6 h-6 lg:w-10 lg:h-10"
                                        placeholder={undefined}
                                        onClick={increaseCoin}>
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

                                    <Button
                                        className="bg-[#FF0000] text-center w-20 h-6 lg:h-10 p-0
                                        "
                                        placeholder={undefined}>
                                        MAX
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between items-center text-sm lg:text-xl">
                                <div>Sub Total :</div>
                                <div>
                                    <input type="text" />
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-col justify-between items-center gap-5 text-sm lg:text-xl">
                            <div className="w-full">Wallet Balance :</div>
                            <div className="w-full">
                                <Button className="w-full p-3" placeholder={undefined}>
                                    Continue to Payment
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="flex flex-col justify-between items-center gap-10 w-full">
                        <div>Select Quantity :</div>
                        <div className="flex flex-row justify-center items-center gap-4">
                            <IconButton placeholder={undefined} onClick={decreaseCoin}>
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
                                        d="M5 12h14"
                                    />
                                </svg>
                            </IconButton>
                            <div className="">{coinAmount}</div>
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
                            <Button className="bg-[#FF0000]" placeholder={undefined}>
                                MAX
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <div>Sub Total :</div>
                        <div>
                            <input type="text" />
                        </div>
                    </div> */}

            {/* <div className="w-full">
                    <Button className="w-full" placeholder={undefined}>
                        Continue to Payment
                    </Button>
                </div> */}

            {/* <div className="flex flex-row justify-center items-center gap-10">
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
                <div>{coinAmount} COIN</div> */}
            {/* <div className="py-4">
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
            </div> */}
            {/* <div className="border-4 flex flex-col justify-center items-center text-3xl rounded-2xl p-6 w-full">
                <img className="pb-3" src="/ethereum.svg" alt="ethereum" />
                <div>0ETH</div>
                <div className="text-lg">ETH balance</div>
            </div>
            <div>
                <Button className="px-20" onClick={buyCoin} placeholder={undefined}>
                    BUY
                </Button>
            </div> */}
        </>
    )
}
