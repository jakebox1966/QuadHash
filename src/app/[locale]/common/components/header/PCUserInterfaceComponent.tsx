'use client'

import { useMetaMask } from '@/app/hooks/useMetaMask'
import { formatAddress } from '@/app/utils/ethUtils'
import { Popover, PopoverHandler, Button, PopoverContent } from '@material-tailwind/react'
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
    const imageUrl = profileNFT?.image

    return (
        <>
            <Popover
                placement="bottom-end"
                open={isOpenPCModal}
                handler={setIsOpenPCModal}
                dismiss={isQhTokenModalOpen ? { outsidePress: false } : { outsidePress: true }}>
                <PopoverHandler>
                    <Button
                        className="hidden lg:block rounded-full p-3 min-w-[170px] bg-[#F46221] cursor-pointer hover:opacity-80 text-center"
                        onClick={openPCModal}
                        placeholder={undefined}>
                        {formatAddress(wallet.accounts[0])}
                    </Button>
                </PopoverHandler>

                <PopoverContent
                    className="max-w-[400px] w-max] !z-[9997] hidden lg:block"
                    placeholder={undefined}>
                    <div className="flex flex-col items-center justify-start">
                        <div className="flex flex-row justify-end items-end w-full">
                            <img
                                src="/exit.svg"
                                alt="exit"
                                onClick={closePCModal}
                                className="cursor-pointer"
                            />
                        </div>
                        <div className="flex flex-row just w-full pt-4">
                            <div className="flex-[1_1_60%] flex flex-col justify-start items-start gap-3">
                                <div className="font-black text-2xl">
                                    {profileNFT?.name.split(':')[1].trim()}
                                </div>
                                <div>
                                    <div className="font-medium text-base">
                                        ACCOUNT: {formatAddress(wallet.accounts[0])}
                                    </div>
                                    <div className="font-medium text-base">
                                        BALANCE: {qhTokenBalance} QH
                                    </div>
                                </div>
                            </div>
                            <div className="flex-[1_1_40%] rounded-2xl overflow-hidden">
                                <img src={imageUrl} alt="profile_image" />
                            </div>
                        </div>
                        <div className="flex flex-row justify-center text-xs items-center text-white w-full gap-3 pt-10 font-medium">
                            <Link
                                href={`/collector/${wallet.accounts[0]}`}
                                className="bg-[#F46221] border-none py-2 px-5 w-full border-2 rounded-full flex flex-row justify-center items-center gap-2 cursor-pointer hover:opacity-70">
                                MY PAGE
                            </Link>
                            <div
                                className="bg-[#F46221] border-none py-2 px-5 w-full border-2 rounded-full flex flex-row justify-center items-center gap-2 cursor-pointer hover:opacity-70"
                                onClick={handleQhTokenModal}>
                                MY ACTIVITY
                            </div>

                            <div
                                className="bg-[#F46221] border-none py-2 px-5 w-full border-2 rounded-full flex flex-row justify-center items-center gap-2 cursor-pointer hover:opacity-70"
                                onClick={disconnect}>
                                DISCONNECT
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}
