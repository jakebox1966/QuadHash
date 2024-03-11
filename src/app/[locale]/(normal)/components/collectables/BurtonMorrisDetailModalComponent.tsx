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
} from '@material-tailwind/react'
import Image from 'next/image'
import { customTheme, dialogTheme } from '@/app/[locale]/common/materialUI/theme'
import { formatAddress } from '@/app/utils/ethUtils'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'
import { getOwnerForNft } from '@/app/api/alchemy/api'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

import Frame from '/public/frame.png'

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
    const [owner, setOwner] = React.useState(null)

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

                                    <div className="absolute top-1/2 left-[calc(50%+4px)] -translate-y-1/2 -translate-x-1/2 w-[calc(100%+80px)] lg:w-[calc(100%+170px)]">
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
                                                        <div className="lg:text-[25px]">
                                                            {owner && formatAddress(owner)}
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
