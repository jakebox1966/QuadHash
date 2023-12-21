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
            <Card className="h-full w-full ">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70">
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {list?.map((item, index) => (
                            <tr className="even:bg-blue-gray-50/50">
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal">
                                        123
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal">
                                        123
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal">
                                        123
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal">
                                        123
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal">
                                        123
                                    </Typography>
                                </td>
                            </tr>

                            // <tr key={item.id} className="even:bg-blue-gray-50/50">
                            //     <td className="p-4">
                            //         <Typography
                            //             variant="small"
                            //             color="blue-gray"
                            //             className="font-normal">
                            //             {name}
                            //         </Typography>
                            //     </td>
                            //     <td className="p-4">
                            //         <Typography
                            //             variant="small"
                            //             color="blue-gray"
                            //             className="font-normal">
                            //             {job}
                            //         </Typography>
                            //     </td>
                            //     <td className="p-4">
                            //         <Typography
                            //             variant="small"
                            //             color="blue-gray"
                            //             className="font-normal">
                            //             {date}
                            //         </Typography>
                            //     </td>
                            //     <td className="p-4">
                            //         <Typography
                            //             as="a"
                            //             href="#"
                            //             variant="small"
                            //             color="blue-gray"
                            //             className="font-medium">
                            //             Edit
                            //         </Typography>
                            //     </td>
                            //     <td className="p-4">
                            //         <Typography
                            //             as="a"
                            //             href="#"
                            //             variant="small"
                            //             color="blue-gray"
                            //             className="font-medium">
                            //             Edit
                            //         </Typography>
                            //     </td>
                            // </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </>
    )
}
