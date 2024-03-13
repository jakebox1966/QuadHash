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
                <div
                    className={`overflow-hidden aspect-square shadow-xl ${
                        item === partsData.value.replaceAll(' ', '-')
                            ? 'border-[5px] border-[#F46221] rounded-none'
                            : 'rounded-xl'
                    }`}>
                    <div
                        className={`relative w-full h-full hover:opacity-75 transition-all hover:scale-110`}>
                        <img
                            src={`/parts/${tokenType}/${partsData.trait_type}/${item.replaceAll(
                                ' ',
                                '-',
                            )}.png`}
                            width="100%"
                            height="auto"
                            alt="parts-image"
                        />
                        {item === partsData.value.replaceAll(' ', '-') && (
                            <div className="bg-[#F46221] w-[142px] text-center text-[16px] px-[10px] py-[8px] rounded-full absolute top-1 left-1 font-Poppins_light text-[#FFFFFF]">
                                Owned
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full text-xs lg:text-base text-center transition-all z-20 p-2 font-medium cursor-pointer">
                    <div className="font-medium">{item}</div>
                </div>
            </div>
        </>
    )
}
