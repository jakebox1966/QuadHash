import * as React from 'react'

export interface IToastProps {
    message: string
    isSuccess: boolean
    setIsOpenToast: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Toast({ message, isSuccess, setIsOpenToast }: IToastProps) {
    return (
        <div className="absolute top-[10%] min-w-fit max-w-fit left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-y-1/3 !z-[9999] font-Poppins_semiBold">
            <div
                className={`flex flex-col p-2 py-4 items-center justify-center border-2 ${
                    isSuccess ? 'border-[#54b144]' : 'border-[#F46221]'
                }  rounded-lg relative bg-[#FFFFFF] shadow-[0px_2px_8px_rgba(0,0,0,0.25)]`}>
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
                        {isSuccess ? (
                            <img src="/check-one.svg" alt="check-one" className="w-5 h-5" />
                        ) : (
                            <img src="/x-one.svg" alt="x-one" className="w-5 h-5" />
                        )}
                    </div>
                    <p className="w-full text-[13px] text-black text-nowrap">{message}</p>
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
