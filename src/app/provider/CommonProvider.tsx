'use client'

import React, { useEffect, useRef } from 'react'
import { ThemeProvider as MaterialProvider } from '@material-tailwind/react'
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes'
import { MetaMaskContextProvider } from './MetamaskProvider'

// const defaultTheme = window.localStorage.getItem('theme') ?? 'light'
// console.log(defaultTheme)
export default function CommonProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NextThemeProvider attribute="class">
                <MaterialProvider>
                    <MetaMaskContextProvider>{children}</MetaMaskContextProvider>
                </MaterialProvider>
            </NextThemeProvider>
        </>
    )
}
