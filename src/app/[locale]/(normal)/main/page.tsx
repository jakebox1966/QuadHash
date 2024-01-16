'use client'

import * as React from 'react'
import MainTop from '../components/main/MainTop'
import MainMiddle from '../components/main/MainMiddle'
import MainBottom from '../components/main/MainBottom'
import MainTopActionImage from '../components/main/MainTopActionImage'
import MainBottomActionImage from '../components/main/MainBottomActionImage'
import MainBottomTextSlider from '../components/main/MainBottomTextSlider'

export interface IMainProps {}

export default function Main(props: IMainProps) {
    return (
        <>
            <div className="flex flex-col justify-center items-center mb-60 w-full">
                <MainTop />
                <MainTopActionImage />
                <MainMiddle />
                <MainBottomActionImage />
                <MainBottomTextSlider />
                <MainBottom />
            </div>
        </>
    )
}
