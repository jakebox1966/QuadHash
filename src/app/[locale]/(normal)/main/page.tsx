'use client'

import { Carousel } from '@material-tailwind/react'
import * as React from 'react'
import MainGridItems from '../components/main/MainGridItems'

export interface IMainProps {}

export default function Main(props: IMainProps) {
    return (
        <>
            <div className="flex flex-col justify-center items-center bg-[#FFCD19] pt-40">
                {/* <MainGridItems /> */}
                <div className="max-w-[1600px]">
                    <div className="text-white flex flex-col justify-center items-end">
                        <div className="flex flex-col justify-end items-end px-10 text-7xl font-black pb-10">
                            <div>QUADHASH</div>
                            <div>HOME PAGE RENEW</div>
                            <div className="text-sm font-light">
                                QUADHASH 20,000 UNIQUE COLLECTIBLE.
                            </div>
                            <div className="text-[#F46221] font-semibold text-2xl py-3 pl-7 pr-4 mt-6 bg-white rounded-r-full rounded-tl-full">
                                Explore on Opensea
                            </div>
                        </div>
                        <div>
                            <img src="/main_image1.svg" alt="test" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
