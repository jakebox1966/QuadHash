'use client'
import Image from 'next/image'
import * as React from 'react'
import logo from '/public/logo/logo.svg'
import logoShort from '/public/logo_short.png'
import { Input, Switch, Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react'
import { sazaPartList } from '../../parts_data/parts'
import { useIntersectionObserver } from '@/app/hooks/useIntersectionObserver'
import CardListComponent from '../components/collection/CardListComponent'
import CardComponent from '../components/collection/CardComponent'
import FilterComponent from '../components/collection/FiterComponent'
import TabComponent from '../components/collection/TabComponent'
import { getMetadata } from '@/app/api/dynamicNFT/api'
import { getCollectionList } from '@/app/api/collection/api'

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
    page: number | string
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
    sort_by: 'ranking',
    asc_desc: 'desc',
    page: '1',
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

    const [collectionList, setCollectionList] = React.useState([])

    const initPage = () => {
        setQueryParam((prev) => ({
            ...prev,
            page: '1',
        }))
    }
    const handlePartParam = (category, partName) => {
        initPage()
        setCollectionList([])
        if (queryParam[category].find((item) => item === partName)) {
            setQueryParam((prev) => ({
                ...prev,
                [category]: prev[category].filter((item) => item !== partName),
            }))
        } else {
            initPage()
            setQueryParam((prev) => ({
                ...prev,
                [category]: [...prev[category], partName],
            }))
        }
    }

    const handleNftTypeParam = (nftType) => {
        initPage()
        setCollectionList([])
        setQueryParam({ ...queryParam, token_type: nftType })
    }

    const handleOptionParam = (option) => {
        initPage()
        setCollectionList([])
        setQueryParam({ ...queryParam, sort_by: option })
    }

    const fetchData = async () => {
        const process = Object.entries(queryParam)
            .filter((item) => item[1] !== null)
            .filter((item) => item[1].length !== 0)
        console.log(process)

        const query = Object.fromEntries(process)

        console.log(query)

        const result = await getCollectionList(new URLSearchParams(query).toString())
        // Object.entries(queryParam).filter((item) => item[1] === null || item[1].length === 0)

        console.log(result)
        setCollectionList(result.data)
    }

    const searchNFT = () => {
        initPage()
        setCollectionList([])
        setQueryParam((prev) => ({
            ...prev,
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
    }

    React.useEffect(() => {
        console.log(searchInput)
    }, [searchInput])

    React.useEffect(() => {
        fetchData()
    }, [queryParam])
    return (
        <>
            <div className="max-w-[1300px] px-5 w-full flex flex-col justify-center items-center lg:flex-row lg:justify-start lg:items-start gap-5">
                <FilterComponent
                    searchNFT={searchNFT}
                    handlePartParam={handlePartParam}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                />
                <div className="w-full px-[16px] lg:w-[calc(100%-300px)] flex flex-row justify-between items-start flex-wrap">
                    <TabComponent
                        handleNftTypeParam={handleNftTypeParam}
                        handleOptionParam={handleOptionParam}
                        queryParam={queryParam}
                    />
                    <CardListComponent>
                        {collectionList.map((item) => (
                            <CardComponent item={item} queryParam={queryParam} />
                        ))}
                    </CardListComponent>
                    <div ref={setTarget} className="h-[1rem]" />
                </div>
            </div>
        </>
    )
}
