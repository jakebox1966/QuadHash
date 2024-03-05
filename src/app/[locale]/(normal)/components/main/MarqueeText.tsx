import * as React from 'react'
import Marquee from 'react-fast-marquee'

export interface IMarQueeTextComponentProps {
    text: string
}

export default function MarQueeTextComponent({ text }: IMarQueeTextComponentProps) {
    return (
        <>
            <div className="py-4 bg-[#FFCD19] font-black w-full">
                <Marquee autoFill>
                    <div className="flex flex-row justify-center items-center gap-[10px] mr-[10px]">
                        <span className="tracking-[1.5px] text-[12px]">{text}</span>
                        <img src="/shap.svg" alt="shap" />
                    </div>
                </Marquee>
            </div>
        </>
    )
}
