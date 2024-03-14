'use client'

import Image from 'next/image'
import * as React from 'react'
import aboutFirstImage from '/public/main_second_image.png'
import aboutSaza from '/public/about_saza.png'
import aboutdoo2 from '/public/about_doo2.jpeg'
import about_craig_karl from '/public/about_craig_karl.png'
import about_burton_morris from '/public/about_burton_morris.png'
import MarQueeTextComponent from '../../components/main/MarqueeText'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'

export interface IAboutPageProps {}

const { Link } = createSharedPathnamesNavigation({ locales })
export default function AboutPage(props: IAboutPageProps) {
    return (
        <>
            <div className="w-full bg-[#FFCD19] hidden lg:flex flex-col justify-center items-center min-h-[500px] relative">
                <div className="max-w-[1400px] w-full absolute -bottom-56 px-[50px]">
                    <div className="flex flex-row justify-between items-center w-full">
                        <div className="bg-[#FFFFFF] rounded-lg pt-[40px] pb-[82px] px-[25px] font-black flex flex-col justify-center items-start gap-[32px] min-w-[525px] h-[400px] shadow-lg">
                            <div className="text-[51.9px] font-NeuePlak font-black leading-[72px]">
                                <div>OUR</div>
                                <div>JOURNEY</div>
                            </div>
                            <div className="text-[20px] font-NanumSquare">
                                QUADHASH의 다이나믹한 여정에 함께 하세요!
                            </div>
                        </div>

                        <div className="ml-[107px]">
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
                    <div className="text-center font-black text-[35px] leading-[37px] font-NeuePlak">
                        <div>OUR</div>
                        <div>JOURNEY</div>
                    </div>
                    <div className="text-center font-NanumSquare text-[17px]">
                        <div>QUADHASH의 다이나믹한 여정에</div>
                        <div>함께 하세요!</div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-[#FEFAE0] min-h-[250px] lg:min-h-[400px] flex flex-col items-center">
                <div className="min-w-[330px] relative lg:hidden">
                    <div className="absolute -top-[230px]">
                        <Image src={aboutFirstImage} alt="saza_gaza_together" quality={100} />
                    </div>
                </div>
            </div>
            <div className="hidden w-full bg-[#FFAE35] h-[670px] lg:flex flex-col justify-start items-center pt-[95px]">
                <div className="max-w-[1425px] px-[50px] w-full">
                    <div className="w-full relative">
                        <div className="min-w-[775px] flex flex-col justify-center items-start font-black gap-[31px]">
                            <div className="text-[51.9px] font-NeuePlak">OUR MISSION</div>
                            <div className="text-[20px] flex flex-row justify-between font-NanumSquare leading-[27px] tracking-[0.4px] w-full ">
                                <div className="text-nowrap mr-[100px]">
                                    <div>
                                        ”QUADHASH는 블록체인 기술을 통해 IP에 독자적인 아이덴티티를
                                        부여하고
                                    </div>
                                    <div>
                                        이를 바탕으로 아트와 기술, IP가 융합되는 독창적이고 풍부한
                                        생태계를 만들어갑니다.”
                                    </div>
                                </div>
                                <div className="translate-y-40">
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
                            <div className="text-[51.9px] font-NeuePlak">OUR VISION</div>
                            <div className="text-[20px] font-NanumSquare leading-[27px] tracking-[0.4px]">
                                <div>"우리의 비전은 IP가 경험이 되는 디지털 아트 세계입니다.</div>
                                <div>
                                    다양한 프로젝트를 통해 생태계를 확장하고 새로운 경험을
                                    만들어갑니다.
                                </div>
                                <br />
                                <div>그리고 우리만의 오리지널 IP로 몰입감 있는 서사를 창조하여</div>
                                <div>
                                    시각을 넘어서는 상호작용적인 스토리텔링의 영역으로 나아갑니다."
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:hidden flex flex-col w-full items-center justify-center bg-[#FFAE35] min-h-[552px] text-[#FFFFFF]">
                <div className="flex flex-col items-center relative">
                    <div className="w-[330px] flex flex-col justify-center items-start font-black gap-[27px]">
                        <div className="text-[35px] font-NeuePlak leading-[37px]">
                            <div>OUR</div>
                            <div>MISSION</div>
                        </div>
                        <div className="text-[17px] font-NanumSquare leading-[27px] tracking-[0.4px]">
                            <div>”QUADHASH는 IP와 기술이 융합된</div>
                            <div>독창적이고 풍부한 생태계를 만들어 갑니다.”</div>
                        </div>
                    </div>
                    <div className="absolute w-[180px] h-[217px] bottom-[-280px] right-0">
                        <Image src={aboutSaza} alt="aboutSaza" fill />
                    </div>
                </div>
            </div>
            <div className="lg:hidden flex flex-col w-full items-center justify-center bg-[#FFCD19] min-h-[552px] text-[#FFFFFF]">
                <div className="max-w-[390px] flex flex-col items-center">
                    <div className="w-[330px] flex flex-col justify-center items-start font-black gap-[27px]">
                        <div className="text-[35px] font-NeuePlak leading-[37px]">
                            <div>OUR</div>
                            <div>VISION</div>
                        </div>
                        <div className="text-[17px] font-NanumSquare leading-[27px] tracking-[0.4px] whitespace-nowrap">
                            <div>"우리의 비전은 IP가 경험이 되는</div>
                            <div>디지털 아트 세계입니다. </div>
                            <div>다양한 프로젝트를 통해 생태계를 확장하고</div>
                            <div>새로운 경험을 만들어갑니다.</div>
                            <div>그리고 우리만의 오리지널 IP로</div>
                            <div>몰입감 있는 서사를 창조하여</div>
                            <div>시각을 넘어서는 상호작용적인</div>
                            <div>스토리텔링의 영역으로 나아갑니다."</div>
                        </div>
                    </div>
                </div>
            </div>
            <MarQueeTextComponent text={"LET'S WORK TOGETHER"} space={true} />

            <div className="hidden min-h-[1064px] bg-[#00B0FF] w-full lg:flex flex-col items-center text-[#FFFFFF] ">
                <div className="max-w-[1102px] py-[231px] font-black">
                    <div className="flex flex-col justify-center items-center gap-[28px] font-NeuePlak">
                        <div className="text-[56px]">MEET THE QUADHASH TEAM</div>
                        <div className="text-[20px] font-NanumSquare">
                            예술과 기술의 결합, QUADHASH 팀이 이뤄냅니다.
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center text-white font-black mt-[40px]">
                        <div className="grid grid-cols-3 gap-[32.48px] px-12 w-full">
                            <Link
                                href={'https://www.instagram.com/iamdoo2/'}
                                target={'_blank'}
                                className="flex flex-col justify-center items-center rounded-3xl overflow-hidden">
                                <div className="rounded-3xl overflow-hidden ">
                                    <div className="transition-all hover:opacity-75 hover:scale-110">
                                        <Image src={aboutdoo2} alt="about_doo2" />
                                    </div>
                                </div>
                                <div className="text-center mt-[15px]">
                                    <div className="font-NeuePlak text-[18px]">IAMDOO2</div>
                                    <div className="font-PlusJakartaSans text-[14px] font-normal mt-[5px]">
                                        FOUNDER
                                    </div>
                                </div>
                            </Link>
                            <Link
                                href={'https://www.instagram.com/craigandkarl/'}
                                target={'_blank'}
                                className="flex flex-col justify-center items-center ">
                                <div className="rounded-3xl overflow-hidden">
                                    <div className="transition-all hover:opacity-75 hover:scale-110">
                                        <Image
                                            src={about_burton_morris}
                                            alt="about_burton_morris"
                                        />
                                    </div>
                                </div>
                                <div className="text-center mt-[15px]">
                                    <div className="font-NeuePlak text-[18px]">CRAIG & KARL</div>
                                    <div className="font-PlusJakartaSans text-[14px] font-normal mt-[5px]">
                                        DESIGNER
                                    </div>
                                </div>
                            </Link>
                            <Link
                                href={'https://www.instagram.com/burtonmorrisart/'}
                                target={'_blank'}
                                className="flex flex-col justify-center items-center">
                                <div className="rounded-3xl overflow-hidden">
                                    <div className="transition-all hover:opacity-75 hover:scale-110">
                                        <Image src={about_craig_karl} alt="about_craig_karl" />
                                    </div>
                                </div>
                                <div className="text-center mt-[15px]">
                                    <div className="font-NeuePlak text-[18px]">BURTON MORRIS</div>
                                    <div className="font-PlusJakartaSans text-[14px] font-normal mt-[5px]">
                                        CREATIVE DIRECTOR
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:hidden flex flex-col w-full items-center justify-center bg-[#00B0FF] py-36 text-[#FFFFFF]">
                <div className="max-w-[390px] flex flex-col items-center">
                    <div className="w-[330px] flex flex-col justify-center items-center font-black gap-[50px]">
                        <div className="text-[35px] font-NeuePlak leading-[37px] text-center">
                            <div>MEET THE</div>
                            <div>QUADHASH</div>
                            <div>TEAM</div>
                        </div>
                        <div className="text-[17px] font-medium font-NanumSquare leading-[25px] text-center">
                            <div>예술과 기술의 결합,</div>
                            <div>QUADHASH 팀이 이뤄냅니다.</div>
                        </div>

                        <Link
                            href={'https://www.instagram.com/iamdoo2/'}
                            target={'_blank'}
                            className="flex flex-col justify-center items-center">
                            <div className="relative w-[300] h-[300]">
                                <div className="rounded-3xl overflow-hidden active:opacity-75 active:scale-110">
                                    <Image src={aboutdoo2} alt={'aboutdoo2'} />
                                </div>
                            </div>
                            <div className="mt-[10px] text-[18px] font-NeuePlak">IAMDOO2</div>
                            <div className="font-PlusJakartaSans text-[14px] font-medium mt-[1px]">
                                FOUNDER
                            </div>
                        </Link>
                        <Link
                            href={'https://www.instagram.com/craigandkarl/'}
                            target={'_blank'}
                            className="flex flex-col justify-center items-center  ">
                            <div className="relative w-[300] h-[300]">
                                <div className="rounded-3xl overflow-hidden active:opacity-75 active:scale-110">
                                    <Image src={about_burton_morris} alt={'about_burton_morris'} />
                                </div>
                            </div>
                            <div className="mt-[10px] text-[18px] font-NeuePlak">CRAIG & KARL</div>
                            <div className="font-PlusJakartaSans text-[14px] font-medium mt-[1px]">
                                DESIGNER
                            </div>
                        </Link>

                        <Link
                            href={'https://www.instagram.com/burtonmorrisart/'}
                            target={'_blank'}
                            className="flex flex-col justify-center items-center">
                            <div className="relative w-[300] h-[300]">
                                <div className="rounded-3xl overflow-hidden active:opacity-75 active:scale-110">
                                    <Image src={about_craig_karl} alt={'about_craig_karl'} />
                                </div>
                            </div>
                            <div className="mt-[10px] text-[18px] font-NeuePlak">BURTON MORRIS</div>
                            <div className="font-PlusJakartaSans text-[14px] font-medium mt-[1px]">
                                CREATIVE DIRECTOR
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
