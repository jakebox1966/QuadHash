'use client'

import { Carousel } from '@material-tailwind/react'
import * as React from 'react'

export interface IMainProps {}

export default function Main(props: IMainProps) {
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                {/* <section className="w-[40%] h-full">
                    <Carousel
                        className="rounded-xl"
                        autoplay={true}
                        loop={true}
                        autoplayDelay={3000}
                        prevArrow={undefined}
                        nextArrow={undefined}>
                        <img
                            src="https://d1fv2z2t2pz1fy.cloudfront.net/images/0.png"
                            alt="image 1"
                            className="h-full w-full object-cover"
                        />
                        <img
                            src="https://d1fv2z2t2pz1fy.cloudfront.net/images/1.png"
                            alt="image 1"
                            className="h-full w-full object-cover"
                        />
                        <img
                            src="https://d1fv2z2t2pz1fy.cloudfront.net/images/2.png"
                            alt="image 1"
                            className="h-full w-full object-cover"
                        />
                        <img
                            src="https://d1fv2z2t2pz1fy.cloudfront.net/images/3.png"
                            alt="image 2"
                            className="h-full w-full object-cover"
                        />
                        <img
                            src="https://d1fv2z2t2pz1fy.cloudfront.net/images/4.png"
                            alt="image 3"
                            className="h-full w-full object-cover"
                        />
                    </Carousel>
                </section>
                <section className="w-[40%] h-full">
                    <Carousel
                        className="rounded-xl"
                        autoplay={true}
                        loop={true}
                        autoplayDelay={3000}
                        prevArrow={undefined}
                        nextArrow={undefined}>
                        <img
                            src="https://d1fv2z2t2pz1fy.cloudfront.net/images/0.png"
                            alt="image 1"
                            className="h-full w-full object-cover"
                        />
                        <img
                            src="https://d1fv2z2t2pz1fy.cloudfront.net/images/1.png"
                            alt="image 1"
                            className="h-full w-full object-cover"
                        />
                        <img
                            src="https://d1fv2z2t2pz1fy.cloudfront.net/images/2.png"
                            alt="image 1"
                            className="h-full w-full object-cover"
                        />
                        <img
                            src="https://d1fv2z2t2pz1fy.cloudfront.net/images/3.png"
                            alt="image 2"
                            className="h-full w-full object-cover"
                        />
                        <img
                            src="https://d1fv2z2t2pz1fy.cloudfront.net/images/4.png"
                            alt="image 3"
                            className="h-full w-full object-cover"
                        />
                    </Carousel>
                </section> */}
            </div>
        </>
    )
}
