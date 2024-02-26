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
                    // className="p-5 !max-h-[calc(100vh-78px)] rounded-t-xl"
                    className="p-5 !max-h-fit rounded-t-xl"
                    // style={{ maxWidth: '100vh' }}
                    placeholder={undefined}>
                    <div className="flex flex-col items-center justify-start w-full h-full">
                        <div className="flex flex-row justify-end items-end w-full">
                            <img
                                src="/exit.svg"
                                alt="exit"
                                onClick={closeMobileModal}
                                className="cursor-pointer"
                            />
                        </div>
                        <div className="flex flex-row just w-full pt-4">
                            <div className="flex-[1_1_60%] flex flex-col justify-start items-start gap-3">
                                <div className="font-black text-xl md:text-4xl">
                                    {profileNFT?.name.split(':')[1].trim()}
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
                                <div className="flex-[1_1_40%] rounded-2xl overflow-hidden">
                                    <img src={imageUrl} alt="profile_image" />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col justify-center text-lg items-center text-white w-full gap-3 pt-10 font-medium">
                            <Link
                                href={`/collector/${wallet.accounts[0]}`}
                                className="bg-[#F46221] border-none py-3 px-10 w-full border-2 rounded-full flex flex-row justify-center items-center gap-2 cursor-pointer hover:opacity-70">
                                MY PAGE
                            </Link>
                            <div
                                className="bg-[#F46221] border-none py-3 px-10 w-full border-2 rounded-full flex flex-row justify-center items-center gap-2 cursor-pointer hover:opacity-70"
                                onClick={handleQhTokenModal}>
                                MY ACTIVITY
                            </div>

                            <div
                                className="bg-[#F46221] border-none py-3 px-10 w-full border-2 rounded-full flex flex-row justify-center items-center gap-2 cursor-pointer hover:opacity-70"
                                onClick={disconnect}>
                                DISCONNECT
                            </div>
                        </div>
                    </div>
                </Drawer>
            </ThemeProvider>
        </>
    )
}
