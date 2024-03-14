import * as React from 'react'
import { IQueryParam } from '../../containers/CollectionContainer'
import { useIntersectionObserver } from '@/app/hooks/useIntersectionObserver'
import CardListComponent from './CardListComponent'
import CardComponent from './CardComponent'
import { useInfiniteQuery } from 'react-query'
import { saza_morris, gaza_morris } from '@/app/mock/burton_morris'
import LoadingCardComponent from '@/app/[locale]/common/components/LoadingCardComponent'

export interface IBurtonMorrisListComponentProps {
    queryParam: IQueryParam
    burtonMorris: boolean
    lockedNFTs: {
        saza: any[]
        gaza: any[]
    }
    burtonMorrisData: {
        list: any[]
        total_page: number
    }
    openDetailModal: (token_id: any, token_type: any) => Promise<void>
}

export default function BurtonMorrisListComponent({
    queryParam,
    burtonMorris,
    lockedNFTs,
    openDetailModal,
    burtonMorrisData,
}: IBurtonMorrisListComponentProps) {
    let lockedNFTList = []

    if (queryParam.token_type === 'saza') {
        lockedNFTList = lockedNFTs.saza
    } else if (queryParam.token_type === 'gaza') {
        lockedNFTList = lockedNFTs.gaza
    }

    const fetchData = async (pageParam) => {
        const startIndex = (pageParam - 1) * 20
        const endIndex = startIndex + 20

        if (queryParam.token_id) {
            const data = burtonMorrisData.list.filter(
                (item) => item === parseInt(queryParam.token_id),
            )

            return {
                data: data,
                paging: { page: pageParam, total_pages: 1 },
            }
        }

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
                    return page?.data.map((item, index) => (
                        <CardComponent
                            isLocked={lockedNFTList.includes(item)}
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
