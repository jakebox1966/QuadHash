import * as React from 'react'
import CardListComponent from './CardListComponent'
import CardComponent from './CardComponent'
import { useIntersectionObserver } from '@/app/hooks/useIntersectionObserver'
import { useInfiniteQuery } from 'react-query'
import { getCollectionList } from '@/app/api/collection/api'
import { IQueryParam } from '../../containers/CollectionContainer'
import LoadingCardComponent from '@/app/[locale]/common/components/LoadingCardComponent'

export interface INormalCollectionListComponentProps {
    lockedNFTs: {
        saza: any[]
        gaza: any[]
    }
    queryParam: IQueryParam
    burtonMorris: boolean
    openDetailModal: (token_id: any, token_type: any) => Promise<void>
}

export default function NormalCollectionListComponent({
    queryParam,
    burtonMorris,
    lockedNFTs,
    openDetailModal,
}: INormalCollectionListComponentProps) {
    const fetchData = async (pageParam) => {
        const process = Object.entries(queryParam)
            .filter((item) => item[1] !== null)
            .filter((item) => item[1].length !== 0)

        console.log('process', process)

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

            console.log(lastPage)
            // return false
            if (currentPage === totalPage || totalPage === 0) {
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
        <>
            <CardListComponent>
                {isLoading &&
                    Array(20)
                        .fill(0)
                        .map((__, index) => <LoadingCardComponent key={index} />)}

                {data?.pages.map((page) => {
                    console.log(page)

                    if (page.paging.total_pages > 0) {
                        return page?.data.map((item, index) => (
                            <>
                                <CardComponent
                                    lockedNFTs={lockedNFTs}
                                    onClick={openDetailModal}
                                    burtonMorris={burtonMorris}
                                    key={`${item}_${index}`}
                                    item={item}
                                    queryParam={queryParam}
                                />
                            </>
                        ))
                    }
                })}

                {data?.pages[0].data.length === 0 && (
                    <div className="w-full border-2 p-3 rounded-lg text-center">
                        해당 데이터가 없습니다.
                    </div>
                )}

                <div ref={setTarget} className="h-[1rem]" />
            </CardListComponent>
        </>
    )
}
