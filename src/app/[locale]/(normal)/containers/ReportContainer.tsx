'use client'

import { useContext, useEffect, useState } from 'react'
import ExcelJS from 'exceljs'
import NftList from '../components/report/NftList'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { getBlock, getTransfersForOwner } from '@/app/api/alchemy/api'
import { Alchemy, GetTransfersForOwnerTransferType, Network, NftOrdering } from 'alchemy-sdk'
import React from 'react'
import { Button, Checkbox, Stepper, Step, Typography } from '@material-tailwind/react'
import { postReport } from '@/app/api/report/api'
import { AlertContext } from '@/app/provider/AlertProvider'
import { ConfirmContext } from '@/app/provider/ConfirmProvider'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'

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

const { useRouter } = createSharedPathnamesNavigation({ locales })
export default function ReportContainer(props: IReportContainerProps) {
    const [activeStep, setActiveStep] = React.useState(0)
    const [isLastStep, setIsLastStep] = React.useState(false)
    const [isFirstStep, setIsFirstStep] = React.useState(false)

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1)
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1)

    const router = useRouter()
    const [allAgreed, setAllAgreed] = React.useState(false)
    const [agreements, setAgreements] = React.useState({
        firstTerm: false,
        secondTerm: false,
        thirdTerm: false,
        fourthTerm: false,
        fifthTerm: false,
        sixthTerm: false,
    })
    const [isError, setIsError] = React.useState(false)
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

    React.useEffect(() => {
        return () => {
            setAllAgreed(false)
            setAgreements((prev) => ({
                ...prev,
                firstTerm: false,
                secondTerm: false,
                thirdTerm: false,
                fourthTerm: false,
                fifthTerm: false,
                sixthTerm: false,
            }))
        }
    }, [])

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

    const handleAgreementChange = (e: { target: { name: any; checked: any } }) => {
        const { name, checked } = e.target
        setIsError(false)
        setAgreements((prevAgreements) => ({ ...prevAgreements, [name]: checked }))
        const allChecked = Object.values({ ...agreements, [name]: checked }).every(
            (value) => value === true,
        )
        setAllAgreed(allChecked)
    }

    const handleAllAgreementChange = (e: { target: { checked: any } }) => {
        const { checked } = e.target
        setIsError(false)
        setAllAgreed(checked)

        if (e.target.checked) {
            setAgreements((prev) => ({
                ...prev,
                firstTerm: true,
                secondTerm: true,
                thirdTerm: true,
                fourthTerm: true,
                fifthTerm: true,
                sixthTerm: true,
            }))
        } else {
            setAgreements((prev) => ({
                ...prev,
                firstTerm: false,
                secondTerm: false,
                thirdTerm: false,
                fourthTerm: false,
                fifthTerm: false,
                sixthTerm: false,
            }))
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
            <div className="flex flex-col justify-start items-start h-full px-20 min-h-[calc(100vh-176px)] gap-20 pt-20">
                <div className="w-full ">
                    <Stepper
                        activeStep={activeStep}
                        isLastStep={(value) => setIsLastStep(value)}
                        isFirstStep={(value) => setIsFirstStep(value)}
                        placeholder={undefined}
                        activeLineClassName="bg-[#F46221]"
                        lineClassName="bg-gray-300">
                        <Step
                            onClick={() => setActiveStep(0)}
                            placeholder={undefined}
                            className={
                                activeStep === 0 || activeStep === 1 || activeStep === 2
                                    ? '!bg-[#F46221]'
                                    : '!bg-gray-300'
                            }>
                            <div className="absolute -bottom-[4.5rem] w-max text-center">
                                <Typography
                                    variant="h6"
                                    color={activeStep === 0 ? 'blue-gray' : 'gray'}
                                    placeholder={undefined}>
                                    약관 동의
                                </Typography>
                            </div>
                        </Step>
                        <Step
                            onClick={() => setActiveStep(1)}
                            placeholder={undefined}
                            className={
                                activeStep === 1 || activeStep === 2
                                    ? '!bg-[#F46221]'
                                    : '!bg-gray-300'
                            }>
                            <div className="absolute -bottom-[4.5rem] w-max text-center">
                                <Typography
                                    variant="h6"
                                    color={activeStep === 1 ? 'blue-gray' : 'gray'}
                                    placeholder={undefined}>
                                    NFT 선택
                                </Typography>
                            </div>
                        </Step>
                        <Step
                            onClick={() => setActiveStep(2)}
                            placeholder={undefined}
                            className={activeStep === 2 ? '!bg-[#F46221]' : '!bg-gray-300'}>
                            <div className="absolute -bottom-[4.5rem] w-max text-center">
                                <Typography
                                    variant="h6"
                                    color={activeStep === 2 ? 'blue-gray' : 'gray'}
                                    placeholder={undefined}>
                                    폼 작성
                                </Typography>
                            </div>
                        </Step>
                    </Stepper>
                    {/* <div className="mt-32 flex justify-between">
                        <Button onClick={handlePrev} disabled={isFirstStep} placeholder={undefined}>
                            Prev
                        </Button>
                        <Button onClick={handleNext} disabled={isLastStep} placeholder={undefined}>
                            Next
                        </Button>
                    </div> */}
                </div>
                <div>
                    <div className="text-[#F46221] text-sm  font-black">QUADHASH</div>
                    <div className="text-xl lg:text-3xl font-black">해킹 신고 센터</div>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="text-xl lg:text-3xl font-black flex flex-row justify-start items-center gap-3">
                        <div>주의사항 및 신고 안내 가이드</div>
                        <div>
                            <Checkbox
                                label="전체동의"
                                ripple={false}
                                name="allAgreed"
                                className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                                crossOrigin={undefined}
                                checked={allAgreed}
                                onChange={handleAllAgreementChange}
                            />
                        </div>
                    </div>
                    <div>
                        <Checkbox
                            label="해킹 피해 신고를 한 계정에 등록된 개인정보가 허위이거나 부정확하게 기입되어
                        발생하는 모든 문제는 사용자 본인의 책임으로 간주하며, 이에 대해 동의합니다."
                            ripple={false}
                            name="firstTerm"
                            className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                            crossOrigin={undefined}
                            checked={agreements.firstTerm}
                            onChange={handleAgreementChange}
                        />
                    </div>
                    <div>
                        <Checkbox
                            label="신고된 계정에서 일어난 피해가 본인의 개인정보 유출이나 개인정보 관리 부실
                        등으로 인해 발생하지 않았음을 확인합니다"
                            ripple={false}
                            name="secondTerm"
                            className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                            crossOrigin={undefined}
                            checked={agreements.secondTerm}
                            onChange={handleAgreementChange}
                        />
                    </div>
                    <div>
                        <Checkbox
                            label="사용자는 토큰 구매와 서비스 이용에 필요한 모든 조건을 충분히 이해하고, 이에
                        동의합니다."
                            ripple={false}
                            name="thirdTerm"
                            className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                            crossOrigin={undefined}
                            checked={agreements.thirdTerm}
                            onChange={handleAgreementChange}
                        />
                    </div>
                    <div>
                        <Checkbox
                            label="해킹 피해 신고 시 제공한 모든 정보는 사실임을 확신하며, 허위로 기재하거나
                        고의적으로 신고 내용에서 생략한 사실로 인해 발생하는 모든 문제와 책임은
                        본인이 지게 됨을 약속합니다. (이 내용 및 신고 내용은 사법기관[사이버 수사대
                        등]의 공식 요청이 있을 경우 제공될 수 있습니다.)"
                            ripple={false}
                            name="fourthTerm"
                            className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                            crossOrigin={undefined}
                            checked={agreements.fourthTerm}
                            onChange={handleAgreementChange}
                        />
                    </div>
                    <div>
                        <Checkbox
                            label="해킹 신고에 대해 정상적으로 신고 접수가 완료된 계정은 조사 및 복구를 위해 일시적으로 이용이 제한될 수 있음을 이해하고 동의합니다. 복구가 완료될 때까지 이용이 제한될 수 있습니다."
                            ripple={false}
                            name="fifthTerm"
                            className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                            crossOrigin={undefined}
                            checked={agreements.fifthTerm}
                            onChange={handleAgreementChange}
                        />
                    </div>
                    <div>
                        <Checkbox
                            label="이상 위의 모든 조항을 충분히 이해하고, 이에 동의합니다."
                            ripple={false}
                            name="sixthTerm"
                            className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                            crossOrigin={undefined}
                            checked={agreements.sixthTerm}
                            onChange={handleAgreementChange}
                        />
                    </div>
                </div>

                <div className="w-full flex flex-row justify-end items-center gap-3 text-white">
                    {/* <Button
                        variant="outlined"
                        className="rounded-lg border-[#F46221] text-[#F46221]  px-10 shadow-lg"
                        // disabled={isConnecting}
                        placeholder={undefined}>
                        <span>취소</span>
                    </Button> */}
                    <Button
                        className="rounded-lg px-10 bg-[#F46221] shadow-lg text-white"
                        disabled={!allAgreed}
                        placeholder={undefined}
                        onClick={() => {
                            router.push('/report/nft-list')
                        }}>
                        <span>확인</span>
                    </Button>
                </div>
            </div>

            {/* <div className=" flex flex-row justify-start items-start w-full h-full">
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
                </div> */}
            {/* <NftList type="saza" exNftList={sazaExNftList} setExNftList={setSazaExNftList} />
                <NftList type="gaza" exNftList={gazaExNftList} setExNftList={setGazaExNftList} /> */}
            {/* </div> */}
        </>
    )
}
