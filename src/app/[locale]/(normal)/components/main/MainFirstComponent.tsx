import Image from 'next/image'
import * as React from 'react'

export interface IMainFirstComponentProps {}

export default function MainFirstComponent(props: IMainFirstComponentProps) {
    return (
        <>
            <div className="bg-[#FFCD19] w-full flex flex-col justify-center items-center text-[#FFFFFF] font-black pt-60 gap-28">
                <div className="flex flex-col justify-center items-center max-w-[1020px] gap-10">
                    <div className="flex flex-col justify-center items-center gap-3 text-6xl">
                        <div>QUADHASH.</div>
                        <div>A NEW AEA OF CREATIVITY</div>
                    </div>
                    <div className="hidden lg:flex flex-col justify-center items-center text-lg">
                        <div>
                            Launched in June 2023, the Quadhash NFT Project stands at the forefront
                            of the digital art revolution.
                        </div>
                        <div>
                            Featured on OpenSea, this collection is a testament to innovation,
                        </div>
                        <div>
                            showcasing digital artworks encoded as NFTS on the Ethereum blockchain,
                        </div>
                        <div>while also branching into the realms of IP.</div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-[#FFCD19] lg:flex flex-col justify-center items-center relative pt-10 min-h-[400px] lg:min-h-[650px] hidden">
                <div className="absolute bottom-0">
                    <img className="w-screen" src="/homepage_1.png" alt="homepage_1.png" />
                </div>

                <Image
                    src={'/main_first_image.png'}
                    alt={'main_first_image'}
                    width={1054}
                    height={920}
                    quality={100}
                    className="z-[10] absolute -bottom-[250px]"
                />
            </div>
        </>
    )
}
