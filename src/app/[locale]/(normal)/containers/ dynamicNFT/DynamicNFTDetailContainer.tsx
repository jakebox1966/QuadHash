'use client'
import * as React from 'react'
import PartsListComponent from '../../components/dynamicNFT/PartsListComponent'
import { getMetadata } from '@/app/api/dynamicNFT/api'
import { backgroundPallete } from '@/app/[locale]/common/color/colorPalette'
import { gazaCategoryValidation, sazaCategoryValidation } from '@/app/utils/partsUtils'

export interface IDynamicNFTDetailContainerProps {
    tokenType: string
    tokenId: string
}

export default function DynamicNFTDetailContainer({
    tokenType,
    tokenId,
}: IDynamicNFTDetailContainerProps) {
    const [NFTMetadata, setNFTMetadata] = React.useState(null)

    const [backgroundColor, setBackgroundColor] = React.useState('')

    const [disabledPartsCategory, setDisabledPartsCategory] = React.useState([])

    const [selectedPartsData, setSelectedPartsData] = React.useState({
        traitType: 'Background',
        tokenType: tokenType,
        availability: false,
        pool: [],
    })
    const [availablePartsList, setAvailablePartsList] = React.useState(null)

    const handleSelectedPartsTraitType = (part: string) => {
        setSelectedPartsData((prev) => ({
            ...prev,
            traitType: part,
        }))
        if (tokenType === 'saza') {
            const result = sazaCategoryValidation(NFTMetadata?.attributes[0].value, part)

            setSelectedPartsData((prev) => ({
                ...prev,
                traitType: selectedPartsData.traitType,
                availability: result.availability,
                pool: result.pool,
            }))
        } else if (tokenType === 'gaza') {
            const result = gazaCategoryValidation(
                NFTMetadata?.attributes[0].value,
                part,
                NFTMetadata.attributes.filter((item, index) => index !== 0),
            )
            setSelectedPartsData((prev) => ({
                ...prev,
                traitType: selectedPartsData.traitType,
                availability: result.availability,
                pool: result.pool,
            }))
        }
    }

    const checkDisabledPartsCategory = () => {
        if (tokenType && tokenId && NFTMetadata) {
            const ranking = NFTMetadata.attributes[0].value
            if (tokenType === 'saza') {
                const result = NFTMetadata.attributes
                    .filter((item) => item.trait_type !== 'Ranking' && item.trait_type !== 'Dcount')
                    .filter((item) => {
                        const result = sazaCategoryValidation(ranking, item.trait_type)
                        if (result.pool.length === 0) {
                            return true
                        }
                        return false
                    })
                return result
            } else if (tokenType === 'gaza') {
                const result = NFTMetadata.attributes
                    .filter((item) => item.trait_type !== 'Ranking' && item.trait_type !== 'Dcount')
                    .filter((item) => {
                        const result = gazaCategoryValidation(
                            ranking,
                            item.trait_type,
                            NFTMetadata.attributes.filter((item, index) => index !== 0),
                        )
                        if (result.pool.length === 0) {
                            return true
                        }
                        return false
                    })
                return result
            }
        }
    }

    React.useEffect(() => {}, [selectedPartsData.traitType])

    React.useEffect(() => {
        const fetchData = async () => {
            if (tokenType && tokenId) {
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
                const disabledPartsResult = checkDisabledPartsCategory()
                console.log('disabledPartsCategory', disabledPartsCategory)
                setDisabledPartsCategory(disabledPartsResult?.filter((item) => item.trait_type))
            }
        }
        fetchData()
    }, [tokenType, tokenId])

    React.useEffect(() => {
        console.log(disabledPartsCategory)
    }, [disabledPartsCategory])
    // React.useEffect(() => {
    //     console.log(backgroundColor)
    // }, [backgroundColor])

    return (
        <>
            <div
                className={`max-w-[1300px] px-5 w-full flex flex-col justify-center items-start gap-5 mt-[50px]`}>
                {/* DynamicNFT Main */}
                <div
                    className={`w-full flex flex-row items-end justify-center h-[864px] gap-10 bg-[${backgroundColor}]
                    `}
                    style={{ backgroundColor: backgroundColor }}>
                    <div className="flex flex-col items-start gap-4 -translate-y-48 pl-3">
                        <div className="text-[#FFFFFF] text-[25px] font-medium">
                            {tokenType} #{tokenId}
                        </div>

                        {NFTMetadata?.attributes
                            .filter(
                                (item) =>
                                    item.trait_type !== 'Ranking' &&
                                    item.trait_type !== 'Extras' &&
                                    item.trait_type !== 'Dcount',
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
                                    } flex flex-row items-center gap-3 p-2 pl-4 bg-[#FFC947] rounded-lg  cursor-pointer transition-all`}>
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
                    <div className="min-w-[500px]">
                        <img
                            src={`${process.env.NEXT_PUBLIC_SAZA_S3_IMG_URL}/${tokenId}.png`}
                            alt="nft-image"
                            width={677}
                            height={677}
                        />
                    </div>
                    <div className="bg-[#FFC947] flex flex-col justify-center items-center gap-1 p-7 rounded-full -translate-y-80  text-[16px] border-black font-medium text-black border-2 shadow-[_5px_5px_black] cursor-pointer hover:opacity-60">
                        <img src="/rotate.svg" alt="rotate" width={46} height={72} />
                        <div className="text-[25px] font-medium">START</div>
                    </div>
                </div>

                {/* Part List */}

                <div className="flex flex-col justify-center items-start w-full mt-10">
                    <div className="text-[25px] font-medium">Parts List</div>
                    <PartsListComponent selectedPartsData={selectedPartsData} />
                </div>
            </div>
        </>
    )
}
