// app/providers.tsx
'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextTemesProvider } from 'next-themes'

export function ThemeProviders({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <NextTemesProvider attribute="class" defaultTheme="dark">
                {children}
            </NextTemesProvider>
        </NextUIProvider>
    )
}
