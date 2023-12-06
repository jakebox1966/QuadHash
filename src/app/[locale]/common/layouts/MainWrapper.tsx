import * as React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'

export interface IMainWrapperProps {}

export default function MainWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="mt-20 min-h-screen max-h-full w-full relative z-40">{children}</main>
            <Footer />
        </>
    )
}
