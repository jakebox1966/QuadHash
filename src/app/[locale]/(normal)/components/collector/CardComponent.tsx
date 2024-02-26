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
        imgUrl = `${process.env.NEXT_PUBLIC_SAZA_IMG_URL}/images/${item.tokenId}.png`
    } else if (tokenType === 'gaza') {
        imgUrl = `${process.env.NEXT_PUBLIC_GAZA_IMG_URL}/images/${item.tokenId}.png`
    }

    return (
        <>
            <div
                className="w-[calc(50%-5px)] lg:w-[calc(25%-10px)]"
                onClick={() => onClick(item.tokenId, tokenType)}>
                <div className="overflow-hidden rounded-lg aspect-square">
                    <div className="relative cursor-pointer transition-all hover:opacity-75 hover:scale-110 w-full h-full">
                        <img src={imgUrl} width="100%" height="auto" alt="nft-image" />
                    </div>
                </div>
                <div className="w-full text-xs lg:text-base text-center transition-all z-20 p-1 font-medium cursor-pointer">
                    <div>{tokenType}</div>
                    <div>No.{item?.tokenId}</div>
                </div>
            </div>
        </>
    )
}