'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import * as React from 'react'
import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'

import { getAccounts, personalSign } from '@/app/api/wallet/api'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { updateUserProfileTokenId } from '@/app/api/collector/api'
import NFTSetting from './NFTSetting'
import { backgroundPallete } from '@/app/[locale]/common/color/colorPalette'
import QuestionMark from '/public/mypage_profile_none.png'
import PartTooltipComponent from './PartTooltipComponent'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

import noneProfileImg from '/public/main_first_image.png'
import Logo from '@/app/[locale]/common/components/header/Logo'

export interface IProfileSectionProps {
    collector_address: any
    profileNFT: any
    updateUserProfile: ({ tokenId, tokenType }: { tokenId: any; tokenType: any }) => Promise<void>
}

export default function ProfileSection({
    collector_address,
    profileNFT,
    updateUserProfile,
}: IProfileSectionProps) {
    const { wallet } = useMetaMask()

    const { data: session } = useSession()

    const backgroundColor = profileNFT?.attributes.find((item) => {
        return item.trait_type === 'Background'
    })

    const tokenId = profileNFT?.name.split('#')[1]
    const tokenType = profileNFT?.name.split('#')[0].split(':')[1].trim().toLowerCase()

    React.useEffect(() => {
        console.log(session)
        console.log(session?.user.wallet_address)
        console.log(wallet?.accounts[0])
    }, [session, wallet])
    console.log(profileNFT)

    const imageUrl = profileNFT?.image

    return (
        <div className="w-full">
            {profileNFT && (
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
                        <div className="lg:hidden flex flex-col w-full px-5 py-3 justify-center mt-5">
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
            )}
            {!profileNFT && (
                <div className="w-full">
                    <div className="overflow-hidden flex flex-col justify-end items-center bg-[#FFCD19] w-full py-5">
                        <div className="flex flex-col justify-end items-center w-full h-full px-10">
                            <Logo />
                            <Image
                                src={noneProfileImg}
                                alt={'main_first_image'}
                                width={580}
                                height={500}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
