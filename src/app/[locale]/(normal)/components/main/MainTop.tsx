import Link from 'next/link'
import * as React from 'react'

export interface IMainTopProps {}

export default function MainTop(props: IMainTopProps) {
    return (
        <>
            <section className="flex flex-col justify-center items-center bg-[#FFCD19] pt-40">
                <div className="text-white flex flex-col justify-center items-end">
                    <div className="flex flex-col justify-end items-end px-9 text-6xl font-black pb-10">
                        <div>QUADHASH</div>
                        <div>HOME PAGE RENEW</div>
                        <div className="text-sm font-light">
                            QUADHASH 20,000 UNIQUE COLLECTIBLE.
                        </div>
                        <Link href={'https://opensea.io/kr/collection/qh-saza'} target="_blank">
                            <div className="text-[#F46221] font-semibold text-2xl py-4 pl-7 pr-5 mt-6 bg-white rounded-r-full rounded-tl-full flex flex-row gap-2 justify-center items-center cursor-pointer hover:opacity-60 transition-all">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                                    />
                                </svg>
                                Explore on Opensea : SAZA
                            </div>
                        </Link>
                        <Link href={'https://opensea.io/kr/collection/qh-gaza'} target="_blank">
                            <div className="text-[#F46221] font-semibold text-2xl py-4 pl-7 pr-5 mt-6 bg-white rounded-r-full rounded-tl-full flex flex-row gap-2 justify-center items-center cursor-pointer hover:opacity-60 transition-all">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                                    />
                                </svg>
                                Explore on Opensea : GAZA
                            </div>
                        </Link>
                    </div>
                    <div>
                        <img src="/main_top_image1.svg" alt="main_top_image1" />
                    </div>
                </div>
            </section>
        </>
    )
}
