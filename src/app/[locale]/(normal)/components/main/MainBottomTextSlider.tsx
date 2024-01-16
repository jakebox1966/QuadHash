'use client'
import * as React from 'react'

export interface IMainBottomTextSliderProps {}

export default function MainBottomTextSlider(props: IMainBottomTextSliderProps) {
    const [animate, setAnimate] = React.useState(true)
    const onStop = () => setAnimate(false)
    const onRun = () => setAnimate(true)

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
                {slides.map((item) => (
                    <p>{item}</p>
                ))}
            </div>
        </div>
    )
}
