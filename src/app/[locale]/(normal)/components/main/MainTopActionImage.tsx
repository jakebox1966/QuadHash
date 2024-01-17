'use client'

import * as React from 'react'

export interface IMainTopActionImageProps {}

export default function MainTopActionImage(props: IMainTopActionImageProps) {
    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        setIsMounted(true)
    }, [])
    return (
        <>
            <div className="w-full bg-[#FFCD19] flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute bottom-0 z-0">
                    <img className="z-[-9999]" src="homepage_1.png" alt="homepage_1.png" />
                </div>
                <div className="max-w-[1600px]">
                    <div
                        className={`
                   
                        flex flex-row justify-center items-end relative transition-all`}>
                        <img
                            className={`max-w-[200px] lg:max-w-[300px] translate-y-16 hidden lg:block ${
                                isMounted ? 'vibration' : ''
                            }`}
                            src="/homepage2_5.png"
                            alt="homepage2_5"
                        />
                        <img
                            className={`max-w-[300px] lg:max-w-[600px] translate-y-6 ${
                                isMounted ? 'vibration' : ''
                            } `}
                            src="/homepage2_6.png"
                            alt="homepage2_6"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
