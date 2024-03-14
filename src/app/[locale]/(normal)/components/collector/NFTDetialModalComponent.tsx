'use client'

import * as React from 'react'
import { Dialog, DialogBody, ThemeProvider } from '@material-tailwind/react'

import Image from 'next/image'

import { customTheme, dialogTheme } from '@/app/[locale]/common/materialUI/theme'
import NFTSetting from './NFTSetting'
import { useSession } from 'next-auth/react'
import { useMetaMask } from '@/app/hooks/useMetaMask'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { formatAddress } from '@/app/utils/ethUtils'

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

    return (
        <>
            <ThemeProvider value={dialogTheme}>
                <Dialog
                    open={open}
                    handler={handleOpen}
                    className={`rounded-lg relative overflow-hidden`}
                    style={{
                        backgroundColor: backgroundColor,
                    }}
                    placeholder={undefined}
                    size="lg">
                    <DialogBody
                        placeholder={undefined}
                        className={`p-0 rounded-lg overflow-hidden ${
                            backgroundColor === '#FFFFFF' ? '!text-black' : '!text-[#FFFFFF]'
                        }`}>
                        <div className={`flex flex-col lg:flex-row items-start w-full`}>
                            <div className="max-w-[350px] lg:max-w-[581px] lg:max-h-[581px] w-full h-full">
                                <img src={imageUrl} alt="" />

                                {/* MOBILE 버전 */}
                                <div className={`block lg:hidden w-full relative mt-4 px-4`}>
                                    <div className="flex flex-row justify-between items-center max-h-[50px]">
                                        <div className="leading-[25px] w-full">
                                            <div className="text-[11.81px] font-Poppins_semiBold">
                                                QUADHASH
                                            </div>
                                            <div className="text-[25px] font-Poppins_bold">
                                                {metadata?.name.split(':')[1].trim()}
                                            </div>
                                        </div>
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
                                    {/* <div className="font-medium">
                                        <div className="flex gap-4 justify-start items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                width={40}
                                                height={40}
                                                stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                                />
                                            </svg>

                                            <div className="text-[9.4px]">
                                                <div>ADDRESS</div>
                                                <div className="text-[13px] font-black">
                                                    {formatAddress(collector_address)}
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="my-[28px]">
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
                                                    <SwiperSlide
                                                        key={`${item.trait_type}_${item.value}`}>
                                                        <div className="bg-opacity-20 bg-black w-[80%] px-2 py-1 pl-4 rounded-md">
                                                            <div
                                                                className={`text-[10.85px] font-Poppins_light font-semibold  text-[#E0E0E0] tracking-[0.56px] 
                                                            ${
                                                                backgroundColor === '#FFFFFF'
                                                                    ? '!text-black'
                                                                    : '!text-[#E0E0E0]'
                                                            }
                                                            `}>
                                                                {item.trait_type.toUpperCase()}
                                                            </div>
                                                            <div className="font-Poppins_semiBold text-[11.81px]">
                                                                {item.value}
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                            <SwiperSlide>
                                                <div className="bg-opacity-20 bg-black w-[80%] px-2 py-1 pl-4 rounded-md">
                                                    <div
                                                        className={`text-[10.85px] font-Poppins_light font-semibold ${
                                                            backgroundColor === '#FFFFFF'
                                                                ? '!text-black'
                                                                : '!text-[#E0E0E0]'
                                                        } tracking-[0.56px]`}>
                                                        {metadata?.attributes[0].trait_type.toUpperCase()}
                                                    </div>
                                                    <div className="font-Poppins_semiBold text-[11.81px]">
                                                        {metadata?.attributes[0].value}
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                            {/* PC 버전 */}
                            <div className="w-[calc(100%-581px)] mx-[25px] hidden lg:flex flex-col justify-start items-start pt-[45px]">
                                <div className="max-w-[550px]">
                                    <div className="w-full font-[700] leading-[25px] flex flex-row items-center">
                                        <div className="text-nowrap">
                                            <div className="text-[11.81px] font-Poppins_semiBold">
                                                QUADHASH
                                            </div>
                                            <div className="text-[25px] font-Poppins_bold">
                                                {metadata?.name.split(':')[1].trim()}
                                            </div>
                                        </div>
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
                                    <div className="flex flex-row justify-between mt-[15px] flex-wrap gap-4">
                                        {metadata?.attributes
                                            .filter((item, index) => index !== 0)
                                            .map((item) => (
                                                <div
                                                    key={`${item.trait_type}_${item.value}`}
                                                    className="bg-opacity-10 bg-black rounded-md p-[8px] text-[12px] max-w-[250px] w-full">
                                                    <div
                                                        className={`text-[10.85px] font-Poppins_light font-semibold ${
                                                            backgroundColor === '#FFFFFF'
                                                                ? '!text-black'
                                                                : '!text-[#E0E0E0]'
                                                        } tracking-[0.56px]`}>
                                                        {item.trait_type.toUpperCase()}
                                                    </div>
                                                    <div className="font-Poppins_semiBold text-[11.81px]">
                                                        {item.value}
                                                    </div>
                                                </div>
                                            ))}
                                        <div className="bg-opacity-10 bg-black rounded-md p-[8px] text-[12px] max-w-[250px] w-full">
                                            <div
                                                className={`text-[10.85px] font-Poppins_light font-semibold ${
                                                    backgroundColor === '#FFFFFF'
                                                        ? '!text-black'
                                                        : '!text-[#E0E0E0]'
                                                } tracking-[0.56px]`}>
                                                {metadata?.attributes[0].trait_type.toUpperCase()}
                                            </div>
                                            <div className="font-Poppins_semiBold text-[11.81px]">
                                                {metadata?.attributes[0].value}
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="font-medium mt-4">
                                        <div className="flex gap-4 justify-start items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                width={40}
                                                height={40}
                                                stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                                />
                                            </svg>

                                            <div className="text-[9.4px]">
                                                <div>ADDRESS</div>
                                                <div className="text-[13px] font-black">
                                                    {formatAddress(collector_address)}
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </DialogBody>
                </Dialog>
            </ThemeProvider>
        </>
    )
}
