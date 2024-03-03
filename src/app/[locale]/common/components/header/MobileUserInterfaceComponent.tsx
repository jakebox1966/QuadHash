'use client'

import { formatAddress } from '@/app/utils/ethUtils'
import { Button, Drawer, ThemeProvider } from '@material-tailwind/react'

import Link from 'next/link'

import * as React from 'react'

import { useMetaMask } from '@/app/hooks/useMetaMask'
import { drawerTheme } from '../../materialUI/theme'
import { useSession } from 'next-auth/react'

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
    const { wallet } = useMetaMask()
    const imageUrl = profileNFT?.image

    const { data: session } = useSession()

    return (
        <>
            <Button
                className="block lg:hidden rounded-full p-3 min-w-[170px] bg-[#F46221] cursor-pointer hover:opacity-80 text-center"
                onClick={openMobileModal}
                placeholder={undefined}>
                {formatAddress(wallet.accounts[0])}
            </Button>

            <ThemeProvider value={drawerTheme}>
                <Drawer
                    dismiss={isQhTokenModalOpen ? { outsidePress: false } : { outsidePress: true }}
                    placement="bottom"
                    open={isOpenMobileModal}
                    onClose={closeMobileModal}
                    className="p-5 rounded-t-xl"
                    placeholder={undefined}>
                    <div className="w-full flex flex-row justify-center">
                        <div className="border-2 bg-gray-700 opacity-90 w-1/5"></div>
                    </div>
                    <div className="flex flex-col items-center justify-start w-full h-full pt-10">
                        <div className="flex flex-row justify-end items-end w-full">
                            <img
                                src="/exit.svg"
                                alt="exit"
                                onClick={closeMobileModal}
                                className="cursor-pointer"
                            />
                        </div>
                        <div className="flex flex-row just w-full pt-4">
                            <div className="flex flex-col justify-start items-start gap-3 w-[70%]">
                                <div className="font-black text-xl md:text-4xl">
                                    <span className="mr-3">QUADHASH</span>
                                    <span>{profileNFT?.name.split(':')[1].trim()}</span>
                                </div>
                                <div>
                                    <div className="font-medium text-sm md:text-3xl">
                                        ACCOUNT: {formatAddress(wallet.accounts[0])}
                                    </div>
                                    <div className="font-medium text-sm md:text-3xl">
                                        BALANCE: {qhTokenBalance} QH
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
                        <div className="flex flex-col justify-center text-sm lg:text-lg items-center text-white w-full gap-3 pt-10 font-medium">
                            <Link
                                href={`/collector/${wallet.accounts[0]}`}
                                className="bg-[#F46221] border-none py-3 px-10 w-full border-2 rounded-full flex flex-row justify-center items-center gap-2 cursor-pointer hover:opacity-70">
                                My Page
                            </Link>
                            <div
                                className="bg-[#F46221] border-none py-3 px-10 w-full border-2 rounded-full flex flex-row justify-center items-center gap-2 cursor-pointer hover:opacity-70"
                                onClick={handleQhTokenModal}>
                                Exchange
                            </div>

                            <div
                                className="bg-[#F46221] border-none py-3 px-10 w-full border-2 rounded-full flex flex-row justify-center items-center gap-2 cursor-pointer hover:opacity-70"
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
