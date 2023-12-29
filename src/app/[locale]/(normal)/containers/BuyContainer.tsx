'use client'

import * as React from 'react'
import CoinExchange from '../components/buy/CoinExchange'
import CoinExchangePolicy from '../components/buy/CoinExchangePolicy'

export interface IBuyContainerProps {}

export default function BuyContainer(props: IBuyContainerProps) {
    return (
        <>
            <div className="flex flex-col justify-center items-center pt-40 max-w-[1600px] gap-10 px-10">
                <CoinExchange />
                <CoinExchangePolicy />
            </div>
        </>
    )
}
