'use client'

import * as React from 'react'
import { IQueryParam } from '../../containers/CollectionContainer'

export interface IActivePartFilterComponentProps {
    queryParam: IQueryParam
    handlePartParam: (category: any, partName: any) => void
}

const trait_type = [
    'background',
    'body',
    'extras',
    'eyes',
    'head',
    'headwear',
    'mane',
    'mouth',
    'top',
    'bottoms',
    'onesie',
]

export default function ActivePartFilterComponent({
    queryParam,
    handlePartParam,
}: IActivePartFilterComponentProps) {
    const calcFilterCount = () => {
        const backgroundCount = queryParam.background.length
        const bodyCount = queryParam.body.length
        const extrasCount = queryParam.extras.length
        const eyesCount = queryParam.eyes.length
        const headCount = queryParam.head.length
        const headwearCount = queryParam.headwear.length
        const maneCount = queryParam.mane.length
        const mouthCount = queryParam.mouth.length
        const topCount = queryParam.top.length
        const bottomsCount = queryParam.bottoms.length
        const onesieCount = queryParam.onesie.length

        return (
            backgroundCount +
            bodyCount +
            extrasCount +
            eyesCount +
            headCount +
            headwearCount +
            maneCount +
            mouthCount +
            topCount +
            bottomsCount +
            onesieCount
        )
    }
    return (
        <>
            <div className="flex flex-row items-center mt-3 gap-2 flex-wrap">
                <div className="bg-gray-300 px-2 rounded-lg">FILTERS ({calcFilterCount()})</div>

                {trait_type.map((item) => {
                    return queryParam[item].map((el) => (
                        <div
                            className="border-2 border-black rounded-full px-3 flex flex-row items-center gap-3"
                            onClick={() => handlePartParam(item, el)}>
                            <span>
                                {item} : {el}
                            </span>
                            <span className="cursor-pointer">X</span>
                        </div>
                    ))
                })}
            </div>
        </>
    )
}
