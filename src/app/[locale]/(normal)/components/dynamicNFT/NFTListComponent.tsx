'use client'

import * as React from 'react'

import CardListComponent from './CardListComponent'
import CardComponent from './CardComponent'
import { getNftsForOwner } from '@/app/api/alchemy/api'
import { useIntersectionObserver } from '@/app/hooks/useIntersectionObserver'
import { useInfiniteQuery } from 'react-query'
import LoadingCardComponent from '@/app/[locale]/common/components/LoadingCardComponent'
import { Transition } from '@headlessui/react'
import { locales } from '@/i18nconfig'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import Image from 'next/image'
import saza_super from '/public/saza_super.png'

export interface INFTListComponentProps {
    wallet_address: string
    tokenType: string
}

type lastpage = {
    ownedNfts: any[]
    totalCount: number
}

const { Link } = createSharedPathnamesNavigation({ locales })

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
                pageSize: 20,
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
            <CardListComponent>
                {isLoading &&
                    Array(20)
                        .fill(0)
                        .map((__, index) => <LoadingCardComponent key={index} />)}
                {data?.pages.map((page, index) => {
                    if (page.totalCount > 0) {
                        return page?.ownedNfts.map((item, index) => (
                            <CardComponent
                                key={`${item.tokenId}_${index}`}
                                tokenId={item.tokenId}
                                tokenType={tokenType}
                            />
                        ))
                    } else {
                        return (
                            <>
                                <div
                                    className="w-full bg-[#131313] text-[#FFFFFF] rounded-xl"
                                    key={`${index}`}>
                                    <div className="overflow-hidden rounded-lg lg:aspect-[4/1] p-[1rem] lg:pl-[83px] flex flex-row items-center">
                                        <div className="text-md font-medium w-full text-left">
                                            <div className="text-[10px] lg:text-[30px]">
                                                YOU DON'T HAVE ANY QUADHASH :{' '}
                                                {tokenType.toUpperCase()}
                                            </div>
                                            {tokenType !== 'qbt' && (
                                                <>
                                                    <div className="font-medium text-[10px] lg:text-[20px] text-[#A2A2A2]">
                                                        Head over to OPENSEA or KONKRIT to join the
                                                        QUADHASH
                                                    </div>
                                                    <div className="flex flex-row gap-[24px] font-medium mt-[25px]">
                                                        <Link
                                                            href={`https://opensea.io/collection/qh-${tokenType}`}
                                                            // href={`https://opensea.io/collection/qh-saza`}
                                                            target="_blank"
                                                            className="bg-[#FFFFFF] text-black rounded-full p-[5px] lg:py-2 flex flex-row justify-center min-w-[100px] lg:min-w-[200px] items-center gap-3">
                                                            <div>
                                                                <img
                                                                    src="/opensea.png"
                                                                    alt="opensea"
                                                                    className="w-[15px] lg:w-[30px]"
                                                                />
                                                            </div>
                                                            <div className="text-[10px] lg:text-[21px]">
                                                                OPENSEA
                                                            </div>
                                                        </Link>
                                                        <Link
                                                            className="bg-[#FFFFFF] text-black rounded-full p-[5px] lg:py-2 flex flex-row justify-center items-center gap-3 min-w-[100px] lg:min-w-[200px]"
                                                            href={`${
                                                                tokenType === 'saza'
                                                                    ? 'https://market.konkrit.io/collection/0x75e46bdc52d4a2064dc8850ee0f52ee93bfe337c'
                                                                    : 'https://market.konkrit.io/collection/0x3d049adb773faddef681fbe565466c4f9736a009'
                                                            }`}
                                                            // href={`https://opensea.io/collection/qh-saza`}
                                                            target="_blank">
                                                            <div>
                                                                <img
                                                                    src="/konkrit.png"
                                                                    alt="konkrit"
                                                                    className="w-[15px] lg:w-[30px]"
                                                                />
                                                            </div>
                                                            <div className="text-[10px] lg:text-[21px]">
                                                                KONKRIT
                                                            </div>
                                                        </Link>
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
