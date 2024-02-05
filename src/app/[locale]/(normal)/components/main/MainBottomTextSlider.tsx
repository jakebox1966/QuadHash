'use client'
import * as React from 'react'

export interface IMainBottomTextSliderProps {}

export default function MainBottomTextSlider(props: IMainBottomTextSliderProps) {
    const slides = [
        'A NEW ERA OF CREATIVITY',
        'A NEW ERA OF CREATIVITY',
        'A NEW ERA OF CREATIVITY',
        'A NEW ERA OF CREATIVITY',
        'A NEW ERA OF CREATIVITY',
        'A NEW ERA OF CREATIVITY',
        'A NEW ERA OF CREATIVITY',
        'A NEW ERA OF CREATIVITY',
        'A NEW ERA OF CREATIVITY',
        'A NEW ERA OF CREATIVITY',
        'A NEW ERA OF CREATIVITY',
        'A NEW ERA OF CREATIVITY',
        'A NEW ERA OF CREATIVITY',
        'A NEW ERA OF CREATIVITY',
        'A NEW ERA OF CREATIVITY',
        'A NEW ERA OF CREATIVITY',
        'A NEW ERA OF CREATIVITY',
        'A NEW ERA OF CREATIVITY',
        'A NEW ERA OF CREATIVITY',
        'A NEW ERA OF CREATIVITY',
    ]
    return (
        <div className="scroll-text bg-[#FF5A3F] text-[12px] py-6">
            <div className="track">
                {slides.map((item, index) => (
                    <>
                        <p key={index}>{item}</p>
                    </>
                ))}
            </div>
        </div>
    )
}
