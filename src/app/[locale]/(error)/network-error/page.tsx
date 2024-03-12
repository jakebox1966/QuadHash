import * as React from 'react'

export interface INetworkErrorPageProps {}

export default function NetworkErrorPage(props: INetworkErrorPageProps) {
    return (
        <>
            <div className="w-full h-screen flex flex-col justify-center items-center bg-[#FFCD19] px-10">
                <div className="lg:text-[30px] bg-[#FFFFFF] rounded-full px-[20px] py-[16px] shadow-[_2px_6px_0_black]">
                    NETWORK ERROR
                </div>

                <div className="mt-[44px] text-[15px] lg:text-[36px] text-[#FFFFFF] font-NeuePlak max-w-fit">
                    PLEASE CONNECT TO MAIN NET
                </div>

                <div className="mt-[67px] max-w-[150px] lg:max-w-[397.56px] w-full">
                    <img src="/network-error.png" alt="network-error" className="w-full h-full" />
                </div>

                <div className="mt-[67px] text-[10px] lg:text-[20px] text-[#FFFFFF] max-w-fit">
                    <div>You’re currently connected to a different network.</div>
                    <div>please change your wallet network to mainnet.</div>
                </div>
            </div>
        </>
    )
}
