'use client'
import * as React from 'react'
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Spinner } from '@material-tailwind/react'
import CardList from '../../../common/components/CardList'
import Card from '../../../common/components/Card'
import { getNftsForOwner } from '@/app/api/alchemy/api'
import { locales } from '@/i18nconfig'

import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export interface IDynamicNFTListProps {
    setSelectedNft?: React.Dispatch<any>
    setCategoires: React.Dispatch<any>
    handleOpen?: () => void
    setMetaData?: React.Dispatch<any>
}

type lastpage = {
    page: number
    total_pages: number
}

const data = [
    {
        label: 'SAZA',
        value: 'SAZA',
    },
    {
        label: 'GAZA',
        value: 'GAZA',
    },
]

export default function DynamicNFTList({
    setSelectedNft,
    setCategoires,
    handleOpen,
    setMetaData,
}: IDynamicNFTListProps) {
    const { Link } = createSharedPathnamesNavigation({ locales })
    const [sazaNfts, setSazaNfts] = React.useState(null)
    const [gazaNfts, setGazaNfts] = React.useState(null)
    const [sazaIsLoading, setSazaIsLoading] = React.useState(false)
    const [gazaIsLoading, setGazaIsLoading] = React.useState(false)
    const [activeTab, setActiveTab] = React.useState('SAZA')

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setSazaIsLoading(true)
                setGazaIsLoading(true)
                console.log('Start loading data')
                const sazaNfts = await getNftsForOwner(window.ethereum.selectedAddress, {
                    contractAddresses: [process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS],
                })

                const gazaNfts = await getNftsForOwner(window.ethereum.selectedAddress, {
                    contractAddresses: [process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS],
                })

                console.log(sazaNfts)

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

    React.useEffect(() => {
        console.log(open)
    }, [open])
    return (
        <>
            <div className="flex flex-col justify-center items-center gap-10 w-full px-10 mt-3 rounded-lg">
                {/* <div className="flex flex-row justify-start items-center w-full">
                    <div className="font-black text-4xl">DYNAMIC NFT</div>
                </div> */}

                <Tabs value="SAZA" className="w-full">
                    <TabsHeader
                        className="bg-transparent"
                        indicatorProps={{
                            className: 'bg-gray-900/10 shadow-none !text-gray-900',
                        }}
                        placeholder={undefined}>
                        <Tab
                            value={'SAZA'}
                            onClick={() => setActiveTab('SAZA')}
                            placeholder={undefined}>
                            <svg
                                width="70"
                                height="25"
                                viewBox="0 0 70 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.5 2.82812L14.6562 8.14062L8.10938 6.60938L15.5 17.5781L12.0469 24.5L1.04688 23L0.828125 16.8906L7.78125 18.0625L0.578125 6.375L5.15625 0.109375L15.5 2.82812ZM23.2031 19.7344L22.3125 23L16.1406 22.9375L22.8438 0.390625L30.5938 0.578125L35.5781 23.1094L29.0781 23.0625L28.4844 20.0625L23.2031 19.7344ZM27.2344 13.8125L26.2031 8.65625L24.8281 13.7188L27.2344 13.8125ZM43.1875 16.9688L49.875 17.1094L50.0625 23.2812L35.8125 22.8125L35.875 16.8281L42.6562 6.9375H35.9375L35.9844 0.671875L49.8594 0.65625L49.9375 6.9375L43.1875 16.9688ZM57.5156 19.7344L56.625 23L50.4531 22.9375L57.1562 0.390625L64.9062 0.578125L69.8906 23.1094L63.3906 23.0625L62.7969 20.0625L57.5156 19.7344ZM61.5469 13.8125L60.5156 8.65625L59.1406 13.7188L61.5469 13.8125Z"
                                    fill={activeTab === 'SAZA' ? '#FFCD19' : '#AEAEAE'}
                                />
                            </svg>
                        </Tab>
                        <Tab
                            value={'GAZA'}
                            onClick={() => setActiveTab('GAZA')}
                            placeholder={undefined}>
                            <svg
                                width="73"
                                height="25"
                                viewBox="0 0 73 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M17.8281 20.9219L8.73438 24.9219L0.90625 20.6875L1 4.96875L9.20312 0.890625L17.0781 5.04688L17.25 8.1875L11.125 9.26562L11.1094 8.17188L8.96875 7.34375L7.32812 8.51562L6.89062 17.6719L8.96875 18.4688L11.1562 16.9062V15.4375H8.98438L8.64062 10.7188L17.4688 10.5469L17.8281 20.9219ZM25.3281 20.7344L24.4375 24L18.2656 23.9375L24.9688 1.39062L32.7188 1.57812L37.7031 24.1094L31.2031 24.0625L30.6094 21.0625L25.3281 20.7344ZM29.3594 14.8125L28.3281 9.65625L26.9531 14.7188L29.3594 14.8125ZM45.3125 17.9688L52 18.1094L52.1875 24.2812L37.9375 23.8125L38 17.8281L44.7812 7.9375H38.0625L38.1094 1.67188L51.9844 1.65625L52.0625 7.9375L45.3125 17.9688ZM59.6406 20.7344L58.75 24L52.5781 23.9375L59.2812 1.39062L67.0312 1.57812L72.0156 24.1094L65.5156 24.0625L64.9219 21.0625L59.6406 20.7344ZM63.6719 14.8125L62.6406 9.65625L61.2656 14.7188L63.6719 14.8125Z"
                                    fill={activeTab === 'GAZA' ? '#FFCD19' : '#AEAEAE'}
                                />
                            </svg>
                        </Tab>
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
                                        <Card
                                            nft={saza}
                                            key={saza.name}
                                            setSelectedNft={setSelectedNft}
                                            setCategoires={setCategoires}
                                            setMetaData={setMetaData}
                                            handleOpen={handleOpen}
                                        />
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

                            {!gazaIsLoading && gazaNfts && gazaNfts.length === 0 && (
                                <div className="relative flex flex-row justify-center items-center border-4 p-5 gap-[10px] rounded-2xl flex-wrap">
                                    <div>You dont have any NFT in your account.</div>
                                </div>
                            )}

                            <CardList>
                                {gazaNfts?.map((gaza) => (
                                    <Card
                                        nft={gaza}
                                        key={gaza.name}
                                        setSelectedNft={setSelectedNft}
                                        setCategoires={setCategoires}
                                        setMetaData={setMetaData}
                                        handleOpen={handleOpen}
                                    />
                                ))}
                            </CardList>
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </div>
        </>
    )
}
