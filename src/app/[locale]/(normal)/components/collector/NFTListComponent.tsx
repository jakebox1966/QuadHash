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
    openDetailModal: (token_id: any, token_type: any) => Promise<void>
}

export default function NFTListComponent({
    wallet_address,
    tokenType,
    openDetailModal,
}: INFTListComponentProps) {
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
        } else if (tokenType === 'qbt') {
            return []
        }
    }

    const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['getCollectionByOwner', tokenType],
        queryFn: (query) => fetchData(query.pageParam),
        getNextPageParam: (lastPage: any, allPages) => {
            const pageKey = lastPage.pageKey

            if (!pageKey) {
                return false
            }

            return pageKey
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
                    return page?.ownedNfts.map((item, index) => (
                        <CardComponent
                            onClick={openDetailModal}
                            key={`${item.tokenId}_${index}`}
                            item={item}
                            tokenType={tokenType}
                        />
                    ))
                })}
            </CardListComponent>
            <div ref={setTarget} className="h-[1rem]" />
        </>
    )
}
