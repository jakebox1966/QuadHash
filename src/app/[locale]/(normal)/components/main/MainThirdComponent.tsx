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
            <div className="hidden w-full lg:flex flex-col justify-center items-center pt-[294px] bg-[#FEFAE0]">
                <div className="flex flex-col justify-center items-center max-w-[1300px] w-full px-10 lg:px-28 text-black font-black gap-10">
                    <div className="font-NeuePlak lg:text-[70px] text-center font-[400] leading-[60px]">
                        <div>START YOUR JOURNEY IN</div>
                        <div>QUADHASH.</div>
                    </div>
                    <div className="text-[32px] text-center font-[500] leading-[35px]">
                        <div>WE PRESENT A COLLECTION</div>
                        <div>OF EXCLUSIVE AND UNIQUE WORKS</div>
                    </div>
                </div>

                <div className="flex flex-col items-center max-w-[1300px] w-full gap-[40px] mt-[50px] text-white">
                    <div className="w-full relative">
                        <Image src={main_image1} alt="main_middle_image1" className="w-full" />
                        <div className="flex flex-col justify-center items-start absolute bottom-[95px] left-[82px] gap-1 font-black">
                            <div className="text-[44.2px] drop-shadow-xl">Our Journey</div>
                            <Link
                                href={'/about'}
                                className="bg-[#FFFFFF] text-[16px] text-black border-[1px] border-black py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black]">
                                DISCOVER OUR WORLD
                            </Link>
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-center items-center gap-[40px]">
                        <div className="relative w-full">
                            <Image
                                src={main_image2}
                                alt="main_middle_image2"
                                className="object-cover w-full"
                            />
                            <div className="flex flex-col justify-center items-start absolute bottom-8 left-8 lg:bottom-10 lg:left-10 gap-1 font-black">
                                <div className="text-[44.2px] drop-shadow-xl">Saza&Gaza</div>
                                <Link
                                    href={'https://www.instagram.com/saza.gaza/'}
                                    target={'_blank'}
                                    className="bg-[#FFFFFF] text-[16px] text-black border-[1px] border-black py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black]">
                                    {/* FOLLOW US @SAZA&GAZA */}
                                    FOLLOW US @SAZA&GAZA
                                </Link>
                            </div>
                        </div>
                        <div className="relative w-full">
                            <Image
                                src={main_image3}
                                alt="main_middle_image3"
                                quality={100}
                                sizes="100vw"
                                className="object-cover w-full"
                            />
                            <Link
                                href={'/white_paper'}
                                className="flex flex-col justify-center items-start absolute bottom-8 left-8 lg:bottom-10 lg:left-10 gap-1 font-black">
                                <div className="text-[44.2px] drop-shadow-xl">White Paper</div>
                                <div className="bg-[#FFFFFF] text-black border-[1px] border-black py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black]">
                                    VIEW
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:hidden w-full flex flex-col justify-center items-center bg-[#FEFAE0] py-[80px]">
                <div className="flex flex-col justify-center items-center w-[330px] text-black font-black gap-[27px]">
                    <div className="text-[35px] leading-[37px] font-[400px] font-NeuePlak w-full text-center">
                        <div>START YOUR </div>
                        <div>JOURNEY IN</div>
                        <div>QUADHASH.</div>
                    </div>
                    <div className="text-[17px] text-center">
                        <div>WE PRESENT A COLLECTION</div>
                        <div>OF EXCLUSIVE AND UNIQUE WORKS</div>
                    </div>
                    <div className="flex flex-col justify-stretch items-center w-full lg:px-28 gap-[40px] mt-[30px] text-white">
                        <div className="w-full relative">
                            <Image
                                src={main_third_sazagaza}
                                quality={100}
                                alt="main_middle_image1"
                            />
                            <div className="flex flex-col justify-center items-start absolute bottom-8 left-12 gap-[16px] font-bold">
                                <div className="text-[25px] drop-shadow-xl">Our Journey</div>
                                <Link
                                    href={'/about'}
                                    className="bg-[#FFFFFF] text-[16px] text-black border-[1px] border-black py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black]">
                                    DISCOVER OUR WORLD
                                </Link>
                            </div>
                        </div>
                        <div className="w-full relative">
                            <Image src={main_third_cute} quality={100} alt="main_middle_image1" />
                            <div className="flex flex-col justify-center items-start absolute bottom-8 left-12 gap-[16px] font-bold">
                                <div className="text-[25px] drop-shadow-xl">@SAZA&GAZA</div>
                                <Link
                                    href={'https://www.instagram.com/saza.gaza/'}
                                    target={'_blank'}
                                    className="bg-[#FFFFFF] text-[16px] text-black border-[1px] border-black py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black]">
                                    FOLLOW @SAZA&GAZA
                                </Link>
                            </div>
                        </div>
                        <div className="w-full relative">
                            <Image src={main_third_saza} quality={100} alt="main_middle_image1" />
                            <div className="flex flex-col justify-center items-start absolute bottom-8 left-12 gap-[16px] font-bold">
                                <div className="text-[25px] drop-shadow-xl">White Paper</div>
                                <Link
                                    href={'/white_paper'}
                                    className="bg-[#FFFFFF] text-[16px] text-black border-[1px] border-black py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black]">
                                    VIEW
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
