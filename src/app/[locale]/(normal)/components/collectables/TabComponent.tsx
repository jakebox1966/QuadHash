'use client'
import Image from 'next/image'
import * as React from 'react'
import { Fragment } from 'react'
import mypage_saza_icon from '/public/mypage_saza_icon.svg'
import mypage_gaza_icon from '/public/mypage_gaza_icon.svg'
import mypage_qbt_icon from '/public/mypage_qbt_icon.svg'
import { Select, Option } from '@material-tailwind/react'
import { Listbox, Transition } from '@headlessui/react'
import { IQueryParam } from '../../containers/CollectionContainer'

export interface ITabComponentProps {
    handleNftTypeParam: (nftType: any) => void
    handleOptionParam: (option: any) => void
    queryParam: IQueryParam
    burtonMorris: boolean
}

const optionList = [
    { name: 'Token: Low To High', value: 'number/asc' },
    { name: 'Token: High To Low', value: 'number/desc' },
    { name: 'Rank: Top To Bottom', value: 'ranking/asc' },
    { name: 'Rank: Bottom To Top', value: 'ranking/desc' },
]

export default function TabComponent({
    handleNftTypeParam,
    handleOptionParam,
    queryParam,
    burtonMorris,
}: ITabComponentProps) {
    const [selected, setSelected] = React.useState(optionList[0])

    React.useEffect(() => {
        setSelected(optionList[0])
    }, [burtonMorris])

    return (
        <div className="hidden lg:flex flex-row justify-start items-center gap-[21.31px] w-full">
            <div
                className={`${
                    queryParam.token_type === 'saza' ? 'bg-[#FFCD19]' : ''
                } border-2 rounded-[15px] px-1 py-1 w-[calc(100%/3)] cursor-pointer tansition-all hover:bg-[#FFCD19]`}
                onClick={() => {
                    handleNftTypeParam('saza')
                }}>
                <div className={`flex flex-row items-center gap-[12px]`}>
                    <Image src={mypage_saza_icon} alt="saza_icon" width={30} height={30} />
                    <div className="tracking-[0.8px] text-[16px]">SAZA</div>
                </div>
            </div>
            <div
                className={`${
                    queryParam.token_type === 'gaza' ? 'bg-[#FFCD19]' : ''
                } border-2 rounded-[15px] px-1 py-1 w-[calc(100%/3)] cursor-pointer tansition-all hover:bg-[#FFCD19]`}
                onClick={() => {
                    handleNftTypeParam('gaza')
                }}>
                <div className="flex flex-row items-center gap-[12px]">
                    <Image src={mypage_gaza_icon} alt="gaza_icon" width={30} height={30} />
                    <div className="tracking-[0.8px] text-[16px]">GAZA</div>
                </div>
            </div>

            <div
                className={`w-[calc(100%/3)] font-Poppins_semiBold z-20 ${
                    !burtonMorris ? 'visible' : 'invisible'
                }`}>
                <Listbox
                    value={selected.value}
                    onChange={(value) => {
                        const selected = optionList.find((item) => {
                            if (item.value === value) {
                                return true
                            }
                        })
                        setSelected(selected)
                        handleOptionParam(value)
                    }}>
                    {({ open }) => (
                        <div className="relative">
                            <Listbox.Button className="relative w-full rounded-[15px] bg-white py-1 px-3 text-left border-2 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm hover:bg-[#FFCD19]">
                                <span className="truncate flex flex-row justify-between items-center font-medium leading-[30px] ">
                                    {selected.name}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className={`${
                                            open && 'rotate-180'
                                        } h-5 w-5 transition-transform`}>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                        />
                                    </svg>
                                </span>
                            </Listbox.Button>
                            {open && (
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0">
                                    <Listbox.Options
                                        static
                                        className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        {optionList.map((item, index) => (
                                            <Listbox.Option
                                                key={item.value}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active
                                                            ? 'bg-[#F46221] text-[#FFFFFF]'
                                                            : 'text-gray-900'
                                                    }`
                                                }
                                                value={item.value}>
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${
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
                            )}
                        </div>
                    )}
                </Listbox>
            </div>
            {/* )} */}
        </div>
    )
}
