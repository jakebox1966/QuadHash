// 'use client'

import * as React from 'react'
import Image from 'next/image'
import { IQueryParam } from '../../containers/CollectionContainer'

export interface ICardComponentProps {
    item: number
    queryParam: IQueryParam
    burtonMorris: boolean
}

export default function CardComponent({ item, queryParam, burtonMorris }: ICardComponentProps) {
    const tokenType = queryParam.token_type
    let imgUrl = ''
    if (!burtonMorris) {
        if (tokenType === 'saza') {
            imgUrl = `${process.env.NEXT_PUBLIC_SAZA_IMG_URL}/${item}.png`
        } else if (tokenType === 'gaza') {
            imgUrl = `${process.env.NEXT_PUBLIC_GAZA_IMG_URL}/${item}.png`
        }
    } else {
        if (tokenType === 'saza') {
            imgUrl = `https://saza.quadhash.io/art/${item}.png`
        } else if (tokenType === 'gaza') {
            imgUrl = `https://gaza.quadhash.io/art/${item}.png`
        }
    }
    return (
        <>
            <div className="w-[calc(50%-5px)] lg:w-[calc(25%-10px)]">
                <div className="overflow-hidden rounded-lg  aspect-square">
                    <div className="relative cursor-pointer transition-all hover:opacity-75 hover:scale-110 w-full h-full">
                        <Image
                            // src={`${
                            //     queryParam.token_type === 'saza'
                            //         ? `${process.env.NEXT_PUBLIC_SAZA_IMG_URL}/${item}.png`
                            //         : `${process.env.NEXT_PUBLIC_GAZA_IMG_URL}/${item}.png`
                            // }`}
                            src={imgUrl}
                            alt="nft-image"
                            quality={100}
                            fill
                            sizes="224px"
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
