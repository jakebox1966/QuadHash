'use client'
import * as React from 'react'

export interface IMainBottomTextSliderProps {}

export default function MainBottomTextSlider(props: IMainBottomTextSliderProps) {
    const slides = [
        'Let’s work together',
        '·',
        'Let’s work together',
        '·',
        'Let’s work together',
        '·',
        'Let’s work together',
        '·',
        'Let’s work together',
        '·',
        'Let’s work together',
        '·',
        'Let’s work together',
        '·',
        'Let’s work together',
        '·',
        'Let’s work together',
        '·',
        'Let’s work together',
        '·',
    ]
    return (
        <div className="scroll-text bg-[#D2F65A] text-sm py-3">
            <div className="track">
                {slides.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
        </div>
    )
}
