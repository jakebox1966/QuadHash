import Image from 'next/image'
import * as React from 'react'

export interface IMainFirstComponentProps {}

export default function MainFirstComponent(props: IMainFirstComponentProps) {
    return (
        <>
            <div className="bg-[#FFCD19] w-full flex flex-col justify-center items-center text-[#FFFFFF] pt-40 lg:pt-60 gap-28 ">
                <div className="flex flex-col justify-center items-center max-w-[1000px] gap-[32px]">
                    <div className="hidden lg:flex flex-col justify-center items-center gap-3 text-[70px] leading-[55px] font-NeuePlak">
                        <div>QUADHASH.</div>
                        <div>A NEW ERA OF CREATIVITY</div>
                    </div>
                    <div className="flex lg:hidden flex-col justify-center items-center text-[35px] leading-[37px] font-NeuePlak">
                        <div>QUADHASH.</div>
                        <div>A NEW ERA OF </div>
                        <div>CREATIVITY</div>
                    </div>
                    <div className="hidden lg:flex flex-col font-NanumSquare justify-center items-center text-[19px] w-full">
                        <div>
                            QUADHASH(쿼드해시) 프로젝트는 디지털 아트의 새로운 가능성을 제시하고
                            있습니다.
                        </div>
                        <div>
                            2023년 8월 블록체인 기술을 활용한 NFT 프로젝트로 출발하여, 꾸준한 IP의
                            확장을 통해
                        </div>
                        <div>온라인과 오프라인을 아우르는 IP 브랜드로 성장하고 있습니다.</div>
                    </div>

                    <div className="flex lg:hidden flex-col justify-center items-center font-NanumSquare text-[17px] leading-[24px]">
                        <div>QUADHASH(쿼드해시)프로젝트는 디지털 </div>
                        <div>아트의 새로운 가능성을 제시하고 있습니다.</div>
                        <div>2023년 8월 블록체인 기술을 활용한</div>
                        <div>NFT 프로젝트로 출발하여, 꾸준한 IP의 </div>
                        <div>확장을 통해 온라인과 오프라인을 아우르는</div>
                        <div>IP 브랜드로 성장하고 있습니다.</div>
                    </div>
                </div>
            </div>
            <div className="min-h-[200px] lg:min-h-[700px] w-full bg-[#FFCD19] relative flex flex-col items-center">
                <img
                    className="w-full absolute bottom-0"
                    src="/homepage_1.png"
                    alt="homepage_1.png"
                />
                <div className="absolute -bottom-[106px] lg:-bottom-60">
                    <div className="relative min-w-[320px] min-h-[280px] lg:w-[1054px] lg:h-[920px]">
                        <Image
                            src={'/main_first_image.png'}
                            alt={'main_first_image'}
                            fill
                            quality={100}
                            className="z-[10] w-full"
                        />
                    </div>
                </div>
            </div>
            <div className="min-h-[150px] lg:min-h-[350px] w-full bg-[#FEFAE0]"></div>
        </>
    )
}
