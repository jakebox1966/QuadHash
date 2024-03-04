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
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import saza_super from '/public/saza_super.png'

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

    // const [selectedPartsData, setSelectedPartsData] = React.useState({
    //     traitType: 'Background',
    //     tokenType: tokenType,
    //     availability: false,
    //     pool: [],
    // })

    const swiperRef = React.useRef(null)

    const { data: session, update } = useSession()

    const [selectedPartsData, setSelectedPartsData] = React.useState({
        partsData: { trait_type: '', value: '' },
        tokenType: tokenType,
        availability: false,
        pool: [],
    })

    const { $alert } = React.useContext(AlertContext)
    const { $confirm } = React.useContext(ConfirmContext)

    const handleSelectedPartsTraitType = (parts: {
        trait_type: string
        availability: boolean
        pool: string[]
        value: string
    }) => {
        if (tokenType === 'saza') {
            setSelectedPartsData({
                tokenType: tokenType,
                partsData: parts,
                availability: parts.availability,
                pool: parts.pool,
            })
        } else if (tokenType === 'gaza') {
            setSelectedPartsData({
                tokenType: tokenType,
                partsData: parts,
                availability: parts.availability,
                pool: parts.pool,
            })
        }
    }

    const checkDisabledPartsCategory = () => {
        if (tokenType && tokenId && NFTMetadata) {
            const ranking = NFTMetadata.attributes[0].value
            if (tokenType === 'saza') {
                const result = NFTMetadata.attributes.filter(
                    (item) => item.trait_type !== 'Ranking' && item.trait_type !== 'Dcount',
                )

                const validResult = result.filter((item) => {
                    const result = sazaCategoryValidation(ranking, item.trait_type)
                    console.log(result)
                    if (!result.availability) {
                        return true
                    }
                    return false
                })

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

    const checkDisabledPartsCategory1 = (metadata) => {
        if (tokenType && tokenId) {
            const ranking = metadata.attributes[0].value
            if (tokenType === 'saza') {
                const result = metadata.attributes.filter(
                    (item) => item.trait_type !== 'Ranking' && item.trait_type !== 'Dcount',
                )

                const validAttributes = result.map((item) => {
                    const result = sazaCategoryValidation(ranking, item.trait_type)

                    return {
                        trait_type: item.trait_type,
                        value: item.value,
                        availability: result.availability,
                        pool: result.pool,
                    }
                })

                const validMetadata = {
                    ...metadata,
                    attributes: validAttributes,
                }
                return validMetadata
            } else if (tokenType === 'gaza') {
                const result = metadata.attributes.filter(
                    (item) => item.trait_type !== 'Ranking' && item.trait_type !== 'Dcount',
                )

                const validAttributes = result.map((item) => {
                    const result = gazaCategoryValidation(
                        ranking,
                        item.trait_type,
                        metadata.attributes,
                    )

                    return {
                        trait_type: item.trait_type,
                        value: item.value,
                        availability: result.availability,
                        pool: result.pool,
                    }
                })
                const validMetadata = {
                    ...metadata,
                    attributes: validAttributes,
                }
                return validMetadata
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
                    category: selectedPartsData.partsData.trait_type.toLowerCase(),
                    wallet_signature: signature,
                    wallet_address: accounts[0],
                })

                // console.log('result', result)

                if (result.ok) {
                    fetchData()
                    updateSession()
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

    const updateSession = async () => {
        await update({
            ...session,
            user: {
                ...session?.user,
                ticket_num: session?.user.ticket_num - 1,
            },
        })
    }

    React.useEffect(() => {
        // const disabledPartsResult = checkDisabledPartsCategory()
        // console.log(disabledPartsResult)
        // setDisabledPartsCategory(disabledPartsResult)

        // if (disabledPartsResult?.length === NFTMetadata?.attributes.length - 1) {
        //     setSelectedPartsData({
        //         partsData: { trait_type: '', value: '' },
        //         tokenType: tokenType,
        //         availability: false,
        //         pool: [],
        //     })
        //     return
        // }

        if (NFTMetadata) {
            setBackgroundColor(
                backgroundPallete[
                    NFTMetadata?.attributes
                        .find((item) => item.trait_type === 'Background')
                        .value.toLowerCase()
                ],
            )

            NFTMetadata?.attributes.forEach((item) => {
                if (item.availability === true) {
                    setSelectedPartsData((prev) => ({
                        partsData: { trait_type: item.trait_type, value: item.value },
                        tokenType: tokenType,
                        availability: item.availability,
                        pool: item.pool,
                    }))
                    return false
                }
            })

            for (let i = 0; i < NFTMetadata?.attributes.length; i++) {
                if (NFTMetadata?.attributes[i].availability === true) {
                    setSelectedPartsData((prev) => ({
                        partsData: {
                            trait_type: NFTMetadata?.attributes[i].trait_type,
                            value: NFTMetadata?.attributes[i].value,
                        },
                        tokenType: tokenType,
                        availability: NFTMetadata?.attributes[i].availability,
                        pool: NFTMetadata?.attributes[i].pool,
                    }))
                    break
                }
            }
            // if (tokenType === 'saza') {
            //     const result = sazaCategoryValidation(
            //         NFTMetadata.attributes[0].value,
            //         selectedPartsData.partsData.trait_type,
            //     )
            //     console.log(result)

            // setSelectedPartsData((prev) => ({
            //     ...prev,
            //     partsData: NFTMetadata.attributes[0],
            //     availability: result.availability,
            //     pool: result.pool,
            // }))
            // } else if (tokenType === 'gaza') {
            //     const result = gazaCategoryValidation(
            //         NFTMetadata.attributes[0].value,
            //         selectedPartsData.partsData.trait_type,
            //         NFTMetadata.attributes.filter((item, index) => index !== 0),
            //     )
            //     console.log('result', result)
            //     // setSelectedPartsData((prev) => ({
            //     //     ...prev,
            //     //     partsData: NFTMetadata.attributes[0],
            //     //     availability: result.availability,
            //     //     pool: result.pool,
            //     // }))
            // }
        }
    }, [NFTMetadata])

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

            console.log(NFTMetadata)

            const validMetadata = checkDisabledPartsCategory1(NFTMetadata)

            console.log(validMetadata)
            setNFTMetadata(validMetadata)
        }
    }
    React.useEffect(() => {
        fetchData()
    }, [tokenType, tokenId])

    return (
        <>
            <div
                className={`max-w-[1300px] px-5 pb-10 w-full flex flex-col justify-center items-start gap-5 mt-[50px]`}>
                {/* DynamicNFT Main */}
                <div
                    className={`w-full flex flex-row items-end justify-center lg:px-5 max-h-[864px] gap-5 overflow-hidden rounded-lg shadow-2xl relative bg-[${backgroundColor}]
                    `}
                    style={{ backgroundColor: backgroundColor }}>
                    <div className="absolute left-4 hidden lg:flex flex-col items-start gap-4 -translate-y-20 pl-3">
                        <div
                            className={`${
                                backgroundColor === '#FFFFFF' ? 'text-black' : 'text-[#FFFFFF]'
                            } text-[25px] font-medium`}>
                            {tokenType.toUpperCase()} #{tokenId}
                        </div>

                        {NFTMetadata?.attributes.map((item) => (
                            <button
                                onClick={() => {
                                    handleSelectedPartsTraitType(item)
                                }}
                                key={item.trait_type}
                                className={`min-w-[200px] w-full text-left ${
                                    selectedPartsData.partsData.trait_type === item.trait_type
                                        ? 'shadow-[_5px_1px_40px_0px_white]'
                                        : 'shadow-[_5px_5px_black]'
                                } ${
                                    !item.availability
                                        ? 'bg-[#BDBDBD]'
                                        : 'bg-[#FFC947] cursor-pointer'
                                } flex flex-row items-center gap-3 p-2 pl-4 rounded-lg transition-all`}>
                                <div>
                                    <div className="text-[10.85px]">
                                        {item.trait_type.toUpperCase()}
                                    </div>
                                    <div className="font-black text-[11.81px]">{item.value}</div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="w-full flex flex-col justify-center items-center">
                        <img src={imageUrl} alt="nft-image" width={677} height={677} />
                        <div className="lg:hidden w-full relative mt-4 px-5">
                            <Swiper
                                ref={swiperRef}
                                slidesPerView={1}
                                spaceBetween={-30}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination]}
                                onSlideChange={(afterChangeValue) => {
                                    // console.log(swiperRef?.current.swiper)
                                    // console.log(
                                    //     'afterChangeValue',
                                    //     NFTMetadata.attributes[afterChangeValue.activeIndex]
                                    //         .trait_type,
                                    // )

                                    // if (
                                    //     !NFTMetadata.attributes[afterChangeValue.activeIndex]
                                    //         .availability
                                    // ) {
                                    //     if (swiperRef?.current.swiper.swipeDirection === 'next') {
                                    //         swiperRef?.current.swiper.slideNext()
                                    //     } else if (
                                    //         swiperRef?.current.swiper.swipeDirection === 'prev'
                                    //     ) {
                                    //         swiperRef?.current.swiper.slidePrev()
                                    //     }
                                    // }

                                    handleSelectedPartsTraitType(
                                        NFTMetadata.attributes[afterChangeValue.activeIndex],
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
                                                    !item.availability
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

                    <button
                        className={`${
                            selectedPartsData.availability
                                ? 'bg-[#FFC947] cursor-pointer hover:opacity-60'
                                : 'bg-[#BDBDBD]'
                        } absolute hidden lg:flex flex-col justify-center items-center gap-1 p-7 rounded-full top-1/2 -translate-y-1/2 right-20 text-[16px] border-black font-medium text-black border-2 shadow-[_5px_5px_black] transition-all`}
                        disabled={!selectedPartsData.availability}
                        onClick={startDynamicNFT}>
                        <img src="/rotate.svg" alt="rotate" width={46} height={72} />
                        <div className="text-[25px] font-medium">START</div>
                    </button>
                </div>
                <button
                    className="w-full flex lg:hidden flex-col justify-center items-center"
                    onClick={startDynamicNFT}
                    disabled={!selectedPartsData.availability}>
                    <div
                        className={`${
                            selectedPartsData.availability
                                ? 'bg-[#FFC947] cursor-pointer hover:opacity-60'
                                : 'bg-[#BDBDBD]'
                        } flex lg:hidden flex-row justify-center items-center gap-1 px-4 py-2 rounded-full border-black font-medium text-black border-2 shadow-[_5px_5px_black]`}>
                        <img src="/rotate.svg" alt="rotate" width={20} height={20} />
                        <div className="text-[13px] font-medium">START</div>
                    </div>
                </button>

                {!selectedPartsData.availability && selectedPartsData.pool.length === 0 && (
                    <div className="flex flex-col justify-center items-start w-full">
                        <div className="text-[25px] font-medium mb-5">Parts List</div>
                        <div className="w-full bg-[#131313] text-[#FFFFFF] rounded-xl">
                            <div className="overflow-hidden rounded-lg aspect-[2/1] lg:aspect-[4/1] flex flex-row items-center">
                                <div className="text-md md:text-2xl lg:text-4xl font-bold w-full text-center">
                                    변경 가능한 파츠가 없습니다.
                                </div>

                                <div className="hidden lg:block">
                                    <Image src={saza_super} alt="saza_super" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selectedPartsData &&
                    selectedPartsData.availability &&
                    selectedPartsData.pool.length > 0 && (
                        <div className="flex flex-col justify-center items-start w-full">
                            <div className="text-[25px] mb-5 font-medium">Parts List</div>
                            <PartsListComponent selectedPartsData={selectedPartsData} />
                        </div>
                    )}
            </div>
            {isDynamicNFTLoading && <Loading />}
        </>
    )
}
