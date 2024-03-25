'use client'

import { getCalendars } from '@/app/api/calendar/api'
import * as React from 'react'
import { useInfiniteQuery } from 'react-query'
import CardListComponent from '../../components/calendar/CardListComponent'
import LoadingCardComponent from '@/app/[locale]/common/components/LoadingCardComponent'
import CardComponent from '../../components/calendar/CardComponent'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'

import { locales } from '@/i18nconfig'

import { useIntersectionObserver } from '@/app/hooks/useIntersectionObserver'

export interface ICalendarContainerProps {}

const { Link } = createSharedPathnamesNavigation({ locales })

export default function CalendarContainer(props: ICalendarContainerProps) {
    const fetchData = async (pageParam: number) => {
        const result = await getCalendars(pageParam)
        return result
    }

    const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['getCalendar'],
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
            <div className="flex flex-col justify-start items-start w-full relative">
                <div className="text-3xl text-medium">캘린더</div>

                <CardListComponent>
                    {isLoading &&
                        Array(12)
                            .fill(0)
                            .map((__, index) => <LoadingCardComponent key={index} />)}
                    {data?.pages.map((page, index) => {
                        console.log(data)
                        if (page.paging.total_pages > 0) {
                            return page?.data.map((item, index) => (
                                <CardComponent item={item} key={`${item.tokenId}_${index}`} />
                            ))
                        } else {
                            return (
                                <>
                                    <div
                                        className="w-full bg-[#131313] text-[#FFFFFF] rounded-xl"
                                        key={`${index}`}>
                                        <div className="overflow-hidden rounded-lg aspect-[2/1] lg:aspect-[4/1] flex flex-row items-center">
                                            <div className="text-md md:text-2xl lg:text-4xl font-bold w-full text-center">
                                                YOU DON'T HAVE ANY LIST.
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    })}
                </CardListComponent>
                <div ref={setTarget} className="h-[1rem]" />
                <Link
                    href={'/admin/calendar/create'}
                    className="border-2 rounded-full px-8 py-9 bg-gray-200 hover:opacity-65 fixed bottom-20 right-20">
                    NEW
                </Link>
            </div>
        </div>
    )
}
