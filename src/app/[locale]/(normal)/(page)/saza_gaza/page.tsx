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
import februaryImage from '/public/saza_gaza_month2.png'
import marchImage from '/public/saza_gaza_month3.png'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'
import { getCalendars } from '@/app/api/calendar/api'

export interface ISazaAndGazaPageProps {}

const { Link } = createSharedPathnamesNavigation({ locales })

export default async function SazaAndGazaPage(props: ISazaAndGazaPageProps) {
    const result = await getCalendars(1)

    const dataForRender = result.data.reverse()

    return (
        <>
            <div className="w-full bg-[#FFCD19] hidden lg:flex flex-col justify-center items-center min-h-[500px] relative">
                <div className="max-w-[1400px] w-full px-[50px] absolute -bottom-1/2">
                    <div className="max-w-[1300px] flex flex-row gap-20 justify-between items-center ">
                        <div className="bg-[#FFFFFF] rounded-lg py-8 px-[25px] font-black flex flex-col justify-center gap-10 min-w-[525px] h-[400px] shadow-lg">
                            <div className="text-[51.9px] flex flex-col justify-start leading-[72px] font-NeuePlak">
                                <div>OPENING NEW</div>
                                <div>CHAPTERS</div>
                                <div>WITH EVERY</div>
                                <div>CHARACTER</div>
                            </div>
                        </div>
                        <div className="-translate-y-10">
                            <Image src={sazagazaImage} alt="saza_gaza_together" quality={100} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full lg:block hidden bg-[#FEFAE0] min-h-[500px]"></div>
            <div className="w-full lg:flex hidden flex-col items-center pt-[160px]">
                <div className="flex flex-col justify-center items-center font-black gap-[28px] text-center">
                    <div className="text-[56px] text-[#0065F2] font-NeuePlak leading-[60px]">
                        OUR CREATIVE UNIVERSE
                    </div>
                    <div className="font-NanumSquare text-[19px] leading-[24px] tracking-[0.4px]">
                        <div>QUADHASH는 디지털 아트를 선도하는 리더를 꿈꿉니다.</div>
                        <div>
                            모든 NFT가 소유자와 상호작용하며, 각각의 고유한 이야기를 써 내려가는
                            몰입형 세계를 만들어 갑니다.
                        </div>
                    </div>

                    <Link
                        href={'https://www.instagram.com/saza.gaza/'}
                        target="_blank"
                        className="bg-[#FFFFFF] border-black text-[16px] text-center text-black border-[1px] py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black] flex flex-row justify-center items-center gap-2 mt-[12px]">
                        <div>
                            <Image src={insta} alt="insta_icon" />
                        </div>
                        <div>Follow Us @saza.gaza</div>
                    </Link>
                </div>
                <div className="mt-[60px]">
                    <Image src={sazagazaTogether} width={500} alt="sazagazaTogether " />
                </div>
            </div>
            <div className="lg:flex hidden w-full">
                <MarQueeTextComponent text={'A NEW ERA OF CREATIVITY'} space={true} />
            </div>
            <div className="max-w-[1400px] lg:flex hidden flex-col items-center pt-28 px-[50px]">
                <div className="flex flex-col justify-center items-center font-black text-center ">
                    <div className="leading-[60px] font-NeuePlak text-[56px]">
                        <div className="text-[#0065F2]">MEET US AT THE</div>
                        <div className="text-[#0065F2]">SAZA&GAZA STORE</div>
                    </div>
                    <div className="font-NanumSquare mt-[28px] text-[19px]">
                        QUADHASH의 또다른 IP 브랜드. ‘사자랑가자’의 스토어에 방문해보세요.
                    </div>

                    <Link
                        href={'https://www.sazagaza.co.kr/'}
                        target="_blank"
                        className="mt-[40px] bg-[#FFFFFF] border-black text-[16px] border-[1px] text-center text-black py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black] flex flex-row justify-center items-center gap-2">
                        <div>
                            <Image src={saza} alt="saza_icon" />
                        </div>
                        <div className="text-[16px]">Go to Saza&Gaza Store</div>
                    </Link>
                </div>
                <div className="mt-[100px]">
                    <img
                        className="w-[1250px]"
                        src={`${process.env.NEXT_PUBLIC_STORE_IMAGE_URL}/images/saza_gaza_store.png`}
                        alt={'saza_gaza_event'}
                    />
                </div>
                <div className="flex flex-row justify-between items-center font-black w-full mt-[314px]">
                    <div className="flex flex-col justify-center items-start gap-[25px] min-w-[616px]">
                        <Image src={saza_gazaGiphy} alt="saza_gaza_giphy" width={212} height={65} />
                        <div className="text-[#0065F2] font-NeuePlak text-[56px] leading-[60px]">
                            <div>A COOLER WAY TO</div>
                            <div>CONVEY EMOTIONS</div>
                        </div>
                        <div className="font-NeuePlak text-[20px]">
                            A More Fun Way to Express Feelings, with Saza&Gaza.
                        </div>

                        <Link
                            href={'https://giphy.com/sazagaza'}
                            target="_blank"
                            className="bg-[#FFFFFF] border-black text-[16px] border-[1px] text-center text-black py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black] flex flex-row justify-center items-center gap-2">
                            <Image src={saza_gaza_giphy_frame} alt="saza_gaza_giphy_frame" />
                            Explore the Collection
                        </Link>
                    </div>

                    <Image src={saza_gaza_giphy_image} alt="saza_gaza_giphy_image" />
                </div>

                <div className="w-full flex flex-col items-center mt-[340px]">
                    <div className="flex flex-col justify-center items-center text-[56px] font-black text-[#0065F2] font-NeuePlak leading-[60px]">
                        <div>BRING THE WORLD OF</div>
                        <div>SAZA&GAZA TO YOUR SCREEN</div>
                    </div>
                    <div className="grid grid-cols-3 mt-[47px] gap-[30px]">
                        {dataForRender &&
                            dataForRender.map((item) => (
                                <div className="flex flex-col justify-start items-center overflow-hidden border-2 mb-[79px]">
                                    <div className="relative  w-[394px] h-[436px]">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_STORE_IMAGE_URL}/${item.image}`}
                                            fill
                                            alt="about_doo2"
                                        />
                                    </div>
                                    <div className="text-center mt-3 text-[#0065F2] w-full min-h-[128px] px-[32px]">
                                        <div className="font-black font-NeuePlak text-[25px]">
                                            {item.title}
                                        </div>
                                        <div className="w-full text-[16px] font-normal mt-[16px] leading-[24px]">
                                            {item.content}
                                        </div>
                                    </div>
                                    <Link
                                        href={item.download}
                                        target="_blank"
                                        className="bg-[#FFFFFF] border-black text-[16px] border-[1px] text-center text-black py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black] flex flex-row justify-center items-center my-[56px]">
                                        DOWNLOAD NOW
                                    </Link>
                                </div>
                            ))}

                        {!dataForRender && (
                            <>
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
                                <div className="flex flex-col justify-center items-center overflow-hidden border-2">
                                    <Image src={marchImage} alt="about_doo2" />
                                    <div className="text-center mt-3 text-[#0065F2]">
                                        <div className="font-black">2024 March</div>
                                        <div className="text-xs lg:text-sm font-normal">
                                            Coming Soon!
                                        </div>
                                        <div className="invisible">/</div>
                                    </div>
                                    <div className="bg-[#FFFFFF] border-black text-black my-20 py-2 px-4 border-2 rounded-full shadow-[_5px_5px_black] flex flex-row justify-center items-center">
                                        DOWNLOAD NOW
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full min-h-[560px] bg-[#FFCD19] flex lg:hidden flex-col justify-center items-center">
                <div className="max-w-[391px] text-[#FFFFFF] text-3xl font-black text-center font-NeuePlak">
                    <div>OPENING NEW</div>
                    <div>CHAPTERS WITH</div>
                    <div>EVERY</div>
                    <div>CHARACTER</div>
                </div>
            </div>
            <div className="w-full min-h-[168px] bg-[#FEFAE0] flex lg:hidden flex-col justify-center items-center relative">
                <div className="w-[264px] absolute -top-40">
                    <Image src={sazagazaImage} alt="sazagazaImage" />
                </div>
            </div>
            <div className="flex lg:hidden flex-col justify-center items-center py-20">
                <div className="max-w-[330px]">
                    <div className="flex flex-col items-start gap-7">
                        <div className="font-NeuePlak">
                            <div className="text-3xl font-black text-[#0065F2]">OUR CREATIVE</div>
                            <div className="text-3xl font-black text-[#0065F2]">UNIVERSE</div>
                        </div>
                        <div className="font-NanumSquare font-[17px]">
                            <div>QUADHASH는 디지털 아트를 선도하는 리더를 꿈꿉니다.</div>
                            <div>모든 NFT가 소유자와 상호작용하며, 각각의</div>
                            <div>고유한 이야기를 써 내려가는 몰입형 세계를</div>
                            <div>만들어 갑니다.</div>
                        </div>

                        <Link
                            href={'https://www.instagram.com/saza.gaza/'}
                            target="_blank"
                            className="flex flex-row items-center bg-[#FFFFFF] border-black text-[16px] border-[1px] text-center text-black py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black] gap-2">
                            <div>
                                <Image src={insta} alt="insta_icon" />
                            </div>
                            <div>Follow Us @saza.gaza</div>
                        </Link>
                    </div>

                    <div className="pt-20">
                        <Image src={sazagazaTogether} alt={'sazagazaTogether'} />
                    </div>
                </div>
            </div>
            <div className="lg:hidden w-full">
                <MarQueeTextComponent text={'A NEW ERA OF CREATIVITY'} space={true} />
            </div>
            <div className="flex flex-col justify-center items-center py-20 lg:hidden ">
                <div className="max-w-[330px]">
                    <div className="flex flex-col items-start gap-7">
                        <div className="font-NeuePlak">
                            <div className="text-3xl font-black text-[#0065F2]">MEET US AT THE</div>
                            <div className="text-3xl font-black text-[#0065F2]">SAZA&GAZA</div>
                            <div className="text-3xl font-black text-[#0065F2]">STORE</div>
                        </div>
                        <div className=" font-[17px] font-NanumSquare">
                            <div className="font-NanumSquare mt-[28px] text-[20px]">
                                <div>QUADHASH의 또다른 IP 브랜드.</div>
                                <div>‘사자랑가자’의 스토어에 방문해보세요.</div>
                            </div>
                        </div>

                        <Link
                            href={'https://www.sazagaza.co.kr/'}
                            target="_blank"
                            className="flex flex-row items-center bg-[#FFFFFF] border-black text-[16px] border-[1px] text-center text-black py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black] gap-2">
                            <div>
                                <Image src={saza} alt="saza_icon" />
                            </div>
                            <div>Go to Saza&Gaza Store</div>
                        </Link>
                    </div>

                    <div className="pt-20 relative">
                        <img
                            src={`${process.env.NEXT_PUBLIC_STORE_IMAGE_URL}/images/saza_gaza_store.png`}
                            alt={'saza_gaza_event'}
                        />
                    </div>
                </div>
            </div>

            <div className="flex lg:hidden flex-col justify-center items-center py-10">
                <div className="max-w-[330px]">
                    <div className="flex flex-col items-start gap-7">
                        <div className="font-NeuePlak">
                            <div className="text-3xl font-black text-[#0065F2]">A COOLER WAY</div>
                            <div className="text-3xl font-black text-[#0065F2]">TO CONVEY</div>
                            <div className="text-3xl font-black text-[#0065F2]">EMOTIONS</div>
                        </div>
                        <div className="font-[17px] font-NeuePlak">
                            <div>A More Fun Way to Express Feelings, </div>
                            <div>with Saza&Gaza.</div>
                        </div>

                        <Link
                            href={'https://giphy.com/sazagaza'}
                            target="_blank"
                            className="flex flex-row items-center bg-[#FFFFFF] border-black text-[16px] border-[1px] text-center text-black py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black] gap-2">
                            <div>
                                <Image src={saza_gaza_giphy_frame} alt="saza_icon" />
                            </div>
                            <div>Explore the Collection</div>
                        </Link>
                    </div>

                    <div className="pt-20 relative">
                        <Image src={saza_gaza_giphy_image_mobile} alt={'saza_gazaCase'} />
                    </div>
                </div>
            </div>
            <div className="flex lg:hidden flex-col justify-center items-center py-10">
                <div className="max-w-[330px]">
                    <div className="flex flex-col items-start gap-7">
                        <div className="font-NeuePlak">
                            <div className="text-3xl font-black text-[#0065F2]">BRING THE</div>
                            <div className="text-3xl font-black text-[#0065F2]">WORLD OF</div>
                            <div className="text-3xl font-black text-[#0065F2]">SAZA&GAZA TO</div>
                            <div className="text-3xl font-black text-[#0065F2]">YOUR SCREEN</div>
                        </div>

                        {dataForRender &&
                            dataForRender.map((item) => (
                                <div className="flex flex-col justify-start items-center overflow-hidden gap-4 border-2 pb-10">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_STORE_IMAGE_URL}/${item.image}`}
                                        alt="calendar_image"
                                        width={394}
                                        height={436}
                                    />

                                    <div className="font-black text-center text-[#0065F2] font-NeuePlak">
                                        {item.title}
                                    </div>
                                    <div className="text-xs lg:text-sm font-normal text-center text-[#0065F2] min-h-[70px] px-[20px]">
                                        <div>{item.content}</div>
                                    </div>

                                    <Link
                                        href={item.download}
                                        target={'_blank'}
                                        className="bg-[#FFFFFF] border-black text-[16px] border-[1px] text-center text-black py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black] flex flex-row justify-center items-center">
                                        DOWNLOAD NOW
                                    </Link>
                                </div>
                            ))}

                        {/* {!dataForRender && (
                            <>
                                <div className="flex flex-col justify-center items-center overflow-hidden py-10 gap-4">
                                    <Image src={februaryImage} alt="februaryImage" />

                                    <div className="font-black text-center text-[#0065F2]">
                                        2024 March
                                    </div>
                                    <div className="text-xs lg:text-sm font-normal text-center text-[#0065F2]">
                                        <div>"Embrace the Warmth of Lunar New Year</div>
                                        <div>with SAZA and GAZA"</div>
                                    </div>

                                    <div className="bg-[#FFFFFF] border-black text-[16px] border-[1px] text-center text-black py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black] flex flex-row justify-center items-center">
                                        DOWNLOAD NOW
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center overflow-hidden py-10 gap-4">
                                    <Image src={marchImage} alt="marchImage" />

                                    <div className="font-black text-center text-[#0065F2]">
                                        2024 March
                                    </div>
                                    <div className="text-xs lg:text-sm font-normal text-center text-[#0065F2]">
                                        Coming Soon!
                                    </div>

                                    <div className="bg-[#FFFFFF] border-black text-[16px] border-[1px] text-center text-black py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black] flex flex-row justify-center items-center">
                                        DOWNLOAD NOW
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center overflow-hidden py-10 gap-4">
                                    <Image src={marchImage} alt="marchImage" />

                                    <div className="font-black text-center text-[#0065F2]">
                                        2024 March
                                    </div>
                                    <div className="text-xs lg:text-sm font-normal text-center text-[#0065F2]">
                                        Coming Soon!
                                    </div>

                                    <div className="bg-[#FFFFFF] border-black text-[16px] border-[1px] text-center text-black py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black] flex flex-row justify-center items-center">
                                        DOWNLOAD NOW
                                    </div>
                                </div>
                            </>
                        )} */}
                    </div>
                </div>
            </div>
        </>
    )
}
