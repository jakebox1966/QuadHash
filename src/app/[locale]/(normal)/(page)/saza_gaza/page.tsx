import Image from 'next/image'
import * as React from 'react'
import sazagazaImage from '/public/sazagaza_image1.png'
import insta from '/public/insta.png'
import saza from '/public/saza.png'
import sazagazaTogether from '/public/main_first_image.png'
import MarQueeTextComponent from '../../components/main/MarqueeText'
import saza_gazaCase from '/public/saza_gaza_case.png'
import saza_gazaCaseMobile from '/public/saza_gaza_case_mobile.png'
import saza_gazaGiphy from '/public/saza_gaza_giphy.png'
import saza_gaza_giphy_frame from '/public/saza_gaza_giphy_frame.png'
import saza_gaza_giphy_image from '/public/saza_gaza_giphy_image.png'
import saza_gaza_giphy_image_mobile from '/public/saza_gaza_giphy_image_mobile.png'

import aboutdoo2 from '/public/about_doo2.png'
import about_craig_karl from '/public/about_craig_karl.png'
import about_burton_morris from '/public/about_burton_morris.png'

import januaryImage from '/public/saza_gaza_month1.png'
import februaryImage from '/public/saza_gaza_month2.png'
import marchImage from '/public/saza_gaza_month3.png'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'

export interface ISazaAndGazaPageProps {}

const { Link } = createSharedPathnamesNavigation({ locales })

