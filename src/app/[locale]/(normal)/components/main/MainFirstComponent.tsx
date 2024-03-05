import Image from 'next/image'
import * as React from 'react'

export interface IMainFirstComponentProps {}

export default function MainFirstComponent(props: IMainFirstComponentProps) {
    return (
        <>
            <div className="bg-[#FFCD19] w-full flex flex-col justify-center items-center text-[#FFFFFF] pt-40 lg:pt-60 gap-28 ">
                <div className="flex flex-col justify-center items-center max-w-[1000px] gap-[32px]">
                    <div className="hidden lg:flex font-['#NeuePlak'] font-black flex-col justify-center items-center gap-3 text-[70px] leading-[55px]">
                        <div>QUADHASH.</div>
                        <div>A NEW ERA OF CREATIVITY</div>
                    </div>
                    <div className="flex lg:hidden flex-col justify-center items-center text-[35px] leading-[37px]">
                        <div>QUADHASH.</div>
                        <div>A NEW ERA OF </div>
                        <div>CREATIVITY</div>
                    </div>
                    <div className="hidden lg:flex flex-col justify-center items-center text-[19px] w-full">
                        <div>
                            Launched in June 2023, the QUADHASH NFT Project stands at the forefront
                            of the digital art revolution.
                        </div>
                        <div>QUADHASH is a testament to innovation,</div>
                        <div>
                            showcasing digital artworks encoded as NFTS on the Ethereum blockchain,
                        </div>
                        <div>while also branching into the realms of IP.</div>
                    </div>

                    <div className="flex lg:hidden flex-col justify-center items-start font-medium">
                        <div>Launched in June 2023, the Quadhash</div>
                        <div>NFT Project stands at the forefront of</div>
                        <div>the digital art revolution.</div>
                        <div>Featured on OpenSea, this collection</div>
                        <div>is a testament to innovation,</div>
                        <div>showcasing digital artworks encoded</div>
                        <div>as NFTS on the Ethereum blockchain,</div>
                        <div>while also branching into the realms</div>
                        <div>of IP.</div>
                    </div>
                </div>
            </div>
            <div className="min-h-[200px] lg:min-h-[700px] w-full bg-[#FFCD19] relative flex flex-col items-center">
                <img
                    className="w-full absolute bottom-0"
                    src="/homepage_1.png"
                    alt="homepage_1.png"
                />
                <div className="absolute -bottom-20 lg:-bottom-60">
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
