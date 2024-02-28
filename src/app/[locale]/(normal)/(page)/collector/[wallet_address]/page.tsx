import * as React from 'react'

import CollectorContainer from '../../../containers/CollectorContainer'
import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import { Alchemy, Network } from 'alchemy-sdk'
import { notFound } from 'next/navigation'

export interface ICollectorDetailPageProps {
    params: {
        wallet_address: string
    }
}

const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)
const alchemyConfig = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_RAW_API_KEY, // Replace with your API key
    network: Network.ETH_SEPOLIA, // Replace with your network
    // network: Network.ETH_MAINNET, // Replace with your network
}

const alchemy = new Alchemy(alchemyConfig)

export default function CollectorDetailPage({
    params: { wallet_address },
}: ICollectorDetailPageProps) {
    // console.log(wallet_address)

    if (!web3.utils.isAddress(wallet_address)) {
        // console.log('error')
        return notFound()
    }
    return (
        <>
            <CollectorContainer wallet_address={wallet_address} />
        </>
    )
}
