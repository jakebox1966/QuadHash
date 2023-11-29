'use client'

import { Button } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2'

export interface IThemeSwitcherProps {}

export default function ThemeSwitcher(props: IThemeSwitcherProps) {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        console.log(theme)
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <>
            {theme === 'dark' ? (
                <Button onClick={() => setTheme('light')}>
                    <HiOutlineMoon />
                </Button>
            ) : (
                <Button onClick={() => setTheme('dark')}>
                    <HiOutlineSun />
                </Button>
            )}
        </>
    )
}
