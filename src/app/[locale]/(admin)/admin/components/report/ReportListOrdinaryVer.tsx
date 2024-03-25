'use client'

import * as React from 'react'
import { Card, Typography } from '@material-tailwind/react'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'

const { useRouter } = createSharedPathnamesNavigation({ locales })

export interface IReportListOrdinaryVerComponentProps {
    listData: any
}

export default function ReportListOrdinaryVerComponent({
    listData,
}: IReportListOrdinaryVerComponentProps) {
    const router = useRouter()

    return (
        <>
            <Card className="h-full w-full my-[32px]" placeholder={undefined}>
                <table className="w-full table-fixed text-left">
                    <thead>
                        <tr>
                            <th className="border-b w-[5%] border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                    placeholder={undefined}>
                                    NO
                                </Typography>
                            </th>

                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                    placeholder={undefined}>
                                    DATE
                                </Typography>
                            </th>

                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                    placeholder={undefined}>
                                    NAME
                                </Typography>
                            </th>

                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                    placeholder={undefined}>
                                    TITLE
                                </Typography>
                            </th>

                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                    placeholder={undefined}>
                                    E-MAIL
                                </Typography>
                            </th>

                            <th className="border-b w-[5%] border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                    placeholder={undefined}>
                                    STATUS
                                </Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listData &&
                            listData.data.length > 0 &&
                            listData.data.map(
                                (
                                    { id, created_at, user_name, title, user_email, status },
                                    index,
                                ) => {
                                    const isLast = index === listData.data.length - 1
                                    const classes = isLast
                                        ? 'p-4'
                                        : 'p-4 border-b border-blue-gray-50'

                                    return (
                                        <tr
                                            key={index}
                                            className="hover:opacity-65 cursor-pointer"
                                            onClick={() => {
                                                router.push(`/admin/report/${id}`)
                                            }}>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                    placeholder={undefined}>
                                                    {/* 번호 = 전체 게시물 개수 - (현재 페이지 * 페이지당 게시물 개수 ) - 나열 인덱스 */}
                                                    {index + 1}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                    placeholder={undefined}>
                                                    {new Date(created_at).toLocaleString('ko-KR')}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                    placeholder={undefined}>
                                                    {user_name}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-medium"
                                                    placeholder={undefined}>
                                                    {title}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-medium"
                                                    placeholder={undefined}>
                                                    {user_email}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-medium"
                                                    placeholder={undefined}>
                                                    {status}
                                                </Typography>
                                            </td>
                                        </tr>
                                    )
                                },
                            )}
                    </tbody>
                </table>
            </Card>
        </>
    )
}
