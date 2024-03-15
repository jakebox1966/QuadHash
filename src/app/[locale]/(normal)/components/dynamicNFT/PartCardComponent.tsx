import * as React from 'react'

export interface ICardComponentProps {
    tokenType: string
    partsData: { trait_type: string; value: string }
    item: string
}

export default function CardComponent({ tokenType, partsData, item }: ICardComponentProps) {
    console.log(item)
    console.log(partsData.value)
    return (
        <>
            <div
                className="w-[calc(50%-13px)] lg:w-[calc(25%-19.5px)]"
                // onClick={() => onClick(item.tokenId, tokenType)}
            >
                <div
                    className={`overflow-hidden aspect-square shadow-xl ${
                        item.replaceAll(' ', '-') === partsData.value.replaceAll(' ', '-')
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
                        {item.replaceAll(' ', '-') === partsData.value.replaceAll(' ', '-') && (
                            <div className="bg-[#F46221] text-center text-[10px] lg:text-[16px] px-[10px] py-[8px] w-1/2 rounded-full absolute top-[5%] left-[5%] font-Poppins_light opacity-60 text-[#FFFFFF]">
                                <div className="z-[9999]">Owned</div>
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
