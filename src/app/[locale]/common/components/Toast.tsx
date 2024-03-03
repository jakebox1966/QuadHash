import * as React from 'react'

export interface IToastProps {
    message: string
}

export default function Toast({ message }: IToastProps) {
    return (
        <div className="fixed left-10 bottom-10 !z-[9999]">
            <div
                className={`flex flex-col p-4 items-center justify-center border-2 border-[#F46221] rounded-lg relative bg-[#FFFFFF] shadow-[0px_2px_8px_rgba(0,0,0,0.25)]`}>
                <div className="flex flex-row justify-end w-full items-center absolute top-0 right-2 mt-1">
                    <div className="cursor-pointer">X</div>
                </div>
                <div className="flex flex-row items-center gap-2 mt-2">
                    <div>
                        <img src="/check-one.svg" alt="check-one" />
                    </div>
                    <p className="text-Body text-black">{message}</p>
                </div>
                <div className="flex flex-row justify-end items-end w-full mt-2">
                    <div className="bg-[#F46221] rounded-lg px-5 text-[#FFFFFF] min-w-[105px] text-center">
                        확인
                    </div>
                </div>
            </div>
        </div>
    )
}
