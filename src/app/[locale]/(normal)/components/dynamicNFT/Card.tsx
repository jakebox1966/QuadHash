'use client'
import { getMetadata } from '@/app/api/dynamicNFT/api'
import Image from 'next/image'
import * as React from 'react'

export interface ICardProps {
    nft: any
    onClick?: React.MouseEventHandler | undefined
    setSelectedNft?: React.Dispatch<any>
    setCategoires?: React.Dispatch<any>
    setMetaData?: React.Dispatch<any>
    handleOpen?: () => void
}

export default function Card({
    nft,
    setSelectedNft,
    handleOpen,
    setCategoires,
    setMetaData,
}: ICardProps) {
    const selectNft = async () => {
        const result = await getMetadata({
            nftType: nft.contract.symbol.toLowerCase(),
            tokenId: nft.tokenId,
        })
        setMetaData(result)
        setSelectedNft(nft)
        setCategoires(null)
        handleOpen()
    }

    return (
        <div
            className="relative overflow-hidden rounded-lg group w-[580px] md:w-[calc(100%/2-6px)] lg:w-[calc((100%/4-10px)+(7px/3))]"
            onClick={selectNft}>
            <div className="cursor-pointer transition-all group-hover:opacity-75 group-hover:scale-110 overflow-hidden">
                <div className="relative w-full">
                    {/* <Image
                        src={`${nft?.image.originalUrl}`}
                        // src={`${nft?.image.originalUrl}`}
                        alt="test"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill={true}
                    /> */}
                    <img src={`${nft?.image.originalUrl}?${new Date().getTime()}`} alt="" />
                </div>
            </div>
            <div className="absolute bottom-0 w-full text-center bg-gray-300 opacity-0 group-hover:opacity-100 transition-all p-1 font-black cursor-pointer">
                # {nft.tokenId}
            </div>
        </div>
    )
}
