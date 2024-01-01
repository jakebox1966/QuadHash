import * as React from 'react'

export interface ICardProps {
    imgUrl: string
}

export default function Card({ imgUrl }: ICardProps) {
    return (
        <div className="relative overflow-hidden rounded-lg group w-full md:w-[calc(100%/2-6px)] lg:w-[calc((100%/4-10px)+(7px/3))]">
            <div className="cursor-pointer transition-all group-hover:opacity-75 group-hover:scale-110 overflow-hidden">
                <img src={imgUrl} alt="" />
            </div>
            <div className="absolute bottom-0 w-full text-center bg-gray-300 opacity-0 group-hover:opacity-100 transition-all p-3 font-black">
                SELECT NFT
            </div>
        </div>
    )
}
