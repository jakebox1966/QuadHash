'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import * as React from 'react'
import { Tooltip, Typography } from '@material-tailwind/react'
import profileNoneImage from '/public/mypage_profile_none.png'
import PartTooltipComponent from './PartTooltipComponent'

export interface IProfileSectionProps {
    metadata: any
    imageUrl: string
    backgroundColor: string
}

export default function ProfileSection({
    metadata,
    imageUrl,
    backgroundColor,
}: IProfileSectionProps) {
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
        metadata && (
            <div
                className={`rounded-lg flex flex-row justify-center lg:justify-normal overflow-hidden relative`}
                style={{ backgroundColor: backgroundColor }}>
                <div className="absolute flex flex-col gap-3 bg-opacity-20 bg-black rounded-lg p-4 top-0 left-0 lg:hidden z-10">
                    {metadata.attributes.map((item) => (
                        <PartTooltipComponent
                            key={item.trait_type}
                            partKey={item.trait_type}
                            partValue={item.value}
                            partIcon={checkPartIcon(item.trait_type)}
                        />
                    ))}
                </div>
                <div className="lg:w-[581px] flex flex-col justify-end relative">
                    <Image src={imageUrl} alt="profile_image" width={581} height={0} />
                </div>
                <div
                    className={`text-white w-[calc(100%-581px)] lg:flex flex-col justify-center gap-10 hidden`}>
                    <div className="flex flex-col justify-center ">
                        <div>{metadata?.name.split(':')[0].trim()}</div>
                        <div className="text-2xl font-bold">
                            {metadata?.name.split(':')[1].trim()}
                        </div>
                        <div>
                            {metadata?.attributes[0].trait_type} - {metadata?.attributes[0].value}
                        </div>
                    </div>

                    <div className="flex flex-row flex-wrap gap-6 items-center">
                        {metadata?.attributes
                            .filter((item, index) => index !== 0)
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
    )
}
