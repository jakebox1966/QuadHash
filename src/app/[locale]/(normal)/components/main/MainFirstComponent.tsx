import Image from 'next/image'
import * as React from 'react'

export interface IMainFirstComponentProps {}

export default function MainFirstComponent(props: IMainFirstComponentProps) {
    return (
        <>
            <div className="bg-[#FFCD19] w-full flex flex-col justify-center items-center text-[#FFFFFF] pt-40 lg:pt-60 gap-28 ">
                <div className="flex flex-col justify-center items-center max-w-[1000px] gap-[32px]">
                    <div className="hidden lg:flex flex-col justify-center items-center font-[500] gap-3 text-[70px] leading-[55px] font-NeuePlak">
                        <div>QUADHASH.</div>
                        <div>A NEW ERA OF CREATIVITY</div>
                    </div>
                    <div className="flex lg:hidden flex-col justify-center items-center text-[35px] font-[400] leading-[37px] font-NeuePlak">
                        <div>QUADHASH.</div>
                        <div>A NEW ERA OF </div>
                        <div>CREATIVITY</div>
                    </div>
                    <div className="hidden lg:flex flex-col font-NanumSquare font-[700] justify-center items-center text-[19px] leading-[24px] w-full tracking-[0.4px]">
                        <div>
                            QUADHASH(쿼드해시) 프로젝트는 IP 비즈니스의 새로운 가능성을 제시합니다.
                        </div>
                        <div>2023년 8월, 블록체인 기술을 활용한 NFT 프로젝트로 출발하여</div>
                        <div>
                            꾸준한 IP의 확장으로 온·오프라인을 넘나드는 다채로운 IP 경험을
                            제공합니다.
                        </div>
                    </div>

                    <div className="flex lg:hidden flex-col justify-center items-center font-NanumSquare text-[17px] leading-[27px] w-[340px] text-center tracking-[0.4px]">
                        <div>QUADHASH(쿼드해시) 프로젝트는</div>
                        <div>IP 비즈니스의 새로운 가능성을 제시합니다.</div>
                        <div>2023년 8월, 블록체인 기술을 활용한</div>
                        <div>NFT 프로젝트로 출발하여</div>
                        <div>꾸준한 IP의 확장으로 온·오프라인을 넘나드는</div>
                        <div>다채로운 IP 경험을 제공합니다.</div>
                    </div>
                </div>
            </div>
            <div className="min-h-[250px] lg:min-h-[700px] w-full bg-[#FFCD19] relative flex flex-col items-center">
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
