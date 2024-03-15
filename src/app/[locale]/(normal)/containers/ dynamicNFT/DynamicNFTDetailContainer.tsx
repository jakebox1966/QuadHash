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
import { getOwnerForNft } from '@/app/api/alchemy/api'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { locales } from '@/i18nconfig'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { ToastContext } from '@/app/provider/ToastProvider'

export interface IDynamicNFTDetailContainerProps {
    tokenType: string
    tokenId: string
}

const { useRouter } = createSharedPathnamesNavigation({ locales })

export default function DynamicNFTDetailContainer({
    tokenType,
    tokenId,
}: IDynamicNFTDetailContainerProps) {
    const { showToast } = React.useContext(ToastContext)
    const router = useRouter()
    const [isDynamicNFTLoading, setIsDynamicNFTLoading] = React.useState(false)

    const { wallet } = useMetaMask()

    const [NFTMetadata, setNFTMetadata] = React.useState(null)

    const [imageUrl, setImageUrl] = React.useState('')
    const [backgroundColor, setBackgroundColor] = React.useState('')

    const [prevParts, setPrevParts] = React.useState(null)

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
                    (item) => item.trait_type !== 'Ranking' && item.trait_type !== 'DynamicNFT',
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
                    (item) => item.trait_type !== 'Ranking' && item.trait_type !== 'DynamicNFT',
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
                    (item) => item.trait_type !== 'Ranking' && item.trait_type !== 'Dynamic NFT',
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
                    (item) => item.trait_type !== 'Ranking' && item.trait_type !== 'Dynamic NFT',
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

    const checkOwner = async () => {
        let result
        if (tokenType === 'saza') {
            result = await getOwnerForNft(process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS, tokenId)
        } else if (tokenType === 'gaza') {
            result = await getOwnerForNft(process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS, tokenId)
        }

        if (result.owners[0].toLowerCase() === wallet.accounts[0].toLowerCase()) {
            return true
        }
        return false
    }

    const startDynamicNFT = async () => {
        const result = await checkOwner()
        if (!result) {
            router.push('/access-denied')
            return
        }

        if (
            await $confirm(
                'Dynamic NFT 서비스를 이용하여 파츠 변경 시, <br /> 변경된 내용은 원상 복구가 불가능하며 진행 시 <br /> 보유한 티켓 1개가 차감됩니다. <br /> 계속 진행하시겠습니까?',
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
                    setPrevParts(selectedPartsData.partsData.trait_type)
                    showToast('Dynamic NFT 적용 완료', true)

                    // throw new Error()
                    // const keyChanged = selectedCategory?.trait_type
                    // const changedValue = refreshResult.attributes.find(
                    //     (item) => item.trait_type === keyChanged,
                    // )
                    // setSelectedCategory((prev) => ({
                    //     ...prev,
                    //     value: changedValue.value,
                    // }))
                } else {
                    throw new Error()
                }
                setIsDynamicNFTLoading(false)
            } catch (error) {
                showToast('Dynamic NFT 적용 실패', false)
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
        if (NFTMetadata) {
            setBackgroundColor(
                backgroundPallete[
                    NFTMetadata?.attributes
                        .find((item) => item.trait_type === 'Background')
                        .value.toLowerCase()
                ],
            )

            // NFTMetadata?.attributes.forEach((item) => {
            //     if (item.availability === true) {
            //         setSelectedPartsData((prev) => ({
            //             partsData: { trait_type: item.trait_type, value: item.value },
            //             tokenType: tokenType,
            //             availability: item.availability,
            //             pool: item.pool,
            //         }))
            //         return false
            //     }
            // })

            if (!prevParts) {
                // for (let i = 0; i < NFTMetadata?.attributes.length; i++) {
                //     if (NFTMetadata?.attributes[i].availability === true) {
                setSelectedPartsData((prev) => ({
                    partsData: {
                        trait_type: NFTMetadata?.attributes[0].trait_type,
                        value: NFTMetadata?.attributes[0].value,
                    },
                    tokenType: tokenType,
                    availability: NFTMetadata?.attributes[0].availability,
                    pool: NFTMetadata?.attributes[0].pool,
                }))
                //         break
                //     }
                // }
            } else {
                console.log(NFTMetadata)
                const data = NFTMetadata?.attributes.find((data) => {
                    return data.trait_type === prevParts
                })

                setSelectedPartsData((prev) => ({
                    partsData: {
                        trait_type: data.trait_type,
                        value: data.value,
                    },
                    tokenType: data.tokenType,
                    availability: data.availability,
                    pool: data.pool,
                }))
            }
        }
    }, [NFTMetadata])

    React.useEffect(() => {
        console.log('123123', selectedPartsData)
    }, [selectedPartsData])

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
                className={`max-w-[1400px] pb-10 w-full flex flex-col justify-center items-start gap-5 mt-[50px] px-[16px] lg:px-[50px]`}>
                {/* DynamicNFT Main */}
                <div
                    className={`w-full flex flex-row items-end justify-center lg:px-5 max-h-[864px] gap-5 overflow-hidden rounded-lg shadow-2xl relative bg-[${backgroundColor}]
                    `}
                    style={{ backgroundColor: backgroundColor }}>
                    <div className="absolute left-4 hidden lg:flex flex-col items-start gap-4 top-1/2 -translate-y-1/2 pl-3">
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
                                        ? 'shadow-[inset_2px_4px_6px_rgba(0,0,0,0.4)] text-[#FFFFFF] font-Poppins_bold'
                                        : 'shadow-[_2px_4px_rgba(0,0,0,0.4)]'
                                } ${
                                    !item.availability
                                        ? 'bg-[#BDBDBD]'
                                        : 'bg-[#FFC947] cursor-pointer'
                                } flex flex-row items-center gap-3 p-2 pl-4 rounded-lg transition-all`}>
                                <div>
                                    <div className="text-[10.85px] tracking-[0.56px] font-Poppins_light font-black">
                                        {item.trait_type.toUpperCase()}
                                    </div>
                                    <div className="font-black text-[11.81px] font-Poppins_semiBold ">
                                        {item.value}
                                    </div>
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
                                                className={`w-[80%] px-2 py-1 pl-4 rounded-md ${!item.availability}
                                                        ? 'bg-[#BDBDBD]'
                                                        : 'bg-[#FFC947]'
                                                }`}>
                                                <div className="text-[10.85px] tracking-[0.05rem]">
                                                    {item.trait_type.toUpperCase()}
                                                </div>
                                                <div className="font-black text-[11.81px] ">
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
                            selectedPartsData.availability && session?.user.ticket_num > 1
                                ? 'bg-[#FFC947] cursor-pointer hover:opacity-60'
                                : 'bg-[#BDBDBD]'
                        } absolute hidden lg:flex flex-col justify-center items-center gap-1 px-8 py-8 rounded-full top-1/2 -translate-y-1/2 right-20 text-[16px] border-black font-medium text-black border-2 shadow-[_5px_5px_black] transition-all`}
                        disabled={!selectedPartsData.availability || session?.user.ticket_num < 1}
                        onClick={startDynamicNFT}>
                        <img src="/rotate.svg" alt="rotate" width={46} height={72} />
                        <div className="text-[25px] font-medium tracking-[0.1rem]">START</div>
                    </button>
                </div>
                <button
                    className="w-full flex lg:hidden flex-col justify-center items-center"
                    onClick={startDynamicNFT}
                    disabled={!selectedPartsData.availability && session?.user.ticket_num < 1}>
                    <div
                        className={`${
                            selectedPartsData.availability || session?.user.ticket_num < 1
                                ? 'bg-[#FFC947] cursor-pointer hover:opacity-60'
                                : 'bg-[#BDBDBD]'
                        } flex lg:hidden flex-row justify-center items-center gap-1 px-4 py-2 rounded-full border-black font-medium text-black border-2 shadow-[_5px_5px_black]`}>
                        <img src="/rotate.svg" alt="rotate" width={20} height={20} />
                        <div className="text-[13px] font-medium">START</div>
                    </div>
                    <div>'</div>
                </button>

                {/* {!selectedPartsData.availability && selectedPartsData.pool.length === 0 && (
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
                )} */}

                {/* {selectedPartsData &&
                    selectedPartsData.availability &&
                    selectedPartsData.pool.length > 0 && ( */}
                <div className="flex flex-col justify-center items-start w-full">
                    <div className="text-[25px] mb-5 font-medium">Parts List</div>
                    <PartsListComponent
                        tokenType={tokenType}
                        selectedPartsData={selectedPartsData}
                    />
                </div>

                {/* )} */}
            </div>
            {isDynamicNFTLoading && <Loading />}
        </>
    )
}
