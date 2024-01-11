import * as React from 'react'

export interface IMainBottomProps {}

export default function MainBottom(props: IMainBottomProps) {
    return (
        <>
            <section
                className="flex flex-col justify-center items-center bg-[#FFCD19] w-full"
                style={{ borderRadius: '80% / 150px' }}>
                <div className="w-full">
                    <div className="flex flex-col justify-center items-center font-black text-2xl px-12 pt-20">
                        <div>
                            <img src="/main_bottom_image1.svg" alt="main_bottom_image1" />
                        </div>
                        <div className="flex flex-col justify-center items-center font-black text-white text-lg lg:text-2xl pt-14">
                            <div>QUADHASH ARE 20,000 UNIQUE</div>
                            <div>COLLECTIBLE.</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-5 mt-20">
                        <div className='flex flex-col justify-center items-center bg-[url("/main_bottom_image2.svg")] bg-cover bg-no-repeat'>
                            <img src="/main_bottom_image2_1.svg" alt="main_bottom_image2_1" />
                        </div>

                        <div>
                            <img src="/main_bottom_image3.svg" alt="main_bottom_image3" />
                        </div>

                        <div>
                            <img src="/main_bottom_image4.svg" alt="main_bottom_image4" />
                        </div>

                        <div className="flex flex-col justify-center items-center bg-[#0071E3] bg-cover bg-no-repeat">
                            <img src="/main_bottom_image5_1.svg" alt="main_bottom_image5_1" />
                        </div>

                        <div>
                            <img src="/main_bottom_image6.svg" alt="main_bottom_image6" />
                        </div>
                        <div>
                            <img src="/main_bottom_image7.svg" alt="main_bottom_image7" />
                        </div>

                        <div className="flex flex-col justify-center items-center bg-white">
                            <img src="/main_bottom_image8_1.svg" alt="main_bottom_image8_1" />
                        </div>
                        <div>
                            <img src="/main_bottom_image4.svg" alt="main_bottom_image4" />
                        </div>
                        <div>
                            <img src="/main_bottom_image9.svg" alt="main_image9" />
                        </div>
                        <div className="bg-white"></div>
                    </div>
                    <div className="flex flex-col justify-center items-center text-white font-black mt-24 ">
                        <div className="text-lg lg:text-3xl">Meet The QUADHASH Team</div>
                        <div className="grid grid-cols-4 mt-10 gap-6 px-12 pb-40">
                            <div className="flex flex-col justify-center items-center rounded-3xl overflow-hidden">
                                <img src="/main_bottom_image3.svg" alt="main_bottom_image3" />
                                <div className="text-center mt-3">
                                    <div>Doo</div>
                                    <div className="text-xs lg:text-sm font-normal">
                                        Art Director
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center rounded-3xl overflow-hidden">
                                <img src="/main_bottom_image3.svg" alt="main_bottom_image3" />
                                <div className="text-center mt-3">
                                    <div>Doo</div>
                                    <div className="text-xs lg:text-sm font-normal">
                                        Art Director
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center rounded-3xl overflow-hidden">
                                <img src="/main_bottom_image3.svg" alt="main_bottom_image3" />
                                <div className="text-center mt-3">
                                    <div>Doo</div>
                                    <div className="text-xs lg:text-sm font-normal">
                                        Art Director
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center rounded-3xl overflow-hidden">
                                <img src="/main_bottom_image3.svg" alt="main_bottom_image3" />
                                <div className="text-center mt-3">
                                    <div>Doo</div>
                                    <div className="text-xs lg:text-sm font-normal">
                                        Art Director
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
