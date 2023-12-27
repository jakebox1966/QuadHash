import * as React from 'react'

export interface IMainMiddleProps {}

export default function MainMiddle(props: IMainMiddleProps) {
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-row justify-between items-center w-full px-20 text-[#F46221] font-black">
                    <div>
                        <div>WE PRESENT A COLLECTION</div>
                        <div>OF EXCLUSIVE AND UNIQUE</div>
                        <div>WORKS</div>
                    </div>
                    <div className="text-3xl text-right">
                        <div>WELCOME</div>
                        <div>TO THE</div>
                        <div>QUADHASH</div>
                    </div>
                </div>
                <div>
                    <img src="/main_middle_image1.svg" alt="main_middle_image1" />
                </div>
            </div>
        </>
    )
}
