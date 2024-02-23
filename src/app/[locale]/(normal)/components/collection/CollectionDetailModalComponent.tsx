'use client'
import * as React from 'react'
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Typography,
    ThemeProvider,
} from '@material-tailwind/react'
import Image from 'next/image'
import { customTheme } from '@/app/[locale]/common/materialUI/theme'
import { formatAddress } from '@/app/utils/ethUtils'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'
import { getOwnerForNft } from '@/app/api/alchemy/api'

export interface ICollectionDetailModalComponentProps {
    // activeNFT: any
    burtonMorris: boolean
    contractAddress: string
    selectedTokenId: string
    metadata?: any
    imageUrl?: string
    backgroundColor?: string
    open?: boolean
    handleOpen?: () => void
}
const { Link } = createSharedPathnamesNavigation({ locales })

export default function CollectionDetailModalComponent({
    // activeNFT,
    contractAddress,
    selectedTokenId,
    metadata,
    imageUrl,
    backgroundColor,
    open,
    handleOpen,
    burtonMorris,
}: ICollectionDetailModalComponentProps) {
    const [owner, setOwner] = React.useState(null)

    const getOwner = async () => {
        await getOwnerForNft(contractAddress, selectedTokenId)
            .then((response) => {
                console.log(response)

                if (parseInt(response.owners[0], 16) === 0) {
                    console.log(123)
                    setOwner(null)
                    return
                }

                setOwner(response.owners[0])
            })
            .catch((error) => {
                console.error(error)
            })
    }
    React.useEffect(() => {
        if (contractAddress && selectedTokenId) {
            getOwner()
        }
        return () => {
            setOwner(null)
        }
    }, [contractAddress, selectedTokenId])
    return (
        <>
            <ThemeProvider value={customTheme}>
                <Dialog
                    className={`rounded-lg overflow-hidden ${burtonMorris ? '!min-w-fit' : ''}`}
                    size="lg"
                    open={open}
                    handler={handleOpen}
                    placeholder={undefined}
                    style={{ backgroundColor: backgroundColor }}>
                    <DialogBody
                        className="p-0 overflow-hidden flex lg:flex-row justify-center"
                        placeholder={undefined}>
                        {/* <div className="absolute flex flex-col gap-3 bg-opacity-20 bg-black rounded-lg p-4 top-0 left-0 lg:hidden z-10">
                            {metadata?.attributes.map((item) => (
                                <PartTooltipComponent
                                    key={item.trait_type}
                                    partKey={item.trait_type}
                                    partValue={item.value}
                                    partIcon={checkPartIcon(item.trait_type)}
                                />
                            ))}
                        </div> */}
                        {/* <div className="absolute bottom-0 text-white font-black right-0 z-30 bg-opacity-20 bg-black p-3 rounded-lg lg:hidden cursor-pointer">
                            메인 NFT로 설정하기
                        </div> */}
                        <div className="max-w-[581px] flex flex-col justify-end items-center lg:items-start relative overflow-hidden">
                            {/* <Image
                                src={imageUrl}
                                alt="profile_image"
                                width={650}
                                height={650}
                                quality={100}
                            /> */}

                            <img src={imageUrl} alt="profile_image" width="100%" height="auto" />
                        </div>
                        {!burtonMorris && (
                            <div
                                className={`text-white w-[calc(100%-650px)] mt-3 lg:flex flex-col justify-start items-start hidden`}>
                                <div className="flex flex-row flex-wrap gap-4 pl-10 justify-start items-center">
                                    <div className="flex w-[calc(100%/2-4rem)] flex-col justify-center font-bold p-2">
                                        <div className="text-[11.81px]">
                                            {metadata?.name.split(':')[0].trim()}
                                        </div>
                                        <div className="text-[25px]">
                                            {metadata?.name.split(':')[1].trim()}
                                        </div>
                                    </div>
                                    <div className="w-[calc(100%/2-4rem)] flex flex-row justify-between"></div>

                                    {metadata?.attributes
                                        .filter((item, index) => index !== 0)
                                        .map((item) => (
                                            <div
                                                key={item.trait_type}
                                                className="w-[calc(100%/2-4rem)] flex flex-row items-center gap-3 p-2 pl-4 bg-opacity-20 bg-black rounded-lg">
                                                <div>
                                                    <div className="text-[10.85px]">
                                                        {item.trait_type !== 'Dcount'
                                                            ? item.trait_type.toUpperCase()
                                                            : 'Dynamic NFT'}
                                                    </div>
                                                    <div className="font-black text-[11.81px]">
                                                        {item.value}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    <div className="w-[calc(100%/2-4rem)] flex flex-row items-center gap-3 p-2 pl-4 bg-opacity-20 bg-black rounded-lg">
                                        <div>
                                            <div className="text-[10.85px]">
                                                {metadata?.attributes[0].trait_type}
                                            </div>
                                            <div className="font-black text-[11.81px]">
                                                {metadata?.attributes[0].value}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {owner && (
                                    <div className="pl-10 mt-4 font-medium">
                                        <Link
                                            href={`/collector/${owner}`}
                                            className="flex gap-4 justify-start items-center hover:opacity-70 cursor-pointer group">
                                            <div className="group-hover:translate-x-2 transition-all">
                                                <svg
                                                    width="40"
                                                    height="40"
                                                    viewBox="0 0 40 41"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <circle
                                                        cx="20"
                                                        cy="20.5"
                                                        r="19.5"
                                                        transform="rotate(-90 20 20.5)"
                                                        stroke="white"
                                                    />
                                                    <g clipPath="url(#clip0_639_242601)">
                                                        <path
                                                            d="M24.172 19.5002H12V21.5002H24.172L18.808 26.8642L20.222 28.2782L28 20.5002L20.222 12.7222L18.808 14.1362L24.172 19.5002Z"
                                                            fill="white"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_639_242601">
                                                            <rect
                                                                width="24"
                                                                height="24"
                                                                fill="white"
                                                                transform="matrix(-1 0 0 1 32 8.5)"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>

                                            <div className="text-[9.4px]">
                                                <div>OWNER</div>
                                                <div className="text-[13px] font-black">
                                                    {owner && formatAddress(owner)}
                                                </div>
                                                <div>CLICK TO DISCOVER</div>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </DialogBody>
                </Dialog>
            </ThemeProvider>
        </>
    )
}
