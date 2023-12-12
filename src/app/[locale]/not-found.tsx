import { useTranslations } from 'next-intl'
import * as React from 'react'

export interface INotFoundPageProps {}

export default function NotFoundPage(props: INotFoundPageProps) {
    const t = useTranslations('Error.not_found')
    return (
        <>
            <div>{t('title')}</div>
        </>
    )
}
