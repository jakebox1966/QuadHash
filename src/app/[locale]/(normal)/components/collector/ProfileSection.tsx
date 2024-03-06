'use client'

export const dynamic = 'force-dynamic'

import { useSession } from 'next-auth/react'
import * as React from 'react'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import NFTSetting from './NFTSetting'
import { backgroundPallete } from '@/app/[locale]/common/color/colorPalette'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import CardLoading from '@/app/[locale]/common/components/CardLoading'
import { formatAddress } from '@/app/utils/ethUtils'

export interface IProfileSectionProps {
    tokenType: string
    isLoading: boolean
    collector_address: any
    profileNFT: any
    updateUserProfile: ({ tokenId, tokenType }: { tokenId: any; tokenType: any }) => Promise<void>
}

export default function ProfileSection({
    tokenType,
    isLoading,
    collector_address,
    profileNFT,
    updateUserProfile,
}: IProfileSectionProps) {
    const { wallet } = useMetaMask()

    const { data: session } = useSession()

    if (!profileNFT || isLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[716.12px] lg:min-h-[581px]">
                <CardLoading />
            </div>
        )
    }
    if (!isLoading && profileNFT && profileNFT === 'none') {
        let profileNFT

        if (tokenType === 'saza') {
            profileNFT = {
                attributes: [
                    'BACKGROUND',
                    'MANE',
                    'BODY',
                    'HEAD',
                    'EYES',
                    'MOUTH',
                    'HEADWEAR',
                    'EXTRAS',
                ],
                name: '',
            }
        } else if (tokenType === 'gaza') {
            profileNFT = {
                attributes: [
                    'BACKGROUND',
                    'BODY',
                    'TOP',
                    'BOTTOMS',
                    'ONESIE',
                    'EYES',
                    'MOUTH',
                    'HEADWEAR',
                    'EXTRAS',
                ],
            }
        }
        return (
            <div className="w-full shadow-xl bg-[#C4CDE0] rounded-lg min-h-[582px]">
                <>
                    <div
                        className={`rounded-lg flex lg:flex-row flex-col items-center justify-center lg:justify-normal overflow-hidden`}>
                        {tokenType === 'saza' && (
                            <img
                                src={'/saza_none.png'}
                                alt="profile_image"
                                width={581}
                                height={0}
                            />
                        )}
                        {tokenType === 'gaza' && (
                            <img
                                src={'/gaza_none.png'}
                                alt="profile_image"
                                width={581}
                                height={0}
                            />
                        )}
                        <div
                            className={`w-[calc(100%-581px)] lg:flex flex-col justify-start py-10 items-start hidden h-[582px]`}>
                            <div className="flex flex-row flex-wrap gap-4 max-w-full justify-start items-start pl-10">
                                <div className="flex w-[calc(100%/2-4rem)] max-w-[250px] flex-col justify-center font-bold p-2">
                                    <div className="text-[11.81px]">QUADHASH</div>
                                    <div className="text-[25px]">{tokenType.toUpperCase()}</div>
                                </div>
                                <div className="w-[calc(100%/2-4rem)] flex flex-row justify-center"></div>

                                {profileNFT?.attributes.map((item) => (
                                    <div
                                        key={item}
                                        className="w-[calc(100%/2-4rem)] max-w-[250px] flex flex-row items-start gap-3 p-2 pl-4 bg-opacity-20 bg-black rounded-lg min-h-[50px]">
                                        <div>
                                            <div className="text-[10.85px]">{item}</div>
                                            <div className="font-black text-[11.81px]"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 font-medium pl-10">
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
                            </div>
                        </div>
                        <div className="lg:hidden flex flex-col w-full px-5 py-3 justify-center mt-5 gap-3">
                            <div className="font-medium">
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
                            </div>
                            <div className="flex flex-row justify-between items-center max-h-[50px]">
                                <div>
                                    <div className="text-[12px] font-medium">QUADHASH</div>
                                    <div className="text-[24px] font-black"> </div>
                                </div>
                                <div className="text-[9.4px]">
                                    {/* {session && collector_address === wallet?.accounts[0] && (
                                            <NFTSetting
                                                backgroundColor={backgroundColor?.value.toLowerCase()}
                                                updateUserProfile={updateUserProfile}
                                                tokenId={tokenId}
                                                tokenType={tokenType}
                                                isFrom={'profile'}
                                            />
                                        )} */}
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
                                    {profileNFT?.attributes
                                        .filter((item, index) => index !== 0)
                                        .map((item, index) => (
                                            <SwiperSlide key={`${item}_${index}`}>
                                                <div className="bg-opacity-20 bg-black w-[80%] px-2 py-1 pl-4 rounded-md">
                                                    <div className="text-[10.85px]">{item}</div>
                                                    <div className="font-black text-[11.81px]">
                                                        {item}
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        )
    }

    if (!isLoading && profileNFT && profileNFT !== 'none') {
        const backgroundColor = profileNFT?.attributes.find((item) => {
            return item.trait_type === 'Background'
        })

        const tokenId = profileNFT?.name.split('#')[1]
        const tokenType = profileNFT?.name.split('#')[0].split(':')[1].trim().toLowerCase()

        let imageUrl
        if (tokenType === 'saza') {
            imageUrl = `${process.env.NEXT_PUBLIC_SAZA_S3_IMG_URL}/${tokenId}.png`
        } else if (tokenType === 'gaza') {
            imageUrl = `${process.env.NEXT_PUBLIC_GAZA_S3_IMG_URL}/${tokenId}.png`
        }

        return (
            <div className="w-full shadow-xl rounded-lg">
                <>
                    <div
                        className={`rounded-lg flex lg:flex-row flex-col items-center justify-center lg:justify-normal overflow-hidden ${
                            backgroundColor.value.toLowerCase() === 'white'
                                ? '!text-black'
                                : '!text-[#FFFFFF]'
                        } relative bg-[${backgroundColor}] `}
                        style={{
                            backgroundColor:
                                backgroundPallete[backgroundColor?.value.toLowerCase()],
                        }}>
                        <img src={`${imageUrl}`} alt="profile_image" width={581} height={0} />
                        <div
                            className={`w-[calc(100%-581px)] lg:flex flex-col justify-start py-3 items-start hidden`}>
                            <div className="flex flex-row flex-wrap gap-4 max-w-full justify-start items-center pl-10">
                                <div className="flex w-[calc(100%/2-4rem)] max-w-[250px] flex-col justify-center font-bold p-2">
                                    <div className="text-[11.81px]">
                                        {profileNFT?.name.split(':')[0].trim()}
                                    </div>
                                    <div className="text-[25px]">
                                        {profileNFT?.name.split(':')[1].trim()}
                                    </div>
                                </div>
                                <div className="w-[calc(100%/2-4rem)] flex flex-row justify-center">
                                    {session && collector_address === wallet?.accounts[0] && (
                                        <NFTSetting
                                            backgroundColor={backgroundColor?.value.toLowerCase()}
                                            updateUserProfile={updateUserProfile}
                                            tokenId={tokenId}
                                            tokenType={tokenType}
                                            isFrom={'profile'}
                                        />
                                    )}
                                </div>

                                {profileNFT?.attributes
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
                                            {profileNFT?.attributes[0].trait_type}
                                        </div>
                                        <div className="font-black text-[11.81px]">
                                            {profileNFT?.attributes[0].value}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 font-medium pl-10">
                                <div className="flex gap-4 justify-start items-center">
                                    <div className="">
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
                                    </div>

                                    <div className="text-[9.4px]">
                                        <div>ADDRESS</div>
                                        <div className="text-[13px] font-black">
                                            {formatAddress(collector_address)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="flex flex-row flex-wrap gap-3 pl-10 justify-start items-center">
                                    <div className="flex w-[calc(100%/2-4rem)] flex-col justify-center">
                                        <div>{profileNFT?.name.split(':')[0].trim()}</div>
                                        <div className="text-2xl font-bold">
                                            {profileNFT?.name.split(':')[1].trim()}
                                        </div>
                                    </div>
                                    <div className="w-[calc(100%/2-4rem)] flex flex-row justify-between">
                                        {session && collector_address === wallet?.accounts[0] && (
                                            <NFTSetting
                                                updateUserProfile={updateUserProfile}
                                                profileNFT={profileNFT}
                                                isFrom={'profile'}
                                            />
                                        )}
                                    </div>
                                    {profileNFT?.attributes
                                        .filter((item, index) => index !== 0)
                                        .map((item) => (
                                            <div
                                                key={item.trait_type}
                                                className="w-[calc(100%/2-4rem)] flex flex-row items-center gap-3 p-3 bg-opacity-20 bg-black rounded-lg">
                                                <div>
                                                    <div className="font-medium">
                                                        {item.trait_type !== 'Dcount'
                                                            ? item.trait_type
                                                            : 'Dynamic NFT'}
                                                    </div>
                                                    <div className="font-black">{item.value}</div>
                                                </div>
                                            </div>
                                        ))}
                                    <div className="w-[calc(100%/2-4rem)] flex flex-row items-center gap-3 p-3 bg-opacity-20 bg-black rounded-lg">
                                        <div>
                                            <img src="/mypage_rank.svg" alt="mypage_rank" />
                                        </div>
                                        <div>
                                            <div>{profileNFT?.attributes[0].trait_type}</div>
                                            <div className="font-black">
                                                {profileNFT?.attributes[0].value}
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                        </div>
                        <div className="lg:hidden flex flex-col w-full px-5 justify-center mt-5 gap-3">
                            <div className="font-medium">
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
                            </div>
                            <div className="flex flex-row justify-between items-center max-h-[50px]">
                                <div>
                                    <div className="text-[12px] font-medium">QUADHASH</div>
                                    <div className="text-[24px] font-black">
                                        {profileNFT?.name.split(':')[1].trim()}
                                    </div>
                                </div>
                                <div className="text-[9.4px]">
                                    {session && collector_address === wallet?.accounts[0] && (
                                        <NFTSetting
                                            backgroundColor={backgroundColor?.value.toLowerCase()}
                                            updateUserProfile={updateUserProfile}
                                            tokenId={tokenId}
                                            tokenType={tokenType}
                                            isFrom={'profile'}
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
                                    {profileNFT?.attributes
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
                                                {profileNFT?.attributes[0].trait_type}
                                            </div>
                                            <div className="font-black text-[11.81px]">
                                                {profileNFT?.attributes[0].value}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        )
    }

    // if (isLoading) {
    //     return (
    //         <div className="w-[581px] rounded-lg flex lg:flex-row flex-col items-center justify-center">
    //             <div className="w-full">
    //                 <CardLoading />
    //             </div>
    //         </div>
    //     )
    // }
}
