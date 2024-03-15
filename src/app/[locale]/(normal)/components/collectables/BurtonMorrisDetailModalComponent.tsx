'use client'
import * as React from 'react'
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Typography,
    ThemeProvider,
    Tooltip,
} from '@material-tailwind/react'
import Image from 'next/image'
import { customTheme, dialogTheme, tooltipTheme } from '@/app/[locale]/common/materialUI/theme'
import { copyWalletAddress, formatAddress } from '@/app/utils/ethUtils'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'
import { getOwnerForNft } from '@/app/api/alchemy/api'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

import Frame from '/public/frame.png'
import { useMetaMask } from '@/app/hooks/useMetaMask'

export interface ICollectionDetailModalComponentProps {
    // activeNFT: any
    burtonMorris: boolean
    contractAddress: string
    selectedTokenId: string
    metadata?: any
    imageUrl?: string
    backgroundColor?: string
    open?: boolean
    handleOpen?: () => void
}
const { Link } = createSharedPathnamesNavigation({ locales })

export default function CollectionDetailModalComponent({
    // activeNFT,
    contractAddress,
    selectedTokenId,
    metadata,
    imageUrl,
    backgroundColor,
    open,
    handleOpen,
    burtonMorris,
}: ICollectionDetailModalComponentProps) {
    const { wallet } = useMetaMask()
    const [owner, setOwner] = React.useState(null)

    const [toolipMessage, setTooltipMessage] = React.useState('Copy Address')

    const copy = () => {
        copyWalletAddress(wallet.accounts[0])
        setTooltipMessage('Copied!')
        setTimeout(() => {
            setTooltipMessage('Copy Address')
        }, 1000)
    }
    const [isFlip, setIsFlip] = React.useState(false)

    const getOwner = async () => {
        await getOwnerForNft(contractAddress, selectedTokenId)
            .then((response) => {
                if (parseInt(response.owners[0], 16) === 0) {
                    setOwner(null)
                    return
                }

                setOwner(response.owners[0])
            })
            .catch((error) => {
                console.error(error)
            })
    }
    React.useEffect(() => {
        if (contractAddress && selectedTokenId) {
            getOwner()
        }
        return () => {
            setOwner(null)
        }
    }, [contractAddress, selectedTokenId])

    React.useEffect(() => {
        setIsFlip(false)
    }, [open])

    return (
        <>
            {imageUrl && (
                <ThemeProvider value={dialogTheme}>
                    <Dialog
                        open={open}
                        handler={handleOpen}
                        className="!rounded-none"
                        // style={{
                        //     backgroundColor: backgroundColor,
                        // }}
                        placeholder={undefined}
                        size="lg">
                        <DialogBody
                            onClick={() => setIsFlip((prev) => !prev)}
                            placeholder={undefined}
                            className={`p-0 group ${
                                backgroundColor === '#FFFFFF' ? '!text-black' : '!text-[#FFFFFF]'
                            }`}>
                            <div
                                className={`flex flex-col lg:flex-row items-start justify-start w-full `}>
                                <div className="max-w-[260px] max-h-[260px] lg:max-w-[581px] lg:max-h-[581px] w-full h-full relative ">
                                    {/* <img src={'/frame.png'} alt="frame" className="w-full" /> */}
                                    <img
                                        src={imageUrl}
                                        alt="burtonMorrisImg"
                                        className={`${
                                            isFlip ? 'blur-md opacity-50' : 'blur-0'
                                        } transition ease-in lg:duration-3000`}
                                    />

                                    <div className="absolute min-w-[340px] lg:min-w-[761px] top-1/2 left-[calc(50%+4px)] -translate-y-1/2 -translate-x-1/2 w-[calc(100%+80px)] lg:w-[calc(100%+170px)]">
                                        <img src="/frame.png" alt="" />
                                    </div>

                                    <div
                                        className={`w-full lg:max-w-[581px] text-black absolute font-medium top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ${
                                            !isFlip ? 'opacity-0 z-0' : 'opacity-100 z-[9999] '
                                        } transition ease-in lg:duration-3000`}>
                                        <div className="flex flex-col items-center w-full px-0">
                                            <div className="text-left">
                                                <div className="font-black lg:text-[36px] text-nowrap">
                                                    BURTON MORRIS
                                                </div>
                                                <div className="lg:text-[36px] mt-4">
                                                    {metadata?.name.split(':')[1].trim()}
                                                </div>
                                                {owner && (
                                                    <>
                                                        <div className="font-black lg:text-[25px] mt-4">
                                                            OWNER
                                                        </div>
                                                        <div className="lg:text-[25px] flex flex-row justify-start items-center gap-2">
                                                            {owner && formatAddress(owner)}

                                                            <ThemeProvider value={tooltipTheme}>
                                                                <Tooltip
                                                                    content={toolipMessage}
                                                                    placement="top">
                                                                    <div
                                                                        className="hover:opacity-65 active:opacity-65"
                                                                        onClick={copy}>
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
                                                                                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                                                                            />
                                                                        </svg>
                                                                    </div>
                                                                </Tooltip>
                                                            </ThemeProvider>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogBody>
                    </Dialog>
                </ThemeProvider>
            )}
        </>
    )
}
