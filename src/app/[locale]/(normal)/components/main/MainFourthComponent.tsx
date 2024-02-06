import * as React from 'react'
import main_fourth_image from '/public/main_fourth_image.png'
import Image from 'next/image'

export interface IMainFourthComponentProps {}

export default function MainFourthComponent(props: IMainFourthComponentProps) {
    return (
        <div className="max-w-[1600px] pt-20 lg:pt-80 bg-[#FEFAE0]">
            <Image src={main_fourth_image} alt="saza&gaza" />
        </div>
    )
}
