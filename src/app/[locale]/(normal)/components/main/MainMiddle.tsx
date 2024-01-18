import Image from 'next/image'
import * as React from 'react'
import main_image1 from '/public/main_middle_image1.png'
import main_image2 from '/public/main_middle_image2.png'
import main_image3 from '/public/main_middle_image3.png'

export interface IMainMiddleProps {}

export default function MainMiddle(props: IMainMiddleProps) {
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center mt-28">
                <div className="flex flex-row justify-between items-start max-w-[1296px] w-full px-10 lg:px-28 text-[#F46221] font-black">
                    <div className="text-xs md:text-xl lg:text-3xl">
                        <div>WE PRESENT A COLLECTION</div>

                        <div>OF EXCLUSIVE AND UNIQUE</div>

                        <div>WORKS</div>
                    </div>
                    <div className="text-lg  md:text-3xl lg:text-5xl">
                        <div>WELCOME</div>
                        <div>TO THE</div>
                        <div>QUADHASH</div>
                    </div>
                </div>

                <div className="flex flex-col justify-stretch items-center max-w-[1296px] w-full px-10 lg:px-28 gap-4 mt-10 text-white">
                    <div className="w-full relative">
                        <Image src={main_image1} alt="main_middle_image1" />
                        <div className="flex flex-col justify-center items-start absolute bottom-8 left-8 lg:bottom-10 lg:left-10 gap-1">
                            <div className="lg:text-2xl">About</div>
                            <div className="bg-[#F46221] text-xs lg:text-lg p-2 lg:p-4 rounded-full">
                                MEET THE QUADHASH
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center gap-4">
                        <div className="flex-1 relative">
                            <Image src={main_image2} alt="main_middle_image2" sizes="100vw" />
                            <div className="flex flex-col justify-center items-start absolute bottom-8 left-8 lg:bottom-10 lg:left-10 gap-1">
                                <div className="lg:text-2xl">Saza and Gaza</div>
                                <div className="bg-[#F46221] text-xs lg:text-lg p-2 lg:p-4 rounded-full">
                                    MEET THE QUADHASH
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <Image src={main_image3} alt="main_middle_image3" sizes="100vw" />
                            <div className="flex flex-col justify-center items-start absolute bottom-8 left-8 lg:bottom-10 lg:left-10 gap-1">
                                <div className="lg:text-2xl">백서???</div>
                                <div className="bg-[#F46221] text-xs lg:text-lg p-2 lg:p-4 rounded-full">
                                    MEET THE QUADHASH
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
