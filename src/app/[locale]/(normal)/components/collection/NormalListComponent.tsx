import * as React from 'react'
import CardListComponent from './CardListComponent'
import CardComponent from './CardComponent'
import { useIntersectionObserver } from '@/app/hooks/useIntersectionObserver'
import { useInfiniteQuery } from 'react-query'
import { getCollectionList } from '@/app/api/collection/api'
import { IQueryParam } from '../../containers/CollectionContainer'

export interface INormalCollectionListComponentProps {
    queryParam: IQueryParam
    burtonMorris: boolean
    openDetailModal: (token_id: any, token_type: any) => Promise<void>
}

export default function NormalCollectionListComponent({
    queryParam,
    burtonMorris,
    openDetailModal,
}: INormalCollectionListComponentProps) {
    const fetchData = async (pageParam) => {
        const process = Object.entries(queryParam)
            .filter((item) => item[1] !== null)
            .filter((item) => item[1].length !== 0)

        const query = Object.fromEntries(process)

        query.page = pageParam

        const result = await getCollectionList(new URLSearchParams(query).toString())

        return result
    }

    const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['getCollection', queryParam, burtonMorris],
        queryFn: ({ pageParam = 1 }) => fetchData(pageParam),
        getNextPageParam: (lastPage, allPages) => {
            // console.log(lastPage)
            // console.log(allPages)
            const currentPage = lastPage.paging.page
            // const currentPage = 500
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
                <div ref={setTarget} className="h-[1rem]" />
            </CardListComponent>
        </>
    )
}