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

    React.useEffect(() => {
        console.log(session)
        console.log(session?.user.wallet_address)
        console.log(wallet?.accounts[0])
    }, [session, wallet])
    // console.log(profileNFT)

    const imageUrl = profileNFT?.image

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
        } else if (partKey === 'Dcount') {
            return '/mypage_dcount.svg'
        } else if (partKey === 'Rank') {
            return '/mypage_rank.svg'
        }
    }

    return (
        <div className="w-full">
            {profileNFT && (
                <>
                    <div
                        className={`rounded-lg flex flex-row justify-center lg:justify-normal overflow-hidden relative bg-[${backgroundColor}]`}
                        style={{
                            backgroundColor:
                                backgroundPallete[backgroundColor?.value.toLowerCase()],
                        }}>
                        {/* <div className="absolute flex flex-col gap-3 bg-opacity-20 bg-black rounded-lg p-4 top-0 left-0 lg:hidden z-10">
                            {metadata?.map((item) => (
                                <PartTooltipComponent
                                    key={item.trait_type}
                                    partKey={item.trait_type}
                                    partValue={item.value}
                                    partIcon={checkPartIcon(item.trait_type)}
                                />
                            ))}
                        </div> */}
                        {/* div className="lg:w-[650px] flex flex-col justify-end items-center lag:items-start relative overflow-hidden"> */}
                        {/* <Image
                            src={imageUrl}
                            alt="profile_image"
                            width={650}
                            height={650}
                            quality={100}
                        /> */}

                        <img src={imageUrl} alt="profile_image" width={650} height={0} />
                        <div
                            className={`text-white w-[calc(100%-650px)] lg:flex flex-col justify-center items-center gap-5 hidden`}>
                            <div className="flex flex-row flex-wrap gap-3 pl-10 justify-start items-center">
                                <div className="flex w-[calc(100%/2-4rem)] flex-col justify-center">
                                    <div>{profileNFT?.name.split(':')[0].trim()}</div>
                                    <div className="text-2xl font-bold">
                                        {profileNFT?.name.split(':')[1].trim()}
                                    </div>
                                    {/* <div>
                                        {profileNFT?.attributes[0].trait_type} -{' '}
                                        {profileNFT?.attributes[0].value}
                                    </div> */}
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
                                                {item.trait_type === 'Background' && (
                                                    <img
                                                        src="/mypage_square.svg"
                                                        alt="mypage_square"
                                                    />
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
                                                    <img
                                                        src="/mypage_mouth.svg"
                                                        alt="mypage_mouth"
                                                    />
                                                )}
                                                {item.trait_type === 'Headwear' && (
                                                    <img
                                                        src="/mypage_headwear.svg"
                                                        alt="mypage_headwear"
                                                    />
                                                )}
                                                {item.trait_type === 'Extras' && (
                                                    <img
                                                        src="/mypage_square.svg"
                                                        alt="mypage_square"
                                                    />
                                                )}
                                                {item.trait_type === 'Dcount' && (
                                                    <img
                                                        src="/mypage_dcount.svg"
                                                        alt="mypage_dcount"
                                                    />
                                                )}
                                                {item.trait_type === 'Ranking' && (
                                                    <img
                                                        src="/mypage_rank.svg"
                                                        alt="mypage_ranking"
                                                    />
                                                )}
                                            </div>
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
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                </>
            )}
            {!profileNFT && (
                <div className="w-full">
                    <div className="min-h-[580px] w-full relative overflow-hidden">
                        <Image
                            src={QuestionMark}
                            alt="question-mark"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
