'use client'

import * as React from 'react'
import MainTop from '../components/main/MainTop'
import MainMiddle from '../components/main/MainMiddle'
import MainBottom from '../components/main/MainBottom'

export interface IMainProps {}

export default function Main(props: IMainProps) {
    return (
        <>
            <div className="flex flex-col justify-center items-center gap-20 mb-80 ">
                <MainTop />
                <MainMiddle />
                <MainBottom />
            </div>
        </>
    )
}
