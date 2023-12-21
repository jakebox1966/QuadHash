'use client'
import * as React from 'react'
import { Card, Typography } from '@material-tailwind/react'
import { InfiniteData } from 'react-query'

export interface IReportListProps {
    list: any
}

const TABLE_HEAD = ['Num', 'Title', 'E-mail', 'Created At', 'Status']

export default function ReportList({ list }: IReportListProps) {
    React.useEffect(() => {
        console.log(list)
    }, [list])

    const TABLE_ROWS = [
        {
            name: 'John Michael',
            job: 'Manager',
            date: '23/04/18',
        },
        {
            name: 'Alexa Liras',
            job: 'Developer',
            date: '23/04/18',
        },
        {
            name: 'Laurent Perrier',
            job: 'Executive',
            date: '19/09/17',
        },
        {
            name: 'Michael Levi',
            job: 'Developer',
            date: '24/12/08',
        },
        {
            name: 'Richard Gran',
            job: 'Manager',
            date: '04/10/21',
        },
    ]

    return (
        <>
            <div>
                {list?.pages?.map((page, index) => {
                    return page?.data.map((item, index) => <div key={index}>{item.user_email}</div>)
                })}
            </div>
        </>
    )
}
