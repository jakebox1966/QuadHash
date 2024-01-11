'use client'

import Logo from './Logo'
import React, { useState } from 'react'
import Navbar from '@/app/[locale]/common/layouts/header/Navbar'
import Setting from '@/app/[locale]/common/layouts/header/Setting'
import Connect from '@/app/[locale]/common/layouts/header/Connect'
import { useEffect, useRef } from 'react'
import { SignInModal } from './SignInModal'
import { useSignInModal } from '@/app/hooks/useSignInModal'
import MobileNavMenu from './MobileNavMenu'
import useBodyScrollLock from '@/app/hooks/useBodyScrollLock'

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
    const headerColorRef = useRef<HTMLInputElement>(null)

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
    const { signInModalopen, handleSignInModalOpen } = useSignInModal()
    const { lockScroll, openScroll } = useBodyScrollLock()

    const handleScroll = () => {
        if (window && window.scrollY > 80) {
            headerColorRef.current!.className = `sticky top-0 w-full z-50 h-[70px] bg-white text-black transition duration-700`
        } else {
            headerColorRef.current!.className =
                'sticky top-0 w-full z-50 h-[70px] text-white transition duration-700'
        }
    }

    const handleResize = () => {
        if (window && window.innerWidth > 1024) {
            setIsMobileMenuOpen(false)
        }
    }
    const handleOpen = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    useEffect(() => {
        if (isMobileMenuOpen) {
            lockScroll()
            return
        }
        openScroll()
    }, [isMobileMenuOpen])
    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll)
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll) //clean up
    //     }
    // }, [])

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })

    return (
        <>
            <header
                // ref={headerColorRef}
                className="flex flex-col justify-center items-center top-0 w-full z-50 h-[176px] bg-[#FFCD19] text-black gap-6">
                <div
                    className="lg:hidden cursor-pointer fixed left-4 top-4 bg-white p-3 rounded-full shadow-lg"
                    onClick={handleOpen}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                        />
                    </svg>
                </div>

                <Logo />
                {/* <div className="lg:hidden center">
                        <label className="menu-wrap cursor-pointer">
                            <input className="check-menu" type="checkbox" onChange={onChange} />
                            <div className={`menu-bar ${isMobileMenuOpen && 'last-bar'}`}></div>
                            <div className={`menu-bar ${isMobileMenuOpen && 'middle-bar'}`}></div>
                            <div className={`menu-bar ${isMobileMenuOpen && 'top-bar'}`}></div>
                        </label>
                    </div> */}
                <div className="hidden lg:flex lg:flex-row justify-between items-center gap-x-1 w-full max-w-[1296px] min-w-[1281px] px-20">
                    <Navbar />
                    <div className="flex flex-row gap-3">
                        <Setting />
                        <Connect />
                    </div>
                </div>

                <MobileNavMenu open={isMobileMenuOpen} setOpen={setIsMobileMenuOpen} />
            </header>

            <SignInModal open={signInModalopen} handleOpen={handleSignInModalOpen} />
            {/* <div className="bg-gradient-to-b from-orange-500 to-white z-10 absolute top-0 w-full h-[500px]"></div> */}
            {/* <div className="headerbackground bg-cover blur-sm bg-no-repeatz-10 absolute top-0 w-full h-[500px]"></div> */}
        </>
    )
}
