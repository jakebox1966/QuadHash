'use client'

import * as React from 'react'
import MainTop from '../components/main/MainTop'

import MainBottom from '../components/main/MainBottom'
import MainTopActionImage from '../components/main/MainTopActionImage'
import MainBottomActionImage from '../components/main/MainBottomActionImage'
import MainBottomTextSlider from '../components/main/MainBottomTextSlider'
import MainFirstComponent from '../components/main/MainFirstComponent'
import MainSecondComponent from '../components/main/ MainSecondComponent'
import MainThirdComponent from '../components/main/MainThirdComponent'
import MainFourthComponent from '../components/main/MainFourthComponent'

export interface IMainProps {}

export default function Main(props: IMainProps) {
    return (
        <>
            <div className="flex flex-col justify-center items-center w-full">
                <MainFirstComponent />
                <MainSecondComponent />

                <MainThirdComponent />
                <MainFourthComponent />
            </div>
        </>
    )
}
