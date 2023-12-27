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
            headerColorRef.current!.className = `sticky top-0 w-full z-50 h-[70px] bg-white dark:text-white dark:bg-black text-black transition duration-700`
        } else {
            headerColorRef.current!.className =
                'sticky top-0 w-full z-50 h-[70px] text-white dark-bg-black transition duration-700'
        }
    }

    const handleResize = () => {
        if (window && window.innerWidth > 1024) {
            setIsMobileMenuOpen(false)
        }
    }
    const onChange = () => {
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
                ref={headerColorRef}
                className="flex flex-row justify-center items-center sticky top-0 w-full z-50 h-[70px] bg-[#FFCD19] text-black dark:text-white">
                <div className="flex flex-row items-center justify-between w-full max-w-[1600px] px-10">
                    <Logo />
                    <div className="hidden lg:flex lg:flex-row justify-center items-center gap-x-1 min-w-max">
                        <Navbar />
                        <Setting />
                        <Connect />
                    </div>

                    <div className="lg:hidden center">
                        <label className="menu-wrap cursor-pointer">
                            <input className="check-menu" type="checkbox" onChange={onChange} />
                            <div className={`menu-bar ${isMobileMenuOpen && 'last-bar'}`}></div>
                            <div className={`menu-bar ${isMobileMenuOpen && 'middle-bar'}`}></div>
                            <div className={`menu-bar ${isMobileMenuOpen && 'top-bar'}`}></div>
                        </label>
                    </div>

                    <MobileNavMenu isMobileMenuOpen={isMobileMenuOpen} />
                </div>
            </header>

            <SignInModal open={signInModalopen} handleOpen={handleSignInModalOpen} />
            {/* <div className="bg-gradient-to-b from-orange-500 to-white dark:to-black z-10 absolute top-0 w-full h-[500px]"></div> */}
            {/* <div className="headerbackground dark:darkheaderbackground bg-cover blur-sm bg-no-repeatz-10 absolute top-0 w-full h-[500px]"></div> */}
        </>
    )
}
