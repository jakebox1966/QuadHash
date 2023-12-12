import * as React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import { SignInModal } from './header/SignInModal'

export interface IMainWrapperProps {}

export default function MainWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="min-h-[calc(100vh-170px)] w-full z-40 relative pt-40">{children}</main>
            <Footer />
        </>
    )
}
