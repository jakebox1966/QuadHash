'use client'

import * as React from 'react'
import { Dialog, DialogBody, ThemeProvider } from '@material-tailwind/react'

import Image from 'next/image'

import { customTheme } from '@/app/[locale]/common/materialUI/theme'
import NFTSetting from './NFTSetting'
import { useSession } from 'next-auth/react'
import { useMetaMask } from '@/app/hooks/useMetaMask'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

export interface INFTDetailModalComponentProps {
    collector_address: any
    // activeNFT: any
    metadata?: any
    imageUrl?: string
    backgroundColor?: string
    open?: boolean
    handleOpen?: () => void
    updateUserProfile: (tokenId: any) => Promise<void>
}

export default function NFTDetailModalComponent({
    collector_address,
    // activeNFT,
    metadata,
    imageUrl,
    backgroundColor,
    open,
    handleOpen,
    updateUserProfile,
}: INFTDetailModalComponentProps) {
    const { data: session } = useSession()
    const { wallet } = useMetaMask()

    const tokenId = metadata?.name.split('#')[1]
    const tokenType = metadata?.name.split('#')[0].split(':')[1].trim().toLowerCase()

    // React.useEffect(() => {
    //     console.log(activeNFT)
    // }, [activeNFT])

    return (
        <>
            <ThemeProvider value={customTheme}>
                <Dialog
                    className={`!max-w-fit rounded-lg overflow-hidden relative `}
                    size="lg"
                    open={open}
                    handler={handleOpen}
                    placeholder={undefined}
                    style={{ backgroundColor: backgroundColor }}>
                    <DialogBody
                        className={`p-0 flex lg:flex-row justify-center group !relative ${
                            backgroundColor === '#FFFFFF' ? '!text-black' : '!text-[#FFFFFF]'
                        }`}
                        placeholder={undefined}>
                        <div
                            className={`max-w-[350px] lg:max-w-[581px] max-h-[581px] w-full h-full flex flex-col justify-end items-center lg:items-start overflow-hidden`}>
                            <img
                                src={imageUrl}
                                alt="profile_image"
                                className={`max-w-[581px] w-full`}
                            />

                            <div className="lg:hidden flex flex-col w-full px-5 py-3 justify-center mt-5">
                                <div className="flex flex-row justify-between items-center max-h-[50px]">
                                    <div>
                                        <div className="text-[12px] font-medium">QUADHASH</div>
                                        <div className="text-[24px] font-black">
                                            {metadata?.name.split(':')[1].trim()}
                                        </div>
                                    </div>
                                    <div className="text-[9.4px]">
                                        {session && collector_address === wallet?.accounts[0] && (
                                            <NFTSetting
                                                backgroundColor={backgroundColor}
                                                updateUserProfile={updateUserProfile}
                                                tokenId={tokenId}
                                                tokenType={tokenType}
                                                isFrom={'list'}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="w-full relative mt-4">
                                    <Swiper
                                        slidesPerView={1}
                                        spaceBetween={-30}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        modules={[Pagination]}>
                                        {metadata?.attributes
                                            .filter((item, index) => index !== 0)
                                            .map((item, index) => (
                                                <SwiperSlide key={`${item.trait_type}_${index}`}>
                                                    <div className="bg-opacity-20 bg-black w-[80%] px-2 py-1 pl-4 rounded-md">
                                                        <div className="text-[10.85px]">
                                                            {item.trait_type !== 'Dcount'
                                                                ? item.trait_type.toUpperCase()
                                                                : 'Dynamic NFT'}
                                                        </div>
                                                        <div className="font-black text-[11.81px]">
                                                            {item.value}
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        <SwiperSlide>
                                            <div className="bg-opacity-20 bg-black w-[80%] px-2 py-1 pl-4 rounded-md">
                                                <div className="text-[10.85px]">
                                                    {metadata?.attributes[0].trait_type}
                                                </div>
                                                <div className="font-black text-[11.81px]">
                                                    {metadata?.attributes[0].value}
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`w-[calc(100%-581px)] lg:flex flex-col justify-start py-10 items-start hidden`}>
                            <div className="flex flex-row flex-wrap gap-4 max-w-[550px] justify-start items-center pl-10">
                                <div className="flex w-[calc(100%/2-4rem)] max-w-[250px] flex-col justify-center font-bold p-2">
                                    <div className="text-[11.81px]">
                                        {metadata?.name.split(':')[0].trim()}
                                    </div>
                                    <div className="text-[25px]">
                                        {metadata?.name.split(':')[1].trim()}
                                    </div>
                                </div>
                                <div className="flex w-[calc(100%/2-4rem)] flex-row justify-center">
                                    {session && collector_address === wallet?.accounts[0] && (
                                        <NFTSetting
                                            backgroundColor={backgroundColor}
                                            updateUserProfile={updateUserProfile}
                                            tokenId={tokenId}
                                            tokenType={tokenType}
                                            isFrom={'list'}
                                        />
                                    )}
                                </div>

                                {metadata?.attributes
                                    .filter((item, index) => index !== 0)
                                    .map((item) => (
                                        <div
                                            key={item.trait_type}
                                            className="w-[calc(100%/2-4rem)] max-w-[250px] flex flex-row items-center gap-3 p-2 pl-4 bg-opacity-20 bg-black rounded-lg">
                                            <div>
                                                <div className="text-[10.85px]">
                                                    {item.trait_type !== 'Dcount'
                                                        ? item.trait_type.toUpperCase()
                                                        : 'Dynamic NFT'}
                                                </div>
                                                <div className="font-black text-[11.81px]">
                                                    {item.value}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                <div className="w-[calc(100%/2-4rem)] flex flex-row items-center gap-3 p-2 pl-4 bg-opacity-20 bg-black rounded-lg">
                                    <div>
                                        <div className="text-[10.85px]">
                                            {metadata?.attributes[0].trait_type}
                                        </div>
                                        <div className="font-black text-[11.81px]">
                                            {metadata?.attributes[0].value}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogBody>
                </Dialog>
            </ThemeProvider>
        </>
    )
}
