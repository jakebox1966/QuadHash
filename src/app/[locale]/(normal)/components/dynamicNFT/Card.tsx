'use client'
import { getMetadata } from '@/app/api/dynamicNFT/api'
import * as React from 'react'

export interface ICardProps {
    nft: any
    onClick?: React.MouseEventHandler | undefined
    setSelectedNft?: React.Dispatch<any>
    setCategoires: React.Dispatch<any>
    setMetaData: React.Dispatch<any>
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
        console.log(result)
        setMetaData(result)
        setSelectedNft(nft)
        setCategoires(null)
        handleOpen()
    }

    return (
        <div
            className="relative overflow-hidden rounded-lg group w-full md:w-[calc(100%/2-6px)] lg:w-[calc((100%/4-10px)+(7px/3))]"
            onClick={selectNft}>
            <div className="cursor-pointer transition-all group-hover:opacity-75 group-hover:scale-110 overflow-hidden">
                <img src={`${nft?.image.originalUrl}?${new Date().getTime()}`} alt="" />
            </div>
            <div className="absolute bottom-0 w-full text-center bg-gray-300 opacity-0 group-hover:opacity-100 transition-all p-1 font-black cursor-pointer">
                # {nft.tokenId}
            </div>
        </div>
    )
}
