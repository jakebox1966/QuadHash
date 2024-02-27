import * as React from 'react'
import { IQueryParam } from '../../containers/CollectionContainer'
import { useIntersectionObserver } from '@/app/hooks/useIntersectionObserver'
import CardListComponent from './CardListComponent'
import CardComponent from './CardComponent'
import { useInfiniteQuery } from 'react-query'
import { saza_morris, gaza_morris } from '@/app/mock/burton_morris'

export interface IBurtonMorrisListComponentProps {
    queryParam: IQueryParam
    burtonMorris: boolean
    burtonMorrisData: {
        list: any[]
        total_page: number
    }
    openDetailModal: (token_id: any, token_type: any) => Promise<void>
}

export default function BurtonMorrisListComponent({
    queryParam,
    burtonMorris,
    openDetailModal,
    burtonMorrisData,
}: IBurtonMorrisListComponentProps) {
    const fetchData = async (pageParam) => {
        console.log('gggg')
        const startIndex = (pageParam - 1) * 20
        const endIndex = startIndex + 20

        const data = burtonMorrisData.list.slice(startIndex, endIndex)

        return { data: data, paging: { page: pageParam, total_pages: burtonMorrisData.total_page } }
    }

    const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
        queryKey: [
            'getBurtonMorrisCollection',
            burtonMorris,
            queryParam.token_type,
            queryParam.token_id,
        ],
        queryFn: ({ pageParam = 1 }) => fetchData(pageParam),
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = lastPage.paging.page

            const totalPage = lastPage.paging.total_pages

            if (currentPage === totalPage) {
                return false
            }
            return currentPage + 1
        },
    })

    const { setTarget } = useIntersectionObserver({
        hasNextPage,
        fetchNextPage,
    })
    return (
        <>
            <CardListComponent>
                {data?.pages.map((page) => {
                    return page?.data.map((item, index) => (
                        <CardComponent
                            onClick={openDetailModal}
                            burtonMorris={burtonMorris}
                            key={`${item}_${index}`}
                            item={item}
                            queryParam={queryParam}
                        />
                    ))
                })}
                <div ref={setTarget} className="h-[1rem]"></div>
            </CardListComponent>
        </>
    )
}
