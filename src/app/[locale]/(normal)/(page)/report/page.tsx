import * as React from 'react'
import ReportContainer from '../../containers/ReportContainer'
import { Alchemy, Network } from 'alchemy-sdk'

export interface IReportPageProps {}

const config = {
    apiKey: '2jp0674GCJeIZW9qmM3WB92wslh1P8yM',
    network: process.env.NODE_ENV === 'development' ? Network.ETH_SEPOLIA : Network.ETH_MAINNET,
}

const alchemy = new Alchemy(config)

export default async function ReportPage(props: IReportPageProps) {
    return (
        <>
            <ReportContainer />
        </>
    )
}
