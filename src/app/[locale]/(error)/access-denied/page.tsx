import { useTranslations } from 'next-intl'
import * as React from 'react'

export interface IAccessDeniedErrorPageProps {}

export default function AccessDeniedErrorPage(props: IAccessDeniedErrorPageProps) {
    const t = useTranslations('Error.access_denied')
    return (
        <>
            <div>{t('title')}</div>
        </>
    )
}
