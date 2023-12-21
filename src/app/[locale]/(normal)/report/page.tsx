import * as React from 'react'
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

    return result
}

export default async function ReportPage(props: IReportPageProps) {
    const result = await getAllNftOwnedByOwner()

    return (
        <>
            <ReportContainer />
        </>
    )
}
