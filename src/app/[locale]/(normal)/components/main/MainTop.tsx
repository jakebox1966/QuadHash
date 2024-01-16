import Link from 'next/link'
import * as React from 'react'

export interface IMainTopProps {}

export default function MainTop(props: IMainTopProps) {
    return (
        <>
            <section className="flex flex-col justify-center items-center bg-[#FFCD19] w-full">
                <div className="text-white flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center px-9 text-6xl font-black pb-10 pt-16">
                        <div className="text-3xl lg:text-6xl">START YOUR JOURNEY IN</div>
                        <div className="text-3xl lg:text-6xl">QUADHASH.</div>
                        <div className="text-sm lg:text-xl font-light mt-3">
                            Based on blockchain development know-how
                        </div>
                        <div className="text-sm lg:text-xl font-light">
                            and unrivaled technology accumulated over the years,
                        </div>
                        <div className="text-sm lg:text-xl font-light">
                            we will enrich the WEB 3.0 ecosystem.
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
