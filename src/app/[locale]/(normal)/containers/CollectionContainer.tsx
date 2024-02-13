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
import { useInfiniteQuery } from 'react-query'
import CollectionDetailModalComponent from '../components/collection/CollectionDetailModalComponent'
import { backgroundPallete } from '../../common/color/colorPalette'
import { getOwnerForNft } from '@/app/api/alchemy/api'

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
    sort_by: 'ranking',
    asc_desc: 'desc',
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

    const [open, setOpen] = React.useState(false)
    const [owner, setOwner] = React.useState(null)
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
        setOwner(null)
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

        console.log(token_id)
        console.log(token_type)
        console.log(contractAddress)
        await getOwnerForNft(contractAddress, token_id)
            .then((response) => {
                console.log(response)
                setOwner(response.owners[0])
            })
            .catch((error) => {
                console.error(error)
            })

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
                sort_by: 'ranking',
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
                asc_desc: 'desc',
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

    // React.useEffect(() => {
    //     console.log(burtonMorris)
    // }, [burtonMorris])

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
            sort_by: 'ranking',
            asc_desc: 'desc',
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

    const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['getCollection', queryParam, burtonMorris],
        queryFn: ({ pageParam = 1 }) => fetchData(pageParam),
        getNextPageParam: (lastPage, allPages) => {
            if (!burtonMorris) {
                const currentPage = lastPage.paging.page
                const totalPage = lastPage.paging.total_pages

                if (currentPage === totalPage) {
                    return false
                }
                return currentPage + 1
            } else {
                const currentPage = lastPage.paging.page
                const totalPage = 5

                if (currentPage === totalPage) {
                    return false
                }
                return currentPage + 1
            }
        },
    })

    const { setTarget } = useIntersectionObserver({
        hasNextPage,
        fetchNextPage,
    })

    return (
        <>
            <div className="max-w-[1300px] px-5 w-full flex flex-col justify-center items-center lg:flex-row lg:justify-start lg:items-start gap-5">
                <FilterComponent
                    burtonMorris={burtonMorris}
                    handleBurtonMorris={handleBurtonMorris}
                    queryParam={queryParam}
                    handleSearchParam={handleSearchParam}
                    handlePartParam={handlePartParam}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    handleOptionParam={handleOptionParam}
                    handleNftTypeParam={handleNftTypeParam}
                />
                <div className="w-full lg:w-[calc(100%-300px)] flex flex-row justify-between items-start flex-wrap">
                    <TabComponent
                        burtonMorris={burtonMorris}
                        handleNftTypeParam={handleNftTypeParam}
                        handleOptionParam={handleOptionParam}
                        queryParam={queryParam}
                    />
                    <CardListComponent>
                        {/* {data.pages.map((item) => (
                            <CardComponent item={item} queryParam={queryParam} />
                        ))} */}
                        {data?.pages.map((page) => {
                            return page?.data.map((item, index) => (
                                <CardComponent
                                    onClick={openDetailModal}
                                    burtonMorris={burtonMorris}
                                    key={`${item}_${index}`}
                                    item={item}
                                    queryParam={queryParam}
                                />
                            ))
                        })}
                    </CardListComponent>
                </div>
            </div>
            <div ref={setTarget} className="h-[1rem]" />
            <CollectionDetailModalComponent
                open={open}
                handleOpen={handleOpen}
                owner={owner}
                metadata={metadata}
                imageUrl={imageUrl}
                backgroundColor={backgroundColor}
            />
        </>
    )
}
