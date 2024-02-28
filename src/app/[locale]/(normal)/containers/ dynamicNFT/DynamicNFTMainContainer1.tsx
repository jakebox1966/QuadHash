'use client'

import * as React from 'react'
import Category from '../../components/dynamicNFT/Category'
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'
import DynamicNFTList from '../../components/dynamicNFT/DynamicNFTList'
import { getMetadata, postDynamicNFT } from '@/app/api/dynamicNFT/api'
import { getAccounts, personalSign } from '@/app/api/wallet/api'
import { getUuidByAccount } from '@/app/api/auth/api'
import Loading from '../../../common/components/Loading'
import Image from 'next/image'
import { AlertContext } from '@/app/provider/AlertProvider'
import { ConfirmContext } from '@/app/provider/ConfirmProvider'
import DynamicNFTPolicy from '../../components/dynamicNFT/DynamicNFTAgreement'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { getNFTMetadata } from '@/app/api/alchemy/api'
// import { gazaCategoryValidation, sazaCategoryValidation } from '@/app/utils/partsUtils'

export interface IDynamicNFTMainContainerProps {}

export default function DynamicNFTMainContainer1(props: IDynamicNFTMainContainerProps) {
    const { $alert } = React.useContext(AlertContext)
    const [open, setOpen] = React.useState(false)
    const [policyOpen, setPolicyOpen] = React.useState(false)
    const [isDynamicNFTLoading, setIsDynamicNFTLoading] = React.useState(false)
    const [categories, setCategoires] = React.useState(null)
    const [selectedNft, setSelectedNft] = React.useState(null)
    const [nftType, setNftType] = React.useState(null)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [metaData, setMetaData] = React.useState(null)

    const [isLocked, setIsLocked] = React.useState(false)

    const { wallet } = useMetaMask()

    const handleOpen = () => {
        setOpen(!open)
    }

    React.useEffect(() => {
        setCategoires(null)
        if (selectedNft?.contract.address === process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS) {
            setNftType('saza')
        } else if (
            selectedNft?.contract.address === process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS
        ) {
            setNftType('gaza')
        }

        // console.log(metaData)
        setCategoires(metaData?.attributes)
        setSelectedCategory(metaData?.attributes[1])

        if (metaData?.image?.includes('lock')) {
            setIsLocked(true)
        } else {
            setIsLocked(false)
        }
    }, [selectedNft])

    const startDynamicNFT = async () => {
        try {
            setIsDynamicNFTLoading(true)

            const accounts = await getAccounts()

            let signResult = await getUuidByAccount(accounts[0])
            const signature = await personalSign(accounts[0], signResult.eth_nonce)

            const result = await postDynamicNFT({
                token_id: selectedNft.tokenId,
                token_type: nftType,
                category: selectedCategory.trait_type.toLowerCase(),
                wallet_signature: signature,
                wallet_address: wallet.accounts[0],
            })

            // console.log('result', result)

            if (result.ok) {
                const refreshResult = await getMetadata({
                    nftType: nftType,
                    tokenId: selectedNft.tokenId,
                })

                setMetaData(refreshResult)
                const keyChanged = selectedCategory?.trait_type
                const changedValue = refreshResult.attributes.find(
                    (item) => item.trait_type === keyChanged,
                )
                setSelectedCategory((prev) => ({
                    ...prev,
                    value: changedValue.value,
                }))
                await $alert('Dynamic NFT 적용 완료되었습니다.')
            } else {
                console.error(result.statusText)
            }
            setIsDynamicNFTLoading(false)
        } catch (error) {
            setIsDynamicNFTLoading(false)
            console.error(error)
        }
    }
    const test = async () => {
        const result = await getNFTMetadata('0xEEb1BC51De14a4555925e3D8ca563EF5Eaf65949', 7997)
        // console.log(result)
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center w-full px-10 mt-3 rounded-l">
                <div onClick={test}>asdfasdfasd</div>
                <div className="flex flex-col justify-center items-center border-4 w-full rounded-2xl p-5 gap-5">
                    <div className="w-full">
                        {categories ? (
                            <Category
                                categories={metaData?.attributes?.filter(
                                    (item: any, index: number) => index !== 0,
                                )}
                                metaData={metaData}
                                nftType={nftType}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                            />
                        ) : (
                            <div className="text-center uppercase py-3 border-4 rounded-2xl text-xs font-black md:text-base lg:text-xl">
                                이미지를 클릭하면 보유하신 NFT 목록을 확인하실 수 있습니다.
                            </div>
                        )}
                    </div>

                    <div className="w-full flex flex-row justify-between content-stretch gap-3 cursor-pointer flex-wrap">
                        <div
                            className="w-full md:w-[46%] border-4 rounded-2xl overflow-hidden relative"
                            onClick={handleOpen}>
                            {!selectedNft && (
                                <Image
                                    className="!relative w-full h-full object-contain object-center"
                                    src="/1.png"
                                    alt="sample"
                                    fill
                                    sizes="(max-width: 900px), (max-width:900px)"
                                    priority
                                    unoptimized={true}
                                />
                            )}
                            {selectedNft && metaData && (
                                <Image
                                    className="!relative"
                                    src={`${metaData.image}?${new Date().getTime()}`}
                                    alt="nftImage"
                                    sizes="(max-width: 900px) 100px, (max-width:900px) 100px"
                                    fill
                                    unoptimized={true}
                                    priority
                                />
                            )}
                        </div>

                        <div className="w-full md:w-[46%] border-4 rounded-2xl overflow-hidden relative">
                            {!nftType && !selectedCategory && (
                                <Image
                                    className="!relative"
                                    src="/question-mark.svg"
                                    alt="question-mark"
                                    fill
                                    unoptimized={true}
                                    priority
                                    sizes="(max-width: 900px), (max-width:900px)"
                                />
                            )}
                            {nftType && selectedCategory && nftType === 'saza' ? (
                                <Image
                                    className="!relative"
                                    src={`${
                                        process.env.NEXT_PUBLIC_SAZA_PART_IMG_URL
                                    }/${selectedCategory?.trait_type}/${selectedCategory?.value.replace(
                                        / /gi,
                                        '-',
                                    )}.png?${new Date().getTime()}`}
                                    alt="saza-image"
                                    sizes="(max-width: 900px) 100px, (max-width:900px) 100px"
                                    fill
                                    unoptimized={true}
                                    priority
                                />
                            ) : nftType && selectedCategory && nftType === 'gaza' ? (
                                <Image
                                    className="!relative"
                                    src={`${
                                        process.env.NEXT_PUBLIC_GAZA_PART_IMG_URL
                                    }/${selectedCategory?.trait_type}/${selectedCategory?.value.replace(
                                        / /gi,
                                        '-',
                                    )}.png?${new Date().getTime()}`}
                                    alt="gaza-image"
                                    sizes="(max-width: 900px) 100px, (max-width:900px) 100px"
                                    unoptimized={true}
                                    fill
                                />
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="w-full">
                        <Button
                            disabled={
                                !selectedNft ||
                                !selectedCategory ||
                                selectedCategory?.availability === false ||
                                isLocked === true
                            }
                            className="w-full p-5"
                            variant="gradient"
                            placeholder={undefined}
                            onClick={() => {
                                setPolicyOpen(!open)
                            }}>
                            {!selectedNft &&
                                '이미지를 클릭하면 보유하신 NFT 목록을 확인하실 수 있습니다.'}

                            {isLocked && '선택하신 NFT는 현재 잠금 상태 입니다.'}

                            {selectedNft &&
                                selectedCategory &&
                                selectedCategory.availability === true &&
                                !isLocked &&
                                'START'}

                            {selectedNft &&
                                selectedCategory &&
                                selectedCategory.availability === false &&
                                '선택하신 NFT의 해당 파츠는 변경할 수 없습니다.'}
                        </Button>
                    </div>
                    <div className="flex flex-col justify-center items-start gap-3 text-xs lg:text-base">
                        <div className="font-black">Footer [Dynamic NFT 이용 조건]</div>
                        <div>
                            본 QH 웹사이트에서 제공하는 Dynamic NFT 서비스를 이용하기 위해서는
                            이더리움(ETH)을 활용하여 구매한 ERC-20 기반 토큰(이하 '토큰')을 QH
                            티켓으로 전환하셔야 합니다. 모든 사용자는 아래의 조건을 이해하고
                            동의하신 것으로 간주됩니다.
                        </div>
                        <div>
                            <div>
                                1. Dynamic NFT 서비스를 이용하여 파츠 변경 시, 변경된 내용은 원상
                                복구가 불가능합니다.
                            </div>
                            <div>
                                2. 사용자는 토큰 구매와 서비스 이용에 필요한 모든 조건을 충분히
                                이해하고, 이에 동의 합니다.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={open} handler={handleOpen} placeholder={undefined}>
                {/* <DialogHeader placeholder={undefined}>SELECT YOUR NFT</DialogHeader> */}
                <DialogBody className="h-[42rem] overflow-scroll" placeholder={undefined}>
                    <DynamicNFTList
                        setSelectedNft={setSelectedNft}
                        setCategoires={setCategoires}
                        setMetaData={setMetaData}
                        handleOpen={handleOpen}
                    />
                </DialogBody>
                {/* <DialogFooter className="space-x-2" placeholder={undefined}>
                    <Button
                        variant="text"
                        color="blue-gray"
                        onClick={handleOpen}
                        placeholder={undefined}>
                        cancel
                    </Button>
                </DialogFooter> */}
            </Dialog>

            {isDynamicNFTLoading && <Loading />}

            <DynamicNFTPolicy
                startDynamicNFT={startDynamicNFT}
                open={policyOpen}
                setOpen={setPolicyOpen}
            />
        </>
    )
}
