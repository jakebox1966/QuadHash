import * as React from 'react'

export interface IToastProps {
    message: string
}

export default function Toast({ message }: IToastProps) {
    return (
        <div className="fixed left-10 bottom-10 !z-[9999]">
            <div
                className={`flex p-4 items-center justify-center rounded-2xl bg-green-400 opacity-[97%] shadow-[0px_2px_8px_rgba(0,0,0,0.25)]`}>
                <p className="text-Body text-white">{message}</p>
            </div>
        </div>
    )
}