export default function SazaAndGazaPage(props: ISazaAndGazaPageProps) {
    return (
        <>
            <div className="w-full bg-[#FFCD19] hidden lg:flex flex-col justify-center items-center min-h-[500px] relative">
                <div className="max-w-[1300px] flex flex-row gap-20 items-center absolute top-1/2 -translate-y-11 ">
                    <div className="bg-[#FFFFFF] rounded-lg py-8 px-2 font-black flex flex-col justify-center items-start gap-10 min-w-[525px] h-[400px] shadow-lg">
                        <div className="text-6xl flex flex-col justify-start gap-6">
                            <div>OPENING NEW</div>
                            <div>CHAPTERS</div>
                            <div>WITH EVERY</div>
                            <div>CHARACTER</div>
                        </div>
                    </div>
                    <div>
                        <Image
                            src={sazagazaImage}
                            alt="saza_gaza_together"
                            quality={100}
                            placeholder="blur"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full lg:block hidden bg-[#FEFAE0] min-h-[500px]"></div>
            <div className="w-full lg:flex hidden flex-col items-center pt-28 ">
                <div className="flex flex-col justify-center items-center font-black gap-10 text-center">
                    <div className="text-5xl text-[#0065F2]">OUR CREATIVE UNIVERSE</div>
                    <div className="">
                        <div>
                            "Our vision is to be the leading force in the IP-centric digital art
                        </div>
                        <div>world. We aim to create an immersive universe where each NFT</div>
                        <div>brings a piece of our story to life, engaging audiences with</div>
                        <div>innovative and interactive storytelling."</div>
                    </div>

                    <Link
                        href={'https://www.instagram.com/saza.gaza/'}
                        target="_blank"
                        className="bg-[#FFFFFF] border-black text-black py-2 px-4 border-2 rounded-full shadow-[_5px_5px_black] flex flex-row justify-center items-center gap-2">
                        <div>
                            <Image src={insta} alt="insta_icon" />
                        </div>
                        <div>Follow Us @saza.gaza</div>
                    </Link>
                </div>
                <div>
                    <Image src={sazagazaTogether} width={500} alt="sazagazaTogether " />
                </div>
            </div>
            <div className="lg:flex hidden">
                <MarQueeTextComponent text={'A NEW ERA OF CREATIVITY # '} />
            </div>
            <div className="max-w-[1250px] lg:flex hidden flex-col items-center pt-28">
                <div className="flex flex-col justify-center items-center font-black gap-10 text-center">
                    <div className="text-5xl text-[#0065F2]">MEET US AT THE</div>
                    <div className="text-5xl text-[#0065F2]">SAZA&GAZA STORE</div>
                    <div>A More Fun Way to Express Feelings, with Saza&Gaza.</div>

                    <Link
                        href={'https://www.sazagaza.co.kr/'}
                        target="_blank"
                        className="bg-[#FFFFFF] border-black text-black py-2 px-4 border-2 rounded-full shadow-[_5px_5px_black] flex flex-row justify-center items-center gap-2">
                        <div>
                            <Image src={saza} alt="saza_icon" />
                        </div>
                        <div>Go to Saza&Gaza Store</div>
                    </Link>
                </div>
                <div className="mt-20">
                    <Image src={saza_gazaCase} width={1250} alt="sazagazaTogether " />
                </div>
                <div className="flex flex-row justify-between items-center font-black w-full mt-60">
                    <div className="flex flex-col justify-center items-start gap-10">
                        <Image src={saza_gazaGiphy} alt="saza_gaza_giphy" />
                        <div className="text-5xl text-[#0065F2]">
                            <div>A COOLER WAY TO</div>
                            <div>CONVEY EMOTIONS</div>
                        </div>
                        <div>A More Fun Way to Express Feelings, with Saza&Gaza.</div>

                        <Link
                            href={'#'}
                            className="bg-[#FFFFFF] border-black text-black py-2 px-4 border-2 rounded-full shadow-[_5px_5px_black] flex flex-row justify-center items-center gap-2">
                            <Image src={saza_gaza_giphy_frame} alt="saza_gaza_giphy_frame" />
                            Explore the Collection
                        </Link>
                    </div>
                    <div>
                        <Image src={saza_gaza_giphy_image} alt="saza_gaza_giphy_image" />
                    </div>
                </div>
                {/* <div className="flex flex-row justify-between items-center font-black w-full mt-60">
                    <div className="flex flex-col justify-center items-start gap-10">
                        <Image src={saza_gazaGiphy} alt="saza_gaza_giphy" />
                        <div className="text-5xl text-[#0065F2]">
                            <div>A COOLER WAY TO</div>
                            <div>CONVEY EMOTIONS</div>
                        </div>
                        <div>A More Fun Way to Express Feelings, with Saza&Gaza.</div>
                        <div>
                            <div className="bg-[#FFFFFF] border-black text-black py-2 px-4 border-2 rounded-full shadow-[_5px_5px_black] flex flex-row justify-center items-center gap-2">
                                <Image src={saza_gaza_giphy_frame} alt="saza_gaza_giphy_frame" />
                                Explore the Collection
                            </div>
                        </div>
                    </div>
                    <div>
                        <Image src={saza_gaza_giphy_image} alt="saza_gaza_giphy_image" />
                    </div>
                </div> */}
                <div className="w-full flex flex-col items-center mt-60">
                    <div className="flex flex-col justify-center items-center text-5xl font-black text-[#0065F2]">
                        <div>BRING THE WORLD OF</div>
                        <div>SAZA&GAZA TO YOUR SCREEN</div>
                    </div>
                    <div className="grid grid-cols-3 mt-10 gap-2">
                        <div className="flex flex-col justify-center items-center overflow-hidden border-2">
                            <Image src={januaryImage} alt="about_doo2" />
                            <div className="text-center mt-3 text-[#0065F2]">
                                <div className="font-black">2024 January</div>
                                <div className="text-xs lg:text-sm font-normal">
                                    <div>Winter Magic Captured by SAZA and </div>
                                    <div>GAZA's Playful Spirits</div>
                                </div>
                            </div>
                            <div className="bg-[#FFFFFF] border-black text-black my-20 py-2 px-4 border-2 rounded-full shadow-[_5px_5px_black] flex flex-row justify-center items-center">
                                DOWNLOAD NOW
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center overflow-hidden border-2">
                            <Image src={februaryImage} alt="about_doo2" />
                            <div className="text-center mt-3 text-[#0065F2]">
                                <div className="font-black">2024 February</div>
                                <div className="text-xs lg:text-sm font-normal">
                                    <div>"Embrace the Warmth of Lunar New Year</div>
                                    <div>with SAZA and GAZA"</div>
                                </div>
                            </div>
                            <div className="bg-[#FFFFFF] border-black text-black my-20 py-2 px-4 border-2 rounded-full shadow-[_5px_5px_black] flex flex-row justify-center items-center">
                                DOWNLOAD NOW
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center overflow-hidden border-2 ">
                            <Image src={marchImage} alt="about_doo2" />
                            <div className="text-center mt-3 text-[#0065F2]">
                                <div className="font-black">2024 March</div>
                                <div className="text-xs lg:text-sm font-normal">Coming Soon!</div>
                                <div className="invisible">/</div>
                            </div>
                            <div className="bg-[#FFFFFF] border-black text-black my-20 py-2 px-4 border-2 rounded-full shadow-[_5px_5px_black] flex flex-row justify-center items-center">
                                DOWNLOAD NOW
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full min-h-[560px] bg-[#FFCD19] flex lg:hidden flex-col justify-center items-center">
                <div className="max-w-[391px] text-[#FFFFFF] text-3xl font-black text-center">
                    <div>OPENING NEW</div>
                    <div>CHAPTERS WITH</div>
                    <div>EVERY</div>
                    <div>CHARACTER</div>
                </div>
            </div>
            <div className="w-full min-h-[168px] bg-[#FEFAE0] flex lg:hidden  flex-col justify-center items-center relative">
                <div className="w-[264px] h-[247px] absolute -top-48">
                    <Image src={sazagazaImage} fill alt="sazagazaImage" />
                </div>
            </div>
            <div className="flex lg:hidden flex-col justify-center items-center py-20">
                <div className="max-w-[330px]">
                    <div className="flex flex-col items-start gap-7">
                        <div>
                            <div className="text-3xl font-black text-[#0065F2]">OUR CREATIVE</div>
                            <div className="text-3xl font-black text-[#0065F2]">UNIVERSE</div>
                        </div>
                        <div className="font-medium">
                            <div>"Our vision is to be the leading force in</div>
                            <div>the IP-centric digital art world. We aim </div>
                            <div>to create an immersive universe </div>
                            <div>where each NFT brings a piece of our</div>
                            <div>story to life, engaging audiences with</div>
                            <div>innovative and interactive </div>
                            <div>storytelling."</div>
                        </div>

                        <div className="flex flex-row items-center rounded-full border-2 border-black py-2 px-3 shadow-[5px_5px_black] gap-2">
                            <div>
                                <Image src={insta} alt="insta_icon" />
                            </div>
                            <div>Follow Us @saza.gaza</div>
                        </div>
                    </div>

                    <div className="pt-20">
                        <Image src={sazagazaTogether} alt={'sazagazaTogether'} />
                    </div>
                </div>
            </div>
            <div className="lg:hidden w-full">
                <MarQueeTextComponent text={'A NEW ERA OF CREATIVITY # '} />
            </div>
            <div className="flex flex-col justify-center items-center py-20 lg:hidden ">
                <div className="max-w-[330px]">
                    <div className="flex flex-col items-start gap-7">
                        <div>
                            <div className="text-3xl font-black text-[#0065F2]">MEET US AT THE</div>
                            <div className="text-3xl font-black text-[#0065F2]">SAZA&GAZA</div>
                            <div className="text-3xl font-black text-[#0065F2]">STORE</div>
                        </div>
                        <div className="font-medium">
                            <div>A More Fun Way to Express Feelings, </div>
                            <div>with Saza&Gaza.</div>
                        </div>

                        <div className="flex flex-row items-center rounded-full border-2 border-black py-2 px-3 shadow-[5px_5px_black] gap-2">
                            <div>
                                <Image src={saza} alt="saza_icon" />
                            </div>
                            <div>Go to Saza&Gaza Store</div>
                        </div>
                    </div>

                    <div className="pt-20 relative">
                        <Image src={saza_gazaCaseMobile} alt={'saza_gazaCase'} />
                    </div>
                </div>
            </div>

            <div className="flex lg:hidden flex-col justify-center items-center py-10">
                <div className="max-w-[330px]">
                    <div className="flex flex-col items-start gap-7">
                        <div>
                            <div className="text-3xl font-black text-[#0065F2]">A COOLER WAY</div>
                            <div className="text-3xl font-black text-[#0065F2]">TO CONVEY</div>
                            <div className="text-3xl font-black text-[#0065F2]">EMOTIONS</div>
                        </div>
                        <div className="font-medium">
                            <div>A More Fun Way to Express Feelings, </div>
                            <div>with Saza&Gaza.</div>
                        </div>

                        <div className="flex flex-row items-center rounded-full border-2 border-black py-2 px-3 shadow-[5px_5px_black] gap-2">
                            <div>
                                <Image src={saza_gaza_giphy_frame} alt="saza_icon" />
                            </div>
                            <div>Explore the Collection</div>
                        </div>
                    </div>

                    <div className="pt-20 relative">
                        <Image src={saza_gaza_giphy_image_mobile} alt={'saza_gazaCase'} />
                    </div>
                </div>
            </div>
            <div className="flex lg:hidden flex-col justify-center items-center py-10">
                <div className="max-w-[330px]">
                    <div className="flex flex-col items-start gap-7">
                        <div>
                            <div className="text-3xl font-black text-[#0065F2]">BRING THE</div>
                            <div className="text-3xl font-black text-[#0065F2]">WORLD OF</div>
                            <div className="text-3xl font-black text-[#0065F2]">SAZA&GAZA TO</div>
                            <div className="text-3xl font-black text-[#0065F2]">YOUR SCREEN</div>
                        </div>

                        <div className="flex flex-col justify-center items-center overflow-hidden py-10 gap-4">
                            <Image src={januaryImage} alt="januaryImage" />

                            <div className="font-black text-center text-[#0065F2]">2024 March</div>
                            <div className="text-xs lg:text-sm font-normal text-center text-[#0065F2]">
                                <div>Winter Magic Captured by SAZA and </div>
                                <div>GAZA's Playful Spirits</div>
                            </div>

                            <div className="bg-[#FFFFFF] border-black text-black py-2 px-4 border-2 rounded-full shadow-[_5px_5px_black] flex flex-row justify-center items-center">
                                DOWNLOAD NOW
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center overflow-hidden py-10 gap-4">
                            <Image src={februaryImage} alt="februaryImage" />

                            <div className="font-black text-center text-[#0065F2]">2024 March</div>
                            <div className="text-xs lg:text-sm font-normal text-center text-[#0065F2]">
                                <div>"Embrace the Warmth of Lunar New Year</div>
                                <div>with SAZA and GAZA"</div>
                            </div>

                            <div className="bg-[#FFFFFF] border-black text-black py-2 px-4 border-2 rounded-full shadow-[_5px_5px_black] flex flex-row justify-center items-center">
                                DOWNLOAD NOW
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center overflow-hidden py-10 gap-4">
                            <Image src={marchImage} alt="marchImage" />

                            <div className="font-black text-center text-[#0065F2]">2024 March</div>
                            <div className="text-xs lg:text-sm font-normal text-center text-[#0065F2]">
                                Coming Soon!
                            </div>

                            <div className="bg-[#FFFFFF] border-black text-black py-2 px-4 border-2 rounded-full shadow-[_5px_5px_black] flex flex-row justify-center items-center">
                                DOWNLOAD NOW
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
