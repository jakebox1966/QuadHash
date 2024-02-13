import * as React from 'react'

import CollectorContainer from '../../../containers/CollectorContainer'

export interface ICollectorDetailPageProps {
    params: {
        wallet_address: string
    }
}

export default function CollectorDetailPage({
    params: { wallet_address },
}: ICollectorDetailPageProps) {
    console.log(wallet_address)
    return (
        <>
            <CollectorContainer wallet_address={wallet_address} />
        </>
    )
}
