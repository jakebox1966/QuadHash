'use client'

import { getBlock, getTransfersForOwner } from '@/app/api/alchemy/api'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { GetTransfersForOwnerTransferType, NftOrdering } from 'alchemy-sdk'
import * as React from 'react'
import CardList from '../../components/report/CardList'
import Card from '../../components/report/Card'
import { Button } from '@material-tailwind/react'

export interface INftListProps {}

export default function NftListPage(props: INftListProps) {
    const [transactions, setTransactions] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [selectedNft, setSelectedNft] = React.useState([])

    const { wallet } = useMetaMask()

    React.useEffect(() => {
        console.log(selectedNft)
    }, [selectedNft])

    // React.useEffect(() => {
    //     const getExNfts = async () => {
    //         if (wallet.accounts.length > 0) {
    //             setIsLoading(true)
    //             const result = await getTransfersForOwner(
    //                 wallet.accounts[0],
    //                 GetTransfersForOwnerTransferType.TO,
    //                 {
    //                     contractAddresses: [
    //                         process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS,
    //                         process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS,
    //                     ],
    //                     tokenType: 'ERC721',
    //                     orderby: NftOrdering.TRANSFERTIME,
    //                 },
    //             )

    //             const nfts = result.nfts

    //             let filteredTransaction = []

    //             for (let i = 0; i < nfts.length; i++) {
    //                 const block = await getBlock(nfts[i].blockNumber)
    //                 // if (block.timestamp + 60 * 60 * 24 > Math.floor(new Date().getTime() / 1000)) {
    //                 filteredTransaction.push(nfts[i])
    //                 // }
    //             }

    //             console.log(filteredTransaction)
    //             setTransactions((prev) => [...prev, ...filteredTransaction])
    //         }
    //         setIsLoading(false)
    //     }

    //     getExNfts()
    // }, [wallet])
    return (
        <>
            <div className="flex flex-col w-full justify-center items-center px-20 pt-20 gap-10">
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="text-[#F46221] text-sm  font-black">QUADHASH</div>
                    <div className="text-xl lg:text-3xl font-black">해킹 신고 센터</div>
                    <div>STEP. 1</div>
                    <div className="text-gray-900/40">신고할 NFT를 선택해주세요.</div>
                </div>
                <div className="flex flex-col justify-center items-center w-full">
                    <div className="text-center lg:text-left w-full text-lg lg:text-2xl font-black p-5">
                        Collection List
                    </div>

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
                                    key={item.token_id}
                                    nft={item}
                                    setSelectedNft={setSelectedNft}
                                />
                            ))}
                        </CardList>
                    )}
                    {!isLoading && transactions && transactions.length === 0 && (
                        <div className="relative flex flex-row w-full justify-center items-center border-4 p-5 gap-[10px] rounded-2xl flex-wrap">
                            <div>You dont have any NFT Transaction in your account.</div>
                        </div>
                    )}
                </div>
                <div className="flex flex-col justify-center items-center gap-4">
                    {/* <Button
                        variant="outlined"
                        className="rounded-lg border-[#F46221] text-[#F46221]  px-10 shadow-lg"
                        // disabled={isConnecting}
                        placeholder={undefined}>
                        <span>취소</span>
                    </Button> */}
                    <Button
                        className="rounded-full px-10 bg-[#F46221] shadow-lg text-white"
                        placeholder={undefined}>
                        <span>선택 완료</span>
                    </Button>
                </div>
            </div>
        </>
    )
}
