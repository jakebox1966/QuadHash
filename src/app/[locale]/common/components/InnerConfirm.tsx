import * as React from 'react'

export interface IInnerConfirmProps {
    confirmMessage: string
    setConfirmMessage
}

export default function InnerConfirm({ confirmMessage, setConfirmMessage }: IInnerConfirmProps) {
    return (
        <>
            <div
                className={`absolute ${
                    confirmMessage ? 'flex' : 'hidden'
                } flex-col items-center max-w-[60%] w-full top-40 left-1/2 -translate-x-1/2 bg-[#FFFFFF] text-black font-medium rounded-lg p-3 border-2`}>
                <div className="flex flex-row justify-end items-center w-full">
                    <img src="/exit.svg" alt="exit" className="cursor-pointer" />
                </div>
                <div className="flex flex-row items-center gap-3 w-full">
                    <div className="w-[30px] lg:w-[60px] h-auto">
                        <img src="/confirm.svg" alt="confirm" className="w-full h-auto" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="font-black text-sm lg:text-3xl">CONFIRM</div>
                        <div className="text-xs lg:text-xl">{confirmMessage}</div>
                    </div>
                </div>
                <div className="flex flex-row justify-end items-center w-full gap-4 mt-14">
                    <div className="text-xs lg:text-base w-[128px] border-[#F46221] border-2 px-[16px] rounded-lg py-1 text-center">
                        취소
                    </div>
                    <div className="text-xs lg:text-base w-[128px] bg-[#F46221] text-[#FFFFFF] px-[16px] rounded-lg py-1.5 text-center">
                        확인
                    </div>
                </div>
            </div>
        </>
    )
}
