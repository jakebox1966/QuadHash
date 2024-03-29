'use client'

import { getBlock, getTransfersForOwner } from '@/app/api/alchemy/api'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { GetTransfersForOwnerTransferType, NftOrdering } from 'alchemy-sdk'
import * as React from 'react'
import CardList from './CardList'
import Card from './Card'
import { Button } from '@material-tailwind/react'
export interface ISelectNFTComponentProps {
    isLoading: boolean
    transactions: any
    setTransactions: React.Dispatch<React.SetStateAction<any[]>>
    setInputs: React.Dispatch<
        React.SetStateAction<{
            user_name: string
            title: string
            post_nfts: any[]
            user_email: string
            user_phone: string
            content: string
            checkbox: boolean
        }>
    >
}

export default function SelectNFTComponent({
    isLoading,
    transactions,
    setTransactions,
    setInputs,
}: ISelectNFTComponentProps) {
    const selectNFT = (targetIndex: number) => {
        // console.log(targetIndex)
        setTransactions(
            transactions.map((item, index) =>
                index === targetIndex ? { ...item, isChecked: !item.isChecked } : item,
            ),
        )
        if (!transactions[targetIndex].isChecked) {
            setInputs((prev) => ({
                ...prev,
                post_nfts: [
                    ...prev.post_nfts,
                    {
                        token_id: transactions[targetIndex].decimalTokenId,
                        token_type: transactions[targetIndex].tokenType,
                    },
                ],
            }))
        } else {
            const target = transactions[targetIndex].decimalTokenId
            setInputs((prev) => ({
                ...prev,
                post_nfts: prev.post_nfts.filter((item) => item.token_id !== target),
            }))
        }
    }

    React.useEffect(() => {
        console.log(transactions)
    }, [transactions])

    return (
        <>
            <div className="flex flex-col w-full justify-center items-center lg:pt-[96px] gap-[100px]">
                <div className="flex flex-col justify-start items-center gap-[12px] w-full">
                    <div className="text-[#F46221] text-[16px] font-black">
                        QUADHASH HACKING REPORT
                    </div>
                    <div className="text-[35px] lg:text-[36px] font-black">해킹 신고 센터</div>
                    <div>STEP. 2</div>
                    <div className="text-gray-900/40">신고할 NFT를 선택해주세요.</div>
                </div>
                <div className="flex flex-col justify-center items-center w-full">
                    {isLoading && (
                        <>
                            <div className="relative flex flex-row justify-start items-center p-5 gap-[10px] rounded-2xl flex-wrap">
                                <div className="rounded-lg blur-md w-full md:w-[calc(100%/2-6px)] lg:w-[calc((100%/3-10px)+(7px/3))]">
                                    <div className="bg-gray-400">
                                        <img src="/1.png" alt="" />
                                    </div>
                                </div>
                                <div className="rounded-lg blur-md w-full md:w-[calc(100%/2-6px)] lg:w-[calc((100%/3-10px)+(7px/3))]">
                                    <div className="bg-gray-400">
                                        <img src="/1.png" alt="" />
                                    </div>
                                </div>
                                <div className="rounded-lg blur-md w-full md:w-[calc(100%/2-6px)] lg:w-[calc((100%/3-10px)+(7px/3))]">
                                    <div className="bg-gray-400">
                                        <img src="/1.png" alt="" />
                                    </div>
                                </div>
                                <span className="loader absolute left-1/2 -translate-x-1/2"></span>
                            </div>
                        </>
                    )}

                    {!isLoading && transactions && transactions.length > 0 && (
                        <CardList>
                            {transactions?.map((item, index) => (
                                <Card
                                    onClick={() => {
                                        selectNFT(index)
                                    }}
                                    key={`${item.rawContract.address}_${item.tokenId}`}
                                    nft={item}
                                />
                            ))}
                        </CardList>
                    )}
                    {!isLoading && transactions && transactions.length === 0 && (
                        <div className="relative flex flex-row w-full justify-center items-center border-4 p-5 gap-[10px] rounded-2xl flex-wrap">
                            <div>신고 가능한 NFT가 존재하지 않습니다.</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
