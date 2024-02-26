import * as React from 'react'

export interface ICardComponentProps {
    tokenType: string
    traitType: string
    item: string
}

export default function CardComponent({ tokenType, traitType, item }: ICardComponentProps) {
    return (
        <>
            <div
                className="w-[calc(50%-5px)] lg:w-[calc(25%-10px)]"
                // onClick={() => onClick(item.tokenId, tokenType)}
            >
                <div className="overflow-hidden aspect-square border-2 rounded-xl">
                    <div className="relative w-full h-full">
                        <img
                            src={`/parts/${tokenType}/${traitType}/${item}.png`}
                            width="100%"
                            height="auto"
                            alt="parts-image"
                        />
                    </div>
                </div>
                <div className="w-full text-xs lg:text-base text-center transition-all z-20 p-1 font-medium cursor-pointer">
                    <div>{item}</div>
                </div>
            </div>
        </>
    )
}
