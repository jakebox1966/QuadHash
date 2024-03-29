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
    let lockedNFTList = []

    if (queryParam.token_type === 'saza') {
        lockedNFTList = lockedNFTs.saza
    } else if (queryParam.token_type === 'gaza') {
        lockedNFTList = lockedNFTs.gaza
    }

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
            const currentPage = lastPage.paging.page

            const totalPage = lastPage.paging.total_pages

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
                        .map((__, index) => <LoadingCardComponent key={`${index}_dummy`} />)}

                {data?.pages.map((page, index) => {
                    if (page.paging.total_pages > 0) {
                        return page?.data.map((item) => (
                            <CardComponent
                                key={`${item}_${queryParam.token_type}`}
                                isLocked={lockedNFTList.includes(item)}
                                onClick={openDetailModal}
                                burtonMorris={burtonMorris}
                                item={item}
                                queryParam={queryParam}
                            />
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
