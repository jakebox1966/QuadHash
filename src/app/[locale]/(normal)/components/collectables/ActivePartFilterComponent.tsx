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
            <div className="hidden lg:flex flex-row items-center mt-3 gap-2 flex-wrap min-h-[32px]">
                <div className="px-2 rounded-lg flex flex-row items-center gap-2">
                    <img src="/filter.svg" alt="filter" />
                    <p className="font-medium text-[12px] rounded-full px-2 py-0.5 bg-[#F46221]/20">
                        +{calcFilterCount()}
                    </p>
                </div>

                {trait_type.map((item) => {
                    return queryParam[item].map((el) => (
                        <div
                            key={`parts_${item}`}
                            className=" text-black border-2 border-[#F46221]/20 rounded-full px-3 py-0.5 flex flex-row items-center gap-3">
                            <span className="text-[14px]">
                                {item.toUpperCase()} : {el.toUpperCase()}
                            </span>
                            <span
                                className="cursor-pointer text-[#F46221]/20"
                                onClick={() => handlePartParam(item, el)}>
                                <svg
                                    width="19"
                                    height="18"
                                    viewBox="0 0 19 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g id="trailing-icon">
                                        <path
                                            id="icon"
                                            d="M14.896 4.8075L13.8385 3.75L9.646 7.9425L5.4535 3.75L4.396 4.8075L8.5885 9L4.396 13.1925L5.4535 14.25L9.646 10.0575L13.8385 14.25L14.896 13.1925L10.7035 9L14.896 4.8075Z"
                                            fill="#F46221"
                                            fillOpacity="0.5"
                                        />
                                    </g>
                                </svg>
                            </span>
                        </div>
                    ))
                })}
                {calcFilterCount() > 0 && (
                    <div
                        className="bg-[#F26C25] text-[#FFFFFF] rounded-full px-3 py-0.5 flex flex-row items-center gap-3 cursor-pointer"
                        onClick={clearFilter}>
                        <span>Clear All</span>
                    </div>
                )}
            </div>
        </>
    )
}
