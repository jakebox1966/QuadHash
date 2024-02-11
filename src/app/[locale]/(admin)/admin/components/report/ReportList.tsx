'use client'
import * as React from 'react'
import { Card, Typography } from '@material-tailwind/react'
import { InfiniteData } from 'react-query'
import Image from 'next/image'

export interface IReportListProps {
    list: any
}

const TABLE_HEAD = ['Num', 'Title', 'E-mail', 'Created At', 'Status']

export default function ReportList({ list }: IReportListProps) {
    // React.useEffect(() => {
    //     console.log(list)
    // }, [list])

    return (
        <>
            asdfasdfasdfasd
            {list?.pages?.map((page, index) => {
                // return page?.data.map((item, index) => <div key={index}>123</div>)
                return page?.data.map((item, index) => (
                    <>
                        <div
                            key={index}
                            className="flex flex-col justify-center items-center w-full p-3 gap-3">
                            <div className="flex flex-col justify-center items-center border-gray-300 border-2 pb-7 pt-3 px-7  rounded-lg w-[400px] min-w-max cursor-pointer shadow-2xl hover:scale-110 transition-all">
                                <div className="text-sm text-gray-600 text-left w-full">
                                    {new Date(item.created_at).toLocaleString('ko-KR')}
                                </div>
                                {/* <div
                                    className="flex flex-row justify-start items-center gap-3 overflow-x-auto shadow-lg p-3 rounded-lg"
                                    style={{ width: 'inherit' }}>
                                    <Image
                                        className="rounded-lg"
                                        src={item.}
                                        alt={'1'}
                                        width={100}
                                        height={100}
                                    />
                                </div> */}
                                <div className="w-full mt-3">
                                    <div>{item.title}</div>
                                    <div className="text-sm text-gray-600 text-right">
                                        {item.user_email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))
            })}
        </>
    )
}
