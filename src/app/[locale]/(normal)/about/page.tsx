'use client'

import Image from 'next/image'
import * as React from 'react'
import aboutFirstImage from '/public/main_second_image.png'
import aboutSaza from '/public/about_saza.png'
import aboutdoo2 from '/public/about_doo2.png'
import about_craig_karl from '/public/about_craig_karl.png'
import about_burton_morris from '/public/about_burton_morris.png'

export interface IAboutPageProps {}

export default function AboutPage(props: IAboutPageProps) {
    return (
        <>
            <div className="w-full bg-[#FFCD19] flex flex-col justify-center items-center min-h-[500px] relative">
                <div className="max-w-[1300px] flex flex-row gap-20 items-center absolute -bottom-44">
                    <div className="bg-[#FFFFFF] rounded-lg py-20 px-2 font-black flex flex-col justify-center items-start gap-10 min-w-[525px] shadow-lg">
                        <div className="text-7xl">
                            <div>OUR</div>
                            <div>JOURNEY</div>
                        </div>
                        <div className="text-md">"Dive into the dynamic world of Quadhash.”</div>
                    </div>
                    <div>
                        <Image
                            src={aboutFirstImage}
                            alt="saza_gaza_together"
                            quality={100}
                            placeholder="blur"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full bg-[#FEFAE0] min-h-[400px]"></div>
            <div className="w-full bg-[#FFAE35] min-h-[670px] ">
                <div className="flex flex-row items-center justify-center">
                    <div className="min-w-[775px] flex flex-col justify-center items-start font-black gap-10 px-20">
                        <div className="text-7xl">OUR MISSION</div>
                        <div className="text-md">
                            <div>
                                "At Quadhash, we aim to create a unique ecosystem where art,
                                technology,
                            </div>
                            <div>
                                and intellectual property intersect. Leveraging blockchain for
                                authenticity,
                            </div>
                            <div>
                                we integrate our original IP to give each piece a unique narrative
                                and
                            </div>
                            <div>identity."</div>
                        </div>
                    </div>
                    <div className="invisible">
                        <Image src={aboutFirstImage} alt="saza_gaza_together" placeholder="blur" />
                    </div>
                </div>
            </div>
            <div className="w-full bg-[#FFCD19] min-h-[670px] flex flex-col justify-center items-center">
                <div className="flex flex-row items-between justify-center relative max-w-[1325px] gap-40">
                    <div className="min-w-[775px] flex flex-col justify-center items-start font-black gap-10 px-20">
                        <div className="text-7xl">OUR VISION</div>
                        <div className="text-md">
                            <div>
                                "Our vision is a digital art world where artworks are experiences.
                                With our
                            </div>
                            <div>
                                original IPs, we’re crafting immersive narratives, creating a
                                universe where
                            </div>
                            <div>
                                art goes beyond visuals into the realm of interactive storytelling."
                            </div>
                        </div>
                    </div>
                    <div className="invisible">
                        <Image
                            src={aboutFirstImage}
                            alt="saza_gaza_together"
                            quality={100}
                            placeholder="blur"
                        />
                    </div>
                    <div>
                        <Image
                            src={aboutSaza}
                            alt="about_saza"
                            placeholder="blur"
                            className="absolute -top-[500px] right-10"
                        />
                    </div>
                </div>
            </div>

            <div className="min-h-[1064px] bg-[#00B0FF] w-full flex flex-col items-center text-[#FFFFFF] ">
                <div className="max-w-[1102px] pt-48 font-black">
                    <div className="flex flex-col justify-center items-center gap-7">
                        <div className="text-7xl">MEET THE QUADHASH TEAM</div>
                        <div>At Quadhash, Our Team Fosters the Fusion of Art and Technology</div>
                    </div>
                    <div className="flex flex-col justify-center items-center text-white font-black ">
                        <div className="grid grid-cols-3 mt-10 gap-6 px-12">
                            <div className="flex flex-col justify-center items-center rounded-3xl overflow-hidden">
                                <Image src={aboutdoo2} alt="about_doo2" />
                                <div className="text-center mt-3">
                                    <div>IAMDOO2</div>
                                    <div className="text-xs lg:text-sm font-normal">FOUNDER</div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center rounded-3xl overflow-hidden">
                                <Image src={about_craig_karl} alt="about_doo2" />
                                <div className="text-center mt-3">
                                    <div>CRAIG & KARL</div>
                                    <div className="text-xs lg:text-sm font-normal">DESIGNER</div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center rounded-3xl overflow-hidden">
                                <Image src={about_burton_morris} alt="about_doo2" />
                                <div className="text-center mt-3">
                                    <div>BURTON MORRIS</div>
                                    <div className="text-xs lg:text-sm font-normal">
                                        CREATIVE DIRECTOR
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
