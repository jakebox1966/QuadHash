export const dynamic = 'force-dynamic'

import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import * as React from 'react'
import { locales } from '@/i18nconfig'

export interface ICardComponentProps {
    tokenType: string
    tokenId: string
}

const { Link } = createSharedPathnamesNavigation({ locales })

export default function CardComponent({ tokenType, tokenId }: ICardComponentProps) {
    let imgUrl = ''

    if (tokenType === 'saza') {
        imgUrl = `${process.env.NEXT_PUBLIC_SAZA_S3_IMG_URL}/${tokenId}.png`
    } else if (tokenType === 'gaza') {
        imgUrl = `${process.env.NEXT_PUBLIC_GAZA_S3_IMG_URL}/${tokenId}.png`
    }

    return (
        <>
            <Link
                href={`/dynamicNFT/${tokenType}/${tokenId}`}
                className="w-[calc(50%-5px)] lg:w-[calc(25%-10px)]"
                // onClick={() => onClick(item.tokenId, tokenType)}
            >
                <div className="overflow-hidden rounded-lg aspect-square shadow-xl">
                    <div className="relative cursor-pointer transition-all hover:opacity-75 hover:scale-110 w-full h-full">
                        <img src={imgUrl} width="100%" height="auto" alt="nft-image" />
                    </div>
                </div>
                <div className="w-full text-xs lg:text-base text-center transition-all z-20 p-1 font-medium cursor-pointer">
                    <div className="text-[10.4px] text-[#7A7A7A]">{tokenType.toUpperCase()}</div>
                    <div>No.{tokenId}</div>
                </div>
            </Link>
        </>
    )
}
