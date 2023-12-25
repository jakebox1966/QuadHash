'use client'

import { Carousel } from '@material-tailwind/react'
import * as React from 'react'
import MainGridItems from '../components/main/MainGridItems'

export interface IMainProps {}

export default function Main(props: IMainProps) {
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <MainGridItems />
            </div>
        </>
    )
}
