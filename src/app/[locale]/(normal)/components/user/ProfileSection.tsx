'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import * as React from 'react'
import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'

import { getAccounts, personalSign } from '@/app/api/wallet/api'
import { getUuidByAccount } from '@/app/api/auth/api'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { updateUserProfileTokenId } from '@/app/api/user/api'
import NFTSetting from './NFTSetting'

export interface IProfileSectionProps {
    profileNFT: any
    updateUserProfile: ({ tokenId, tokenType }: { tokenId: any; tokenType: any }) => Promise<void>
}

const backgroundPallete = {
    white: '#FFFFFF',
    sky: '#a5ddec',
    mint: '#abc178',
    jungle: '#3d6229',
    red: '#c5251b',
    blue: '#0074ae',
    pink: '#d490aa',
    storm: '#5d7784',
    night: '#143e47',
    lemon: '#ffd488',
    desert: '#c95128',
    spots: '#ffffff',
    grid: '#648d3c',
    stripes: '#0074ae',
    dots: '#d490aa',
}

export default function ProfileSection({ profileNFT, updateUserProfile }: IProfileSectionProps) {
    const { wallet } = useMetaMask()

    const backgroundColor = profileNFT?.raw.metadata.attributes.find((item) => {
        return item.trait_type === 'Background'
    })

    const metadata = profileNFT?.raw.metadata.attributes

    console.log(profileNFT)
    const imageUrl = profileNFT?.raw.metadata.image

    const checkPartIcon = (partKey) => {
        if (partKey === 'Ranking') {
            return '/mypage_square.svg'
        } else if (partKey === 'Background') {
            return '/mypage_square.svg'
        } else if (partKey === 'Mane') {
            return '/mypage_mane.svg'
        } else if (partKey === 'Body') {
            return '/mypage_body.svg'
        } else if (partKey === 'Head') {
            return '/mypage_head.svg'
        } else if (partKey === 'Eyes') {
            return '/mypage_plus.svg'
        } else if (partKey === 'Mouth') {
            return '/mypage_mouth.svg'
        } else if (partKey === 'Headwear') {
            return '/mypage_headwear.svg'
        } else if (partKey === 'Extras') {
            return '/mypage_square.svg'
        }
    }

    return (
        <div
            className={`rounded-lg flex flex-row justify-center lg:justify-normal overflow-hidden relative bg-[${backgroundColor}]`}
            style={{ backgroundColor: backgroundPallete[backgroundColor?.value.toLowerCase()] }}>
            {/* <div className="absolute flex flex-col gap-3 bg-opacity-20 bg-black rounded-lg p-4 top-0 left-0 lg:hidden z-10">
                {metadata?.attributes.map((item) => (
                    <PartTooltipComponent
                        key={item.trait_type}
                        partKey={item.trait_type}
                        partValue={item.value}
                        partIcon={checkPartIcon(item.trait_type)}
                    />
                ))}
            </div> */}
            <div className="lg:w-[581px] flex flex-col justify-end relative">
                {imageUrl && <Image src={imageUrl} alt="profile_image" width={581} height={0} />}
            </div>
            <div
                className={`text-white w-[calc(100%-581px)] lg:flex flex-col justify-center gap-10 hidden`}>
                <div className="flex flex-row justify-center items-center gap-6">
                    <div className="w-[calc(100%/2-4rem)] flex flex-col lg:flex justify-center ">
                        <div>{profileNFT?.name.split(':')[0].trim()}</div>
                        <div className="text-2xl font-bold">
                            {profileNFT?.name.split(':')[1].trim()}
                        </div>
                        <div>
                            {profileNFT?.raw.metadata.attributes[0]?.trait_type} -{' '}
                            {profileNFT?.raw.metadata.attributes[0]?.value}
                        </div>
                    </div>
                    <div className="w-[calc(100%/2-4rem)] flex flex-row justify-between">
                        <NFTSetting updateUserProfile={updateUserProfile} profileNFT={profileNFT} />
                    </div>
                </div>

                <div className="flex flex-row flex-wrap gap-6 items-center justify-center">
                    {metadata
                        ?.filter((item, index) => index !== 0)
                        .map((item) => (
                            <div
                                key={item.trait_type}
                                className="w-[calc(100%/2-4rem)] flex flex-row items-center gap-3 p-3 bg-opacity-20 bg-black rounded-lg">
                                <div>
                                    {item.trait_type === 'Background' && (
                                        <img src="/mypage_square.svg" alt="mypage_square" />
                                    )}
                                    {item.trait_type === 'Mane' && (
                                        <img src="/mypage_mane.svg" alt="mypage_mane" />
                                    )}
                                    {item.trait_type === 'Body' && (
                                        <img src="/mypage_body.svg" alt="mypage_body" />
                                    )}
                                    {item.trait_type === 'Head' && (
                                        <img src="/mypage_head.svg" alt="mypage_head" />
                                    )}
                                    {item.trait_type === 'Eyes' && (
                                        <img src="/mypage_plus.svg" alt="mypage_plus" />
                                    )}
                                    {item.trait_type === 'Mouth' && (
                                        <img src="/mypage_mouth.svg" alt="mypage_mouth" />
                                    )}
                                    {item.trait_type === 'Headwear' && (
                                        <img src="/mypage_headwear.svg" alt="mypage_headwear" />
                                    )}
                                    {item.trait_type === 'Extras' && (
                                        <img src="/mypage_square.svg" alt="mypage_square" />
                                    )}
                                </div>
                                <div>
                                    <div>{item.trait_type}</div>
                                    <div className="font-black">{item.value}</div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
