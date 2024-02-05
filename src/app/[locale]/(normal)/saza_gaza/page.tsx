import Image from 'next/image'
import * as React from 'react'
import sazagazaImage from '/public/sazagaza_image1.png'
import insta from '/public/insta.png'
import saza from '/public/saza.png'
import sazagazaTogether from '/public/main_first_image.png'
import MarQueeTextComponent from '../components/main/MarqueeText'
import saza_gazaCase from '/public/saza_gaza_case.png'
import saza_gazaGiphy from '/public/saza_gaza_giphy.png'
import saza_gaza_giphy_frame from '/public/saza_gaza_giphy_frame.png'
import saza_gaza_giphy_image from '/public/saza_gaza_giphy_image.png'

import aboutdoo2 from '/public/about_doo2.png'
import about_craig_karl from '/public/about_craig_karl.png'
import about_burton_morris from '/public/about_burton_morris.png'

import januaryImage from '/public/saza_gaza_month1.png'
import februaryImage from '/public/saza_gaza_month2.png'
import marchImage from '/public/saza_gaza_month3.png'

export interface ISazaAndGazaPageProps {}

export default function SazaAndGazaPage(props: ISazaAndGazaPageProps) {
    return (
        <>
            <div className="w-full bg-[#FFCD19] flex flex-col justify-center items-center min-h-[500px] relative">
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
            <div className="w-full bg-[#FEFAE0] min-h-[500px]"></div>

            <div className="w-full flex flex-col items-center pt-28">
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

                    <div className="bg-[#FFFFFF] border-black text-black py-2 px-4 border-2 rounded-full shadow-[_5px_5px_black] flex flex-row justify-center items-center gap-2">
                        <div>
                            <Image src={insta} alt="insta_icon" />
                        </div>
                        <div>Follow Us @saza.gaza</div>
                    </div>
                </div>
                <div>
                    <Image src={sazagazaTogether} width={500} alt="sazagazaTogether " />
                </div>
            </div>
            <MarQueeTextComponent text={'A NEW ERA OF CREATIVITY # '} />
            <div className="max-w-[1250px] flex flex-col items-center pt-28">
                <div className="flex flex-col justify-center items-center font-black gap-10 text-center">
                    <div className="text-5xl text-[#0065F2]">MEET US AT THE</div>
                    <div className="text-5xl text-[#0065F2]">SAZA&GAZA STORE</div>
                    <div>A More Fun Way to Express Feelings, with Saza&Gaza.</div>

                    <div className="bg-[#FFFFFF] border-black text-black py-2 px-4 border-2 rounded-full shadow-[_5px_5px_black] flex flex-row justify-center items-center gap-2">
                        <div>
                            <Image src={saza} alt="saza_icon" />
                        </div>
                        <div>Go to Saza&Gaza Store</div>
                    </div>
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
                </div>
                <div className="flex flex-row justify-between items-center font-black w-full mt-60">
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
                </div>
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
        </>
    )
}
