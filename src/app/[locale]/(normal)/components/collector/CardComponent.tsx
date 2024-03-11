'use client'

import * as React from 'react'

export interface ICardComponentProps {
    item: any
    tokenType: string
    onClick?: (token_id: any, token_type: any) => Promise<void>
}

export default function CardComponent({ item, tokenType, onClick }: ICardComponentProps) {
    let imgUrl = ''

    if (tokenType === 'saza') {
        imgUrl = `${process.env.NEXT_PUBLIC_SAZA_IMG_URL}/images/${
            item.tokenId
        }.png?${new Date().getTime()}`
    } else if (tokenType === 'gaza') {
        imgUrl = `${process.env.NEXT_PUBLIC_GAZA_IMG_URL}/images/${
            item.tokenId
        }.png?${new Date().getTime()}`
    }

    return (
        <>
            <div
                className="w-[calc(50%-5px)] lg:w-[calc(25%-8.1px)]"
                onClick={() => onClick(item.tokenId, tokenType)}>
                <div className="overflow-hidden rounded-lg aspect-square shadow-xl">
                    <div className="relative cursor-pointer transition-all hover:opacity-75 hover:scale-110 w-full h-full">
                        <img src={imgUrl} width="100%" height="auto" alt="nft-image" />
                    </div>
                </div>
                <div className="w-full text-center transition-all z-20 p-1 cursor-pointer mt-[1px] pb-5">
                    <div className="text-[10.4px] text-[#7A7A7A]">{tokenType.toUpperCase()}</div>
                    <div className="text-[11.2px] mt-[1px]">NO. {item?.tokenId}</div>
                </div>
            </div>
        </>
    )
}
