import * as React from 'react'
import Logo from '../../components/header/Logo'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'

export interface IFooterProps {}

const { Link } = createSharedPathnamesNavigation({ locales })
export default function Footer(props: IFooterProps) {
    return (
        <>
            <footer className="h-[280px] hidden w-full lg:flex flex-col justify-center gap-[32px] text-[16px] px-[50px] max-w-[1400px]">
                <div className="flex flex-row justify-center lg:justify-between items-center">
                    <div>
                        <Logo />
                    </div>
                    <div className="hidden lg:flex flex-row gap-[60px] font-medium text-[16px] leading-[24px]">
                        <Link href={'/report'} className="text-[#FF000F]">
                            Hacking Report
                        </Link>
                        <Link href={'/contact'}>Contact Us</Link>
                        <Link href={'/terms_of_use'}>Terms of Service</Link>
                        <Link href={'/privacy'}>Privacy</Link>
                    </div>
                </div>
                <hr />
                <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center">
                    <div className="flex flex-row justify-center items-center gap-6">
                        <div className="font-black">FOLLOW US!</div>
                        <Link href={'https://twitter.com/QUADHASH'} target={'_blank'}>
                            <img src="/twitter.png" alt="twitter" />
                        </Link>
                        <Link href={'https://discord.gg/quadhash'} target={'_blank'}>
                            <img src="/discord.png" alt="discord" />
                        </Link>
                        <Link href={'https://www.youtube.com/@QUADHASH'} target={'_blank'}>
                            <img src="/youtube.png" alt="youtube" />
                        </Link>
                        <Link
                            href={'https://www.instagram.com/quadhash/?igsh=NTc4MTIwNjQ2YQ%3D%3D'}
                            target={'_blank'}>
                            <img src="/insta-black.png" alt="insta-black" />
                        </Link>
                    </div>
                    <div className="text-gray-400">
                        Copyright 2024. (주)멋쟁이사자처럼 all rights reserved.
                    </div>
                </div>
            </footer>

            <footer className="min-h-[620px] px-10 lg:hidden w-full flex flex-col justify-center items-start gap-10">
                <div>
                    <Logo />
                </div>

                <div className="flex flex-col gap-5 font-medium text-[16px]">
                    <Link href={'/report'} className="text-[#FF000F]">
                        Hacking Report
                    </Link>
                    <Link href={'/contact'}>Contact Us</Link>
                    <Link href={'/terms_of_use'}>Terms of Service</Link>
                    <Link href={'/privacy'}>Privacy</Link>
                </div>

                <hr className="w-full" />
                <div className="flex flex-col gap-5 justify-between items-start">
                    <div className="font-black">FOLLOW US!</div>
                    <div className="flex flex-row justify-start items-start gap-6">
                        <Link href={'https://twitter.com/QUADHASH'} target={'_blank'}>
                            <img src="/twitter.png" alt="twitter" />
                        </Link>
                        <Link href={'https://discord.gg/quadhash'} target={'_blank'}>
                            <img src="/discord.png" alt="discord" />
                        </Link>
                        <Link href={'https://www.youtube.com/@QUADHASH'} target={'_blank'}>
                            <img src="/youtube.png" alt="youtube" />
                        </Link>
                        <Link
                            href={'https://www.instagram.com/quadhash/?igsh=NTc4MTIwNjQ2YQ%3D%3D'}
                            target={'_blank'}>
                            <img src="/insta-black.png" alt="insta-black" />
                        </Link>
                    </div>
                    <div className="text-gray-400 mt-5 text-[16px]">
                        <div>Copyright 2024. (주)멋쟁이사자처럼</div>
                        <div>all rights reserved.</div>
                    </div>
                </div>
            </footer>
        </>
    )
}
