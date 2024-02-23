'use client'
import * as React from 'react'
import FilterComponent from '../components/collection/FiterComponent'
import TabComponent from '../components/collection/TabComponent'
import { getMetadata } from '@/app/api/dynamicNFT/api'
import { getCollectionList } from '@/app/api/collection/api'

import CollectionDetailModalComponent from '../components/collection/CollectionDetailModalComponent'
import { backgroundPallete } from '../../common/color/colorPalette'

import BurtonMorrisComponent from '../components/collection/BurtonMorrisListComponent'

import NormalCollectionListComponent from '../components/collection/NormalListComponent'
import { saza_morris, gaza_morris } from '@/app/mock/burton_morris'
import ActivePartFilterComponent from '../components/collection/ActivePartFilterComponent'

export interface ICollectionContainerProps {}

function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? 'rotate-180' : ''} h-5 w-5 transition-transform`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    )
}

export interface IQueryParam {
    token_type: string
    sort_by: string
    asc_desc: string
    token_id: null
    background: string[]
    body: string[]
    extras: string[]
    eyes: string[]
    head: string[]
    headwear: string[]
    mane: string[]
    mouth: string[]
    top: string[]
    bottoms: string[]
    onesie: string[]
}

const initialQueryParam = {
    token_type: 'saza',
    sort_by: 'number',
    asc_desc: 'asc',
    token_id: null,
    background: [],
    body: [],
    extras: [],
    eyes: [],
    head: [],
    headwear: [],
    mane: [],
    mouth: [],
    top: [],
    bottoms: [],
    onesie: [],
}

export default function CollectionContainer(props: ICollectionContainerProps) {
    const [searchInput, setSearchInput] = React.useState('')
    const [queryParam, setQueryParam] = React.useState(initialQueryParam)
    const [burtonMorris, setBurtonMorris] = React.useState(false)
    const [burtonMorrisData, setBurtonMorrisData] = React.useState(saza_morris)

    const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState(false)

    const [open, setOpen] = React.useState(false)

    const [contractAddress, setContractAddress] = React.useState(null)
    const [selectedTokenId, seSelectedTokenId] = React.useState(null)
    const [backgroundColor, setBackgroundColor] = React.useState(null)
    const [metadata, setMetadata] = React.useState(null)
    const [imageUrl, setImageUrl] = React.useState(null)

    /**
     * 모달 Control
     */

    const handleOpen = React.useCallback(() => {
        setOpen(!open)
    }, [open])

    const openDetailModal = async (token_id, token_type) => {
        const metadata = await getMetadata({
            nftType: token_type,
            tokenId: token_id,
        })

        let contractAddress = ''
        if (token_type === 'saza') {
            contractAddress = process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS
        } else if (token_type === 'gaza') {
            contractAddress = process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS
        }
        setContractAddress(contractAddress)
        seSelectedTokenId(token_id)

        setMetadata(metadata)
        if (burtonMorris) {
            setImageUrl(`https://${token_type}.quadhash.io/art/${token_id}.png`)
        } else {
            setImageUrl(metadata.image)
        }
        const backgroundColor = metadata.attributes.find((item) => {
            return item.trait_type === 'Background'
        })
        setBackgroundColor(backgroundPallete[backgroundColor.value.toLowerCase()])
        handleOpen()
    }

    /**
     * Filter Control
     */

    const handleBurtonMorris = () => {
        if (!burtonMorris) {
            setQueryParam((prev) => ({
                ...prev,
                sort_by: 'number',
                asc_desc: 'asc',
                token_id: null,
                background: [],
                body: [],
                extras: [],
                eyes: [],
                head: [],
                headwear: [],
                mane: [],
                mouth: [],
                top: [],
                bottoms: [],
                onesie: [],
            }))
        } else {
            setQueryParam((prev) => ({
                ...prev,
                sort_by: 'number',
                asc_desc: 'asc',
                token_id: null,
                background: [],
                body: [],
                extras: [],
                eyes: [],
                head: [],
                headwear: [],
                mane: [],
                mouth: [],
                top: [],
                bottoms: [],
                onesie: [],
            }))
        }
        setSearchInput('')
        setBurtonMorris((prev) => !prev)
    }

    const clearFilter = () => {
        setQueryParam((prev) => ({
            ...prev,
            background: [],
            body: [],
            extras: [],
            eyes: [],
            head: [],
            headwear: [],
            mane: [],
            mouth: [],
            top: [],
            bottoms: [],
            onesie: [],
        }))
    }

    const handlePartParam = (category, partName) => {
        if (queryParam[category].find((item) => item === partName)) {
            setQueryParam((prev) => ({
                ...prev,
                token_id: null,
                [category]: prev[category].filter((item) => item !== partName),
            }))
        } else {
            setQueryParam((prev) => ({
                ...prev,
                token_id: null,
                [category]: [...prev[category], partName],
            }))
        }
        setSearchInput('')
    }

    const handleNftTypeParam = (nftType) => {
        setQueryParam({
            ...queryParam,
            token_id: null,
            token_type: nftType,
            background: [],
            body: [],
            extras: [],
            eyes: [],
            head: [],
            headwear: [],
            mane: [],
            mouth: [],
            top: [],
            bottoms: [],
            onesie: [],
        })

        if (nftType === 'saza') {
            setBurtonMorrisData(saza_morris)
        } else if (nftType === 'gaza') {
            setBurtonMorrisData(gaza_morris)
        }
        setSearchInput('')
    }

    const handleOptionParam = (option: string) => {
        const sort_by = option.split('/')[0].trim().toLowerCase()
        const asc_desc = option.split('/')[1].trim().toLowerCase()
        setQueryParam({ ...queryParam, sort_by: sort_by, asc_desc: asc_desc, token_id: null })
        setSearchInput('')
    }

    const handleSearchParam = () => {
        setQueryParam((prev) => ({
            ...prev,
            sort_by: 'number',
            asc_desc: 'asc',
            token_id: searchInput,
            background: [],
            body: [],
            extras: [],
            eyes: [],
            head: [],
            headwear: [],
            mane: [],
            mouth: [],
            top: [],
            bottoms: [],
            onesie: [],
        }))
        setBurtonMorris(false)
    }

    const fetchData = async (pageParam) => {
        const process = Object.entries(queryParam)
            .filter((item) => item[1] !== null)
            .filter((item) => item[1].length !== 0)

        const query = Object.fromEntries(process)

        query.page = pageParam

        const result = await getCollectionList(new URLSearchParams(query).toString())

        return result
    }

    return (
        <>
            <div className="max-w-[1300px] px-5 w-full flex flex-col justify-center items-center lg:flex-row lg:justify-start lg:items-start gap-5">
                <FilterComponent
                    isMobileFilterOpen={isMobileFilterOpen}
                    setIsMobileFilterOpen={setIsMobileFilterOpen}
                    burtonMorris={burtonMorris}
                    handleBurtonMorris={handleBurtonMorris}
                    queryParam={queryParam}
                    handleSearchParam={handleSearchParam}
                    handlePartParam={handlePartParam}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    handleOptionParam={handleOptionParam}
                    handleNftTypeParam={handleNftTypeParam}
                    clearFilter={clearFilter}
                />
                <div className="w-full lg:w-[calc(100%-300px)] flex flex-row justify-between items-start flex-wrap">
                    <TabComponent
                        burtonMorris={burtonMorris}
                        handleNftTypeParam={handleNftTypeParam}
                        handleOptionParam={handleOptionParam}
                        queryParam={queryParam}
                    />
                    <ActivePartFilterComponent
                        clearFilter={clearFilter}
                        queryParam={queryParam}
                        handlePartParam={handlePartParam}
                    />

                    {!burtonMorris && (
                        <>
                            <NormalCollectionListComponent
                                queryParam={queryParam}
                                burtonMorris={burtonMorris}
                                openDetailModal={openDetailModal}
                            />
                        </>
                    )}
                    {burtonMorris && (
                        <>
                            <BurtonMorrisComponent
                                burtonMorrisData={burtonMorrisData}
                                queryParam={queryParam}
                                burtonMorris={burtonMorris}
                                openDetailModal={openDetailModal}
                            />
                        </>
                    )}
                </div>
            </div>
            <CollectionDetailModalComponent
                contractAddress={contractAddress}
                selectedTokenId={selectedTokenId}
                open={open}
                handleOpen={handleOpen}
                metadata={metadata}
                imageUrl={imageUrl}
                backgroundColor={backgroundColor}
            />
        </>
    )
}
