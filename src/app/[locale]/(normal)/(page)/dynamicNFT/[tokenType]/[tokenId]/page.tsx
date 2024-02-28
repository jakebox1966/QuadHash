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
    return (
        <>
            <DynamicNFTDetailContainer tokenType={tokenType} tokenId={tokenId} />
        </>
    )
}
