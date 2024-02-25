import * as React from 'react'
import DynamicNFTMainContainer from '../../containers/ dynamicNFT/DynamicNFTMainContainer'
import { Alchemy, Network } from 'alchemy-sdk'

export interface IDynamicNFTPageProps {}

export default async function DynamicNFTPage(props: IDynamicNFTPageProps) {
    return (
        <>
            <DynamicNFTMainContainer />
        </>
    )
}
