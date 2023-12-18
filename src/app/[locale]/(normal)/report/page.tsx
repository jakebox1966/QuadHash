import * as React from 'react'
import NftList from './components/NftList'
import InputArea from './components/InputArea'
import ReportContainer from '../containers/ReportContainer'
import { Alchemy, Network } from 'alchemy-sdk'
import { getUuidByAccount } from '@/app/api/auth/api'

export interface IReportPageProps {}

const config = {
    apiKey: '2jp0674GCJeIZW9qmM3WB92wslh1P8yM',
    network: Network.ETH_SEPOLIA,
}

const alchemy = new Alchemy(config)

const getAllNftOwnedByOwner = async () => {
    const result = await alchemy.nft.getNftsForOwner('0x63120565a91C891920285bFc3781F56047d711b7')

    // const result = await getUuidByAccount('0x63120565a91C891920285bFc3781F56047d711b7')
    // console.log(result)
    return result
}

export default async function ReportPage(props: IReportPageProps) {
    const result = await getAllNftOwnedByOwner()
    // console.log(result.ownedNfts[0].contract)
    console.log(result.ownedNfts.length)
    console.log('totalCount', result.totalCount)
    return (
        <>
            <ReportContainer />
        </>
    )
}
