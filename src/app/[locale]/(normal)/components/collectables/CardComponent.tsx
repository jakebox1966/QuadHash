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
    isLocked: boolean
    item: number
    queryParam: IQueryParam
    burtonMorris: boolean
    onClick?: (token_id: any, token_type: any) => Promise<void>
}

export default function CardComponent({
    isLocked,
    item,
    queryParam,
    burtonMorris,
    onClick,
}: ICardComponentProps) {
    console.log(isLocked)
    // console.log(lockedNFTs)
    const tokenType = queryParam.token_type

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
                onClick={() => {
                    if (!isLocked) {
                        onClick(item, queryParam.token_type)
                        return
                    }
                    return
                }}>
                <div className="overflow-hidden rounded-lg aspect-square shadow-xl">
                    <div className="relative cursor-pointer transition-all hover:opacity-75 hover:scale-110 w-full h-full">
                        {!isLocked && (
                            <img src={imgUrl} width="100%" height="auto" alt="nft-image" />
                        )}

                        {isLocked && queryParam.token_type === 'saza' && (
                            <img
                                src="/saza-locked.png"
                                width="100%"
                                height="auto"
                                alt="saza-locked"
                            />
                        )}

                        {isLocked && queryParam.token_type === 'gaza' && (
                            <img
                                src="/gaza-locked.png"
                                width="100%"
                                height="auto"
                                alt="gaza-locked"
                            />
                        )}
                    </div>
                </div>
                <div className="w-full text-center transition-all z-20 p-1 cursor-pointer mt-[4px] pb-5">
                    <div className="text-[11.4px] text-[#7A7A7A]">
                        {queryParam.token_type.toUpperCase()}
                    </div>
                    <div className="text-[12.2px] mt-[1px]">NO. {item}</div>
                </div>
            </div>
        </>
    )
}
