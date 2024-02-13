import * as React from 'react'
import DynamicNFTContainer from '../../containers/DynamicNFTContainer'
import { Alchemy, Network } from 'alchemy-sdk'

export interface IDynamicNFTPageProps {}

export default async function DynamicNFTPage(props: IDynamicNFTPageProps) {
    return (
        <>
            <DynamicNFTContainer />
        </>
    )
}
