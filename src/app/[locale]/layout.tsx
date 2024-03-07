import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import '@/app/globals.css'
import CommonProvider from '../provider/CommonProvider'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import AuthProvider from '../provider/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

const popins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: '500',
})

export const metadata: Metadata = {
    title: 'QUADHASH',
    description: 'Powered by QUADHASH',
}

export default function RootLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode
    params: any
}) {
    const messages = useMessages()

    return (
        <html lang={locale} className="light" suppressHydrationWarning>
            <body className={popins.className}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <AuthProvider>
                        <CommonProvider>{children}</CommonProvider>
                    </AuthProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
