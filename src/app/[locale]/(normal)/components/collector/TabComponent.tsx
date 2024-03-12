'use client'
import * as React from 'react'
import Image from 'next/image'
import mypage_saza_icon from '/public/mypage_saza_icon.svg'
import mypage_gaza_icon from '/public/mypage_gaza_icon.svg'
import mypage_qbt_icon from '/public/mypage_qbt_icon.svg'

export interface ITabComponentProps {
    tokenType: string
    handleNFTType: (type: string) => void
    nftCount: {
        sazaCount: number
        gazaCount: number
    }
}

export default function TabComponent({ tokenType, handleNFTType, nftCount }: ITabComponentProps) {
    // const [activeTab, setActiveTab] = React.useState('saza')
    return (
        <>
            <div className="w-full flex flex-row justify-center items-center gap-3 text-[9px] lg:text-base">
                <div
                    className={`${
                        tokenType === 'saza' ? 'bg-[#FFCD19]' : ''
                    } border-2 rounded-[30px] shadow-lg px-3 py-3 w-full cursor-pointer tansition-all hover:bg-[#FFCD19]`}
                    onClick={() => {
                        handleNFTType('saza')
                    }}>
                    <div className={`flex flex-row items-center gap-2`}>
                        <div className="relative w-[32px] h-[32px] lg:w-[70px] lg:h-[70px]">
                            <Image src={mypage_saza_icon} alt="saza_icon" fill />
                        </div>
                        <div className="tracking-wider hidden lg:block">
                            SAZA {nftCount?.sazaCount}
                        </div>
                        <div className="tracking-wider block lg:hidden">
                            <div>SAZA</div>
                            <div>{nftCount?.sazaCount}</div>
                        </div>
                    </div>
                </div>
                <div
                    className={`${
                        tokenType === 'gaza' ? 'bg-[#FFCD19]' : ''
                    } border-2 rounded-[30px] shadow-lg px-3 py-3 w-full cursor-pointer tansition-all hover:bg-[#FFCD19]`}
                    onClick={() => {
                        handleNFTType('gaza')
                    }}>
                    <div className="flex flex-row items-center gap-2">
                        <div className="relative w-[32px] h-[32px] lg:w-[70px] lg:h-[70px]">
                            <Image src={mypage_gaza_icon} alt="gaza_icon" fill />
                        </div>
                        <div className="tracking-wider hidden lg:block">
                            GAZA {nftCount?.gazaCount}
                        </div>

                        <div className="tracking-wider block lg:hidden">
                            <div>GAZA</div>
                            <div>{nftCount?.gazaCount}</div>
                        </div>
                    </div>
                </div>

                <div
                    className={`${
                        tokenType === 'qbt' ? 'bg-gray-300' : ''
                    } border-2 rounded-[30px] px-3 bg-gray-300 py-3 w-full  tansition-all`}
                    onClick={() => {
                        handleNFTType('qbt')
                    }}>
                    <div className="flex flex-row items-center gap-2">
                        <div className="relative w-[32px] h-[32px] lg:w-[70px] lg:h-[70px]">
                            <Image src={mypage_qbt_icon} alt="qbt_icon" fill />
                        </div>
                        <div className="tracking-wider">QBT</div>
                    </div>
                </div>
            </div>
        </>
    )
}
