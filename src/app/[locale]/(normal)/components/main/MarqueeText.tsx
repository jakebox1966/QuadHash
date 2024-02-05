import * as React from 'react'
import Marquee from 'react-fast-marquee'

export interface IMarQueeTextComponentProps {}

export default function MarQueeTextComponent(props: IMarQueeTextComponentProps) {
    return (
        <>
            <div className="py-4 bg-[#FFCD19] font-black w-full">
                <Marquee autoFill>
                    <div>A NEW ERA OF CREATIVITY # </div>
                </Marquee>
            </div>
        </>
    )
}
