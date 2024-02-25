import * as React from 'react'
import DynamicNFTListContainer from '../../../containers/ dynamicNFT/DynamicNFTListContainer'

export interface IMyNFTListPageProps {}

export default function MyNFTListPage(props: IMyNFTListPageProps) {
    return (
        <>
            <DynamicNFTListContainer />
        </>
    )
}
