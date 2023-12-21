'use client'

import React from 'react'
import { ThemeProvider as MaterialProvider } from '@material-tailwind/react'
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes'
import { MetaMaskContextProvider } from './MetamaskProvider'
import { SignInModalContextProvider } from './SignInModalProvider'
import AlertProvider from './AlertProvider'
import ConfirmProvider from './ConfirmProvider'

export default function CommonProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NextThemeProvider attribute="class">
                <MaterialProvider>
                    <MetaMaskContextProvider>
                        <ConfirmProvider>
                            <AlertProvider>
                                <SignInModalContextProvider>{children}</SignInModalContextProvider>
                            </AlertProvider>
                        </ConfirmProvider>
                    </MetaMaskContextProvider>
                </MaterialProvider>
            </NextThemeProvider>
        </>
    )
}
