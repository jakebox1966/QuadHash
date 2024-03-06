import * as React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import { SignInModal } from '../components/header/SignInModal'

export interface IMainWrapperNoFooterProps {}

export default function MainWrapperNoFooter({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex flex-col w-full justify-start items-center">
                <Header />
                <main className="min-h-[calc(100vh-140px)] flex flex-col justify-start items-center w-full">
                    {children}
                </main>
            </div>
        </>
    )
}
