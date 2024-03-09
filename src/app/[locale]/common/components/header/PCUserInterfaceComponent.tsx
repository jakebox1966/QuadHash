'use client'

export const dynamic = 'force-dynamic'

import { useMetaMask } from '@/app/hooks/useMetaMask'
import { formatAddress, formatToken } from '@/app/utils/ethUtils'
import { Popover, PopoverHandler, Button, PopoverContent } from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import * as React from 'react'

export interface IPCUserInterfaceComponentProps {
    isOpenPCModal: boolean
    setIsOpenPCModal: React.Dispatch<React.SetStateAction<boolean>>
    openPCModal: () => void
    closePCModal: () => void
    isQhTokenModalOpen: boolean
    profileNFT: any
    qhTokenBalance: number
    handleQhTokenModal: () => void
    disconnect: () => Promise<void>
}

export default function PCUserInterfaceComponent({
    isOpenPCModal,
    setIsOpenPCModal,
    openPCModal,
    closePCModal,
    isQhTokenModalOpen,
    profileNFT,
    qhTokenBalance,
    handleQhTokenModal,
    disconnect,
}: IPCUserInterfaceComponentProps) {
    const { wallet } = useMetaMask()

    const imageUrl = profileNFT ? `${profileNFT?.image}?${new Date().getTime()}` : null

    const { data: session } = useSession()

    return (
        <>
            <Popover
                placement="bottom-end"
                open={isOpenPCModal}
                handler={setIsOpenPCModal}
                dismiss={isQhTokenModalOpen ? { outsidePress: false } : { outsidePress: true }}>
                <PopoverHandler>
                    <button
                        className="hidden lg:block rounded-full text-[15px] p-[16px] min-w-[170px] bg-[#F46221] text-[white] shadow-lg cursor-pointer hover:opacity-80 text-center"
                        onClick={openPCModal}>
                        {formatAddress(wallet.accounts[0])}
                    </button>
                </PopoverHandler>

                <PopoverContent
                    className="min-w-[517px] w-max !z-[9997] hidden lg:flex flex-row border-2 border-black"
                    placeholder={undefined}>
                    <div className="flex flex-col items-center justify-start relative w-full">
                        <div className="flex flex-row just w-full">
                            <div className="flex flex-col justify-start items-start gap-3 text-black w-full">
                                <div className="font-black text-2xl">
                                    <span className="mr-3">QUADHASH</span>
                                    {profileNFT && (
                                        <span>{profileNFT?.name.split(':')[1].trim()}</span>
                                    )}
                                </div>

                                <div>
                                    <div className="font-medium text-base">
                                        ACCOUNT: {formatAddress(wallet.accounts[0])}
                                    </div>
                                    <div className="font-medium text-base">
                                        USDT BALANCE: {qhTokenBalance}
                                    </div>
                                    <div className="font-medium text-base">
                                        TICKET BALANCE: {session.user.ticket_num}
                                    </div>
                                </div>
                            </div>
                            {imageUrl && (
                                <div className="rounded-2xl overflow-hidden max-w-[130px] w-full h-full">
                                    <img src={imageUrl} alt="profile_image" />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-row justify-center text-xs items-center text-white w-full gap-3 mt-[15px] font-medium">
                            <Link
                                href={`/collector/${wallet.accounts[0]}`}
                                className="bg-[#F46221] border-none py-2 px-5 w-full border-2 rounded-lg flex flex-row justify-center items-center gap-2 cursor-pointer hover:opacity-70">
                                My page
                            </Link>
                            <div
                                className="bg-[#F46221] border-none py-2 px-5 w-full border-2 rounded-lg flex flex-row justify-center items-center gap-2 cursor-pointer hover:opacity-70"
                                onClick={handleQhTokenModal}>
                                Exchange
                            </div>

                            <div
                                className="bg-[#F46221] border-none py-2 px-5 w-full border-2 rounded-lg flex flex-row justify-center items-center gap-2 cursor-pointer hover:opacity-70"
                                onClick={disconnect}>
                                Disconnect
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row justify-center items-start ml-3">
                        <img
                            src="/exit.svg"
                            alt="exit"
                            onClick={closePCModal}
                            className="cursor-pointer"
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}
