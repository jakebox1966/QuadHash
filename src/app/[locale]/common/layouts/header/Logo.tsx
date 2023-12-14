import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import Image from 'next/image'
import * as React from 'react'
import { locales } from '@/i18nconfig'

export interface ILogoProps {}

export default function Logo(props: ILogoProps) {
    const { Link } = createSharedPathnamesNavigation({ locales })
    return (
        <>
            <div className="min-w-max">
                <Link href={'/'}>
                    <Image alt="logo" src={'/logo/logo.svg'} width={100} height={100} />
                </Link>
            </div>
        </>
    )
}
