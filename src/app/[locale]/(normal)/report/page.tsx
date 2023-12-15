import * as React from 'react'
import NftList from './components/NftList'
import InputArea from './components/InputArea'
import ReportContainer from '../containers/ReportContainer'

export interface IReportPageProps {}

export default function ReportPage(props: IReportPageProps) {
    return (
        <>
            <ReportContainer />
        </>
    )
}
