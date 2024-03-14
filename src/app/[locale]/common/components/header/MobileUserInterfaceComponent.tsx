'use client'

export const dynamic = 'force-dynamic'

import { copyWalletAddress, formatAddress } from '@/app/utils/ethUtils'
import { Button, Drawer, ThemeProvider, Tooltip } from '@material-tailwind/react'
import { locales } from '@/i18nconfig'

import * as React from 'react'

import { useMetaMask } from '@/app/hooks/useMetaMask'
import { drawerTheme, tooltipTheme } from '../../materialUI/theme'
import { useSession } from 'next-auth/react'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export interface IMobileUserInterfaceComponentProps {
    qhTokenBalance: number
    openMobileModal: () => void
    isQhTokenModalOpen: boolean
    isOpenMobileModal: boolean
    closeMobileModal: () => void
    profileNFT: any
    handleQhTokenModal: () => void
    disconnect: () => Promise<void>
}
const { Link, useRouter, usePathname } = createSharedPathnamesNavigation({ locales })

export default function MobileUserInterfaceComponent({
    qhTokenBalance,
    openMobileModal,
    isQhTokenModalOpen,
    isOpenMobileModal,
    closeMobileModal,
    profileNFT,
    handleQhTokenModal,
    disconnect,
}: IMobileUserInterfaceComponentProps) {
    const router = useRouter()
    const pathname = usePathname()
    const { wallet } = useMetaMask()
    const imageUrl = profileNFT ? `${profileNFT?.image}?${new Date().getTime()}` : null
    const { data: session } = useSession()

    const [toolipMessage, setTooltipMessage] = React.useState('Copy Address')

    const copy = () => {
        copyWalletAddress(wallet.accounts[0])
        setTooltipMessage('Copied!')
        setTimeout(() => {
            setTooltipMessage('Copy Address')
        }, 1000)
    }

    React.useEffect(() => {
        closeMobileModal()
    }, [pathname])

    return (
        <>
            <button
                className="block lg:hidden rounded-full p-[7px] min-w-[110px] text-[10px] text-white bg-[#F46221] cursor-pointer hover:opacity-80 text-center"
                onClick={openMobileModal}>
                {formatAddress(wallet.accounts[0]).toUpperCase()}
            </button>

            <ThemeProvider value={drawerTheme}>
                <Drawer
                    dismiss={isQhTokenModalOpen ? { outsidePress: false } : { outsidePress: true }}
                    placement="bottom"
                    open={isOpenMobileModal}
                    onClose={closeMobileModal}
                    className="p-5 rounded-t-xl"
                    placeholder={undefined}>
                    <div className="w-full flex flex-row justify-center">
                        {/* <div className="border-2 bg-gray-700 opacity-90 w-1/5"></div> */}
                    </div>
                    <div className="flex flex-row justify-end items-end w-full">
                        <img
                            src="/exit.svg"
                            alt="exit"
                            onClick={closeMobileModal}
                            className="cursor-pointer"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-start w-full h-full pt-10">
                        <div className="flex flex-row just w-full pt-4">
                            <div className="flex flex-col justify-start items-start gap-3 w-[70%]">
                                <div className="font-black text-xl md:text-4xl">
                                    <span className="mr-3">QUADHASH</span>
                                    <span>{profileNFT?.name.split(':')[1].trim()}</span>
                                </div>
                                <div className="leading-[25px]">
                                    <div className="font-medium text-sm md:text-3xl flex flex-row items-center gap-3">
                                        ACCOUNT: {formatAddress(wallet.accounts[0]).toUpperCase()}
                                        <ThemeProvider value={tooltipTheme}>
                                            <Tooltip content={toolipMessage} placement="top">
                                                <div
                                                    className="hover:opacity-65 active:opacity-65"
                                                    onClick={copy}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-5 h-5">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                                                        />
                                                    </svg>
                                                </div>
                                            </Tooltip>
                                        </ThemeProvider>
                                    </div>
                                    <div className="font-medium text-sm md:text-3xl">
                                        BALANCE: {qhTokenBalance} USDT
                                    </div>
                                    <div className="font-medium text-sm md:text-3xl">
                                        TICKET BALANCE: {session.user.ticket_num}
                                    </div>
                                </div>
                            </div>
                            {imageUrl && (
                                <div className=" overflow-hidden aspect-square max-w-[30%]">
                                    <img
                                        src={imageUrl}
                                        alt="profile_image"
                                        className="rounded-2xl"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col border-[1px] border-[#F46221] justify-center text-sm lg:text-lg items-center text-white w-full mt-10 font-medium rounded-lg overflow-hidden">
                            <Link
                                href={`/collector/${wallet.accounts[0]}`}
                                className="bg-[#F46221] py-3 px-10 w-full border-b-[1px] border-[#F2F2F7] flex flex-row justify-center items-center gap-2 cursor-pointer hover:bg-white hover:text-[#F46221]">
                                My Page
                            </Link>
                            <div
                                className="bg-[#F46221] py-3 px-10 w-full border-b-[1px] border-[#F2F2F7]  flex flex-row justify-center items-center gap-2 cursor-pointer hover:bg-white hover:text-[#F46221]"
                                onClick={handleQhTokenModal}>
                                Exchange
                            </div>

                            <div
                                className="bg-[#F46221] py-3 px-10 w-full border-[#F2F2F7] flex flex-row justify-center items-center gap-2 cursor-pointer hover:bg-white hover:text-[#F46221]"
                                onClick={disconnect}>
                                Disconnect
                            </div>
                        </div>
                    </div>
                </Drawer>
            </ThemeProvider>
        </>
    )
}
