'use client'

import * as React from 'react'
import Category from '../components/dynamicNFT/Category'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
} from '@material-tailwind/react'
import DynamicNFTList from '../components/dynamicNFT/DynamicNFTList'
import { getMetadata, postDynamicNFT } from '@/app/api/dynamicNFT/api'
import { getAccounts, personalSign } from '@/app/api/wallet/api'
import { getUuidByAccount } from '@/app/api/auth/api'
import { locales } from '@/i18nconfig'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export interface IDynamicNFTContainerProps {}

const sazaPart = ['Background', 'Body', 'Extra', 'Eyes', 'Head', 'Headwear', 'Mane', 'Mouth']
const gazaPart = [
    'Background',
    'Body',
    'Extra',
    'Eyes',
    'Front',
    'Head',
    'Headwear',
    'Mane',
    'Mouth',
]

export default function DynamicNFTContainer(props: IDynamicNFTContainerProps) {
    const { Link, useRouter, usePathname } = createSharedPathnamesNavigation({ locales })
    const [open, setOpen] = React.useState(false)
    const [categories, setCategoires] = React.useState(null)
    const [selectedNft, setSelectedNft] = React.useState(null)
    const [nftType, setNftType] = React.useState(null)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [metaData, setMetaData] = React.useState(null)

    const router = useRouter()
    const handleOpen = () => {
        setOpen(!open)
    }

    React.useEffect(() => {
        // init()
        setCategoires(null)
        if (selectedNft?.contract.address === process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS) {
            setNftType('saza')
        } else if (
            selectedNft?.contract.address === process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS
        ) {
            setNftType('gaza')
        }
        setCategoires(
            selectedNft?.raw.metadata.attributes.filter((item: any, index: number) => index !== 0),
        )
    }, [selectedNft])

    React.useEffect(() => {
        console.log(selectedCategory)
    }, [selectedCategory])

    React.useEffect(() => {
        console.log(metaData)
    }, [metaData])

    React.useEffect(() => {
        console.log(selectedCategory)
    }, [selectedCategory])

    const startDynamicNFT = async () => {
        const accounts = await getAccounts()

        let signResult = await getUuidByAccount(accounts[0])
        const signature = await personalSign(accounts[0], signResult.eth_nonce)

        const result = await postDynamicNFT({
            token_id: selectedNft.tokenId,
            token_type: nftType,
            category: selectedCategory.trait_type.toLowerCase(),
            wallet_signature: signature,
            wallet_address: window.ethereum.selectedAddress,
        })

        const refreshResult = await getMetadata({
            nftType: nftType,
            tokenId: selectedNft.tokenId,
        })

        console.log('refreshResult', refreshResult)

        setMetaData(refreshResult)
        const keyChanged = selectedCategory?.trait_type
        console.log('keyChanged', keyChanged)
        const changedValue = refreshResult.attributes.find((item) => item.trait_type === keyChanged)
        console.log('changedValue', changedValue)
        setSelectedCategory((prev) => ({
            ...prev,
            value: changedValue.value,
        }))
        console.log(refreshResult)
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center w-full px-10 mt-3 rounded-l">
                <div className="flex flex-col justify-center items-center border-4 w-full rounded-2xl p-5 gap-5">
                    <div className="w-full">
                        {categories ? (
                            <Category
                                categories={metaData?.attributes?.filter(
                                    (item: any, index: number) => index !== 0,
                                )}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                            />
                        ) : (
                            <div className="text-center uppercase py-3 border-4 rounded-2xl text-xs font-black md:text-base lg:text-xl">
                                이미지를 클릭하면 보유하신 NFT 목록을 확인하실 수 있습니다.
                            </div>
                        )}
                    </div>
                    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-3">
                        <div
                            className="w-full md:w-[40%] border-4 rounded-2xl overflow-hidden"
                            onClick={handleOpen}>
                            {!selectedNft && <img src="/1.png" alt="example-image" />}
                            {selectedNft && metaData && (
                                <img src={`${metaData.image}?${new Date().getTime()}`} />
                            )}
                        </div>
                        <div className="w-full md:w-[40%] border-4  rounded-2xl overflow-hidden">
                            {nftType && selectedCategory && nftType === 'saza' ? (
                                <img
                                    src={`${
                                        process.env.NEXT_PUBLIC_SAZA_PART_IMG_URL
                                    }/${selectedCategory?.trait_type}/${selectedCategory?.value.replace(
                                        ' ',
                                        '-',
                                    )}.png?${new Date().getTime()}`}
                                    alt=""
                                />
                            ) : nftType && selectedCategory && nftType === 'gaza' ? (
                                <img
                                    src={`${
                                        process.env.NEXT_PUBLIC_GAZA_PART_IMG_URL
                                    }/${selectedCategory?.trait_type}/${selectedCategory?.value.replace(
                                        ' ',
                                        '-',
                                    )}.png?${new Date().getTime()}`}
                                    alt=""
                                />
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="w-full">
                        <Button
                            className="w-full p-5"
                            variant="gradient"
                            placeholder={undefined}
                            onClick={startDynamicNFT}>
                            START
                        </Button>
                    </div>
                    <div className="flex flex-col justify-center items-start gap-3">
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
                <DialogHeader placeholder={undefined}>SELECT YOUR NFT</DialogHeader>
                <DialogBody className="h-[42rem] overflow-scroll" placeholder={undefined}>
                    <DynamicNFTList
                        setSelectedNft={setSelectedNft}
                        setCategoires={setCategoires}
                        setMetaData={setMetaData}
                        handleOpen={handleOpen}
                    />
                </DialogBody>
                <DialogFooter className="space-x-2" placeholder={undefined}>
                    <Button
                        variant="text"
                        color="blue-gray"
                        onClick={handleOpen}
                        placeholder={undefined}>
                        cancel
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}
