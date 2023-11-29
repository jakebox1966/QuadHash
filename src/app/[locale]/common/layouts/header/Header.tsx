import * as React from 'react'
import ThemeSwitcher from './ThemeSwitcher'
import Profile from './Profile'
import Language from './LocaleSwitcher'
import { useTranslations } from 'next-intl'
import NavBar from './navbar'
import Logo from './Logo'

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
    return (
        <>
            <div className="bg-white dark:bg-black flex flex-row justify-between items-center h-[80px] border-b-1 px-5 opacity-90 sticky top-0">
                <Logo />
                <NavBar />
                <div className="flex flex-row justify-center items-center flex-1 gap-3 pl-3">
                    <Language />
                    <ThemeSwitcher />
                    <Profile />
                </div>
            </div>
        </>
    )
}
