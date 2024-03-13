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
    Checkbox,
    Drawer,
    ThemeProvider,
} from '@material-tailwind/react'
import { gazaPartList, sazaPartList } from '@/app/[locale]/common/parts_data/parts'
import { IQueryParam } from '../../containers/CollectionContainer'
import { Listbox, Transition } from '@headlessui/react'
import mobileWhiteLogo from '/public/mobile_white_logo.png'

import Link from 'next/link'
import useBodyScrollLock from '@/app/hooks/useBodyScrollLock'
import Logo from '@/app/[locale]/common/components/header/Logo'
export interface IFilterComponentProps {
    isMobileFilterOpen: boolean
    setIsMobileFilterOpen: React.Dispatch<React.SetStateAction<boolean>>
    queryParam: IQueryParam
    handlePartParam: any
    handleSearchParam: () => void
    searchInput: string
    setSearchInput: React.Dispatch<React.SetStateAction<string>>
    handleBurtonMorris: () => void
    handleOptionParam: (option: any) => void
    handleNftTypeParam: (nftType: any) => void
    burtonMorris: boolean
    clearFilter: () => void
}
const customTheme = {
    drawer: {
        defaultProps: {
            size: 2000,
            overlay: true,
            placement: 'bottom',
            overlayProps: undefined,
            className: '',
            dismiss: undefined,
            onClose: undefined,
            transition: {
                type: 'tween',
                duration: 0.3,
            },
        },
        styles: {
            base: {
                drawer: {
                    position: 'fixed',
                    zIndex: 'z-[9999]',
                    pointerEvents: 'pointer-events-auto',
                    backgroundColor: 'bg-none',
                    boxSizing: 'box-border',
                    width: '!w-screen',
                    height: '!h-screen',
                    boxShadow: 'shadow-2xl shadow-blue-gray-900/10',
                },
                overlay: {
                    position: 'absolute',
                    inset: 'inset-0',
                    width: 'w-full',
                    height: 'h-screen',
                    pointerEvents: 'pointer-events-auto',
                    zIndex: 'z-[9995]',
                    backgroundColor: 'bg-gray-500',
                    backgroundOpacity: '',
                    backdropBlur: 'backdrop-blur-sm',
                },
            },
        },
    },
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

const trait_type = [
    'background',
    'body',
    'extras',
    'eyes',
    'head',
    'headwear',
    'mane',
    'mouth',
    'top',
    'bottoms',
    'onesie',
]

const typeList = [
    { name: 'SAZA', value: 'saza' },
    { name: 'GAZA', value: 'gaza' },
]

const optionList = [
    { name: 'Token: L To H', value: 'number/asc' },
    { name: 'Token: H To L', value: 'number/desc' },
    { name: 'Rank: T To B', value: 'ranking/asc' },
    { name: 'Rank: B To T', value: 'ranking/desc' },
]

export default function FilterComponent({
    isMobileFilterOpen,
    setIsMobileFilterOpen,
    queryParam,
    handleSearchParam,
    handlePartParam,
    searchInput,
    setSearchInput,
    handleBurtonMorris,
    handleOptionParam,
    handleNftTypeParam,
    burtonMorris,
    clearFilter,
}: IFilterComponentProps) {
    const { lockScroll, openScroll } = useBodyScrollLock()
    const calcFilterCount = () => {
        const backgroundCount = queryParam.background.length
        const bodyCount = queryParam.body.length
        const extrasCount = queryParam.extras.length
        const eyesCount = queryParam.eyes.length
        const headCount = queryParam.head.length
        const headwearCount = queryParam.headwear.length
        const maneCount = queryParam.mane.length
        const mouthCount = queryParam.mouth.length
        const topCount = queryParam.top.length
        const bottomsCount = queryParam.bottoms.length
        const onesieCount = queryParam.onesie.length

        return (
            backgroundCount +
            bodyCount +
            extrasCount +
            eyesCount +
            headCount +
            headwearCount +
            maneCount +
            mouthCount +
            topCount +
            bottomsCount +
            onesieCount
        )
    }
    const partFilterList = queryParam.token_type === 'saza' ? sazaPartList : gazaPartList

    const [filterOpen, setFilterOpen] = React.useState({
        background: false,
        body: false,
        extras: false,
        eyes: false,
        head: false,
        headwear: false,
        mane: false,
        mouth: false,
        top: false,
        bottom: false,
        onesie: false,
    })

    // const [gazaFilterOpen, setGazaFilterOpen] = React.useState({
    //     background: false,
    //     body: false,
    //     top: false,
    //     bottom: false,
    //     extras: false,
    //     eyes: false,
    //     headwear: false,
    //     mouth: false,
    //     onesie: false,
    // })

    const [selectedType, setSelectedType] = React.useState(typeList[0])
    const [selectedOption, setSelectedOption] = React.useState(optionList[0])

    React.useEffect(() => {
        setSelectedOption(optionList[0])
        setFilterOpen({
            background: false,
            body: false,
            extras: false,
            eyes: false,
            head: false,
            headwear: false,
            mane: false,
            mouth: false,
            top: false,
            bottom: false,
            onesie: false,
        })
    }, [burtonMorris])

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchParam()
        }
    }

    React.useEffect(() => {
        if (isMobileFilterOpen) {
            lockScroll()
            return
        }
        openScroll()
    }, [isMobileFilterOpen])

    const clearFilterAll = () => {
        clearFilter()
        closeDrawer()
    }
    const closeDrawer = () => setIsMobileFilterOpen(false)
    const openDrawer = () => setIsMobileFilterOpen(true)

    /**
     * Accordion 메뉴 컨트롤
     * @param value
     */
    const handleFilterOpen = (value) => {
        if (queryParam.token_type === 'saza') {
            setFilterOpen((prev) => ({
                ...prev,
                [value.part_category]: !prev[value.part_category],
            }))
        } else if (queryParam.token_type === 'gaza') {
            setFilterOpen((prev) => ({
                ...prev,
                [value.part_category]: !prev[value.part_category],
            }))
        }
    }

    const checkSelected = React.useCallback(
        (partCategory, partName) => {
            if (queryParam[partCategory].includes(partName)) {
                return true
            }
            return false
        },
        [queryParam],
    )

    const onChange = ({ target }) => {
        let value = ''
        if (target.value) {
            value = target.value.replace(/[^0-9]/g, '')
            setSearchInput(parseInt(value).toString())
        }

        if (target.value.startsWith('0') && target.value.length > 1) {
            value = target.value.replace('0', '')
        }

        setSearchInput(value)

        // target.value = target.value.replace(/[^0-9]/g, '')
    }
    return (
        <>
            <div className="w-[300px] hidden lg:flex flex-col justify-start items-center border-2 rounded-lg pt-10 h-fit max-h-[calc(100%-140px)] overflow-x-hidden fixed top-[140px]">
                <div>
                    <Logo />
                </div>

                <div className="min-w-[246px] p-10 flex flex-col justify-center items-center gap-5">
                    <Input
                        label="Search ID"
                        crossOrigin={undefined}
                        value={searchInput}
                        type="text"
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

                <div className="flex flex-row items-center justify-between gap-[10px] font-medium bg-[#FFCD19] py-4 px-[20px] w-full">
                    <div>
                        <Image src={logoShort} alt={'logo_short'} width={28} />
                    </div>
                    <div className="text-[16px]">BURTON MORRIS</div>

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

                <div className="w-full overflow-y-auto">
                    {partFilterList.map((item, index) => (
                        <Accordion
                            disabled={burtonMorris ? true : false}
                            key={item.part_category}
                            open={
                                filterOpen[item.part_category]
                                    ? filterOpen[item.part_category]
                                    : false
                            }
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className={`${
                                        filterOpen[item.part_category] === true ? 'rotate-180' : ''
                                    } h-5 w-5 transition-transform`}>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            }
                            placeholder={undefined}>
                            <AccordionHeader
                                className="border-none bg-[#FFFFFF] h-[64px] font-[700] !text-black text-[16px] leading-[24px] flex flex-row px-[30px] justify-between cursor-pointer"
                                onClick={() => handleFilterOpen(item)}
                                placeholder={undefined}>
                                {item.part_category.toUpperCase()}
                            </AccordionHeader>
                            <AccordionBody className="bg-[#FFE8DE] w-full cursor-pointer">
                                {item.part_name.map((partName) => (
                                    <div
                                        key={partName}
                                        className="text-black font-[700] pl-[30px] h-[50px] text-[13px] leading-[24px]"
                                        onClick={() =>
                                            handlePartParam(item.part_category, partName)
                                        }>
                                        <div
                                            className={`${
                                                checkSelected(item.part_category, partName)
                                                    ? 'text-[#F46221]'
                                                    : 'text-black'
                                            } flex flex-row items-center justify-start`}>
                                            <Checkbox
                                                readOnly
                                                checked={
                                                    checkSelected(item.part_category, partName)
                                                        ? true
                                                        : false
                                                }
                                                ripple={false}
                                                iconProps={{
                                                    className: 'text-black',
                                                }}
                                                className="checked:!border-black checked:!bg-[#FCB808] checked:border-none"
                                                crossOrigin={undefined}
                                            />
                                            <div>{partName.toUpperCase()}</div>
                                        </div>
                                    </div>
                                ))}
                            </AccordionBody>
                        </Accordion>
                    ))}
                </div>
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
                            <Listbox.Button className="relative w-full text-center leading-[18px] border-2 px-3 py-2 bg-white hover:border-[#F46221] rounded-lg focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm md:text-sm">
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
                        className={`max-w-[calc(50%-6px)] w-full flex flex-row text-[10px] md:text-sm justify-center items-center border-2 py-2 rounded-lg cursor-pointer hover:bg-[#FFCD19] ${
                            burtonMorris && ' bg-[#FFCD19]'
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
                                <Listbox.Button className="relative w-full text-center leading-[18px] border-2 px-3 py-2 bg-white hover:border-[#F46221] rounded-lg focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 md:text-sm sm:text-sm">
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

                <div className="w-full flex flex-row items-center mt-3">
                    <div className="w-full relative leading-[18px] pr-3">
                        <input
                            type="text"
                            className="w-full h-full border-2 rounded-full px-[16px] pl-8 py-2.5"
                            placeholder="Search"
                            value={searchInput}
                            onKeyDown={handleKeyPress}
                            onChange={onChange}
                        />
                        <img src="/search.svg" alt="search" className="absolute left-3 top-3" />
                    </div>
                    <div className="flex flex-row items-center gap-1" onClick={openDrawer}>
                        <img src="/filter.svg" alt="filter" className="max-w-[30px]" />
                        <p className="font-medium text-[12px] rounded-full px-2 py-0.5 bg-[#F46221]/20">
                            +{calcFilterCount()}
                        </p>
                    </div>
                </div>

                <ThemeProvider value={customTheme}>
                    <Drawer
                        open={isMobileFilterOpen}
                        onClose={closeDrawer}
                        placeholder={undefined}
                        className="overflow-y-auto h-screen">
                        <div
                            className="text-[#FFFFFF] px-3 pt-3 flex flex-row justify-end"
                            onClick={closeDrawer}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="white"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="h-10 w-10">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                        <div className="px-10 flex flex-col justify-center items-start gap-10 text-white font-black">
                            <div className="flex flex-row justify-start w-full">
                                <Image src={mobileWhiteLogo} alt={'mobile_white_logo'} />
                            </div>
                            <div className="w-full relative">
                                {partFilterList.map((item, index) => (
                                    <Accordion
                                        disabled={burtonMorris ? true : false}
                                        key={item.part_category}
                                        open={
                                            filterOpen[item.part_category]
                                                ? filterOpen[item.part_category]
                                                : false
                                        }
                                        icon={
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className={`${
                                                    filterOpen[item.part_category] === true
                                                        ? 'rotate-180'
                                                        : ''
                                                } h-5 w-5 transition-transform`}>
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                />
                                            </svg>
                                        }
                                        placeholder={undefined}>
                                        <AccordionHeader
                                            className="border-none !font-black !text-[#FFFFFF] px-6 cursor-pointer"
                                            onClick={() => handleFilterOpen(item)}
                                            placeholder={undefined}>
                                            {item.part_category.toUpperCase()}
                                        </AccordionHeader>
                                        <AccordionBody className="w-full cursor-pointer !font-black">
                                            {item.part_name.map((partName) => (
                                                <div
                                                    key={partName}
                                                    className="text-white py-0 px-10"
                                                    onClick={() =>
                                                        handlePartParam(
                                                            item.part_category,
                                                            partName,
                                                        )
                                                    }>
                                                    <div
                                                        className={`${
                                                            checkSelected(
                                                                item.part_category,
                                                                partName,
                                                            )
                                                                ? 'text-[#F46221]'
                                                                : 'text-[#FFFFFF]'
                                                        } flex flex-row items-center justify-between`}>
                                                        <Checkbox
                                                            readOnly
                                                            checked={
                                                                checkSelected(
                                                                    item.part_category,
                                                                    partName,
                                                                )
                                                                    ? true
                                                                    : false
                                                            }
                                                            ripple={false}
                                                            iconProps={{
                                                                className: 'text-black',
                                                            }}
                                                            className="checked:!border-black checked:!bg-[#FCB808] checked:border-none"
                                                            crossOrigin={undefined}
                                                        />
                                                        <div>{partName.toUpperCase()}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </AccordionBody>
                                    </Accordion>
                                ))}
                            </div>
                        </div>
                        {calcFilterCount() > 0 && (
                            <div className="flex flex-row justify-center items-center gap-3 fixed bottom-0 h-[60px] bg-gradient-to-b from-white/20 via-gray-500/90 to-gray-500 font-black text-[14px] w-full bg-opacity-20 bg-black">
                                <div
                                    className="min-w-[110px] bg-[#FFFFFF] text-[#F46221] px-4 py-2 rounded-lg text-center hover:opacity-70 cursor-pointer"
                                    onClick={closeDrawer}>
                                    DONE
                                </div>
                                <div
                                    className="min-w-[110px] bg-[#FFFFFF] text-[#F46221] px-4 py-2 rounded-lg text-center hover:opacity-70 cursor-pointer"
                                    onClick={clearFilterAll}>
                                    CLEAR ALL
                                </div>
                            </div>
                        )}
                    </Drawer>
                </ThemeProvider>
            </div>
        </>
    )
}
