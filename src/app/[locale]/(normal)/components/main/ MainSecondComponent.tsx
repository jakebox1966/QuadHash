import Image from 'next/image'
import * as React from 'react'
import gazaImage from '/public/main_second_gaza.png'
import sazaImage from '/public/main_second_saza.png'
import background from '/public/homepage_1.png'
import saza_gaza_together from '/public/main_second_image.png'
import MainBottomTextSlider from './MainBottomTextSlider'
import MarQueeTextComponent from './MarqueeText'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'

export interface IMainSecondComponentProps {}

const { usePathname, Link } = createSharedPathnamesNavigation({ locales })
export default function MainSecondComponent(props: IMainSecondComponentProps) {
    return (
        <>
            <div className="hidden lg:flex bg-[#236DF6] flex-col justify-end items-center w-full text-[#FFFFFF] font-black overflow-hidden relative lg:min-h-[700px]">
                <div className="w-[1200px] flex flex-col justify-end items-around py-20 lg:pt-20 px-2 lg:py-0">
                    <div className="hidden lg:flex flex-row justify-end items-end z-20">
                        <div className="w-[200px] h-[200px] relative">
                            <Image src={gazaImage} alt="gaza" className="absolute -bottom-10" />
                        </div>
                        <div className="w-[500px] h-[500px] relative">
                            <Image src={sazaImage} alt="saza" className="absolute -bottom-10" />
                        </div>
                    </div>
                    <div className="lg:absolute top-20 flex flex-col justify-center items-start gap-5">
                        <div className="text-4xl">OUR COLLECTION</div>
                        <div>
                            <div>Vibrant colors, captivating characters. Explore the</div>
                            <div>Authentic digital art crafted by renowned pop Artists</div>
                            <div>‘Crack & Carl’ and ‘Button Morris’</div>
                        </div>

                        <Link
                            href={'/collection'}
                            className="bg-[#FFFFFF] z-30 text-black p-2 border-1 rounded-full shadow-[_5px_5px_black]">
                            VIEW COLLECTIBLES
                        </Link>
                    </div>
                </div>

                <Image src={background} alt="background" className="absolute w-screen bottom-0" />
            </div>

            <div className="flex lg:hidden bg-[#236DF6] flex-col justify-end items-center w-full text-[#FFFFFF] font-black overflow-hidden relative ">
                <div className="w-[330px] flex flex-col justify-end items-start relative">
                    <div className="flex flex-col justify-center items-start gap-5 min-h-[430px]">
                        <div className="text-3xl">
                            <div>OUR</div>
                            <div>COLLECTION</div>
                        </div>
                        <div>
                            <div>Vibrant colors, captivating characters.</div>
                            <div>Explore the authentic digital art</div>
                            <div> crafted by renowned pop Artists</div>
                            <div>‘Crack & Carl’ and ‘Button Morris’</div>
                        </div>

                        <Link
                            href={'/collection'}
                            className="bg-[#FFFFFF] text-black py-2 z-20 px-4 border-1 rounded-full shadow-[_5px_5px_black]">
                            VIEW COLLECTIBLES
                        </Link>
                    </div>
                    <div className="min-h-[200px] relative flex flex-col justify-center items-center">
                        <div className="flex flex-row justify-end items-end z-20 absolute left-10 -bottom-3">
                            <div className="w-[70px] h-[70px]">
                                <Image src={gazaImage} alt="gaza" />
                            </div>
                            <div className="w-[200px] h-[200px]">
                                <Image src={sazaImage} alt="saza" />
                            </div>
                        </div>
                    </div>
                </div>

                <Image src={background} alt="background" className="absolute w-screen bottom-0" />
            </div>

            {/* <div className="flex flex-col justify-center items-center w-full">
                <div className="flex flex-col gap-[27px] max-h-[710px] lg:hidden justify-start items-start px-[30px] bg-[#236DF6] w-full pt-[138px] text-white">
                    <div className="text-3xl font-black">
                        <div>OUR</div>
                        <div>COLLECTION</div>
                    </div>
                    <div className="text-sm font-medium">
                        <div>Vibrant colors, captivating characters.</div>
                        <div>Explore the authentic digital art</div>
                        <div>crafted by renowned pop artists </div>
                        <div>‘Crack & Carl’ and ‘Button Morris’</div>
                    </div>
                    <div className="bg-[#FFFFFF] text-md text-black p-2 border-1 rounded-full shadow-[_5px_5px_black]">
                        VIEW COLLECTIBLES
                    </div>
                    <Image src={background} alt="background" className="w-full bottom-0" />
                </div>
            </div> */}

            {/* <MainBottomTextSlider /> */}
            <MarQueeTextComponent text={'A NEW ERA OF CREATIVITY # '} />
            <div className="hidden bg-[#FFAE35] lg:flex flex-row justify-center items-center w-full text-[#FFFFFF] font-black overflow-hidden relative">
                <div className="max-w-[1162px] flex flex-row justify-center items-center gap-20 py-20">
                    <div className="block">
                        <Image src={saza_gaza_together} alt="saza_gaza_together" />
                    </div>
                    <div className="flex flex-col justify-center items-start gap-5">
                        <div className="text-4xl">NEW MERCHANDISE!</div>
                        <div>"Dive into the dynamic world of Quadhash.”</div>

                        <Link
                            href={'https://www.sazagaza.co.kr/'}
                            target={'_blank'}
                            className="bg-[#FFFFFF] text-black py-2 px-4 border-1 rounded-full shadow-[_5px_5px_black]">
                            SHOP NOW
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex lg:hidden bg-[#FFAE35] flex-col justify-center items-center w-full text-[#FFFFFF] font-black">
                <div className="w-[330px] flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-start gap-5 min-h-[330px]">
                        <div className="text-3xl">
                            <div>NEW</div>
                            <div>MERCHANDISE!</div>
                        </div>
                        <div>
                            <div>"Dive into the dynamic world of Quadhash.”</div>
                        </div>

                        <Link
                            href={'https://www.sazagaza.co.kr/'}
                            target={'_blank'}
                            className="bg-[#FFFFFF] text-black py-2 px-4 border-1 rounded-full shadow-[_5px_5px_black]">
                            SHOP NOW
                        </Link>
                    </div>
                    <div className=" flex flex-col justify-center items-center">
                        <Image
                            src={saza_gaza_together}
                            width={280}
                            height={280}
                            alt="saza_gaza_together"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
