import Image from 'next/image'
import * as React from 'react'
import gazaImage from '/public/main_second_gaza.png'
import sazaImage from '/public/main_second_saza.png'
import background from '/public/homepage_1.png'
import saza_gaza_together from '/public/main_second_image.png'
import MainBottomTextSlider from './MainBottomTextSlider'
import MarQueeTextComponent from './MarqueeText'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'

export interface IMainSecondComponentProps {}

const { usePathname, Link } = createSharedPathnamesNavigation({ locales })
export default function MainSecondComponent(props: IMainSecondComponentProps) {
    return (
        <>
            <div className="hidden lg:flex bg-[#236DF6] flex-col justify-end items-center w-full text-[#FFFFFF] font-black overflow-hidden lg:min-h-[700px] relative">
                <div className="max-w-[1355px] w-full flex flex-col justify-end items-around py-20 lg:pt-20 lg:py-0 px-[50px]">
                    <div className="hidden lg:flex flex-row justify-end items-end z-20 ">
                        <div className="w-[200px] h-[200px] relative">
                            <Image src={gazaImage} alt="gaza" className="absolute -bottom-10" />
                        </div>
                        <div className="w-[500px] h-[500px] relative">
                            <Image src={sazaImage} alt="saza" className="absolute -bottom-10" />
                        </div>
                    </div>
                    <div className="lg:absolute top-44 flex flex-col justify-center items-start gap-[30px]">
                        <div className="text-[44.2px] font-NeuePlak">OUR COLLECTION</div>
                        <div className="text-[20px] font-NanumSquare font-[700] leading-[24px]">
                            <div>강렬한 색감과 독창적인 캐릭터.</div>
                            <div>세계적인 아티스트인 'Craig & Karl', 'Burton Morris'의 손에서 </div>
                            <div>탄생한 QUADHASH의 'SAZA'와 'GAZA'를 만나보세요.</div>
                        </div>

                        <Link
                            href={'/collection'}
                            className="bg-[#FFFFFF] min-w-[202px] border-[1px] border-black text-center z-30 text-black py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black]">
                            VIEW COLLECTABLES
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-0 z-0">
                    <img className="z-[-9999]" src="/homepage_1.png" alt="homepage_1.png" />
                </div>
            </div>

            <div className="flex lg:hidden bg-[#236DF6] flex-col pt-[138px] justify-end items-center w-full text-[#FFFFFF] font-black overflow-hidden relative min-h-[709px]">
                <div className="w-[330px] flex flex-col justify-end items-start relative">
                    <div className="flex flex-col justify-start items-center gap-[27px] min-h-[380px] w-full">
                        <div className="text-[35px] leading-[37px] font-NeuePlak text-center w-full">
                            <div>OUR</div>
                            <div>COLLECTION</div>
                        </div>
                        <div className="text-[17px] font-NanumSquare leading-[24px] text-center w-full">
                            <div>강렬한 색감과 독창적인 캐릭터.</div>
                            <div>세계적인 아티스트인 'Craig & Karl',</div>
                            <div>'Burton Morris'의 손에서 탄생한</div>
                            <div>QUADHASH의 'SAZA'와 'GAZA'를</div>
                            <div>만나보세요.</div>
                        </div>

                        <Link
                            href={'/collection'}
                            className="bg-[#FFFFFF] mt-[20px] min-w-[202px] border-[1px] border-black text-center z-30 text-black py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black]">
                            VIEW COLLECTABLES
                        </Link>
                    </div>
                    <div className="min-h-[200px] relative flex flex-col justify-center items-center">
                        <div className="flex flex-row justify-end items-end z-20 absolute left-10 -bottom-3">
                            <div className="w-[70px] h-[70px]">
                                <Image src={gazaImage} alt="gaza" />
                            </div>
                            <div className="w-[200px] h-[200px]">
                                <Image src={sazaImage} alt="saza" />
                            </div>
                        </div>
                    </div>
                </div>

                <Image src={background} alt="background" className="absolute w-screen bottom-0" />
            </div>
            <MarQueeTextComponent text={'A NEW ERA OF CREATIVITY'} space={true} />
            <div className="hidden bg-[#FFAE35] lg:flex flex-row justify-center items-center w-full text-[#FFFFFF] font-black overflow-hidden relative">
                <div className="max-w-[1355px] w-full flex flex-row justify-between items-center gap-[30px] py-20 px-[50px]">
                    <div className="block">
                        <Image src={saza_gaza_together} alt="saza_gaza_together" />
                    </div>
                    <div className="flex flex-col justify-center items-start gap-[30px]">
                        <div className="text-[44.2px] font-NeuePlak">NEW MERCHANDISE!</div>
                        <div className="font-NanumSquare text-[20px] w-full">
                            QUADHASH의 또다른 IP 브랜드, ‘사자랑가자’의 스토어에 방문해보세요.
                        </div>

                        <Link
                            href={'https://www.sazagaza.co.kr/'}
                            target={'_blank'}
                            className="bg-[#FFFFFF] min-w-[202px] mt-5 border-[1px] border-black text-center z-30 text-black py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black]">
                            SHOP NOW
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex lg:hidden bg-[#FFAE35] flex-col justify-start items-center w-full text-[#FFFFFF] font-black pt-[138px] min-h-[709px]">
                <div className="w-[330px] flex flex-col justify-center items-center gap-[30px]">
                    <div className="flex flex-col justify-start items-center w-full">
                        <div className="text-[37px] leading-[37px] font-NeuePlak text-center">
                            <div>NEW</div>
                            <div>MERCHANDISE!</div>
                        </div>
                        <div className="text-[17px] font-NanumSquare leading-[24px] text-center w-full mt-[27px]">
                            <div>QUADHASH의 또다른 IP 브랜드,</div>
                            <div>‘사자랑가자’의 스토어에 방문해보세요.</div>
                        </div>

                        <Link
                            href={'https://www.sazagaza.co.kr/'}
                            target={'_blank'}
                            className="bg-[#FFFFFF] min-w-[202px] border-[1px] mt-[40px] border-black text-center z-30 text-black py-[16px] px-[20px] rounded-full shadow-[_4px_6px_black]">
                            SHOP NOW
                        </Link>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-[52px]">
                        <Image
                            src={saza_gaza_together}
                            width={282}
                            height={280}
                            alt="saza_gaza_together"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
