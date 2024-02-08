'use client'
import Image from 'next/image'
import * as React from 'react'
import logo from '/public/logo/logo.svg'
import logoShort from '/public/logo_short.png'
import { Input, Switch, Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react'
import { sazaPartList } from '../../parts_data/parts'

import CardListComponent from '../components/collection/CardListComponent'
import CardComponent from '../components/collection/CardComponent'
import FilterComponent from '../components/collection/FiterComponent'
import TabComponent from '../components/collection/TabaComponent'
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

export default function CollectionContainer(props: ICollectionContainerProps) {
    const [queryParam, setQueryParam] = React.useState({
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
    })

    const [collectionList, setCollectionList] = React.useState([])

    const handlePartParam = (category, partName) => {
        if (queryParam[category].find((item) => item === partName)) {
            return false
        }

        setQueryParam((prev) => ({
            ...prev,
            [category]: [...prev[category], partName],
        }))
    }

    const handleNftTypeParam = (nftType) => {
        setQueryParam({ ...queryParam, token_type: nftType })
    }

    const handleOptionParam = (option) => {
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

    React.useEffect(() => {
        fetchData()
    }, [queryParam])
    return (
        <>
            <div className="w-[1300px] flex flex-row justify-center items-start gap-5">
                <FilterComponent handlePartParam={handlePartParam} />
                <div className="max-w-[calc(100%-300px)] w-full flex flex-col justify-start items-start flex-wrap">
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
                </div>
            </div>
        </>
    )
}
