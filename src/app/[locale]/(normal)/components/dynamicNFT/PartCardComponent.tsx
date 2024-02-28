import * as React from 'react'

export interface ICardComponentProps {
    tokenType: string
    partsData: { trait_type: string; value: string }
    item: string
}

export default function CardComponent({ tokenType, partsData, item }: ICardComponentProps) {
    return (
        <>
            <div
                className="w-[calc(50%-5px)] lg:w-[calc(25%-10px)]"
                // onClick={() => onClick(item.tokenId, tokenType)}
            >
                <div className={`overflow-hidden aspect-square rounded-xl shadow-xl`}>
                    <div className={`relative w-full h-full `}>
                        <img
                            src={`/parts/${tokenType}/${partsData.trait_type}/${item}.png`}
                            width="100%"
                            height="auto"
                            alt="parts-image"
                        />
                    </div>
                </div>
                <div className="w-full text-xs lg:text-base text-center transition-all z-20 p-1 font-medium cursor-pointer">
                    <div className="font-medium">{item}</div>
                </div>
            </div>
        </>
    )
}
