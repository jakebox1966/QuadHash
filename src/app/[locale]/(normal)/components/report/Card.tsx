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
                className={`w-[calc(50%-5px)] lg:w-[calc(25%-10px)] ${
                    nft.isDisabled ? 'pointer-events-none' : 'pointer-events-auto'
                }`}
                onClick={onClick}>
                <div
                    className={`overflow-hidden rounded-lg z-20 aspect-square shadow-xl relative ${
                        nft.isChecked ? 'border-8 border-red-300' : ''
                    }`}>
                    <div
                        className={`relative cursor-pointer transition-all hover:opacity-75 hover:scale-110 w-full h-full ${
                            nft.isChecked ? 'opacity-35' : ''
                        } ${nft.isDisabled ? 'grayscale' : 'grayscale-0'}`}>
                        <img
                            src={
                                nft.tokenType === 'saza'
                                    ? `${process.env.NEXT_PUBLIC_SAZA_S3_IMG_URL}/${
                                          nft.decimalTokenId
                                      }.png?${new Date().getTime()}`
                                    : `${process.env.NEXT_PUBLIC_GAZA_S3_IMG_URL}/${
                                          nft.decimalTokenId
                                      }.png?${new Date().getTime()}`
                            }
                            width="100%"
                            height="auto"
                            alt="nft-image"
                        />
                    </div>
                    {nft.isDisabled && (
                        <div className="w-full text-center text-[7px] md:text-[10px] lg:text-[14px] bg-gray-400 z-50 !text-red-500 p-3 grayscale-0 font-black absolute bottom-0">
                            해당 NFT는 해킹신고가 불가능합니다.
                        </div>
                    )}
                </div>
                <div className="w-full text-xs lg:text-base text-center transition-all z-20 p-1 font-medium cursor-pointer mt-[4px]">
                    <div className="text-[11.4px] text-[#7A7A7A]">
                        {nft.tokenType.toUpperCase()}
                    </div>
                    <div className="text-[12.2px]">NO. {nft.decimalTokenId}</div>
                </div>
            </div>

            {/* <div
                className={`relative overflow-hidden rounded-lg group w-full md:w-[calc(100%/2-6px)] lg:w-[calc((100%/3-10px)+(7px/3))] ${
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
                                    ? `${process.env.NEXT_PUBLIC_SAZA_S3_IMG_URL}/${
                                          nft.decimalTokenId
                                      }.png?${new Date().getTime()}`
                                    : `${process.env.NEXT_PUBLIC_GAZA_S3_IMG_URL}/${
                                          nft.decimalTokenId
                                      }.png?${new Date().getTime()}`
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
            </div> */}
        </>
    )
}
