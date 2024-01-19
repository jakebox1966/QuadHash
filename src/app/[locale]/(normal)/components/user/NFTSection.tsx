'use client'

import * as React from 'react'
import CardList from './CardList'
import Card from './Card'
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Spinner } from '@material-tailwind/react'
import { getNftsForOwner } from '@/app/api/alchemy/api'
import Image from 'next/image'
import mypage_saza_icon from '/public/mypage_saza_icon.svg'
import mypage_gaza_icon from '/public/mypage_gaza_icon.svg'
import mypage_qbt_icon from '/public/mypage_qbt_icon.svg'

export interface INFTSectionProps {}

const tabData = [
    {
        label: 'SAZA',
        value: 'SAZA',
    },
    {
        label: 'GAZA',
        value: 'GAZA',
    },
    {
        label: 'QBT',
        value: 'QBT',
    },
]

export default function NFTSection(props: INFTSectionProps) {
    const [sazaNfts, setSazaNfts] = React.useState(null)
    const [gazaNfts, setGazaNfts] = React.useState(null)
    const [sazaIsLoading, setSazaIsLoading] = React.useState(false)
    const [gazaIsLoading, setGazaIsLoading] = React.useState(false)
    const [activeTab, setActiveTab] = React.useState('SAZA')
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => {
        setOpen(!open)
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setSazaIsLoading(true)
                setGazaIsLoading(true)
                console.log('Start loading data')
                const sazaNfts = await getNftsForOwner(window.ethereum.selectedAddress, {
                    contractAddresses: [process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS],
                })

                console.log(sazaNfts)

                const gazaNfts = await getNftsForOwner(window.ethereum.selectedAddress, {
                    contractAddresses: [process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS],
                })

                setSazaNfts(sazaNfts.ownedNfts)
                setGazaNfts(gazaNfts.ownedNfts)
                setSazaIsLoading(false)
                setGazaIsLoading(false)
            } catch (error) {
                console.error(error)
                setSazaIsLoading(false)
                setGazaIsLoading(false)
            }
        }
        fetchData()
    }, [])
    return (
        <div className="px-5 lg:px-28 mt-10">
            <div className="text-2xl font-black">Collection</div>

            <Tabs value="SAZA" className="w-full mt-6">
                <TabsHeader
                    className="bg-transparent"
                    indicatorProps={{
                        className: 'bg-gray-900/10 shadow-none !text-gray-900',
                    }}
                    placeholder={undefined}>
                    {tabData.map((item, index) => (
                        <Tab
                            className="!justify-start !w-full p-3 border-2 border-black ml-2 rounded-lg"
                            value={item.value}
                            onClick={() => setActiveTab(item.value)}
                            placeholder={undefined}>
                            <div className="flex flex-row justify-center items-center gap-2 w-full rounded-md">
                                <div className="w-[2.5rem] lg:w-[5rem]">
                                    {item.value === 'SAZA' && (
                                        <Image
                                            src={mypage_saza_icon}
                                            alt="saza_icon"
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                        />
                                    )}

                                    {item.value === 'GAZA' && (
                                        <Image
                                            src={mypage_gaza_icon}
                                            alt="gaza_icon"
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                        />
                                    )}
                                    {item.value === 'QBT' && (
                                        <Image
                                            src={mypage_qbt_icon}
                                            alt="qbt_icon"
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                        />
                                    )}
                                </div>
                                <div className="text-[0.7rem] lg:text-xl font-black">
                                    {item.value} NFT
                                </div>
                            </div>
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody placeholder={undefined}>
                    <TabPanel key={'SAZA'} value={'SAZA'} className="p-1 pt-3">
                        {sazaIsLoading && (
                            <div className="relative flex flex-row justify-center items-center border-4 p-5 gap-[10px] rounded-2xl flex-wrap">
                                <div className="rounded-lg blur-md w-full md:w-[calc(100%/2-6px)] lg:w-[calc((100%/4-10px)+(7px/3))]">
                                    <div className="bg-gray-400">
                                        <img src="/1.png" alt="" />
                                    </div>
                                </div>
                                <Spinner className="h-24 w-24 absolute" />
                            </div>
                        )}

                        {!sazaIsLoading && sazaNfts && sazaNfts.length > 0 && (
                            <CardList>
                                {sazaNfts?.map((saza) => (
                                    <Card nft={saza} key={saza.name} handleOpen={handleOpen} />
                                ))}
                            </CardList>
                        )}
                        {!sazaIsLoading && sazaNfts && sazaNfts.length === 0 && (
                            <div className="relative flex flex-row justify-center items-center border-4 p-5 gap-[10px] rounded-2xl flex-wrap">
                                <div>You dont have any NFT in your account.</div>
                            </div>
                        )}
                    </TabPanel>

                    <TabPanel key={'GAZA'} value={'GAZA'} className="p-1 pt-3">
                        {gazaIsLoading && (
                            <div className="relative flex flex-row justify-center items-center border-4 p-5 gap-[10px] rounded-2xl flex-wrap">
                                <div className="rounded-lg blur-md w-full md:w-[calc(100%/2-6px)] lg:w-[calc((100%/4-10px)+(7px/3))]">
                                    <div className="bg-gray-400">
                                        <img src="/1.png" alt="" />
                                    </div>
                                </div>
                                <Spinner className="h-24 w-24 absolute" />
                            </div>
                        )}

                        {!gazaIsLoading && gazaNfts && gazaNfts.length > 0 && (
                            <CardList>
                                {gazaNfts?.map((gaza) => (
                                    <Card nft={gaza} key={gaza.name} handleOpen={handleOpen} />
                                ))}
                            </CardList>
                        )}

                        {!gazaIsLoading && gazaNfts && gazaNfts.length === 0 && (
                            <div className="relative flex flex-row justify-center items-center border-4 p-5 gap-[10px] rounded-2xl flex-wrap">
                                <div>You dont have any NFT in your account.</div>
                            </div>
                        )}
                    </TabPanel>

                    <TabPanel key={'QBT'} value={'QBT'} className="p-1 pt-3">
                        {gazaIsLoading && (
                            <div className="relative flex flex-row justify-center items-center border-4 p-5 gap-[10px] rounded-2xl flex-wrap">
                                <div className="rounded-lg blur-md w-full md:w-[calc(100%/2-6px)] lg:w-[calc((100%/4-10px)+(7px/3))]">
                                    <div className="bg-gray-400">
                                        <img src="/1.png" alt="" />
                                    </div>
                                </div>
                                <Spinner className="h-24 w-24 absolute" />
                            </div>
                        )}

                        {!gazaIsLoading && gazaNfts && gazaNfts.length > 0 && (
                            <CardList>
                                {gazaNfts?.map((gaza) => (
                                    <Card nft={gaza} key={gaza.name} handleOpen={handleOpen} />
                                ))}
                            </CardList>
                        )}

                        {!gazaIsLoading && gazaNfts && gazaNfts.length === 0 && (
                            <div className="relative flex flex-row justify-center items-center border-4 p-5 gap-[10px] rounded-2xl flex-wrap">
                                <div>You dont have any NFT in your account.</div>
                            </div>
                        )}
                    </TabPanel>
                </TabsBody>
            </Tabs>
        </div>
    )
}
