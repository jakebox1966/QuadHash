'use client'
import { getMetadata } from '@/app/api/dynamicNFT/api'
import * as React from 'react'

export interface ICardProps {
    nft: any
    onClick?: React.MouseEventHandler | undefined
}

export default function Card({ nft, onClick }: ICardProps) {
    return (
        <>
            <div
                className={`relative overflow-hidden rounded-lg group w-full md:w-[calc(100%/2-6px)] lg:w-[calc((100%/3-10px)+(7px/3))] p-10 ${
                    nft.isChecked ? 'border-8 border-red-300' : ''
                }`}>
                <div
                    className={`${
                        nft.isDisabled
                            ? 'grayscale pointer-events-none'
                            : 'grayscale-0 pointer-events-auto'
                    }`}
                    onClick={onClick}>
                    <div
                        className={`cursor-pointer transition-all group-hover:opacity-75 group-hover:scale-110 overflow-hidden ${
                            nft.isChecked ? 'opacity-35' : ''
                        }`}>
                        <img
                            src={
                                nft.tokenType === 'saza'
                                    ? `${process.env.NEXT_PUBLIC_SAZA_IMG_URL}/${
                                          nft.decimalTokenId
                                      }.png? ${new Date().getTime()}`
                                    : `${process.env.NEXT_PUBLIC_GAZA_IMG_URL}/${
                                          nft.decimalTokenId
                                      }.png? ${new Date().getTime()}`
                            }
                            alt="nft"
                        />
                    </div>
                    <div className="absolute bottom-0 w-full text-center bg-gray-300 opacity-0 group-hover:opacity-100 transition-all p-1 font-black cursor-pointer">
                        # {nft.decimalTokenId}
                    </div>
                </div>
                {nft.isDisabled && (
                    <div className="w-full text-center bg-gray-400 p-3 grayscale-0 z-50 !text-red-500 font-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        해당 NFT는 해킹신고가 불가능합니다.
                    </div>
                )}
            </div>
        </>
    )
}
