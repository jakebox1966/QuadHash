'use client'

import * as React from 'react'
import Image from 'next/image'
import { IQueryParam } from '../../containers/CollectionContainer'
import { getMetadata } from '@/app/api/collection/api'

export interface ICardComponentProps {
    // lockedNFTs: {
    //     saza: any[]
    //     gaza: any[]
    // }
    item: number
    queryParam: IQueryParam
    burtonMorris: boolean
    onClick?: (token_id: any, token_type: any) => Promise<void>
}

export default function CardComponent({
    // lockedNFTs,
    item,
    queryParam,
    burtonMorris,
    onClick,
}: ICardComponentProps) {
    // console.log(lockedNFTs)
    const tokenType = queryParam.token_type

    const [isLocked, setIsLocked] = React.useState(false)

    let imgUrl = ''
    if (!burtonMorris) {
        if (tokenType === 'saza') {
            imgUrl = `${process.env.NEXT_PUBLIC_SAZA_IMG_URL}/images/${item}.png`
        } else if (tokenType === 'gaza') {
            imgUrl = `${process.env.NEXT_PUBLIC_GAZA_IMG_URL}/images/${item}.png`
        }
    } else {
        if (tokenType === 'saza') {
            imgUrl = `${process.env.NEXT_PUBLIC_SAZA_IMG_URL}/art/${item}.png`
        } else if (tokenType === 'gaza') {
            imgUrl = `${process.env.NEXT_PUBLIC_GAZA_IMG_URL}/art/${item}.png`
        }
    }

    // React.useEffect(() => {
    //     let result = false
    //     console.log('item => ', item)
    //     result = lockedNFTs.saza.includes(22)

    //     console.log('result', result)
    //     result = lockedNFTs.gaza.includes)

    //     console.log(result)
    // }, [lockedNFTs])

    return (
        <>
            <div
                className="w-[calc(50%-5px)] lg:w-[calc(25%-8.1px)]"
                onClick={() => onClick(item, queryParam.token_type)}>
                <div className="overflow-hidden rounded-lg aspect-square shadow-xl">
                    <div className="relative cursor-pointer transition-all hover:opacity-75 hover:scale-110 w-full h-full">
                        <img src={imgUrl} width="100%" height="auto" alt="nft-image" />
                    </div>
                </div>
                <div className="w-full text-center transition-all z-20 p-1 cursor-pointer mt-[1px] pb-5">
                    <div className="text-[10.4px] text-[#7A7A7A]">
                        {queryParam.token_type.toUpperCase()}
                    </div>
                    <div className="text-[11.2px] mt-[1px]">NO. {item}</div>
                </div>
            </div>
        </>
    )
}
