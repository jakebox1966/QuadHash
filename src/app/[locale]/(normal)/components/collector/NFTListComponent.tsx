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
import Image from 'next/image'

import saza_super from '/public/saza_super.png'
import { useSession } from 'next-auth/react'

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
    const { data: session } = useSession()
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
                pageSize: 20,
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
        queryKey: [`getCollectionByOwner?${wallet_address}`, tokenType, session],
        queryFn: (query) => fetchData(query.pageParam),
        getNextPageParam: (lastPage: any, allPages) => {
            const pageKey = lastPage.pageKey

            if (!pageKey) {
                return false
            }

            return pageKey
        },
        cacheTime: 0,
        staleTime: 0,
        retry: 0,
        refetchOnMount: true,
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
                {data?.pages.map((page, index) => {
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
                                <div
                                    className="w-full bg-[#131313] text-[#FFFFFF] rounded-xl"
                                    key={`${index}`}>
                                    <div className="overflow-hidden rounded-lg aspect-[2/1] lg:aspect-[4/1] pl-[83px] flex flex-row items-center">
                                        <div className="text-md font-medium w-full text-left">
                                            <div className="text-[30px]">
                                                YOU DON'T HAVE ANY QUADHASH :{' '}
                                                {tokenType.toUpperCase()}
                                            </div>
                                            {tokenType !== 'qbt' && (
                                                <>
                                                    <div className="font-medium text-[16px]">
                                                        Head over to OPENSEA or KONKRIT to join the
                                                        QUADHASH
                                                    </div>
                                                    <div className="flex flex-row gap-[24px] font-medium mt-[25px]">
                                                        <div className="bg-[#FFFFFF] text-black rounded-full px-6 py-2 flex flex-row justify-center min-w-[200px] items-center gap-3">
                                                            <div>
                                                                <img
                                                                    src="/opensea.png"
                                                                    alt="opensea"
                                                                />
                                                            </div>
                                                            <Link
                                                                href={`https://opensea.io/collection/qh-${tokenType}`}
                                                                // href={`https://opensea.io/collection/qh-saza`}
                                                                target="_blank"
                                                                className="text-[21px]">
                                                                OPENSEA
                                                            </Link>
                                                        </div>
                                                        <div className="bg-[#FFFFFF] text-black rounded-full px-6 py-2 flex flex-row justify-center items-center gap-3 min-w-[200px]">
                                                            <div>
                                                                <img
                                                                    src="/konkrit.png"
                                                                    alt="konkrit"
                                                                />
                                                            </div>
                                                            <Link
                                                                href={`${
                                                                    tokenType === 'saza'
                                                                        ? 'https://market.konkrit.io/collection/0x75e46bdc52d4a2064dc8850ee0f52ee93bfe337c'
                                                                        : 'https://market.konkrit.io/collection/0x3d049adb773faddef681fbe565466c4f9736a009'
                                                                }`}
                                                                // href={`https://opensea.io/collection/qh-saza`}
                                                                target="_blank"
                                                                className="text-[21px]">
                                                                KONKRIT
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <div className="hidden lg:block">
                                            <Image src={saza_super} alt="saza_super" />
                                        </div>
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
