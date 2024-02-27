'use client'

import * as React from 'react'

import CardListComponent from './CardListComponent'
import CardComponent from './CardComponent'
import { getNftsForOwner } from '@/app/api/alchemy/api'
import { useIntersectionObserver } from '@/app/hooks/useIntersectionObserver'
import { useInfiniteQuery } from 'react-query'

export interface INFTListComponentProps {
    wallet_address: string
    tokenType: string
}

type lastpage = {
    ownedNfts: any[]
    totalCount: number
}

export default function NFTListComponent({ wallet_address, tokenType }: INFTListComponentProps) {
    const fetchData = async (pageKey: string) => {
        if (tokenType === 'saza') {
            return await getNftsForOwner(wallet_address, {
                contractAddresses: [process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS],
                pageSize: 20,
                pageKey: pageKey,
            })
        } else if (tokenType === 'gaza') {
            return await getNftsForOwner(wallet_address, {
                contractAddresses: [process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS],
                pageSize: 5,
                pageKey: pageKey,
            })
        }
    }

    const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['getCollectionByOwner', tokenType, wallet_address],
        queryFn: (query) => fetchData(query.pageParam),
        getNextPageParam: (lastPage: any, allPages) => {
            const pageKey = lastPage.pageKey

            if (!pageKey) {
                return false
            }

            return pageKey
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
            <div className="mt-[80px] text-[25px] font-medium w-full text-center lg:text-left">
                Select Your Collection
            </div>
            <CardListComponent>
                {data?.pages.map((page) => {
                    return page?.ownedNfts.map((item, index) => (
                        <CardComponent
                            key={`${item.tokenId}_${index}`}
                            tokenId={item.tokenId}
                            tokenType={tokenType}
                        />
                    ))
                })}
            </CardListComponent>
            <div ref={setTarget} className="h-[1rem]" />
        </>
    )
}
