'use client'
import * as React from 'react'
import Image from 'next/image'
import mypage_saza_icon from '/public/mypage_saza_icon.svg'
import mypage_gaza_icon from '/public/mypage_gaza_icon.svg'
import mypage_qbt_icon from '/public/mypage_qbt_icon.svg'

export interface ITabComponentProps {
    tokenType: string
    handleNFTType: (type: string) => void
}

export default function TabComponent({ tokenType, handleNFTType }: ITabComponentProps) {
    // const [activeTab, setActiveTab] = React.useState('saza')
    return (
        <>
            <div className="w-full flex flex-row justify-center items-center gap-3 text-[9px] lg:text-base">
                <div
                    className={`${
                        tokenType === 'saza' ? 'border-[#F46221]' : ''
                    } border-2 rounded-full px-3 py-3 w-full cursor-pointer tansition-all hover:border-[#F46221]`}
                    onClick={() => {
                        handleNFTType('saza')
                    }}>
                    <div className={`flex flex-row items-center gap-2`}>
                        <div className="relative w-[32px] h-[32px] lg:w-[70px] lg:h-[70px]">
                            <Image src={mypage_saza_icon} alt="saza_icon" fill />
                        </div>
                        <div>SAZA NFT</div>
                    </div>
                </div>
                <div
                    className={`${
                        tokenType === 'gaza' ? 'border-[#F46221]' : ''
                    } border-2 rounded-full px-3 py-3 w-full cursor-pointer tansition-all hover:border-[#F46221]`}
                    onClick={() => {
                        handleNFTType('gaza')
                    }}>
                    <div className="flex flex-row items-center gap-2">
                        <div className="relative w-[32px] h-[32px] lg:w-[70px] lg:h-[70px]">
                            <Image src={mypage_gaza_icon} alt="gaza_icon" fill />
                        </div>
                        <div>GAZA NFT</div>
                    </div>
                </div>

                <div
                    className={`${
                        tokenType === 'qbt' ? 'border-[#F46221]' : ''
                    } border-2 rounded-full px-3 py-3 w-full cursor-pointer tansition-all hover:border-[#F46221]`}
                    onClick={() => {
                        handleNFTType('qbt')
                    }}>
                    <div className="flex flex-row items-center gap-2">
                        <div className="relative w-[32px] h-[32px] lg:w-[70px] lg:h-[70px]">
                            <Image src={mypage_qbt_icon} alt="qbt_icon" fill />
                        </div>
                        <div>QBT NFT</div>
                    </div>
                </div>
            </div>
        </>
    )
}
