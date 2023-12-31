'use client'

import { useContext, useEffect, useState } from 'react'
import ExcelJS from 'exceljs'
import NftList from '../components/report/NftList'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { getBlock, getTransfersForOwner } from '@/app/api/alchemy/api'
import { Alchemy, GetTransfersForOwnerTransferType, Network, NftOrdering } from 'alchemy-sdk'
import React from 'react'
import { Button, Input, Textarea } from '@material-tailwind/react'
import { postReport } from '@/app/api/report/api'
import { AlertContext } from '@/app/provider/AlertProvider'
import { ConfirmContext } from '@/app/provider/ConfirmProvider'

export interface IReportContainerProps {}

export interface IReportParameter {
    title: string
    content: string
    user_email: string
    post_nfts: nftArray[]
}

interface nftArray {
    token_id: string
    token_type: string
}
const config = {
    apiKey: '2jp0674GCJeIZW9qmM3WB92wslh1P8yM', // Replace with your API key
    network: Network.ETH_MAINNET, // Replace with your network
}
const alchemy = new Alchemy(config)
export default function ReportContainer(props: IReportContainerProps) {
    const { $alert } = useContext(AlertContext)
    const { $confirm } = useContext(ConfirmContext)
    const [sazaExNftList, setSazaExNftList] = useState([])
    const [gazaExNftList, setGazaExNftList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [input, setInput] = useState({
        title: '',
        email: '',
        content: '',
    })

    const { wallet } = useMetaMask()

    useEffect(() => {
        const getExNfts = async () => {
            if (wallet.accounts.length > 0) {
                setIsLoading(true)
                const result = await getTransfersForOwner(
                    wallet.accounts[0],
                    GetTransfersForOwnerTransferType.TO,
                    {
                        contractAddresses: [
                            process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS,
                            process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS,
                        ],
                        tokenType: 'ERC721',
                        orderby: NftOrdering.TRANSFERTIME,
                    },
                )

                const nfts = result.nfts
                // console.log(nfts)

                let filteredTransaction = []

                for (let i = 0; i < nfts.length; i++) {
                    const block = await getBlock(nfts[i].blockNumber)
                    // if (block.timestamp + 60 * 60 * 24 > Math.floor(new Date().getTime() / 1000)) {
                    filteredTransaction.push(nfts[i])
                    // }
                }
                let sazaExNftList = []
                let gazaExNftList = []

                filteredTransaction.forEach((transaction) => {
                    if (
                        transaction.contract.address ===
                        process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS
                    ) {
                        sazaExNftList.push(transaction)
                    } else if (
                        transaction.contract.address ===
                        process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS
                    ) {
                        gazaExNftList.push(transaction)
                    }
                })

                setSazaExNftList(
                    sazaExNftList.map((exNft) => ({
                        ...exNft,
                        ...{ isChecked: false },
                    })),
                )
                setGazaExNftList(
                    gazaExNftList.map((exNft) => ({
                        ...exNft,
                        ...{ isChecked: false },
                    })),
                )
            }
            setIsLoading(false)
        }

        getExNfts()
    }, [wallet])

    const inputHandler = (e: React.ChangeEvent) => {
        if (e.target instanceof HTMLInputElement) {
            const { value, name } = e.target
            setInput({ ...input, [name]: value })
        } else if (e.target instanceof HTMLTextAreaElement) {
            const { value, name } = e.target
            setInput({ ...input, [name]: value })
        }
    }

    const report = async () => {
        if (await $confirm('해킹신고 게시글을 작성합니다.')) {
            // console.log(123)
            const sazaList = sazaExNftList
                .filter((nft) => nft.isChecked === true)
                .map((nft) => {
                    return { token_id: nft.tokenId, token_type: 'saza' }
                })
            const gazaList = gazaExNftList
                .filter((nft) => nft.isChecked === true)
                .map((nft) => {
                    return { token_id: nft.tokenId, token_type: 'gaza' }
                })

            console.log('saza', sazaList)
            console.log('gaza', gazaList)

            const nfts = [...sazaList, ...gazaList]

            const result = await postReport({
                title: input.title,
                content: input.content,
                user_email: input.email,
                post_nfts: nfts,
            })

            console.log('result', result)
        }
    }

    const getAllNfts = async () => {
        try {
            let nfts = []
            // Get the async iterable for the contract's NFTs.
            const nftsIterable = alchemy.nft.getNftsForContractIterator(
                // '0x75e46bdc52d4A2064dc8850EE0f52EE93BFe337c',
                '0x3d049aDb773fADDeF681FbE565466C4F9736A009',
                // { pageKey: 99999 },
            )

            // Iterate over the NFTs and add them to the nfts array.
            for await (const nft of nftsIterable) {
                nfts.push(nft)
            }

            console.log(nfts)

            return nfts
        } catch (error) {
            console.log(error)
        }
    }

    const test = async () => {
        console.log(123)
        const nfts = await getAllNfts()
        const arr = new Array(10000)

        console.log(arr.length)
        for (let i = 0; i < arr.length; i++) {
            arr[i] = `${i}`
        }

        console.log(arr)

        // nfts.forEach((item, index) => {
        //     let tokenId = item.tokenId
        //     let idx = arr.indexOf(tokenId)
        //     console.log(idx)
        //     arr.splice(idx, 1)
        // })

        for (let i = 0; i < nfts.length; i++) {
            let tokenId = nfts[i].tokenId
            let index = arr.indexOf(tokenId)

            arr.splice(index, 1)
        }
        const result = arr.map((item) => {
            return { id: item }
        })

        console.log(result)

        // const arr2 = ['A', 'B', 'C']

        // const a = arr2.map((item) => {
        //     return { id: item }
        // })

        // console.log(a)
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('test')
        worksheet.columns = [{ header: 'Token ID', key: 'id' }]
        const arr1 = [{ id: 'A' }, { id: 'A' }, { id: 'A' }, { id: 'A' }]
        worksheet.insertRows(2, result)
        const buffer = await workbook.xlsx.writeBuffer()
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        const url = window.URL.createObjectURL(blob) // blob으로 객체 URL 생성
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = 'test1.xlsx'
        anchor.click() // anchor를 다운로드 링크로 만들고 강제로 클릭 이벤트 발생
        window.URL.revokeObjectURL(url) // 메모리에서 해제

        // console.log(arr)

        //
    }
    // const report = async () => {
    //     // await $alert('123123123')
    //     await $confirm('1232123123')
    //     console.log(123)
    // }

    return (
        <>
            <div className="flex flex-col justify-start items-start h-full px-20">
                <div>해킹 신고 센터</div>
                <div className=" flex flex-row justify-start items-start w-full h-full">
                    <div className="w-[60%] h-full m-3">
                        <NftList
                            type="saza"
                            exNftList={sazaExNftList}
                            setExNftList={setSazaExNftList}
                            isLoading={isLoading}
                        />
                        <NftList
                            type="gaza"
                            exNftList={gazaExNftList}
                            setExNftList={setGazaExNftList}
                            isLoading={isLoading}
                        />
                    </div>
                    <div className="w-[40%] h-full p-3 flex flex-col justify-center items-center gap-8">
                        <Input
                            label="Title"
                            name="title"
                            crossOrigin={undefined}
                            onChange={inputHandler}
                        />
                        <Input
                            label="Email"
                            name="email"
                            crossOrigin={undefined}
                            onChange={inputHandler}
                        />
                        <Textarea label="Content" name="content" onChange={inputHandler} />
                        <div className="flex justify-end">
                            <Button onClick={test} placeholder={undefined}>
                                Report
                            </Button>
                        </div>
                    </div>
                </div>
                {/* <NftList type="saza" exNftList={sazaExNftList} setExNftList={setSazaExNftList} />
                <NftList type="gaza" exNftList={gazaExNftList} setExNftList={setGazaExNftList} /> */}
            </div>
        </>
    )
}
