'use client'
import * as React from 'react'
import Image from 'next/image'

import logo from '/public/logo/logo.svg'
import logoShort from '/public/logo_short.png'
import {
    Input,
    Switch,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Button,
    Select,
    Option,
    ThemeProvider,
    select,
} from '@material-tailwind/react'
import { sazaPartList } from '@/app/[locale]/common/parts_data/parts'
import { IQueryParam } from '../../containers/CollectionContainer'
import { Listbox, Transition } from '@headlessui/react'
export interface IFilterComponentProps {
    queryParam: IQueryParam
    handlePartParam: any
    handleSearchParam: () => void
    searchInput: string
    setSearchInput: React.Dispatch<React.SetStateAction<string>>
    handleBurtonMorris: () => void
    handleOptionParam: (option: any) => void
    handleNftTypeParam: (nftType: any) => void
    burtonMorris: boolean
}

const theme = {
    select: {
        styles: {
            base: {
                container: {
                    position: 'relative',
                    width: 'w-full',
                    minWidth: 'min-w-[50px]',
                },
            },
        },
    },
}

const typeList = [
    { name: 'SAZA', value: 'saza' },
    { name: 'GAZA', value: 'gaza' },
]

const optionList = [
    { name: 'Rank: H To L', value: 'ranking/desc' },
    { name: 'Rank: R To H', value: 'ranking/asc' },
    { name: 'Token: H To L', value: 'number/desc' },
    { name: 'Token: R To H', value: 'number/asc' },
]

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
export default function FilterComponent({
    queryParam,
    handleSearchParam,
    handlePartParam,
    searchInput,
    setSearchInput,
    handleBurtonMorris,
    handleOptionParam,
    handleNftTypeParam,
    burtonMorris,
}: IFilterComponentProps) {
    const [sazaFilterOpen, setSazafilterOpen] = React.useState({
        background: false,
        body: false,
        extras: false,
        eyes: false,
        head: false,
        headwear: false,
        mane: false,
        mouth: false,
    })

    const [selectedType, setSelectedType] = React.useState(typeList[0])
    const [selectedOption, setSelectedOption] = React.useState(optionList[0])

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchParam()
        }
    }

    /**
     * Accordion 메뉴 컨트롤
     * @param value
     */
    const handleSazaFilterOpen = (value) => {
        console.log(value)
        setSazafilterOpen((prev) => ({
            ...prev,
            [value.part_category]: !prev[value.part_category],
        }))
    }

    const checkSelected = React.useCallback(
        (partCategory, partName) => {
            // const { background, body, bottoms, extras, eyes, head, headwear, mane, mouth, onesie } =
            //     queryParam

            // console.log(background)
            // console.log(body)
            // console.log(bottoms)
            // console.log(extras)
            // console.log(eyes)
            // console.log(head)
            // console.log(headwear)
            // console.log(mane)
            // console.log(mouth)
            // console.log(onesie)

            if (queryParam[partCategory].includes(partName)) {
                return true
            }
            return false
        },
        [queryParam],
    )

    const onChange = ({ target }) => {
        setSearchInput(target.value)
    }
    return (
        <>
            <div className="w-[300px] hidden lg:flex flex-col justify-start items-center border-2 rounded-lg pt-10">
                <div>
                    <Image src={logo} alt={'logo'} />
                </div>

                <div className="min-w-[246px] p-10 flex flex-col justify-center items-center gap-5">
                    <Input
                        label="Search ID"
                        crossOrigin={undefined}
                        value={searchInput}
                        type="number"
                        onKeyDown={handleKeyPress}
                        onChange={onChange}
                    />
                    <Button
                        onClick={handleSearchParam}
                        className="text-center p-2 rounded-lg w-full text-[#FFFFFF] bg-[#F46221]"
                        placeholder={undefined}>
                        SEARCH
                    </Button>
                </div>

                <div className="flex flex-row items-center gap-3 text-sm font-medium bg-[#FFCD19]/25 py-4 px-3 w-full">
                    <div>
                        <Image src={logoShort} alt={'logo_short'} />
                    </div>
                    <div>BURTON MORRIS VER</div>

                    <Switch
                        checked={burtonMorris}
                        onChange={handleBurtonMorris}
                        crossOrigin={undefined}
                        className="h-full w-full checked:bg-[#F46221] bg-black"
                        containerProps={{
                            className: 'w-11 h-6',
                        }}
                        circleProps={{
                            className:
                                'before:hidden left-0.5 border-none bg-[#F46221] peer-checked:bg-black',
                        }}
                    />
                </div>
                {!burtonMorris && (
                    <div className="w-full">
                        {sazaPartList.map((item, index) => (
                            <Accordion
                                key={item.part_category}
                                open={sazaFilterOpen[item.part_category]}
                                icon={<Icon id={index} open={sazaFilterOpen[item.part_category]} />}
                                placeholder={undefined}>
                                <AccordionHeader
                                    className="border-none !text-black px-6 cursor-pointer"
                                    onClick={() => handleSazaFilterOpen(item)}
                                    placeholder={undefined}>
                                    {item.part_category.toUpperCase()}
                                </AccordionHeader>
                                <AccordionBody className="bg-[#FFE8DE] w-full cursor-pointer">
                                    {item.part_name.map((partName) => (
                                        <div
                                            key={partName}
                                            className="text-black font-medium py-3 px-10"
                                            onClick={() =>
                                                handlePartParam(item.part_category, partName)
                                            }>
                                            <div
                                                className={`${
                                                    checkSelected(item.part_category, partName)
                                                        ? 'text-[#F46221]'
                                                        : 'text-black'
                                                } flex flex-row items-center justify-between`}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                    />
                                                </svg>
                                                <div>{partName.toUpperCase()}</div>
                                            </div>
                                        </div>
                                    ))}
                                </AccordionBody>
                            </Accordion>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex lg:hidden flex-col justify-center items-center w-full text-[10px] md:text-sm">
                <div className="flex flex-row justify-left items-center w-full gap-2 z-20">
                    <Listbox
                        value={selectedType.value}
                        onChange={(value) => {
                            const selected = typeList.find((item) => {
                                if (item.value === value) {
                                    return true
                                }
                            })
                            setSelectedType(selected)
                            handleNftTypeParam(value)
                        }}>
                        <div className="relative max-w-[calc(25%-5px)] w-full">
                            <Listbox.Button className="relative leading-[18px] w-full rounded-lg bg-white py-2 px-3 text-left border-2 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm hover:border-[#F46221]">
                                <span className="block truncate font-medium">
                                    {selectedType.name}
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={React.Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0">
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full text-[10px] md:text-sm overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                    {typeList.map((item, index) => (
                                        <Listbox.Option
                                            key={item.value}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 text-center ${
                                                    active
                                                        ? 'bg-[#F46221] text-[#FFFFFF]'
                                                        : 'text-gray-900'
                                                }`
                                            }
                                            value={item.value}>
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block ${
                                                            selected ? 'font-black ' : 'font-medium'
                                                        }`}>
                                                        {item.name}
                                                    </span>
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                    <div
                        className={`max-w-[calc(50%-6px)] w-full flex flex-row text-[10px] md:text-sm justify-center items-center border-2 py-2 rounded-lg hover:border-[#F46221] ${
                            burtonMorris && 'border-[#F46221] bg-[#FFCD19]/25'
                        }`}
                        onClick={handleBurtonMorris}>
                        <div className="flex flex-row items-center gap-2 w-full justify-center">
                            <Image src={logoShort} width={18} height={18} alt={'logo_short'} />
                            <div>BURTON MORRIS</div>
                        </div>
                    </div>

                    {!burtonMorris && (
                        <Listbox
                            value={selectedOption.value}
                            onChange={(value) => {
                                const selected = optionList.find((item) => {
                                    if (item.value === value) {
                                        return true
                                    }
                                })
                                setSelectedOption(selected)
                                handleOptionParam(value)
                            }}>
                            <div className="relative max-w-[calc(25%-5px)] w-full">
                                <Listbox.Button className="relative w-full text-left leading-[18px] border-2 px-3 py-2 bg-white hover:border-[#F46221] rounded-lg focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
                                    <span className="block truncate font-medium">
                                        {selectedOption.name}
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={React.Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0">
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-2 text-[10px] md:text-sm shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        {optionList.map((item, index) => (
                                            <Listbox.Option
                                                key={item.value}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 text-center ${
                                                        active
                                                            ? 'bg-[#F46221] text-[#FFFFFF]'
                                                            : 'text-gray-900'
                                                    }`
                                                }
                                                value={item.value}>
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block ${
                                                                selected
                                                                    ? 'font-black '
                                                                    : 'font-medium'
                                                            }`}>
                                                            {item.name}
                                                        </span>
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    )}
                </div>

                <div className="w-full h-full relative mt-3 leading-[18px]">
                    <input
                        type="text"
                        className="w-full h-full border-2 rounded-lg px-[16px] pl-8  py-2.5"
                        placeholder="Search"
                        value={searchInput}
                        onKeyDown={handleKeyPress}
                        onChange={onChange}
                    />
                    <img src="/search.svg" alt="search" className="absolute left-3 top-2.5" />
                </div>
            </div>
        </>
    )
}
