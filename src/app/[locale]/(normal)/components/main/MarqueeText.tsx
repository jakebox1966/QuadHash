import * as React from 'react'
import Marquee from 'react-fast-marquee'

export interface IMarQueeTextComponentProps {
    text: string
}

export default function MarQueeTextComponent({text}: IMarQueeTextComponentProps) {
    return (
        <>
            <div className="py-4 bg-[#FFCD19] font-black w-full">
                <Marquee autoFill>
                    <div>{text}</div>
                </Marquee>
            </div>
        </>
    )
}
