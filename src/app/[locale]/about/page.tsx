'use client'
import { getUuidByAccount } from '@/app/api/auth/api'
import { useMessages, useTranslations } from 'next-intl'
// import Error from 'next/error'
import * as React from 'react'

export interface IAboutPageProps {}

export default function AboutPage(props: IAboutPageProps) {
    const t = useTranslations('Layout.test')
    return <>This is About Page {t('test')}</>
}
