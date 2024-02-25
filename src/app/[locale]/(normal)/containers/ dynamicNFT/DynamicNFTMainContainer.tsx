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
            <div className="max-w-[1300px] px-5 w-full flex flex-col justify-center items-center gap-5 mt-[110px]">
                <div className="flex flex-col items-center text-[40px] lg:text-[70px]  font-black text-[#F46221]">
                    <div className="leading-tight">QUADHASH</div>
                    <div className="leading-tight">DYNAMIC NFT</div>
                </div>
                <div className="w-full overflow-hidden max-h-[500px] h-[400px] relative">
                    <div className="absolute -top-32 w-full min-h-[627px] flex flex-col justify-center items-center">
                        <Image src={dynamicMainImg} alt="dynamicNFT" />
                    </div>
                </div>
                <Link
                    href={'/dynamicNFT/list'}
                    className="bg-[#FFFFFF] min-w-[210px] text-[16px] lg:text-[20px] border-black font-medium text-black py-2 px-4 border-2 rounded-full shadow-[_5px_5px_black] flex flex-row justify-center items-center gap-2 cursor-pointer hover:opacity-60">
                    PLAY NOW
                </Link>
            </div>
        </>
    )
}
