import * as React from 'react'
import DynamicNFTDetailContainer from '../../../../containers/ dynamicNFT/DynamicNFTDetailContainer'

export interface IDynamicDetailPageNFTProps {
    params: {
        tokenType: string
        tokenId: string
    }
}

export default function DynamicNFTDetailPage({
    params: { tokenType, tokenId },
}: IDynamicDetailPageNFTProps) {
    console.log('tokenType', tokenType)
    console.log('tokenId', tokenId)
    return (
        <>
            <DynamicNFTDetailContainer tokenType={tokenType} tokenId={tokenId} />
        </>
    )
}
