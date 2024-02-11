// 'use client'

import * as React from 'react'
import Image from 'next/image'
import { IQueryParam } from '../../containers/CollectionContainer'

export interface ICardComponentProps {
    item: number
    queryParam: IQueryParam
}

export default function CardComponent({ item, queryParam }: ICardComponentProps) {
    return (
        <>
            <div className="w-[calc(50%-5px)] lg:w-[calc(25%-10px)]">
                <div className="overflow-hidden rounded-lg  aspect-square">
                    <div className="relative cursor-pointer transition-all hover:opacity-75 hover:scale-110 w-full h-full">
                        <Image
                            src={`${
                                queryParam.token_type === 'saza'
                                    ? `${process.env.NEXT_PUBLIC_SAZA_IMG_URL}/${item}.png`
                                    : `${process.env.NEXT_PUBLIC_GAZA_IMG_URL}/${item}.png`
                            }`}
                            alt="nft-image"
                            sizes="100vw"
                            quality={100}
                            fill
                            placeholder="blur"
                            blurDataURL="/public/1.png"
                        />
                    </div>
                </div>
                <div className="w-full text-xs lg:text-base text-center transition-all z-20 p-1 font-medium cursor-pointer">
                    <div>{queryParam.token_type}</div>
                    <div>No.{item}</div>
                </div>
            </div>
        </>
    )
}
