import { useTranslations } from 'next-intl'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'
import { headers } from 'next/headers'
import * as React from 'react'
const { Link } = createSharedPathnamesNavigation({ locales })

export interface INotFoundPageProps {}

export default async function NotFoundPage(props: INotFoundPageProps) {
    const t = useTranslations('Error.not_found')

    return (
        <>
            <div>{t('title')}asdffasdfasdfasdfds</div>
            <div>
                <h2>Not Found</h2>
                <p>Could not find requested resource</p>
                <Link href="/">Return Home</Link>
            </div>
        </>
    )
}
