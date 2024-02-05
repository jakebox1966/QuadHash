import Image from 'next/image'
import * as React from 'react'
import gazaImage from '/public/main_second_gaza.png'
import sazaImage from '/public/main_second_saza.png'
import background from '/public/homepage_1.png'
import saza_gaza_together from '/public/main_second_image.png'
import MainBottomTextSlider from './MainBottomTextSlider'
import MarQueeTextComponent from './MarqueeText'

export interface IMainSecondComponentProps {}

export default function MainSecondComponent(props: IMainSecondComponentProps) {
    return (
        <>
            <div className="bg-[#236DF6] flex flex-col justify-end items-center w-full text-[#FFFFFF] font-black overflow-hidden relative lg:min-h-[700px]">
                <div className="lg:w-[1200px] flex flex-col justify-end items-around py-20 lg:pt-20 px-2 lg:py-0">
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

                        <div className="bg-[#FFFFFF] text-black p-2 border-1 rounded-full shadow-[_5px_5px_black]">
                            VIEW COLLECTIBLES
                        </div>
                    </div>
                </div>

                <Image
                    src={background}
                    alt="background"
                    className="lg:block hidden absolute w-screen bottom-0"
                />
            </div>
            {/* <MainBottomTextSlider /> */}
            <MarQueeTextComponent text={'A NEW ERA OF CREATIVITY # '} />
            <div className="bg-[#FFAE35] flex flex-row justify-center items-center w-full text-[#FFFFFF] font-black overflow-hidden relative">
                <div className="max-w-[1162px] flex flex-row justify-center items-center gap-20 py-20">
                    <div className="hidden lg:block">
                        <Image src={saza_gaza_together} alt="saza_gaza_together" />
                    </div>
                    <div className="flex flex-col justify-center items-start gap-5">
                        <div className="text-4xl">NEW MERCHANDISE!</div>
                        <div>"Dive into the dynamic world of Quadhash.”</div>

                        <div className="bg-[#FFFFFF] text-black py-2 px-4 border-1 rounded-full shadow-[_5px_5px_black]">
                            SHOP NOW
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
