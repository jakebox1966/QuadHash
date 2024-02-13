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
import NFTDetailModalComponent from './NFTDetialModalComponent'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { getMetadata } from '@/app/api/dynamicNFT/api'
import { getAccounts, personalSign } from '@/app/api/wallet/api'
import { updateUserProfileTokenId } from '@/app/api/collector/api'
import { backgroundPallete } from '@/app/[locale]/common/color/colorPalette'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export interface INFTSectionProps {
    updateUserProfile: ({ tokenId, tokenType }: { tokenId: any; tokenType: any }) => Promise<void>
    wallet_address: string
}

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

export default function NFTSection({ updateUserProfile, wallet_address }: INFTSectionProps) {
    const [sazaNfts, setSazaNfts] = React.useState(null)
    const [gazaNfts, setGazaNfts] = React.useState(null)
    const [qbtNfts, setQbtNfts] = React.useState([])
    const [sazaIsLoading, setSazaIsLoading] = React.useState(false)
    const [gazaIsLoading, setGazaIsLoading] = React.useState(false)
    const [qbtIsLoading, setQbtIsLoading] = React.useState(false)
    const [activeTab, setActiveTab] = React.useState('SAZA')
    const [activeNFT, setActiveNFT] = React.useState(null)
    const { data: session } = useSession()

    const { wallet } = useMetaMask()

    const [backgroundColor, setBackgroundColor] = React.useState(null)
    const [metadata, setMetadata] = React.useState(null)
    const [imageUrl, setImageUrl] = React.useState(null)

    const [open, setOpen] = React.useState(false)

    const openDetailModal = async (nft) => {
        setActiveNFT(nft)
        const metadata = await getMetadata({
            nftType: nft.contract.symbol.toLowerCase(),
            tokenId: nft.tokenId,
        })

        setMetadata(metadata)
        setImageUrl(metadata.image)
        const backgroundColor = metadata.attributes.find((item) => {
            return item.trait_type === 'Background'
        })

        setBackgroundColor(backgroundPallete[backgroundColor.value.toLowerCase()])

        handleOpen()
    }

    const handleOpen = React.useCallback(() => {
        setOpen(!open)
    }, [open])

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                if (wallet_address) {
                    setSazaIsLoading(true)
                    setGazaIsLoading(true)
                    setQbtIsLoading(true)
                    // console.log('Start loading data')
                    const sazaNfts = await getNftsForOwner(wallet_address, {
                        contractAddresses: [process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS],
                    })

                    // console.log(sazaNfts)

                    const gazaNfts = await getNftsForOwner(wallet_address, {
                        contractAddresses: [process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS],
                    })

                    // const qbtNfts = await getNftsForOwner(wallet.accounts[0], {
                    //     contractAddresses: [process.env.NEXT_PUBLIC_QBT_CONTRACT_ADDRESS]
                    // })

                    // console.log(gazaNfts)

                    setSazaNfts(sazaNfts.ownedNfts)
                    setGazaNfts(gazaNfts.ownedNfts)

                    setQbtNfts([])

                    setSazaIsLoading(false)
                    setGazaIsLoading(false)
                    setQbtIsLoading(false)
                }
            } catch (error) {
                console.error(error)
                setSazaIsLoading(false)
                setGazaIsLoading(false)
                setQbtIsLoading(false)
            }
        }
        fetchData()
    }, [wallet_address])
    return (
        <>
            <div className="mt-10">
                <div className="text-2xl font-black">Collection</div>

                <Tabs value="SAZA" className="w-full mt-6">
                    <TabsHeader
                        className="bg-transparent p-0 !gap-3"
                        indicatorProps={{
                            className: 'bg-gray-900/10 shadow-none !text-gray-900 w-full p-0 ',
                        }}
                        placeholder={undefined}>
                        {tabData.map((item, index) => (
                            <Tab
                                key={item.label}
                                className="!justify-center !w-full border-2 border-black rounded-lg"
                                value={item.value}
                                onClick={() => setActiveTab(item.value)}
                                placeholder={undefined}>
                                <div className="flex flex-row justify-center items-center gap-2 w-full rounded-md">
                                    <div className="w-[2.5rem] lg:w-[5rem] relative">
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
                        <TabPanel key={'SAZA'} value={'SAZA'} className="pt-3 px-0">
                            {sazaIsLoading && (
                                <div className="relative flex flex-row justify-center items-center gap-[10px] rounded-2xl flex-wrap">
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
                                            onClick={() => {
                                                openDetailModal(saza)
                                            }}
                                        />
                                    ))}
                                </CardList>
                            )}

                            {!sazaIsLoading && sazaNfts && sazaNfts.length === 0 && (
                                <div className="relative flex flex-row justify-start items-center p-10 gap-[10px] rounded-2xl flex-wrap bg-[#131313] text-[#FFFFFF]">
                                    <div className="flex flex-col justify-center items-start gap-2">
                                        <div className="text-4xl font-bold">
                                            YOU DON'T HAVE ANY SAZA.
                                        </div>
                                        <div className="font-bold">
                                            Head over to OPENSEA or KONKRIT to join the QUADHASH
                                        </div>
                                        <div className="flex flex-row gap-3 font-bold">
                                            <div className="bg-[#FFFFFF] text-black rounded-full px-6 py-2 flex flex-row justify-center items-center gap-3">
                                                <div>
                                                    <img src="/opensea.png" alt="" />
                                                </div>
                                                <div>
                                                    <Link
                                                        href={`https://opensea.io/collection/qh-saza`}
                                                        target="_blank">
                                                        OPENSEA
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="bg-[#FFFFFF] text-black rounded-full px-6 py-2 flex flex-row justify-center items-center gap-3">
                                                <div>
                                                    <img src="/konkrit.png" alt="" />
                                                </div>
                                                <div>
                                                    <Link
                                                        href={`https://opensea.io/collection/qh-saza`}
                                                        target="_blank">
                                                        KONKRIT
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </TabPanel>

                        <TabPanel key={'GAZA'} value={'GAZA'} className="pt-3 px-0">
                            {gazaIsLoading && (
                                <div className="relative flex flex-row justify-center items-center gap-[10px] rounded-2xl flex-wrap">
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
                                        <Card
                                            nft={gaza}
                                            key={gaza.name}
                                            onClick={() => {
                                                openDetailModal(gaza)
                                            }}
                                        />
                                    ))}
                                </CardList>
                            )}

                            {!gazaIsLoading && gazaNfts && gazaNfts.length === 0 && (
                                <div className="relative flex flex-row justify-start items-center p-10 gap-[10px] rounded-2xl flex-wrap bg-[#131313] text-[#FFFFFF]">
                                    <div className="flex flex-col justify-center items-start gap-2">
                                        <div className="text-4xl font-bold">
                                            YOU DON'T HAVE ANY GAZA.
                                        </div>
                                        <div className="font-bold">
                                            Head over to OPENSEA or KONKRIT to join the QUADHASH
                                        </div>
                                        <div className="flex flex-row gap-3 font-bold">
                                            <div className="bg-[#FFFFFF] text-black rounded-full px-6 py-2 flex flex-row justify-center items-center gap-3">
                                                <div>
                                                    <img src="/opensea.png" alt="" />
                                                </div>
                                                <Link
                                                    href={`https://opensea.io/collection/qh-gaza`}
                                                    target="_blank">
                                                    OPENSEA
                                                </Link>
                                            </div>
                                            <div className="bg-[#FFFFFF] text-black rounded-full px-6 py-2 flex flex-row justify-center items-center gap-3">
                                                <div>
                                                    <img src="/konkrit.png" alt="" />
                                                </div>
                                                <div>KONKRIT</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </TabPanel>

                        <TabPanel key={'QBT'} value={'QBT'} className="pt-3 px-0">
                            {qbtIsLoading && (
                                <div className="relative flex flex-row justify-center items-center gap-[10px] rounded-2xl flex-wrap">
                                    <div className="rounded-lg blur-md w-full md:w-[calc(100%/2-6px)] lg:w-[calc((100%/4-10px)+(7px/3))]">
                                        <div className="bg-gray-400">
                                            <img src="/1.png" alt="" />
                                        </div>
                                    </div>
                                    <Spinner className="h-24 w-24 absolute" />
                                </div>
                            )}

                            {!qbtIsLoading && qbtNfts && qbtNfts.length > 0 && (
                                <CardList>
                                    {qbtNfts?.map((gaza) => (
                                        <Card nft={gaza} key={gaza.name} onClick={handleOpen} />
                                    ))}
                                </CardList>
                            )}

                            {!qbtIsLoading && qbtNfts && qbtNfts.length === 0 && (
                                <div className="relative flex flex-row justify-start items-center p-10 gap-[10px] rounded-2xl flex-wrap bg-[#131313] text-[#FFFFFF]">
                                    <div className="flex flex-col justify-center items-start gap-2">
                                        <div className="text-4xl font-bold">
                                            YOU DON'T HAVE ANY QBT.
                                        </div>
                                        <div className="font-bold">
                                            Head over to OPENSEA or KONKRIT to join the QUADHASH
                                        </div>
                                        <div className="flex flex-row gap-3 font-bold">
                                            <div className="bg-[#FFFFFF] text-black rounded-full px-6 py-2 flex flex-row justify-center items-center gap-3">
                                                <div>
                                                    <img src="/opensea.png" alt="" />
                                                </div>
                                                <Link
                                                    href={`https://opensea.io/collection/qh-saza`}
                                                    target="_blank">
                                                    OPENSEA
                                                </Link>
                                            </div>
                                            <div className="bg-[#FFFFFF] text-black rounded-full px-6 py-2 flex flex-row justify-center items-center gap-3">
                                                <div>
                                                    <img src="/konkrit.png" alt="" />
                                                </div>
                                                <div>KONKRIT</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </div>
            {activeNFT && (
                <NFTDetailModalComponent
                    open={open}
                    metadata={metadata}
                    imageUrl={imageUrl}
                    backgroundColor={backgroundColor}
                    activeNFT={activeNFT}
                    handleOpen={handleOpen}
                    updateUserProfile={updateUserProfile}
                />
            )}
        </>
    )
}
