'use client'
import * as React from 'react'
import Image from 'next/image'
import mypage_saza_icon from '/public/mypage_saza_icon.svg'
import mypage_gaza_icon from '/public/mypage_gaza_icon.svg'

export interface ITabComponentProps {
    tokenType: string
    handleNFTType: (type: string) => void
}

export default function TabComponent({ tokenType, handleNFTType }: ITabComponentProps) {
    // const [activeTab, setActiveTab] = React.useState('saza')
    return (
        <>
            <div className="text-[25px] font-medium w-full text-center mb-10">
                Select Your Collection
            </div>
            <div className="w-full flex flex-row justify-center items-center gap-3 text-[9px] lg:text-base pb-[32px]">
                <div
                    className={`${
                        tokenType === 'saza' ? 'bg-[#FFCD19]' : ''
                    } border-2 rounded-[30px] px-3 py-3 w-full cursor-pointer tansition-all hover:bg-[#FFCD19] max-w-[408px]`}
                    onClick={() => {
                        handleNFTType('saza')
                    }}>
                    <div className={`flex flex-row items-center gap-2`}>
                        <div className="relative w-[32px] h-[32px] lg:w-[70px] lg:h-[70px]">
                            <Image src={mypage_saza_icon} alt="saza_icon" fill />
                        </div>
                        <div className="tracking-wider">SAZA</div>
                    </div>
                </div>
                <div
                    className={`${
                        tokenType === 'gaza' ? 'bg-[#FFCD19]' : ''
                    } border-2 rounded-[30px] px-3 py-3 w-full cursor-pointer tansition-all hover:bg-[#FFCD19] max-w-[408px]`}
                    onClick={() => {
                        handleNFTType('gaza')
                    }}>
                    <div className="flex flex-row items-center gap-2">
                        <div className="relative w-[32px] h-[32px] lg:w-[70px] lg:h-[70px]">
                            <Image src={mypage_gaza_icon} alt="gaza_icon" fill />
                        </div>
                        <div className="tracking-wider">GAZA</div>
                    </div>
                </div>
            </div>
        </>
    )
}
