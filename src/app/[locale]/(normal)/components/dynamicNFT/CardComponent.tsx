export const dynamic = 'force-dynamic'

import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import * as React from 'react'
import { locales } from '@/i18nconfig'

export interface ICardComponentProps {
    tokenType: string
    tokenId: string
    isLocked: boolean
}

const { Link } = createSharedPathnamesNavigation({ locales })

export default function CardComponent({ tokenType, tokenId, isLocked }: ICardComponentProps) {
    console.log(isLocked)
    let imgUrl = ''

    if (tokenType === 'saza') {
        imgUrl = `${process.env.NEXT_PUBLIC_SAZA_S3_IMG_URL}/${tokenId}.png?${new Date().getTime()}`
    } else if (tokenType === 'gaza') {
        imgUrl = `${process.env.NEXT_PUBLIC_GAZA_S3_IMG_URL}/${tokenId}.png?${new Date().getTime()}`
    }

    return (
        <>
            {!isLocked && (
                <Link
                    href={`/dynamicNFT/${tokenType}/${tokenId}`}
                    className="w-[calc(50%-13px)] lg:w-[calc(25%-19.5px)]"
                    // onClick={() => onClick(item.tokenId, tokenType)}
                >
                    <div className="overflow-hidden rounded-lg aspect-square shadow-xl">
                        <div className="relative cursor-pointer transition-all hover:opacity-75 hover:scale-110 w-full h-full">
                            <img src={imgUrl} width="100%" height="auto" alt="nft-image" />
                        </div>
                    </div>
                    <div className="w-full text-center transition-all z-20 p-1 pb-5 cursor-pointer mt-[4px]">
                        <div className="text-[11.4px] text-[#7A7A7A]">
                            {tokenType.toUpperCase()}
                        </div>
                        <div className="text-[12.2px] mt-[1px]">NO. {tokenId}</div>
                    </div>
                </Link>
            )}

            {isLocked && (
                <div
                    className="w-[calc(50%-13px)] lg:w-[calc(25%-19.5px)]"
                    // onClick={() => onClick(item.tokenId, tokenType)}
                >
                    <div className="overflow-hidden rounded-lg aspect-square shadow-xl">
                        <div className="relative cursor-pointer transition-all hover:opacity-75 hover:scale-110 w-full h-full">
                            {tokenType === 'saza' && (
                                <img
                                    src="/saza-locked.png"
                                    width="100%"
                                    height="auto"
                                    alt="saza-locked"
                                />
                            )}
                            {tokenType === 'gaza' && (
                                <img
                                    src="/gaza-locked.png"
                                    width="100%"
                                    height="auto"
                                    alt="gaza-locked"
                                />
                            )}
                        </div>
                    </div>
                    <div className="w-full text-center transition-all z-20 p-1 pb-5 cursor-pointer mt-[4px]">
                        <div className="text-[12.4px] text-[#7A7A7A]">
                            {tokenType.toUpperCase()}
                        </div>
                        <div className="text-[12.2px] mt-[1px]">NO. {tokenId}</div>
                    </div>
                </div>
            )}
        </>
    )
}
