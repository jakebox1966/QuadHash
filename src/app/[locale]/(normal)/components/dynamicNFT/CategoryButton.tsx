'use client'

import { IconButton } from '@material-tailwind/react'
import * as React from 'react'
import { useSwiper } from 'swiper/react'

export interface ICategoryButtonProps {
    direction: 'prev' | 'next'
}

export default function CategoryButton({ children }: { children: React.ReactNode }) {
    const swiper = useSwiper()

    const moveSlide = (direction: 'prev' | 'next') => {
        if (direction === 'prev') {
            swiper.slidePrev()
        } else {
            swiper.slideNext()
        }
    }
    return (
        <>
            <IconButton
                placeholder={undefined}
                onClick={() => {
                    moveSlide('prev')
                }}>
                left
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
            </IconButton>
            {children}
            <IconButton
                placeholder={undefined}
                onClick={() => {
                    moveSlide('next')
                }}>
                right
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
            </IconButton>
        </>
    )
}
