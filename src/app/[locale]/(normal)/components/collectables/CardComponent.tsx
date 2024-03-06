// 'use client'

import * as React from 'react'
import Image from 'next/image'
import { IQueryParam } from '../../containers/CollectionContainer'

export interface ICardComponentProps {
    item: number
    queryParam: IQueryParam
    burtonMorris: boolean
    onClick?: (token_id: any, token_type: any) => Promise<void>
}

export default function CardComponent({
    item,
    queryParam,
    burtonMorris,
    onClick,
}: ICardComponentProps) {
    const tokenType = queryParam.token_type
    let imgUrl = ''
    if (!burtonMorris) {
        if (tokenType === 'saza') {
            imgUrl = `${
                process.env.NEXT_PUBLIC_SAZA_IMG_URL
            }/images/${item}.png?${new Date().getTime()}`
        } else if (tokenType === 'gaza') {
            imgUrl = `${
                process.env.NEXT_PUBLIC_GAZA_IMG_URL
            }/images/${item}.png?${new Date().getTime()}`
        }
    } else {
        if (tokenType === 'saza') {
            imgUrl = `${process.env.NEXT_PUBLIC_SAZA_IMG_URL}/art/${item}.png`
        } else if (tokenType === 'gaza') {
            imgUrl = `${process.env.NEXT_PUBLIC_GAZA_IMG_URL}/art/${item}.png`
        }
    }

    return (
        <>
            <div
                className="w-[calc(50%-5px)] lg:w-[calc(25%-10px)]"
                onClick={() => onClick(item, queryParam.token_type)}>
                <div className="overflow-hidden rounded-lg aspect-square shadow-xl">
                    <div className="relative cursor-pointer transition-all hover:opacity-75 hover:scale-110 w-full h-full">
                        <img src={imgUrl} width="100%" height="auto" alt="nft-image" />
                    </div>
                </div>
                <div className="w-full text-center transition-all z-20 p-1 font-medium cursor-pointer mt-[6px]">
                    <div className="text-[10.4px] text-[#7A7A7A]">
                        {queryParam.token_type.toUpperCase()}
                    </div>
                    <div className="text-[11.2px] mt-[6px]">NO. {item}</div>
                </div>
            </div>
        </>
    )
}
