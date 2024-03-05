import * as React from 'react'
import main_fourth_image from '/public/main_fourth_image.png'
import Image from 'next/image'

export interface IMainFourthComponentProps {}

export default function MainFourthComponent(props: IMainFourthComponentProps) {
    return (
        <div className="w-full flex flex-row justify-center bg-[#FEFAE0]">
            <div className="max-w-[1600px] pt-[80px] lg:pt-[566px]">
                <Image src={main_fourth_image} alt="saza&gaza" />
            </div>
        </div>
    )
}
