'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import ExcelJS from 'exceljs'
import NftList from '../components/report/NftList'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { getBlock, getTransfersForOwner } from '@/app/api/alchemy/api'
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
import React from 'react'
import { Button, Checkbox, Stepper, Step, Typography } from '@material-tailwind/react'
import { postReport } from '@/app/api/report/api'
import { AlertContext } from '@/app/provider/AlertProvider'
import { ConfirmContext } from '@/app/provider/ConfirmProvider'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'
import ReportAgreementComponent from '../components/report/ReportAgreementComponent'
import SelectNFTComponent from '../components/report/SelectNFTComponent'
import ReportFormComponent from '../components/report/ReportFormComponent'
import { getUuidByAccount } from '@/app/api/auth/api'
import { personalSign } from '@/app/api/wallet/api'

export interface IReportContainerProps {}

export interface IReportParameter {
    title: string
    content: string
    user_name: string
    user_phone: string
    user_email: string
    wallet_address: string
    wallet_signature: string
    post_nfts: nftArray[] | any
}

interface nftArray {
    token_id: string
    token_type: string
}
const config = {
    apiKey: '2jp0674GCJeIZW9qmM3WB92wslh1P8yM', // Replace with your API key
    network: Network.ETH_SEPOLIA, // Replace with your network
}

const alchemy = new Alchemy(config)

