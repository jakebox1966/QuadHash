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
import { sazaPartList } from '@/app/[locale]/parts_data/parts'
export interface IFilterComponentProps {
    handlePartParam: any
    searchNFT: () => void
    searchInput: string
    setSearchInput: React.Dispatch<React.SetStateAction<string>>
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
    searchNFT,
    handlePartParam,
    searchInput,
    setSearchInput,
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
                        onChange={onChange}
                    />
                    <Button
                        onClick={searchNFT}
                        className="text-center p-2 rounded-lg w-full text-[#FFFFFF] bg-[#F46221]"
                        placeholder={undefined}>
                        SEARCH
                    </Button>
                </div>

                <div className="flex flex-row items-center gap-6 text-sm font-medium bg-[#FFCD19]/25 py-4 px-3 w-full">
                    <div>
                        <Image src={logoShort} alt={'logo_short'} />
                    </div>
                    <div>BURTON MORRIS VER</div>

                    <Switch
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
                <div className="w-full">
                    {sazaPartList.map((item, index) => (
                        <Accordion
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
                                        className="text-black font-medium py-3 px-10"
                                        onClick={() =>
                                            handlePartParam(item.part_category, partName)
                                        }>
                                        {partName.toUpperCase()}
                                    </div>
                                ))}
                            </AccordionBody>
                        </Accordion>
                    ))}
                </div>
            </div>
            <div className="flex lg:hidden flex-col justify-center items-center w-full">
                <div className="flex flex-row justify-center items-center w-full px-[16px] gap-2">
                    <ThemeProvider value={theme}>
                        <div className="!text-xs !min-w-[80px] w-full">
                            <Select label="Type" placeholder={undefined}>
                                <Option>SAZA</Option>
                                <Option>GAZA</Option>
                            </Select>
                        </div>
                    </ThemeProvider>
                    <div className="flex flex-row text-[10px] justify-center items-center w-full">
                        <div className="flex flex-row items-center gap-2 w-full justify-center">
                            <Image src={logoShort} width={18} height={18} alt={'logo_short'} />
                            <div>BURTON MORRIS</div>
                        </div>
                    </div>
                    <ThemeProvider value={theme}>
                        <div className="!text-xs !min-w-[80px] w-full">
                            <Select label="option" placeholder={undefined}>
                                <Option>SAZA</Option>
                                <Option>GAZA</Option>
                            </Select>
                        </div>
                    </ThemeProvider>
                </div>

                <div className="w-full h-full relative mt-4 px-[16px]">
                    <input
                        type="text"
                        className="pl-7 w-full h-full border-2 p-2 rounded-lg"
                        placeholder="Search"
                    />
                    <img src="/search.svg" alt="search" className="absolute left-7 top-3" />
                </div>
            </div>
        </>
    )
}
