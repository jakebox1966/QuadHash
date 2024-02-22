'use client'

import * as React from 'react'
import { IQueryParam } from '../../containers/CollectionContainer'

export interface IActivePartFilterComponentProps {
    queryParam: IQueryParam
    handlePartParam: (category: any, partName: any) => void
    clearFilter
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
    clearFilter,
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
                <div className="px-2 rounded-lg flex flex-row items-center gap-2">
                    <img src="/filter.svg" alt="filter" />
                    <p className="font-medium text-[16px]">{calcFilterCount()}</p>
                </div>

                {trait_type.map((item) => {
                    return queryParam[item].map((el) => (
                        <div
                            className="bg-[#F26C25] text-[#FFFFFF] rounded-lg px-3 py-1 flex flex-row items-center gap-3 cursor-pointer"
                            onClick={() => handlePartParam(item, el)}>
                            <span>
                                {item} : {el}
                            </span>
                        </div>
                    ))
                })}
                {calcFilterCount() > 0 && (
                    <div
                        className="bg-[#F26C25] text-[#FFFFFF] rounded-lg px-3 py-1 flex flex-row items-center gap-3 cursor-pointer"
                        onClick={clearFilter}>
                        <span>CLEAR ALL</span>
                    </div>
                )}
            </div>
        </>
    )
}
