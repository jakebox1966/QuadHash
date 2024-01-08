import * as React from 'react'
import { GridLoader } from 'react-spinners'

export interface ILoadingProps {}

export default function Loading(props: ILoadingProps) {
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-[#c2c2c272] z-[9999]">
                <div className="top-1/2 left-1/2 absolute">
                    <GridLoader color="#FFCD19" />
                </div>
            </div>
        </>
    )
}
