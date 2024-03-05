import * as React from 'react'
import DynamicNFTMainContainer from '../../containers/ dynamicNFT/DynamicNFTMainContainer'

import DynamicNFTMainContainer1 from '../../containers/ dynamicNFT/DynamicNFTMainContainer1'

export interface IDynamicNFTPageProps {}

export default async function DynamicNFTPage(props: IDynamicNFTPageProps) {
    return (
        <>
            <DynamicNFTMainContainer />
            {/* <DynamicNFTMainContainer1 /> */}
        </>
    )
}
