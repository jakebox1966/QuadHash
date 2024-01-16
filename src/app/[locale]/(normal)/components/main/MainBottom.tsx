import * as React from 'react'

export interface IMainBottomProps {}

export default function MainBottom(props: IMainBottomProps) {
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="flex flex-row justify-start items-center">
                    <div className="w-[calc(25%-5px)]">
                        <img src="/test1.svg" alt="" />
                    </div>
                    <div className="w-[calc(25%-5px)]">
                        <img src="/test1.svg" alt="" />
                    </div>
                    <div className="w-[calc(25%-5px)]">
                        <img src="/test1.svg" alt="" />
                    </div>
                    <div className="w-[calc(25%-5px)]">
                        <img src="/test1.svg" alt="" />
                    </div>
                    <div className="w-[calc(25%-5px)]">
                        <img src="/test1.svg" alt="" />
                    </div>
                </div>
                {/* <div className="grid grid-cols-5 w-full">
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
                </div> */}
                <div className="flex flex-col justify-center items-center text-white font-black mt-24 ">
                    <div className="text-lg lg:text-3xl text-[#F46221]">Meet The QUADHASH Team</div>
                    <div className="grid grid-cols-4 mt-10 gap-6 px-12">
                        <div className="flex flex-col justify-center items-center rounded-3xl overflow-hidden">
                            <img src="/main_bottom_image3.svg" alt="main_bottom_image3" />
                            {/* <div className="text-center mt-3">
                                <div>Doo</div>
                                <div className="text-xs lg:text-sm font-normal">Art Director</div>
                            </div> */}
                        </div>
                        <div className="flex flex-col justify-center items-center rounded-3xl overflow-hidden">
                            <img src="/main_bottom_image3.svg" alt="main_bottom_image3" />
                            {/* <div className="text-center mt-3">
                                <div>Doo</div>
                                <div className="text-xs lg:text-sm font-normal">Art Director</div>
                            </div> */}
                        </div>
                        <div className="flex flex-col justify-center items-center rounded-3xl overflow-hidden">
                            <img src="/main_bottom_image3.svg" alt="main_bottom_image3" />
                            {/* <div className="text-center mt-3">
                                <div>Doo</div>
                                <div className="text-xs lg:text-sm font-normal">Art Director</div>
                            </div> */}
                        </div>
                        <div className="flex flex-col justify-center items-center rounded-3xl overflow-hidden">
                            <img src="/main_bottom_image3.svg" alt="main_bottom_image3" />
                            {/* <div className="text-center mt-3">
                                <div>Doo</div>
                                <div className="text-xs lg:text-sm font-normal">Art Director</div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
