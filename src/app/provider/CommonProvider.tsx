'use client'

import React from 'react'
import { ThemeProvider as MaterialProvider } from '@material-tailwind/react'
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes'
import { MetaMaskContextProvider } from './MetamaskProvider'
import { SignInModalContextProvider } from './SignInModalProvider'
import AlertProvider from './AlertProvider'
import ConfirmProvider from './ConfirmProvider'
import { QueryClient, QueryClientProvider } from 'react-query'

export default function CommonProvider({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient()
    return (
        <>
            <QueryClientProvider client={queryClient}>
                {/* <NextThemeProvider attribute="class"> */}
                <MaterialProvider>
                    <MetaMaskContextProvider>
                        <ConfirmProvider>
                            <AlertProvider>
                                <SignInModalContextProvider>{children}</SignInModalContextProvider>
                            </AlertProvider>
                        </ConfirmProvider>
                    </MetaMaskContextProvider>
                </MaterialProvider>
                {/* </NextThemeProvider> */}
            </QueryClientProvider>
        </>
    )
}
