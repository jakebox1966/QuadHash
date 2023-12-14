'use client'

import Logo from './Logo'
import React from 'react'
import Navbar from '@/app/[locale]/common/layouts/header/Navbar'
import Setting from '@/app/[locale]/common/layouts/header/Setting'
import Connect from '@/app/[locale]/common/layouts/header/Connect'
import { useEffect, useRef } from 'react'
import { SignInModal } from './SignInModal'
import { useSignInModal } from '@/app/hooks/useSignInModal'

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
    const headerColorRef = useRef<HTMLInputElement>(null)

    const { signInModalopen, handleSignInModalOpen } = useSignInModal()

    const handleScroll = () => {
        if (window && window.scrollY > 80) {
            headerColorRef.current!.className = `sticky top-0 w-full z-50 h-[70px] bg-white dark:text-white dark:bg-black text-black transition duration-700`
        } else {
            headerColorRef.current!.className =
                'sticky top-0 w-full z-50 h-[70px] text-white dark-bg-black transition duration-700'
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll) //clean up
        }
    }, [])

    return (
        <>
            <header ref={headerColorRef} className="sticky top-0 w-full z-50 h-[70px] text-white">
                <div className="px-10 pt-4 flex flex-row justify-between items-center ">
                    <div className="flex flex-row items-center justify-between w-full">
                        <Logo />
                        <div className="flex flex-row items-center gap-x-1 min-w-max">
                            <Navbar />
                            <Setting />
                            <Connect />
                        </div>
                    </div>
                </div>
            </header>

            <SignInModal open={signInModalopen} handleOpen={handleSignInModalOpen} />
            <div className="bg-gradient-to-b from-blue-500 to-white dark:to-black z-10 absolute top-0 w-full h-[500px]"></div>
        </>
    )
}
