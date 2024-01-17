import * as React from 'react'

export interface IMainBottomProps {}

export default function MainBottom(props: IMainBottomProps) {
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="flex flex-row justify-start items-center flex-wrap">
                    <div className="w-[20%]">
                        <img
                            className="w-full h-auto"
                            src="/main_bottom_image1.svg"
                            alt="main_bottom_image1"
                        />
                    </div>
                    <div className="w-[20%]">
                        <img
                            className="w-full h-auto"
                            src="/main_bottom_image2.svg"
                            alt="main_bottom_image2"
                        />
                    </div>
                    <div className="w-[20%]">
                        <img
                            className="w-full h-auto"
                            src="/main_bottom_image3.svg"
                            alt="main_bottom_image3"
                        />
                    </div>
                    <div className="w-[20%]">
                        <img
                            className="w-full h-auto"
                            src="/main_bottom_image4.svg"
                            alt="main_bottom_image4"
                        />
                    </div>
                    <div className="w-[20%]">
                        <img
                            className="w-full h-auto"
                            src="/main_bottom_image5.svg"
                            alt="main_bottom_image5"
                        />
                    </div>
                    <div className="w-[20%]">
                        <img
                            className="w-full h-auto"
                            src="/main_bottom_image6.svg"
                            alt="main_bottom_image6"
                        />
                    </div>
                    <div className="w-[20%]">
                        <img
                            className="w-full h-auto"
                            src="/main_bottom_image7.svg"
                            alt="main_bottom_image7"
                        />
                    </div>
                    <div className="w-[20%]">
                        <img
                            className="w-full h-auto"
                            src="/main_bottom_image8.svg"
                            alt="main_bottom_image8"
                        />
                    </div>
                    <div className="w-[20%]">
                        <img
                            className="w-full h-auto"
                            src="/main_bottom_image9.svg"
                            alt="main_bottom_image9"
                        />
                    </div>
                    <div className="w-[20%]">
                        <img
                            className="w-full h-auto"
                            src="/main_bottom_image10.svg"
                            alt="main_bottom_image10"
                        />
                    </div>
                </div>

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
