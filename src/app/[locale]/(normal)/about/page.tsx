'use client'
import { getUuidByAccount } from '@/app/api/auth/api'
import { useMessages, useTranslations } from 'next-intl'

import * as React from 'react'

export interface IAboutPageProps {}

export default function AboutPage(props: IAboutPageProps) {
    const t = useTranslations('Layout.test')
    return (
        <>
            <div className="flex flex-col justify-center items-center bg-gradient-to-b from-[#FFCD19] to-40% to-[#FFFFFF] w-full px-6">
                <section className="text-white flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center px-9 text-6xl font-black pb-10 pt-16">
                        <div className="text-3xl lg:text-6xl">QUADHASH</div>
                        <div className="text-3xl lg:text-6xl">HOME PAGE RENEW</div>
                        <div className="text-sm lg:text-xl font-light mt-10 flex flex-col justify-center items-center">
                            <div>WE PRESENT A COLLECTION</div>
                            <div>OF EXCLUSIVE AND UNIQUE</div>
                            <div>WORKS</div>
                        </div>
                    </div>
                </section>
                <section className="max-w-[1440px] py-40">
                    <div className="flex flex-col ">
                        <div className="flex flex-row justify-center items-center text-sm lg:text-xl">
                            <div className="flex-1 text-center">
                                <img src="/about_saza.png" alt="about_saza" className="w-full" />
                            </div>
                            <div className="flex-1 text-center">
                                <div className="font-black mb-5 lg:text-3xl">ABOUT OUR PROJECT</div>
                                <div>
                                    What started out as a cute art collection, WonderPals has grown{' '}
                                </div>
                                <div>to one of the most recognizable cute brands within Web3. </div>
                                <div>
                                    WonderPals is about having fun, enjoying cute art, and building
                                    community by creating lifelong pals!
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row justify-center items-center text-sm lg:text-xl">
                            <div className="flex-1 text-center">
                                <div className="font-black mb-5 lg:text-3xl">OUR VISION</div>
                                <div>
                                    What started out as a cute art collection, WonderPals has grown{' '}
                                </div>
                                <div>to one of the most recognizable cute brands within Web3. </div>
                                <div>
                                    WonderPals is about having fun, enjoying cute art, and building
                                    community by creating lifelong pals!
                                </div>
                            </div>
                            <div className="flex-1 text-center">
                                <img src="/about_gaza.png" alt="about_gaza" className="w-full" />
                            </div>
                        </div>

                        <div className="flex flex-row justify-center items-center text-sm lg:text-xl">
                            <div className="flex-1 text-center">
                                <img
                                    src="/about_cute_sazagaza.png"
                                    alt="about_cute_sazagaza"
                                    className="w-full"
                                />
                            </div>
                            <div className="flex-1 text-center mt-20">
                                <div className="font-black mb-5 lg:text-3xl">ABOUT OUR PROJECT</div>
                                <div>
                                    What started out as a cute art collection, WonderPals has grown{' '}
                                </div>
                                <div>to one of the most recognizable cute brands within Web3. </div>
                                <div>
                                    WonderPals is about having fun, enjoying cute art, and building
                                    community by creating lifelong pals!
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row justify-center items-center text-sm lg:text-xl">
                            <div className="flex-1 text-center">
                                <div className="font-black mb-5 lg:text-3xl">OUR VISION</div>
                                <div>
                                    What started out as a cute art collection, WonderPals has grown{' '}
                                </div>
                                <div>to one of the most recognizable cute brands within Web3. </div>
                                <div>
                                    WonderPals is about having fun, enjoying cute art, and building
                                    community by creating lifelong pals!
                                </div>
                            </div>
                            <div className="flex-1 text-center">
                                <img src="/about_box.png" alt="about_box" className="w-full" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
