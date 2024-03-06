import Image from 'next/image'
import * as React from 'react'
import dynamicMainImg from '/public/dynamicNFT.png'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'

export interface IDynamicNFTMainContainerProps {}

const { Link } = createSharedPathnamesNavigation({ locales })

export default function DynamicNFTMainContainer(props: IDynamicNFTMainContainerProps) {
    return (
        <>
            <div className="max-w-[1300px] p-5 w-full flex flex-col justify-center items-center  lg:gap-5">
                <div className="flex flex-col items-center text-[40px] lg:text-[70px] font-black text-[#F46221]">
                    <div className="leading-tight">QUADHASH</div>
                    <div className="leading-tight">DYNAMIC NFT</div>
                </div>
                <div className="w-full overflow-hidden flex flex-row justify-center">
                    {/* <div className="absolute top-0 w-full flex flex-col justify-center items-center"></div> */}
                    <Image src={dynamicMainImg} alt="dynamicNFT" />
                </div>
                <Link
                    href={'/dynamicNFT/list'}
                    className="bg-[#FFFFFF] min-w-[210px] text-[16px] lg:text-[20px] border-black font-medium text-black border-[1px] py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black] text-center gap-2 cursor-pointer hover:opacity-60">
                    PLAY NOW
                </Link>
            </div>
        </>
    )
}
