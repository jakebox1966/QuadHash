'use client'
import * as React from 'react'
import Image from 'next/image'
import { IQueryParam } from '../../containers/CollectionContainer'

export interface ICardComponentProps {
    item: number
    queryParam: IQueryParam
}

export default function CardComponent({ item, queryParam }: ICardComponentProps) {
    return (
        <div className="overflow-hidden rounded-lg max-w-[calc((100%/4-10px)+(7px/3))]">
            <div className="relative cursor-pointer transition-all hover:opacity-75 hover:scale-110 w-full">
                <Image
                    src={`${process.env.NEXT_PUBLIC_SAZA_IMG_URL}/${item}.png`}
                    alt="nft-image"
                    sizes="100vw"
                    width={700}
                    height={700}
                    quality={100}
                    className="object-contain overflow-hidden"
                />
            </div>
            <div className="w-full text-center bg-green-300 transition-all z-20 p-1 font-medium cursor-pointer">
                <div>{queryParam.token_type}</div>
                <div>No.{item}</div>
            </div>
        </div>
    )
}