const { useRouter } = createSharedPathnamesNavigation({ locales })
export default function ReportContainer(props: IReportContainerProps) {
    const [activeStep, setActiveStep] = React.useState(0)
    const [isLastStep, setIsLastStep] = React.useState(false)
    const [isFirstStep, setIsFirstStep] = React.useState(false)

    const nameRef = useRef(null)
    const titleRef = useRef(null)
    const NFTListRef = useRef(null)
    const emailRef = useRef(null)
    const phoneRef = useRef(null)
    const contentRef = useRef(null)

    const [allAgreed, setAllAgreed] = React.useState(false)
    const [agreements, setAgreements] = React.useState({
        firstTerm: false,
        secondTerm: false,
        thirdTerm: false,
        fourthTerm: false,
        fifthTerm: false,
        sixthTerm: false,
    })

    const [finalAgreement, setFinalAgreement] = React.useState(false)

    const [inputs, setInputs] = useState({
        user_name: '',
        title: '',
        post_nfts: [],
        user_email: '',
        user_phone: '',
        content: '',
        checkbox: false,
    })

    const [transactions, setTransactions] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const { wallet } = useMetaMask()

    React.useEffect(() => {
        const getExNfts = async () => {
            try {
                setIsLoading(true)
                if (wallet.accounts.length > 0) {
                    const result = await alchemy.core.getAssetTransfers({
                        // toAddress: '0x63120565a91C891920285bFc3781F56047d711b7',
                        fromAddress: wallet.accounts[0],
                        order: SortingOrder.DESCENDING,
                        contractAddresses: [
                            process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS,
                            process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS,
                        ],
                        category: [AssetTransfersCategory.ERC721],
                        excludeZeroValue: false,
                        withMetadata: true,
                    })

                    let filteredTransaction = []

                    filteredTransaction = result.transfers.filter(
                        (item) =>
                            Math.floor(new Date(item.metadata.blockTimestamp).getTime() / 1000) +
                                60 * 60 * 24 >
                            Math.floor(new Date().getTime() / 1000),
                    )

                    let sortingArray = []
                    for (let i = 0; i < filteredTransaction.length; i++) {
                        if (
                            sortingArray.find(
                                (item) => item.tokenId === filteredTransaction[i].tokenId,
                            )
                        ) {
                            console.log('A')
                            continue
                        }

                        let contractAddress = filteredTransaction[i].rawContract.address
                        const hackerAddress = filteredTransaction[i].to?.toLowerCase()
                        const tokenId = filteredTransaction[i].tokenId

                        const result = await alchemy.nft.getOwnersForNft(contractAddress, tokenId)

                        if (result.owners[0].toLowerCase() !== hackerAddress) {
                            filteredTransaction[i].isDisabled = true
                        } else {
                            filteredTransaction[i].isDisabled = false
                        }
                        filteredTransaction[i].isChecked = false
                        filteredTransaction[i].decimalTokenId = parseInt(
                            filteredTransaction[i].tokenId,
                            16,
                        )
                        if (
                            filteredTransaction[i].rawContract.address.toLowerCase() ===
                            process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS.toLowerCase()
                        ) {
                            filteredTransaction[i].tokenType = 'saza'
                        } else if (
                            filteredTransaction[i].rawContract.address.toLowerCase() ===
                            process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS.toLowerCase()
                        ) {
                            filteredTransaction[i].tokenType = 'gaza'
                        }
                        sortingArray.push(filteredTransaction[i])
                    }

                    setTransactions(sortingArray)
                    setIsLoading(false)
                }
            } catch (error) {
                console.error(error)
                setIsLoading(false)
            }
        }

        getExNfts()
    }, [wallet])

    // useEffect(() => {
    //     console.log(isLoading)
    // }, [isLoading])

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

    // useEffect(() => {
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
    //             // console.log(nfts)

    //             let filteredTransaction = []

    //             for (let i = 0; i < nfts.length; i++) {
    //                 const block = await getBlock(nfts[i].blockNumber)
    //                 // if (block.timestamp + 60 * 60 * 24 > Math.floor(new Date().getTime() / 1000)) {
    //                 filteredTransaction.push(nfts[i])
    //                 // }
    //             }
    //             let sazaExNftList = []
    //             let gazaExNftList = []

    //             filteredTransaction.forEach((transaction) => {
    //                 if (
    //                     transaction.contract.address ===
    //                     process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS
    //                 ) {
    //                     sazaExNftList.push(transaction)
    //                 } else if (
    //                     transaction.contract.address ===
    //                     process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS
    //                 ) {
    //                     gazaExNftList.push(transaction)
    //                 }
    //             })

    //             setSazaExNftList(
    //                 sazaExNftList.map((exNft) => ({
    //                     ...exNft,
    //                     ...{ isChecked: false },
    //                 })),
    //             )
    //             setGazaExNftList(
    //                 gazaExNftList.map((exNft) => ({
    //                     ...exNft,
    //                     ...{ isChecked: false },
    //                 })),
    //             )
    //         }
    //         setIsLoading(false)
    //     }

    // getExNfts()
    // }, [wallet])

    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1)
    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1)

    const inputsHandler = (e: React.ChangeEvent) => {
        if (e.target instanceof HTMLInputElement) {
            const { value, name } = e.target
            setInputs({ ...inputs, [name]: value })
        } else if (e.target instanceof HTMLTextAreaElement) {
            const { value, name } = e.target
            setInputs({ ...inputs, [name]: value })
        }
    }

    const handleAgreementChange = (e: { target: { name: any; checked: any } }) => {
        const { name, checked } = e.target

        setAgreements((prevAgreements) => ({ ...prevAgreements, [name]: checked }))
        const allChecked = Object.values({ ...agreements, [name]: checked }).every(
            (value) => value === true,
        )
        setAllAgreed(allChecked)
    }

    const handleFinalAgreementChange = (e: { target: { name: any; checked: any } }) => {
        const { name, checked } = e.target
        setFinalAgreement((prevAgreements) => !prevAgreements)
    }

    const handleAllAgreementChange = (e: { target: { checked: any } }) => {
        const { checked } = e.target

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

    const formValidation = () => {
        let usernameValidation = true
        let titleValidation = true
        let walletAddressValidation = true
        let nftListValidation = true
        let userEmailValidation = true
        let userPhoneValidation = true
        let contentValidation = true

        if (inputs.user_name === '') {
            nameRef?.current?.classList.remove('invisible')
            usernameValidation = false
        } else {
            nameRef?.current?.classList.add('invisible')
        }

        if (inputs.title === '') {
            titleRef.current?.classList.remove('invisible')
            titleValidation = false
        } else {
            titleRef.current?.classList.add('invisible')
        }

        if (inputs.post_nfts.length === 0) {
            NFTListRef?.current?.classList.remove('invisible')
            nftListValidation = false
        } else {
            NFTListRef?.current?.classList.add('invisible')
        }

        if (inputs.user_email === '') {
            emailRef?.current?.classList.remove('invisible')
            userEmailValidation = false
        } else {
            emailRef.current?.classList.add('invisible')
        }

        if (inputs.user_phone === '') {
            phoneRef.current?.classList.remove('invisible')
            userPhoneValidation = false
        } else {
            phoneRef.current?.classList.add('invisible')
        }

        if (inputs.content === '') {
            contentRef.current?.classList.remove('invisible')
            contentValidation = false
        } else {
            contentRef.current?.classList.add('invisible')
        }

        if (
            usernameValidation &&
            titleValidation &&
            walletAddressValidation &&
            nftListValidation &&
            userEmailValidation &&
            userPhoneValidation &&
            contentValidation
        ) {
            return true
        }
        return false
    }

    const submit = async () => {
        if (formValidation() && finalAgreement && allAgreed) {
            const signResult = await getUuidByAccount(wallet.accounts[0])
            const signature = await personalSign(wallet.accounts[0], signResult.eth_nonce)

            const parameter = {
                title: inputs.title,
                content: inputs.content,
                user_email: inputs.user_email,
                user_name: inputs.user_name,
                user_phone: inputs.user_phone,
                wallet_address: wallet.accounts[0],
                wallet_signature: signature,
                post_nfts: inputs.post_nfts,
            }

            const result = await postReport(parameter)
        }
    }

    /**
     * 데이터 수집 Extra API : 다시 필요할지 몰라 일단 주석으로
     * @returns
     */
    // const getAllNfts = async () => {
    //     try {
    //         let nfts = []
    //         // Get the async iterable for the contract's NFTs.
    //         const nftsIterable = alchemy.nft.getNftsForContractIterator(
    //             // '0x75e46bdc52d4A2064dc8850EE0f52EE93BFe337c',
    //             '0x3d049aDb773fADDeF681FbE565466C4F9736A009',
    //             // { pageKey: 99999 },
    //         )

    //         // Iterate over the NFTs and add them to the nfts array.
    //         for await (const nft of nftsIterable) {
    //             nfts.push(nft)
    //         }

    //         console.log(nfts)

    //         return nfts
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const test = async () => {
    //     const nfts = await getAllNfts()
    //     const arr = new Array(10000)

    //     console.log(arr.length)
    //     for (let i = 0; i < arr.length; i++) {
    //         arr[i] = `${i}`
    //     }

    //     console.log(arr)

    //     for (let i = 0; i < nfts.length; i++) {
    //         let tokenId = nfts[i].tokenId
    //         let index = arr.indexOf(tokenId)

    //         arr.splice(index, 1)
    //     }
    //     const result = arr.map((item) => {
    //         return { id: item }
    //     })

    //     console.log(result)

    //     const workbook = new ExcelJS.Workbook()
    //     const worksheet = workbook.addWorksheet('test')
    //     worksheet.columns = [{ header: 'Token ID', key: 'id' }]
    //     const arr1 = [{ id: 'A' }, { id: 'A' }, { id: 'A' }, { id: 'A' }]
    //     worksheet.insertRows(2, result)
    //     const buffer = await workbook.xlsx.writeBuffer()
    //     const blob = new Blob([buffer], {
    //         type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //     })
    //     const url = window.URL.createObjectURL(blob) // blob으로 객체 URL 생성
    //     const anchor = document.createElement('a')
    //     anchor.href = url
    //     anchor.download = 'test1.xlsx'
    //     anchor.click() // anchor를 다운로드 링크로 만들고 강제로 클릭 이벤트 발생
    //     window.URL.revokeObjectURL(url) // 메모리에서 해제

    //     // console.log(arr)

    //     //

    return (
        <>
            <div className="flex flex-col justify-start items-start h-full px-10 min-h-[calc(100vh-176px)] gap-16 pt-20 w-full max-w-[1440px]">
                <div className="w-full px-3 ">
                    <Stepper
                        activeStep={activeStep}
                        isLastStep={(value) => setIsLastStep(value)}
                        isFirstStep={(value) => setIsFirstStep(value)}
                        placeholder={undefined}
                        activeLineClassName={`bg-[#F46221] ${activeStep === 0 && !'!w-0'} ${
                            activeStep === 1 && '!w-1/2'
                        } ${activeStep === 2 && '!w-full'}`}
                        lineClassName="bg-gray-300">
                        <Step
                            // onClick={() => setActiveStep(0)}
                            placeholder={undefined}
                            className={
                                activeStep === 0 || activeStep === 1 || activeStep === 2
                                    ? '!bg-[#F46221]'
                                    : '!bg-gray-300'
                            }>
                            <div className="absolute -top-[2.5rem] w-max text-center">
                                <Typography
                                    variant="h6"
                                    color={activeStep === 0 ? 'blue-gray' : 'gray'}
                                    placeholder={undefined}>
                                    약관 동의
                                </Typography>
                            </div>
                        </Step>
                        <Step
                            // onClick={() => setActiveStep(1)}
                            placeholder={undefined}
                            className={
                                activeStep === 1 || activeStep === 2
                                    ? '!bg-[#F46221]'
                                    : '!bg-gray-300'
                            }>
                            <div className="absolute -top-[2.5rem] w-max text-center">
                                <Typography
                                    variant="h6"
                                    color={activeStep === 1 ? 'blue-gray' : 'gray'}
                                    placeholder={undefined}>
                                    NFT 선택
                                </Typography>
                            </div>
                        </Step>
                        <Step
                            // onClick={() => setActiveStep(2)}
                            placeholder={undefined}
                            className={activeStep === 2 ? '!bg-[#F46221]' : '!bg-gray-300'}>
                            <div className="absolute -top-[2.5rem] w-max text-center">
                                <Typography
                                    variant="h6"
                                    color={activeStep === 2 ? 'blue-gray' : 'gray'}
                                    placeholder={undefined}>
                                    폼 작성
                                </Typography>
                            </div>
                        </Step>
                    </Stepper>
                </div>

                {activeStep === 0 && (
                    <>
                        <ReportAgreementComponent
                            allAgreed={allAgreed}
                            setAllAgreed={setAllAgreed}
                            agreements={agreements}
                            setAgreements={setAgreements}
                            handleAgreementChange={handleAgreementChange}
                            handleAllAgreementChange={handleAllAgreementChange}
                        />
                        <div className="w-full flex flex-row justify-center lg:justify-end items-center gap-3 text-white">
                            <Button
                                className="rounded-lg px-10 bg-[#F46221] shadow-lg text-white w-[130px]"
                                disabled={!allAgreed}
                                placeholder={undefined}
                                onClick={handleNext}>
                                <span>확인</span>
                            </Button>
                        </div>
                    </>
                )}

                {activeStep === 1 && (
                    <>
                        <SelectNFTComponent
                            isLoading={isLoading}
                            transactions={transactions}
                            setTransactions={setTransactions}
                            setInputs={setInputs}
                        />

                        <div className="w-full flex flex-row justify-center lg:justify-end items-center gap-3 text-white">
                            <Button
                                className="rounded-lg px-10 bg-[#F46221] shadow-lg text-white w-[130px]"
                                placeholder={undefined}
                                onClick={handlePrev}>
                                <span>뒤로</span>
                            </Button>
                            <Button
                                className="rounded-lg px-10 bg-[#F46221] shadow-lg text-white w-[130px]"
                                disabled={inputs.post_nfts.length === 0}
                                placeholder={undefined}
                                onClick={handleNext}>
                                <span>선택완료</span>
                            </Button>
                        </div>
                    </>
                )}

                {activeStep === 2 && (
                    <>
                        <ReportFormComponent
                            targetList={inputs.post_nfts}
                            inputsHandler={inputsHandler}
                            finalAgreement={finalAgreement}
                            nameRef={nameRef}
                            titleRef={titleRef}
                            // walletAddressRef={walletAddressRef}
                            NFTListRef={NFTListRef}
                            emailRef={emailRef}
                            phoneRef={phoneRef}
                            contentRef={contentRef}
                            handleFinalAgreementChange={handleFinalAgreementChange}
                        />

                        <div className="w-full flex flex-row justify-center lg:justify-end items-center gap-3 text-white">
                            <Button
                                className="rounded-lg px-10 bg-[#F46221] shadow-lg text-white w-[130px]"
                                placeholder={undefined}
                                onClick={handlePrev}>
                                <span>뒤로</span>
                            </Button>
                            <Button
                                className="rounded-lg px-10 bg-[#F46221] shadow-lg text-white w-[130px]"
                                disabled={
                                    inputs.user_name === '' ||
                                    inputs.title === '' ||
                                    inputs.post_nfts.length === 0 ||
                                    inputs.user_email === '' ||
                                    inputs.user_phone === '' ||
                                    inputs.content === '' ||
                                    !finalAgreement
                                }
                                placeholder={undefined}
                                onClick={submit}>
                                <span>제출하기</span>
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
