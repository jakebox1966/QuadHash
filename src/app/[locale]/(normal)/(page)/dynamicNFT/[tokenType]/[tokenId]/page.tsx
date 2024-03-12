import * as React from 'react'
import DynamicNFTDetailContainer from '../../../../containers/ dynamicNFT/DynamicNFTDetailContainer'
import { getSession } from 'next-auth/react'

export interface IDynamicDetailPageNFTProps {
    params: {
        tokenType: string
        tokenId: string
    }
}

export default async function DynamicNFTDetailPage({
    params: { tokenType, tokenId },
}: IDynamicDetailPageNFTProps) {
    const session = await getSession()

    console.log('session', session)

    return (
        <>
            <DynamicNFTDetailContainer tokenType={tokenType} tokenId={tokenId} />
        </>
    )
}
