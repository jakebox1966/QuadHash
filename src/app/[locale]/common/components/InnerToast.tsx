'use client'
import * as React from 'react'

export interface IInnerToastProps {
    toastMessage: string
    setToastMessage: React.Dispatch<any>
}

export default function InnerToast({ toastMessage, setToastMessage }: IInnerToastProps) {
    return (
        <>
            <div
                className={`absolute top-40 left-1/2 -translate-x-1/2 !max-w-[60%] border-2 border-[#F46221] rounded-lg px-3 py-2 bg-[#FFFFFF] ${
                    toastMessage ? 'flex' : 'hidden'
                } flex-col justify-start items-center w-full font-medium`}>
                <div className="flex flex-row justify-end w-full items-center">
                    <div
                        className="cursor-pointer"
                        onClick={() => {
                            setToastMessage(null)
                        }}>
                        X
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                    <div>
                        <img src="/check-one.svg" alt="check-one" />
                    </div>
                    <div>{toastMessage}</div>
                </div>
                <div className="flex flex-row justify-end items-center w-full my-3">
                    <div
                        className="bg-[#F46221] rounded-lg px-5 text-[#FFFFFF] min-w-[105px] text-center"
                        onClick={() => {
                            setToastMessage(null)
                        }}>
                        확인
                    </div>
                </div>
            </div>
        </>
    )
}
