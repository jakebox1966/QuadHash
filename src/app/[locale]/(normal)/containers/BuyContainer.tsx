'use client'

import * as React from 'react'
import CoinExchange from '../components/buy/CoinExchange'
import CoinExchangePolicy from '../components/buy/CoinExchangePolicy'

export interface IBuyContainerProps {}

export default function BuyContainer(props: IBuyContainerProps) {
    return (
        <>
            <div className="flex flex-col justify-center pt-20 gap-10 w-full max-w-[1134px] px-10">
                <CoinExchange />
                <CoinExchangePolicy />
            </div>
        </>
    )
}
