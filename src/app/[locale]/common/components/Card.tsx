'use client'
import * as React from 'react'

export interface ICardProps {
    nft: any
    onClick?: React.MouseEventHandler | undefined
    setSelectedNft?: React.Dispatch<any>
    setCategoires: React.Dispatch<any>
    handleOpen?: () => void
}

export default function Card({ nft, setSelectedNft, handleOpen, setCategoires }: ICardProps) {
    const selectNft = () => {
        setSelectedNft(nft)
        setCategoires(null)
        handleOpen()
    }

    return (
        <div
            className="relative overflow-hidden rounded-lg group w-full md:w-[calc(100%/2-6px)] lg:w-[calc((100%/4-10px)+(7px/3))]"
            onClick={selectNft}>
            <div className="cursor-pointer transition-all group-hover:opacity-75 group-hover:scale-110 overflow-hidden">
                <img src={nft?.image.originalUrl} alt="" />
            </div>
            <div className="absolute bottom-0 w-full text-center bg-gray-300 opacity-0 group-hover:opacity-100 transition-all p-3 font-black">
                SELECT NFT
            </div>
        </div>
    )
}