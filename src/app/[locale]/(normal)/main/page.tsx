'use client'

import { Carousel } from '@material-tailwind/react'
import * as React from 'react'
import MainGridItems from '../components/main/MainGridItems'
import MainTop from '../components/main/MainTop'
import MainMiddle from '../components/main/MainMiddle'

export interface IMainProps {}

export default function Main(props: IMainProps) {
    return (
        <>
            <MainTop />
            <MainMiddle />
        </>
    )
}
