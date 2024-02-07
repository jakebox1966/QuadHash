import Image from 'next/image'
import * as React from 'react'
import main_image1 from '/public/main_third_image1.png'
import main_image2 from '/public/main_middle_image2.png'
import main_image3 from '/public/main_middle_image3.png'

import main_third_sazagaza from '/public/main_third_sazagaza.png'
import main_third_saza from '/public/main_third_saza.png'
import main_third_cute from '/public/main_third_cute.png'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'

export interface IMainThirdComponentProps {}

const { Link } = createSharedPathnamesNavigation({ locales })
export default function MainThirdComponent(props: IMainThirdComponentProps) {
    return (
        <>
            <div className="hidden w-full lg:flex flex-col justify-center items-center pt-28 bg-[#FEFAE0]">
                <div className="flex flex-col justify-center items-center max-w-[1296px] w-full px-10 lg:px-28 text-black font-black gap-10">
                    <div className="text-xs md:text-xl lg:text-5xl text-center">
                        <div>START YOUR JOUNEY IN</div>
                        <div>QUADHASH.</div>
                    </div>
                    <div className="text-xs md:text-xl lg:text-2xl text-center">
                        <div>WE PRESENT A COLLECTION</div>
                        <div>OF EXCLUSIVE AND UNIQUE WORKS</div>
                    </div>
                </div>

                <div className="flex flex-col justify-stretch items-center max-w-[1296px] w-full px-10 lg:px-28 gap-4 mt-10 text-white">
                    <div className="w-full relative">
                        <Image src={main_image1} alt="main_middle_image1" />
                        <div className="flex flex-col justify-center items-start absolute bottom-8 left-8 lg:bottom-10 lg:left-10 gap-1 font-black">
                            <div className="lg:text-2xl">Our Journey</div>
                            <Link
                                href={'/about'}
                                className="bg-[#FFFFFF] text-black py-2 px-4 border-1 rounded-full shadow-[_5px_5px_black]">
                                DISCOVER OUR WORLD
                            </Link>
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-center items-center gap-4">
                        <div className="flex-1 relative">
                            <Image src={main_image2} alt="main_middle_image2" sizes="100vw" />
                            <div className="flex flex-col justify-center items-start absolute bottom-8 left-8 lg:bottom-10 lg:left-10 gap-1 font-black">
                                <div className="lg:text-2xl">Saza&Gaza</div>
                                <Link
                                    href={'https://www.instagram.com/saza.gaza/'}
                                    target={'_blank'}
                                    className="bg-[#FFFFFF] text-black py-2 px-4 border-1 rounded-full shadow-[_5px_5px_black]">
                                    {/* FOLLOW US @SAZA&GAZA */}
                                    @SAZA&GAZA
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <Image src={main_image3} alt="main_middle_image3" sizes="100vw" />
                            <Link
                                href={'/white_paper'}
                                className="flex flex-col justify-center items-start absolute bottom-8 left-8 lg:bottom-10 lg:left-10 gap-1 font-black">
                                <div className="lg:text-2xl">WHITE PAPER</div>
                                <div className="bg-[#FFFFFF] text-black py-2 px-4 border-1 rounded-full shadow-[_5px_5px_black]">
                                    SEE
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:hidden w-full flex flex-col justify-center items-center bg-[#FEFAE0] py-14">
                <div className="flex flex-col justify-center items-start w-[330px] text-black font-black gap-10">
                    <div className="text-3xl">
                        <div>START YOUR </div>
                        <div>JOUNEY IN</div>
                        <div>QUADHASH.</div>
                    </div>
                    <div className="text-xs lg:text-2xl">
                        <div>WE PRESENT A COLLECTION</div>
                        <div>OF EXCLUSIVE AND UNIQUE WORKS</div>
                    </div>
                    <div className="flex flex-col justify-stretch items-center w-full lg:px-28 gap-4 mt-10 text-white">
                        <div className="w-full relative">
                            <Image
                                src={main_third_sazagaza}
                                quality={100}
                                alt="main_middle_image1"
                            />
                            <div className="flex flex-col justify-center items-start absolute bottom-8 left-12 lg:bottom-10 lg:left-10 gap-1 font-bold">
                                <div className="lg:text-2xl">Our Journey</div>
                                <Link
                                    href={'/about'}
                                    className="bg-[#FFFFFF] text-black py-2 px-4 border-1 rounded-full shadow-[_5px_5px_black]">
                                    DISCOVER OUR WORLD
                                </Link>
                            </div>
                        </div>
                        <div className="w-full relative">
                            <Image src={main_third_cute} quality={100} alt="main_middle_image1" />
                            <div className="flex flex-col justify-center items-start absolute bottom-8 left-12 lg:bottom-10 lg:left-10 gap-1 font-bold">
                                <div className="lg:text-2xl">@SAZA&GAZA</div>
                                <Link
                                    href={'https://www.instagram.com/saza.gaza/'}
                                    target={'_blank'}
                                    className="bg-[#FFFFFF] text-black py-2 px-4 border-1 rounded-full shadow-[_5px_5px_black]">
                                    FOLLOW @SAZA&GAZA
                                </Link>
                            </div>
                        </div>
                        <div className="w-full relative">
                            <Image src={main_third_saza} quality={100} alt="main_middle_image1" />
                            <div className="flex flex-col justify-center items-start absolute bottom-8 left-12 lg:bottom-10 lg:left-10 gap-1 font-bold">
                                <div className="lg:text-2xl">WHITE PAPER</div>
                                <Link
                                    href={'/white_paper'}
                                    className="bg-[#FFFFFF] text-black py-2 px-4 border-1 rounded-full shadow-[_5px_5px_black]">
                                    SEE
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
