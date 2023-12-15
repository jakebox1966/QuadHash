import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import CommonProvider from '@/app/provider/CommonProvider'
import { NextIntlClientProvider, useMessages } from 'next-intl'

import AuthProvider from '@/app/provider/SessionProvider'
import AdminWrapper from '../../common/layouts/AdminWrapper'
const inter = Inter({ subsets: ['latin'] })
export interface IAdminLayoutProps {}

export default function AdminLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode
    params: any
}) {
    const messages = useMessages()
    return <AdminWrapper>{children}</AdminWrapper>
}
