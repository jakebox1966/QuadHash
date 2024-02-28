import * as React from 'react'
import CardLoading from './CardLoading'

export interface ILoadingCardComponentProps {
    tokenType: string
}

export default function LoadingCardComponent({ tokenType }: ILoadingCardComponentProps) {
    return (
        <>
            <div
                className="w-[calc(50%-5px)] lg:w-[calc(25%-10px)]"
                // onClick={() => onClick(item.tokenId, tokenType)}
            >
                <div className="overflow-hidden rounded-lg aspect-square">
                    <div className="relative cursor-pointer transition-all hover:opacity-75 hover:scale-110 w-full h-full blur-md">
                        <img src={'/1.png'} width="100%" height="auto" alt="nft-image" />
                    </div>
                </div>
                <div className="w-full text-xs lg:text-base text-center transition-all z-20 p-1 font-medium cursor-pointer">
                    <CardLoading />
                </div>
            </div>
        </>
    )
}
