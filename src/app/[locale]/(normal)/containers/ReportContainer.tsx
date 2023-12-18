'use client'

import { useEffect, useState } from 'react'
import NftList from '../report/components/NftList'
import InputArea from '../report/components/InputArea'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { getBlock, getTransfersForOwner } from '@/app/api/alchemy/api'
import { GetTransfersForOwnerTransferType } from 'alchemy-sdk'

export interface IReportContainerProps {}

export default function ReportContainer(props: IReportContainerProps) {
    const [myExNfts, setMyExNfts] = useState([])
    const { wallet } = useMetaMask()

    useEffect(() => {
        const getExNfts = async () => {
            const result = await getTransfersForOwner(
                wallet.accounts[0],
                GetTransfersForOwnerTransferType.TO,
                {
                    constractAddresses: [`${process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS}`],
                    tokenType: 'ERC721',
                },
            )
            // console.log(result)r

            const nfts = result.nfts
            // const filteredTransaction = nfts.filter(async (transaction) => {
            //     console.log('transaction', transaction)
            //     const block = await getBlock(transaction.blockNumber)
            //     console.log(block.timestamp)

            //     // 블록이 체인에 연결된 시간 + 24시간이 현재 시간보다 큰 조건
            //     console.log(
            //         'boolean',
            //         block.timestamp + 60 * 60 * 24 > Math.floor(new Date().getTime() / 1000),
            //     )
            //     if (block.timestamp + 60 * 60 * 24 > Math.floor(new Date().getTime() / 1000)) {
            //         console.log(123)
            //         return 1
            //     }
            // })

            const filteredTransaction = nfts.filter(async (transaction) => {
                const block = await getBlock(transaction.blockNumber)
                console.log(block)

                return block
            })

            console.log('filteredTransaction', filteredTransaction)
        }

        // const getBlockWithTransactions = async () => {
        //     const result = await getBlockWithTransactions()
        // }
        getExNfts()
        // getBlockWithTransactions()
    }, [])
    const [exNftList, setExNftList] = useState<string[]>([])

    return (
        <>
            <div>해킹 신고 센터</div>
            <div className="flex flex-col justify-center items-center gap-10 w-full">
                <NftList exNftList={exNftList} setExNftList={setExNftList} />
                <InputArea exNftList={exNftList} setExNftList={setExNftList} />
            </div>
        </>
    )
}
