import * as React from 'react'

export interface IToastProps {
    message: string
    setIsOpenToast: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Toast({ message, setIsOpenToast }: IToastProps) {
    return (
        <div className="fixed top-[10%] left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-y-1/3 !z-[9999]">
            <div
                className={`flex flex-col p-4 items-center justify-center border-2 border-[#F46221] rounded-lg relative bg-[#FFFFFF] shadow-[0px_2px_8px_rgba(0,0,0,0.25)]`}>
                {/* <div className="flex flex-row justify-end w-full items-center absolute top-0 right-2 mt-1">
                    <div
                        className="cursor-pointer"
                        onClick={() => {
                            setIsOpenToast(false)
                        }}>
                        X
                    </div>
                </div> */}
                <div className="flex flex-row justify-center items-center gap-2">
                    <div>
                        <img src="/check-one.svg" alt="check-one" className="w-5 h-5" />
                    </div>
                    <p className="text-Body text-black">{message}</p>
                </div>
                {/* <div className="flex flex-row justify-center items-center w-full mt-2">
                    <div
                        className="bg-[#F46221] rounded-lg px-5 text-[#FFFFFF] min-w-[105px] text-center"
                        onClick={() => {
                            setIsOpenToast(false)
                        }}>
                        확인
                    </div>
                </div> */}
            </div>
        </div>
    )
}
