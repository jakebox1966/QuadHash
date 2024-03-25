import * as React from 'react'
import ReportDetailContainer from '../../../containers/report/ReportDetailContainer'
import { getReport } from '@/app/api/report/api'

export interface IReportDetailPageProps {
    params: {
        id: string
    }
}

export default async function ReportDetailPage({ params: { id } }: IReportDetailPageProps) {
    console.log(id)
    const result = await getReport(id)
    console.log('result====>', result.data.postNfts)
    return (
        <>
            <ReportDetailContainer />
        </>
    )
}
