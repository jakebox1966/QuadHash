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

export default async function ReportPage(props: IReportPageProps) {
    return (
        <>
            <ReportContainer />
        </>
    )
}
