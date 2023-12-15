'use client'

import { useState } from 'react'
import NftList from '../report/components/NftList'
import InputArea from '../report/components/InputArea'

export interface IReportContainerProps {}

export default function ReportContainer(props: IReportContainerProps) {
    const [exNftList, setExNftList] = useState<string[]>([])

    return (
        <>
            <div>해킹 신고 센터</div>
            <div className="flex flex-col justify-center items-center gap-10 w-full">
                <NftList exNftList={exNftList} setExNftList={setExNftList} />
                <InputArea exNftList={exNftList} setExNftList={setExNftList} />
            </div>
        </>
    )
}
