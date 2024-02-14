'use client'
import { getMetadata } from '@/app/api/dynamicNFT/api'
import * as React from 'react'
import NFTDetailModalComponent from './NFTDetialModalComponent'
import Image from 'next/image'

export interface ICardProps {
    nft: any
    onClick?: React.MouseEventHandler | undefined
}

export default function Card({ nft, onClick }: ICardProps) {
    return (
        <>
            <div
                className="relative overflow-hidden rounded-lg group w-full md:w-[calc(100%/2-6px)] lg:w-[calc((100%/4-10px)+(7px/3))]"
                onClick={() => onClick(nft.tokenId)}>
                <div className="cursor-pointer transition-all group-hover:opacity-75 group-hover:scale-110 overflow-hidden">
                    {/* <Image
                        src={nft?.image.originalUrl}
                        alt="nft-image"
                        sizes="100vw"
                        width={700}
                        height={700}
                        quality={100}
                        className="object-contain"
                    /> */}
                    <img src={`${nft?.image.originalUrl}`} alt="" />
                </div>
                <div className="absolute bottom-0 w-full text-center bg-gray-300 opacity-0 group-hover:opacity-100 transition-all p-1 font-black cursor-pointer">
                    # {nft.tokenId}
                </div>
            </div>
        </>
    )
}
