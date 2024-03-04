'use client'
import * as React from 'react'
import { Card, Typography, List, ListItem, ListItemPrefix } from '@material-tailwind/react'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'

export interface ISidebarProps {}

const { Link, useRouter } = createSharedPathnamesNavigation({ locales })
export default function Sidebar(props: ISidebarProps) {
    const router = useRouter()

    return (
        <Card
            className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5"
            placeholder={undefined}>
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray" placeholder={undefined}>
                    관리자
                </Typography>
            </div>
            <List placeholder={undefined}>
                <Link href="/admin/report">
                    <ListItem placeholder={undefined}>
                        <ListItemPrefix placeholder={undefined}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                                />
                            </svg>
                        </ListItemPrefix>
                        해킹신고센터
                    </ListItem>
                </Link>

                <Link href="/admin/calendar">
                    <ListItem placeholder={undefined}>
                        <ListItemPrefix placeholder={undefined}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                                />
                            </svg>
                        </ListItemPrefix>
                        캘린더
                    </ListItem>
                </Link>
                <Link href="/admin/eventTicket">
                    <ListItem placeholder={undefined}>
                        <ListItemPrefix placeholder={undefined}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                                />
                            </svg>
                        </ListItemPrefix>
                        이벤트 티켓
                    </ListItem>
                </Link>
                <Link href="/admin/something-for-admin">
                    <ListItem placeholder={undefined}>
                        <ListItemPrefix placeholder={undefined}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                                />
                            </svg>
                        </ListItemPrefix>
                        어떤 메뉴 2
                    </ListItem>
                </Link>

                <Link href="/">
                    <ListItem placeholder={undefined}>
                        <ListItemPrefix placeholder={undefined}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                />
                            </svg>
                        </ListItemPrefix>
                        돌아가기
                    </ListItem>
                </Link>
            </List>
        </Card>
    )
}
