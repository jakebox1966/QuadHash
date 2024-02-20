'use client'

import { Switch } from '@material-tailwind/react'
import { useTheme } from 'next-themes'
import { MouseEventHandler, useEffect, useState } from 'react'

export interface IThemeSwitcherProps {}

export default function ThemeSwitcher(props: IThemeSwitcherProps) {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    const changeTheme = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const { checked } = e.target as HTMLInputElement
        if (checked === true) {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    if (!mounted) return null
    return (
        <>
            <Switch
                defaultChecked={theme === 'dark' ? true : false}
                onClick={(e) => changeTheme(e)}
                crossOrigin={undefined}
            />
        </>
    )
}
