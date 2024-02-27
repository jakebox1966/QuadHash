import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import * as React from 'react'
import { locales } from '@/i18nconfig'
export interface ICommingSoonComponentProps {}

const { usePathname, Link } = createSharedPathnamesNavigation({ locales })
export default function CommingSoonComponent(props: ICommingSoonComponentProps) {
    return (
        <div className="w-full max-w-[1300px] flex flex-col justify-center items-center px-5 gap-10 pt-10 lg:pt-20">
            <div className="flex flex-col items-center justify-center gap-6 w-full">
                <div className="text-4xl font-black text-[#0065F2] w-full text-center">
                    WE ARE COMING SOON.
                </div>
                <div className="flex flex-row justify-center items-center gap-10 w-full">
                    <Link href={'https://discord.gg/quadhash'} target="_blank">
                        <img src="/coming_soon/discord.svg" alt="discord" />
                    </Link>
                    <img src="/coming_soon/x.svg" alt="x" />
                </div>
            </div>
            <div className="max-w-[540px]">
                <img src="/coming_soon/coming_soon.png" alt="coming_soon" />
            </div>
        </div>
    )
}
