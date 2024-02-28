'use client'
import * as React from 'react'
import ReportList from '../../components/report/ReportList'
import { getReports } from '@/app/api/report/api'
import { useInfiniteQuery } from 'react-query'
import { Button, Spinner } from '@material-tailwind/react'
import Image from 'next/image'
import { useIntersectionObserver } from '@/app/hooks/useIntersectionObserver'
import ReportDetail from '../../components/report/ReportDetail'

export interface IReportContainerProps {}

type lastpage = {
    page: number
    total_pages: number
}

export default function ReportContainer(props: IReportContainerProps) {
    const fetchData = async (pageParam: number) => {
        const result = await getReports(pageParam)
        return result
    }

    const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['getReports'],
        queryFn: ({ pageParam = 1 }) => fetchData(pageParam),
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = lastPage.paging.page
            const totalPage = lastPage.paging.total_pages

            if (currentPage === totalPage) {
                return false
            }
            return currentPage + 1
        },
        retry: 0,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    })
    const { setTarget } = useIntersectionObserver({
        hasNextPage,
        fetchNextPage,
    })

    return (
        <div className="flex flex-col justify-center items-center mt-3">
            <div className="flex flex-row justify-start items-center w-full">
                <span>해킹 신고 센터</span>
            </div>

            {isLoading && <Spinner className="h-12 w-12" />}

            <ReportList list={data} />
            <ReportDetail />
            <div ref={setTarget} className="h-[1rem]" />
        </div>
    )
}
