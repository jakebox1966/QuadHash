import * as React from 'react'
import CollectionContainer from '../../containers/CollectionContainer'
import CollectablesContainer from '../../containers/CollectionContainer'

export interface ICollectablesPageProps {}

export default function CollectionPage(props: ICollectablesPageProps) {
    return (
        <>
            <CollectablesContainer />
        </>
    )
}
