import * as React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import { SignInModal } from './header/SignInModal'

export interface IMainWrapperProps {}

export default function MainWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex flex-col w-full justify-center items-center">
                <Header />
                <main className="min-h-[calc(100vh-170px)] flex flex-col justify-center items-center w-full">
                    {children}
                </main>
                {/* <main className=" w-full relative px-10 max-h-full">{children}</main> */}
                <Footer />
            </div>
        </>
    )
}
