import * as React from 'react'

import CollectorContainer from '../../../containers/CollectorContainer'
import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import { Alchemy, Network } from 'alchemy-sdk'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOption } from '@/app/api/auth/authOption'
import { getLockedNFTs } from '@/app/api/collection/api'

export interface ICollectorDetailPageProps {
    params: {
        wallet_address: string
        isUsingLockedNFT: boolean
    }
}

const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)
const alchemyConfig = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_RAW_API_KEY, // Replace with your API key
    network: Network[process.env.NEXT_PUBLIC_NETWORK], // Replace with your network
}

const alchemy = new Alchemy(alchemyConfig)

const checkIsLocked = async () => {
    const session = await getServerSession(authOption)

    if (session) {
        const tokenId = session?.user.token_id
        const tokenType = session?.user.token_type

        const result = await getLockedNFTs()

        if (tokenType === 'saza') {
            return result?.data.saza.includes(tokenId)
        } else if (tokenType === 'gaza') {
            return result?.data.gaza.includes(tokenId)
        }
    }
}

export default async function CollectorDetailPage({
    params: { wallet_address },
}: ICollectorDetailPageProps) {
    // console.log(wallet_address)
    const isUsingLockedNFT = await checkIsLocked()

    if (
        !web3.utils.isAddress(wallet_address) ||
        wallet_address === '0x0000000000000000000000000000000000000000'
    ) {
        // console.log('error')
        return notFound()
    }
    return (
        <>
            <CollectorContainer
                wallet_address={wallet_address}
                isUsingLockedNFT={isUsingLockedNFT}
            />
        </>
    )
}
