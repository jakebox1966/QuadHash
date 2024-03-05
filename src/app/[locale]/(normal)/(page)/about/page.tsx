'use client'

import Image from 'next/image'
import * as React from 'react'
import aboutFirstImage from '/public/main_second_image.png'
import aboutSaza from '/public/about_saza.png'
import aboutdoo2 from '/public/about_doo2.png'
import about_craig_karl from '/public/about_craig_karl.png'
import about_burton_morris from '/public/about_burton_morris.png'
import MarQueeTextComponent from '../../components/main/MarqueeText'

export interface IAboutPageProps {}

export default function AboutPage(props: IAboutPageProps) {
    return (
        <>
            <div className="w-full bg-[#FFCD19] hidden lg:flex flex-col justify-center items-center min-h-[500px] relative">
                <div className="max-w-[1400px] w-full px-[50px] absolute -bottom-56">
                    <div className="max-w-[1300px] flex flex-row justify-between items-center  w-full">
                        <div className="bg-[#FFFFFF] rounded-lg pt-[40px] pb-[82px] px-[25px] font-black flex flex-col justify-center items-start gap-[32px] w-[525px] h-[400px] shadow-lg">
                            <div className="text-[51.9px] font-['#NeuePlak'] font-black leading-[72px]">
                                <div>OUR</div>
                                <div>JOURNEY</div>
                            </div>
                            <div className="text-[20px]">
                                "Dive into the dynamic world of Quadhash.”
                            </div>
                        </div>

                        <div className="">
                            <Image
                                src={aboutFirstImage}
                                alt="saza_gaza_together"
                                quality={100}
                                width={664}
                                height={660}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-[#FFCD19] lg:hidden flex flex-col items-center min-h-[552px] relative pt-[154.21px]">
                <div className="min-w-[330px] flex flex-col justify-center items-center gap-[27px] text-[#FFFFFF] ">
                    <div className="text-center font-black text-[35px] leading-[37px]">
                        <div>OUR</div>
                        <div>JOURNEY</div>
                    </div>
                    <div className="text-center font-medium">
                        <div>"Dive into the dynamic world of </div>
                        <div>Quadhash.”</div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-[#FEFAE0] min-h-[211px] lg:min-h-[400px] flex flex-col items-center">
                <div className="min-w-[330px] relative lg:hidden">
                    <div className="absolute -top-[230px]">
                        <Image src={aboutFirstImage} alt="saza_gaza_together" quality={100} />
                    </div>
                </div>
            </div>
            <div className="hidden w-full bg-[#FFAE35] h-[670px] lg:flex flex-col justify-start items-center pt-[95px]">
                <div className="max-w-[1400px] px-[50px] w-full">
                    <div className="max-w-[1300px] w-full relative">
                        <div className="min-w-[775px] flex flex-col justify-center items-start font-black gap-10">
                            <div className="text-[51.9px]">OUR MISSION</div>
                            <div className="text-[20px] flex flex-row">
                                <div className="text-nowrap">
                                    <div>
                                        "At Quadhash, we aim to create a unique ecosystem where art,
                                        technology,
                                    </div>
                                    <div>
                                        and intellectual property intersect. Leveraging blockchain
                                        for authenticity,
                                    </div>
                                    <div>
                                        we integrate our original IP to give each piece a unique
                                        narrative and
                                    </div>
                                    <div>identity."</div>
                                </div>
                                <div className="translate-y-28">
                                    <Image
                                        src={aboutSaza}
                                        alt="aboutSaza"
                                        width={548}
                                        height={661}
                                        quality={100}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden w-full bg-[#FFCD19] min-h-[670px] lg:flex flex-col justify-start items-center pt-[95px]">
                <div className="max-w-[1400px] px-[50px] w-full">
                    <div className="max-w-[1330px] w-full">
                        <div className="min-w-[775px] flex flex-col justify-center items-start font-black gap-10">
                            <div className="text-[51.9px]">OUR VISION</div>
                            <div className="text-[20px]">
                                <div>
                                    "Our vision is a digital art world where artworks are
                                    experiences. With our
                                </div>
                                <div>
                                    original IPs, we’re crafting immersive narratives, creating a
                                    universe where
                                </div>
                                <div>
                                    art goes beyond visuals into the realm of interactive
                                    storytelling."
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:hidden flex flex-col w-full items-center justify-center bg-[#FFAE35] min-h-[552px] text-[#FFFFFF]">
                <div className="flex flex-col items-center relative">
                    <div className="w-[330px] flex flex-col justify-center items-start font-black gap-[27px]">
                        <div className="text-[35px] font-['#NeuePlak'] leading-[37px]">
                            <div>OUR</div>
                            <div>MISSION</div>
                        </div>
                        <div className="text-[17px]">
                            <div>
                                "At Quadhash, we aim to create a unique ecosystem where art,
                                technology, and intellectual property
                            </div>
                            <div>
                                intersect. Leveraging blockchain for authenticity, we integrate our
                                original
                            </div>
                            <div>IP to give each piece a unique narrative and identity."</div>
                        </div>
                    </div>
                    <div className="absolute w-[180px] h-[217px] bottom-[-230px] right-0">
                        <Image src={aboutSaza} alt="aboutSaza" fill />
                    </div>
                </div>
            </div>
            <div className="lg:hidden flex flex-col w-full items-center justify-center bg-[#FFCD19] min-h-[552px] text-[#FFFFFF]">
                <div className="max-w-[390px] flex flex-col items-center">
                    <div className="w-[330px] flex flex-col justify-center items-start font-black gap-[27px]">
                        <div className="text-[35px] font-['#NeuePlak'] leading-[37px]">
                            <div>OUR</div>
                            <div>VISION</div>
                        </div>
                        <div className="text-[17px]">
                            <div>"Our vision is a digital art world where</div>

                            <div>artworks are experiences. With our</div>

                            <div>original IPs, we’re crafting immersive</div>

                            <div>narratives, creating a universe where</div>

                            <div>art goes beyond visuals into the realm</div>

                            <div>of interactive storytelling."</div>
                        </div>
                    </div>
                </div>
            </div>
            <MarQueeTextComponent text={"LET'S WORK TOGETHER"} />

            <div className="hidden min-h-[1064px] bg-[#00B0FF] w-full lg:flex flex-col items-center text-[#FFFFFF] ">
                <div className="max-w-[1102px] py-[231px] font-black">
                    <div className="flex flex-col justify-center items-center gap-[28px] font-['#NeuePlak']">
                        <div className="text-[56px]">MEET THE QUADHASH TEAM</div>
                        <div className="text-[20px]">
                            At Quadhash, Our Team Fosters the Fusion of Art and Technology
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center text-white font-black mt-[40px]">
                        <div className="grid grid-cols-3 gap-[32.48px] px-12 w-full">
                            <div className="flex flex-col justify-center items-center rounded-3xl overflow-hidden">
                                <Image src={aboutdoo2} alt="about_doo2" />
                                <div className="text-center mt-[38.65px]">
                                    <div className="font-['#NeuePlak'] text-[18px]">IAMDOO2</div>
                                    <div className="font-['#PlusJakartaSans'] text-[14px] lg:text-sm font-normal mt-[6.54px]">
                                        FOUNDER
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center rounded-3xl overflow-hidden">
                                <Image src={about_craig_karl} alt="about_doo2" />
                                <div className="text-center mt-[38.65px]">
                                    <div className="font-['#NeuePlak'] text-[18px]">
                                        CRAIG & KARL
                                    </div>
                                    <div className="font-['#PlusJakartaSans'] text-[14px] lg:text-sm font-normal mt-[6.54px]">
                                        DESIGNER
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center rounded-3xl overflow-hidden">
                                <Image src={about_burton_morris} alt="about_doo2" />
                                <div className="text-center mt-[38.65px]">
                                    <div className="font-['#NeuePlak'] text-[18px]">
                                        BURTON MORRIS
                                    </div>
                                    <div className="font-['#PlusJakartaSans'] text-[14px] lg:text-sm font-normal mt-[6.54px]">
                                        CREATIVE DIRECTOR
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:hidden flex flex-col w-full items-center justify-center bg-[#00B0FF] py-36 text-[#FFFFFF]">
                <div className="max-w-[390px] flex flex-col items-center">
                    <div className="w-[330px] flex flex-col justify-center items-start font-black gap-10">
                        <div className="text-[35px] font-['#NeuePlak'] leading-[37px]">
                            <div>MEET THE</div>
                            <div>QUADHASH</div>
                            <div>TEAM</div>
                        </div>
                        <div className="text-[17px] font-medium">
                            <div>At Quadhash, Our Team Fasters the</div>
                            <div>Fusion of Art and Technology</div>
                        </div>

                        <div className="flex flex-col justify-center items-center">
                            <div className="relative w-[300] h-[300]">
                                <Image src={aboutdoo2} alt={'aboutdoo2'} />
                            </div>
                            <div className="mt-[39px] text-[18px] font-['#NeuePlak']">IAMDOO2</div>
                            <div className="font-['#PlusJakartaSans'] text-[14px] font-medium mt-[6.54px]">
                                FOUNDER
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div className="relative w-[300] h-[300]">
                                <Image src={about_craig_karl} alt={'about_craig_karl'} />
                            </div>
                            <div className="mt-[39px] text-[18px] font-['#NeuePlak']">
                                CRAIG & KARL
                            </div>
                            <div className="font-['#PlusJakartaSans'] text-[14px] font-medium mt-[6.54px]">
                                DESIGNER
                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-center">
                            <div className="relative w-[300] h-[300]">
                                <Image src={about_burton_morris} alt={'about_burton_morris'} />
                            </div>
                            <div className="mt-[39px] text-[18px] font-['#NeuePlak']">
                                BURTON MORRIS
                            </div>
                            <div className="font-['#PlusJakartaSans'] text-[14px] font-medium mt-[6.54px]">
                                CREATIVE DIRECTOR
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
