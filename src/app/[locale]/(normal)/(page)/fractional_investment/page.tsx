'use client'
import * as React from 'react'
import ExcelJS from 'exceljs'
import {
    Alchemy,
    AssetTransfersCategory,
    GetTransfersForOwnerTransferType,
    Network,
    NftOrdering,
    NftSaleMarketplace,
    SortingOrder,
    fromHex,
} from 'alchemy-sdk'
import CommingSoonComponent from '@/app/[locale]/common/components/ComingSoon'

export interface IFractionalInvestPageProps {}

const config = {
    apiKey: '2jp0674GCJeIZW9qmM3WB92wslh1P8yM', // Replace with your API key
    network: Network[process.env.NEXT_PUBLIC_NETWORK], // Replace with your network
}

const alchemy = new Alchemy(config)

export default function FractionalInvestPage(props: IFractionalInvestPageProps) {
    /**
     * 데이터 수집 Extra API : 다시 필요할지 몰라 일단 주석으로
     * @returns
     */
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

            return nfts
        } catch (error) {
            console.log(error)
        }
    }

    const refreshContract = async () => {
        console.log('start refresh contract')
        const response = await alchemy.nft.refreshContract(
            '0x75e46bdc52d4A2064dc8850EE0f52EE93BFe337c',
        )
        console.log(response)
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

        for (let i = 0; i < nfts.length; i++) {
            let tokenId = nfts[i].tokenId
            let index = arr.indexOf(tokenId)

            arr.splice(index, 1)
        }
        const result = arr.map((item) => {
            return { id: item }
        })

        console.log(result)

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
        anchor.download = 'test1.csv'
        anchor.click() // anchor를 다운로드 링크로 만들고 강제로 클릭 이벤트 발생
        window.URL.revokeObjectURL(url) // 메모리에서 해제

        // console.log(arr)

        //
    }
    const getNfts = async () => {
        const nfts = await alchemy.nft.getNftsForContract(
            '0x3d049aDb773fADDeF681FbE565466C4F9736A009',
        )
        console.log(nfts)
        console.log()
    }
    return (
        // <>
        // <div>
        //     Fractioal Investing
        //     <div onClick={test}>test</div>
        //     <div onClick={getNfts}>getAllNfts</div>
        //     <div onClick={refreshContract}>refreshContract</div>
        // </div>

        // </>
        <>
            <CommingSoonComponent />
        </>
    )
}
