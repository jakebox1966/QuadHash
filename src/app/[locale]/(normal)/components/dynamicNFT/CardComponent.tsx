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
        imgUrl = `${process.env.NEXT_PUBLIC_SAZA_S3_IMG_URL}/${tokenId}.png?${new Date().getTime()}`
    } else if (tokenType === 'gaza') {
        imgUrl = `${process.env.NEXT_PUBLIC_GAZA_S3_IMG_URL}/${tokenId}.png?${new Date().getTime()}`
    }

    return (
        <>
            <Link
                href={`/dynamicNFT/${tokenType}/${tokenId}`}
                className="w-[calc(50%-5px)] lg:w-[calc(25%-8.1px)]"
                // onClick={() => onClick(item.tokenId, tokenType)}
            >
                <div className="overflow-hidden rounded-lg aspect-square shadow-xl">
                    <div className="relative cursor-pointer transition-all hover:opacity-75 hover:scale-110 w-full h-full">
                        <img src={imgUrl} width="100%" height="auto" alt="nft-image" />
                    </div>
                </div>
                <div className="w-full text-center transition-all z-20 p-1 pb-5 cursor-pointer mt-[1px]">
                    <div className="text-[10.4px] text-[#7A7A7A]">{tokenType.toUpperCase()}</div>
                    <div className="text-[11.2px] mt-[1px]">NO. {tokenId}</div>
                </div>
            </Link>
        </>
    )
}
