'use client'
import * as React from 'react'
import PartsListComponent from '../../components/dynamicNFT/PartsListComponent'
import { getMetadata, postDynamicNFT } from '@/app/api/dynamicNFT/api'
import { backgroundPallete } from '@/app/[locale]/common/color/colorPalette'
import { gazaCategoryValidation, sazaCategoryValidation } from '@/app/utils/partsUtils'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import Loading from '@/app/[locale]/common/components/Loading'
import { getAccounts, personalSign } from '@/app/api/wallet/api'
import { getUuidByAccount } from '@/app/api/auth/api'
import { AlertContext } from '@/app/provider/AlertProvider'
import { ConfirmContext } from '@/app/provider/ConfirmProvider'

export interface IDynamicNFTDetailContainerProps {
    tokenType: string
    tokenId: string
}

export default function DynamicNFTDetailContainer({
    tokenType,
    tokenId,
}: IDynamicNFTDetailContainerProps) {
    const [isDynamicNFTLoading, setIsDynamicNFTLoading] = React.useState(false)

    const [NFTMetadata, setNFTMetadata] = React.useState(null)
    const [imageUrl, setImageUrl] = React.useState('')
    const [backgroundColor, setBackgroundColor] = React.useState('')

    const [disabledPartsCategory, setDisabledPartsCategory] = React.useState([])

    const [selectedPartsData, setSelectedPartsData] = React.useState({
        traitType: 'Background',
        tokenType: tokenType,
        availability: false,
        pool: [],
    })

    const { $alert } = React.useContext(AlertContext)
    const { $confirm } = React.useContext(ConfirmContext)

    const handleSelectedPartsTraitType = (parts: string) => {
        console.log(parts)
        if (disabledPartsCategory?.includes(parts)) {
            setSelectedPartsData((prev) => ({
                ...prev,
                pool: [],
            }))
            return
        }
        if (tokenType === 'saza') {
            const result = sazaCategoryValidation(NFTMetadata?.attributes[0].value, parts)

            setSelectedPartsData((prev) => ({
                ...prev,
                traitType: parts,
                availability: result.availability,
                pool: result.pool,
            }))
        } else if (tokenType === 'gaza') {
            const result = gazaCategoryValidation(
                NFTMetadata?.attributes[0].value,
                parts,
                NFTMetadata.attributes.filter((item, index) => index !== 0),
            )
            setSelectedPartsData((prev) => ({
                ...prev,
                traitType: parts,
                availability: result.availability,
                pool: result.pool,
            }))
        }
    }

    // React.useEffect(() => {
    //     console.log(selectedPartsData)
    // }, [selectedPartsData])

    const checkDisabledPartsCategory = () => {
        if (tokenType && tokenId && NFTMetadata) {
            console.log('tokenType', tokenType)
            console.log('tokenId', tokenId)
            console.log('NFTMetadata', NFTMetadata)
            const ranking = NFTMetadata.attributes[0].value
            if (tokenType === 'saza') {
                const result = NFTMetadata.attributes.filter(
                    (item) => item.trait_type !== 'Ranking' && item.trait_type !== 'Dcount',
                )

                const validResult = result.filter((item) => {
                    const result = sazaCategoryValidation(ranking, item.trait_type)
                    if (!result.availability) {
                        return true
                    }
                    return false
                })
                console.log(validResult.map((item) => item.trait_type))

                return validResult.map((item) => item.trait_type)
            } else if (tokenType === 'gaza') {
                const result = NFTMetadata.attributes.filter(
                    (item) => item.trait_type !== 'Ranking' && item.trait_type !== 'Dcount',
                )

                const validResult = result.filter((item) => {
                    const result = gazaCategoryValidation(
                        ranking,
                        item.trait_type,
                        NFTMetadata.attributes,
                    )
                    if (!result.availability) {
                        return true
                    }
                    return false
                })

                return validResult.map((item) => item.trait_type)
            }
        }
    }

    const startDynamicNFT = async () => {
        if (
            await $confirm(
                'Dynamic NFT 서비스를 이용하여 파츠 변경 시, 변경된 내용은 원상 복구가 불가능하며 진행 시, 보유한 티켓 1개가 차감됩니다. 계속 진행하시겠습니까?',
            )
        ) {
            try {
                setIsDynamicNFTLoading(true)

                const accounts = await getAccounts()

                let signResult = await getUuidByAccount(accounts[0])
                const signature = await personalSign(accounts[0], signResult.eth_nonce)

                const result = await postDynamicNFT({
                    token_id: tokenId,
                    token_type: tokenType,
                    category: selectedPartsData.traitType.toLowerCase(),
                    wallet_signature: signature,
                    wallet_address: accounts[0],
                })

                console.log('result', result)

                if (result.ok) {
                    // let refreshResult

                    const refreshResult = await getMetadata({
                        nftType: tokenType,
                        tokenId: tokenId,
                    })

                    if (tokenType === 'saza') {
                        setImageUrl(
                            `${
                                process.env.NEXT_PUBLIC_SAZA_S3_IMG_URL
                            }/${tokenId}.png?${new Date().getTime()}`,
                        )
                    } else if (tokenType === 'gaza') {
                        setImageUrl(
                            `${
                                process.env.NEXT_PUBLIC_GAZA_S3_IMG_URL
                            }/${tokenId}.png?${new Date().getTime()}`,
                        )
                    }
                    setNFTMetadata(refreshResult)

                    setBackgroundColor(
                        backgroundPallete[
                            refreshResult?.attributes
                                .find((item) => item.trait_type === 'Background')
                                .value.toLowerCase()
                        ],
                    )
                    await $alert('Dynamic NFT 적용 완료되었습니다.')
                    // const keyChanged = selectedCategory?.trait_type
                    // const changedValue = refreshResult.attributes.find(
                    //     (item) => item.trait_type === keyChanged,
                    // )
                    // setSelectedCategory((prev) => ({
                    //     ...prev,
                    //     value: changedValue.value,
                    // }))
                } else {
                    console.error(result.statusText)
                }
                setIsDynamicNFTLoading(false)
            } catch (error) {
                setIsDynamicNFTLoading(false)
                console.error(error)
            }
        }
    }

    React.useEffect(() => {
        const disabledPartsResult = checkDisabledPartsCategory()
        console.log('disabledPartsResult', disabledPartsResult)
        setDisabledPartsCategory(disabledPartsResult)
    }, [NFTMetadata])

    React.useEffect(() => {
        const fetchData = async () => {
            if (tokenType && tokenId) {
                if (tokenType === 'saza') {
                    setImageUrl(
                        `${
                            process.env.NEXT_PUBLIC_SAZA_S3_IMG_URL
                        }/${tokenId}.png?${new Date().getTime()}`,
                    )
                } else if (tokenType === 'gaza') {
                    setImageUrl(
                        `${
                            process.env.NEXT_PUBLIC_GAZA_S3_IMG_URL
                        }/${tokenId}.png?${new Date().getTime()}`,
                    )
                }

                const NFTMetadata = await getMetadata({
                    nftType: tokenType,
                    tokenId: tokenId,
                })

                setNFTMetadata(NFTMetadata)
                setBackgroundColor(
                    backgroundPallete[
                        NFTMetadata?.attributes
                            .find((item) => item.trait_type === 'Background')
                            .value.toLowerCase()
                    ],
                )
                if (tokenType === 'saza') {
                    const result = sazaCategoryValidation(
                        NFTMetadata.attributes[0].value,
                        selectedPartsData.traitType,
                    )

                    setSelectedPartsData((prev) => ({
                        ...prev,
                        traitType: NFTMetadata.attributes[1].trait_type,
                        availability: result.availability,
                        pool: result.pool,
                    }))
                } else if (tokenType === 'gaza') {
                    const result = gazaCategoryValidation(
                        NFTMetadata.attributes[0].value,
                        selectedPartsData.traitType,
                        NFTMetadata.attributes.filter((item, index) => index !== 0),
                    )
                    setSelectedPartsData((prev) => ({
                        ...prev,
                        traitType: NFTMetadata.attributes[1].trait_type,
                        availability: result.availability,
                        pool: result.pool,
                    }))
                }
            }
            console.log('done')
        }
        fetchData()
    }, [tokenType, tokenId])

    // React.useEffect(() => {
    //     console.log(disabledPartsCategory)
    // }, [disabledPartsCategory])
    // React.useEffect(() => {
    //     console.log(backgroundColor)
    // }, [backgroundColor])

    return (
        <>
            <div
                className={`max-w-[1300px] px-5 w-full flex flex-col justify-center items-start gap-5 mt-[50px]`}>
                {/* DynamicNFT Main */}
                <div
                    className={`w-full flex flex-row items-end justify-center lg:px-5 max-h-[864px] gap-5 overflow-hidden rounded-lg bg-[${backgroundColor}]
                    `}
                    style={{ backgroundColor: backgroundColor }}>
                    <div className="hidden lg:flex flex-col items-start gap-4 -translate-y-20 pl-3">
                        <div className="text-[#FFFFFF] text-[25px] font-medium">
                            {tokenType} #{tokenId}
                        </div>

                        {NFTMetadata?.attributes
                            .filter(
                                (item) =>
                                    item.trait_type !== 'Ranking' && item.trait_type !== 'Dcount',
                            )
                            .map((item) => (
                                <div
                                    onClick={() => {
                                        handleSelectedPartsTraitType(item.trait_type)
                                    }}
                                    key={item.trait_type}
                                    className={`min-w-[200px] w-full ${
                                        selectedPartsData.traitType === item.trait_type
                                            ? 'shadow-[_5px_1px_40px_0px_white]'
                                            : 'shadow-[_5px_5px_black]'
                                    } ${
                                        disabledPartsCategory?.includes(item.trait_type)
                                            ? 'bg-[#BDBDBD]'
                                            : 'bg-[#FFC947] cursor-pointer'
                                    } flex flex-row items-center gap-3 p-2 pl-4 rounded-lg transition-all`}>
                                    <div>
                                        <div className="text-[10.85px]">
                                            {item.trait_type.toUpperCase()}
                                        </div>
                                        <div className="font-black text-[11.81px]">
                                            {item.value}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="w-full flex flex-col justify-center items-center">
                        <img src={imageUrl} alt="nft-image" width={677} height={677} />
                        <div className="lg:hidden w-full relative mt-4 px-5">
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={-30}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination]}
                                onSlideChange={(afterChangeValue) => {
                                    handleSelectedPartsTraitType(
                                        NFTMetadata.attributes[afterChangeValue.activeIndex + 1]
                                            .trait_type,
                                    )
                                }}>
                                {NFTMetadata?.attributes
                                    .filter(
                                        (item, index) =>
                                            item.trait_type !== 'Ranking' &&
                                            item.trait_type !== 'Dcount',
                                    )
                                    .map((item, index) => (
                                        <SwiperSlide key={`${item.trait_type}_${index}`}>
                                            <div
                                                className={`w-[80%] px-2 py-1 pl-4 rounded-md ${
                                                    disabledPartsCategory?.includes(item.trait_type)
                                                        ? 'bg-[#BDBDBD]'
                                                        : 'bg-[#FFC947]'
                                                }`}>
                                                <div className="text-[10.85px]">
                                                    {item.trait_type.toUpperCase()}
                                                </div>
                                                <div className="font-black text-[11.81px]">
                                                    {item.value}
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div>
                    </div>

                    <div className="bg-[#FFC947] hidden lg:flex flex-col justify-center items-center gap-1 p-7 rounded-full -translate-y-80  text-[16px] border-black font-medium text-black border-2 shadow-[_5px_5px_black] cursor-pointer hover:opacity-60 transition-all">
                        <img src="/rotate.svg" alt="rotate" width={46} height={72} />
                        <div className="text-[25px] font-medium" onClick={startDynamicNFT}>
                            START
                        </div>
                    </div>
                </div>
                <div className="w-full flex lg:hidden flex-col justify-center items-center">
                    <div className="flex lg:hidden flex-row justify-center items-center gap-1 px-4 py-2 rounded-full border-black font-medium text-black border-2 shadow-[_5px_5px_black] cursor-pointer hover:opacity-60 transition-all">
                        <img src="/rotate.svg" alt="rotate" width={20} height={20} />
                        <div className="text-[13px] font-medium" onClick={startDynamicNFT}>
                            START
                        </div>
                    </div>
                </div>

                {/* Part List */}

                <div className="flex flex-col justify-center items-start w-full mt-10">
                    <div className="text-[25px] font-medium">Parts List</div>
                    <PartsListComponent selectedPartsData={selectedPartsData} />
                </div>
            </div>
            {isDynamicNFTLoading && <Loading />}
        </>
    )
}
