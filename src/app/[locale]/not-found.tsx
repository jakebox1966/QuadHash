import { useTranslations } from 'next-intl'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'
import { headers } from 'next/headers'
import * as React from 'react'
import MainWrapper from './common/layouts/MainWrapper'
const { Link } = createSharedPathnamesNavigation({ locales })

export interface INotFoundPageProps {}

export default async function NotFoundPage(props: INotFoundPageProps) {
    const t = useTranslations('Error.not_found')

    return (
        <>
            <MainWrapper>
                <div className="w-full flex flex-col items-center gap-16">
                    <div className="text-[64px] font-black">Oops!</div>

                    <div className="text-[24px] font-black">404 : Page Not Found</div>

                    <div>
                        <img src="/saza_404.png" alt="saza_404" />
                    </div>

                    <Link
                        href={'/'}
                        className="bg-[#FFFFFF] min-w-[210px] text-[16px] lg:text-[20px] border-black font-medium text-black py-2 px-4 border-2 rounded-full shadow-[_5px_5px_black] text-center gap-2 cursor-pointer hover:opacity-60 flex flex-row justify-center items-center">
                        <img src="/check.svg" alt="check" />
                        <div>GO HOME</div>
                    </Link>
                </div>
            </MainWrapper>
        </>
    )
}
