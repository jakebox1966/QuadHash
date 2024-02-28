'use client'

import * as React from 'react'

import CardListComponent from './CardListComponent'
import CardComponent from './CardComponent'
import { getNftsForOwner } from '@/app/api/alchemy/api'
import { useIntersectionObserver } from '@/app/hooks/useIntersectionObserver'
import { useInfiniteQuery } from 'react-query'
import LoadingCardComponent from '@/app/[locale]/common/components/LoadingCardComponent'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'

export interface INFTListComponentProps {
    wallet_address: string
    tokenType: string
    openDetailModal: (token_id: any, token_type: any) => Promise<void>
}

const { Link } = createSharedPathnamesNavigation({ locales })
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
            return {
                ownedNfts: [],
                pageKey: undefined,
                totalCount: 0,
            }
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
                        .map((__, index) => (
                            <LoadingCardComponent key={index} tokenType={tokenType} />
                        ))}
                {data?.pages.map((page) => {
                    if (page.totalCount > 0) {
                        return page?.ownedNfts.map((item, index) => (
                            <CardComponent
                                onClick={openDetailModal}
                                key={`${item.tokenId}_${index}`}
                                item={item}
                                tokenType={tokenType}
                            />
                        ))
                    } else {
                        return (
                            <>
                                <div className="w-full relative flex flex-row justify-start items-center p-10 gap-[10px] rounded-2xl flex-wrap bg-[#131313] text-[#FFFFFF]">
                                    <div className="flex flex-col justify-center items-start gap-5">
                                        <div className="text-4xl font-bold">
                                            YOU DON'T HAVE ANY QBT.
                                        </div>
                                        <div className="font-bold">
                                            Head over to OPENSEA or KONKRIT to join the QUADHASH
                                        </div>
                                        {tokenType !== 'qbt' && (
                                            <>
                                                <div className="flex flex-row gap-3 font-bold">
                                                    <div className="bg-[#FFFFFF] text-black rounded-full px-6 py-2 flex flex-row justify-center items-center gap-3">
                                                        <div>
                                                            <img src="/opensea.png" alt="opensea" />
                                                        </div>
                                                        <Link
                                                            href={`https://opensea.io/collection/qh-${tokenType}`}
                                                            // href={`https://opensea.io/collection/qh-saza`}
                                                            target="_blank">
                                                            OPENSEA
                                                        </Link>
                                                    </div>
                                                    <div className="bg-[#FFFFFF] text-black rounded-full px-6 py-2 flex flex-row justify-center items-center gap-3">
                                                        <div>
                                                            <img src="/konkrit.png" alt="konkrit" />
                                                        </div>
                                                        <div>KONKRIT</div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </>
                        )
                    }
                })}
            </CardListComponent>
            <div ref={setTarget} className="h-[1rem]" />
        </>
    )
}
