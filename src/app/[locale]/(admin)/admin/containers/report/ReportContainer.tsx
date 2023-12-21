'use client'
import * as React from 'react'
import ReportList from '../../components/report/ReportList'
import { getReports } from '@/app/api/report/api'
import { useInfiniteQuery } from 'react-query'
import { Button, Spinner } from '@material-tailwind/react'

export interface IReportContainerProps {}

type lastpage = {
    page: number
    total_pages: number
}

export default function ReportContainer(props: IReportContainerProps) {
    const fetchData = async (pageParam: number) => {
        const result = await getReports((pageParam = 1))
        return result
    }

    const { data, fetchNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['getReports'],
        queryFn: ({ pageParam = 1 }) => fetchData(pageParam),
        getNextPageParam: (lastPage, allPosts) => {
            const currentPage = lastPage.paging.page
            const totalPage = lastPage.paging.total_pages

            if (currentPage === totalPage) {
                return undefined
            }
            return currentPage + 1
        },
    })
    console.log(data)
    return (
        <div className="flex flex-col justify-center items-center mt-3">
            <div className="flex flex-row justify-start items-center w-full">
                <span>해킹 신고 센터</span>
            </div>

            {isLoading && <Spinner className="h-12 w-12" />}

            {!isLoading && data.pages && <ReportList list={data.pages} />}

            <div>
                {data?.pages.map((page, index) => {
                    return page?.data.map((item, index) => <div key={index}>{item.user_email}</div>)
                })}
            </div>

            {/* <Button onClick={fetchNextPage}>asdfasdfasdf</Button> */}
        </div>
    )
}
