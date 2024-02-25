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
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

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

    console.log(backgroundColor)

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
                    className={`!max-w-fit rounded-lg overflow-hidden relative `}
                    size="lg"
                    open={open}
                    handler={handleOpen}
                    placeholder={undefined}
                    style={{ backgroundColor: backgroundColor }}>
                    <DialogBody
                        className={`p-0 flex lg:flex-row justify-center group !relative ${
                            backgroundColor === '#FFFFFF' ? '!text-black' : '!text-[#FFFFFF]'
                        }`}
                        placeholder={undefined}>
                        {burtonMorris && (
                            <>
                                <img
                                    src="/frame.png"
                                    alt="frame"
                                    className="absolute group-hover:z-[9999]"
                                />

                                <div className="absolute w-full group-hover:z-[9999] flex flex-col justify-center items-center text-black font-medium top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
                                    <div className="font-black text-[36px]">BURTON MORRIS</div>
                                    <div className="text-[36px]">
                                        {metadata?.name.split(':')[1].trim()}
                                    </div>
                                    {owner && (
                                        <>
                                            <div className="font-black text-[25px]">OWNER</div>
                                            <div className="text-[25px]">
                                                {owner && formatAddress(owner)}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                        <div
                            className={`max-w-[350px] lg:max-w-[581px] ${
                                burtonMorris && 'p-3 group-hover:blur-md'
                            } max-h-[581px] w-full h-full flex flex-col justify-end items-center lg:items-start overflow-hidden`}>
                            <img
                                src={imageUrl}
                                alt="profile_image"
                                className={` ${
                                    burtonMorris && 'group-hover:blur-sm group-hover:opacity-60'
                                } max-w-[581px] w-full`}
                            />
                            {!burtonMorris && (
                                <div className="lg:hidden flex flex-col w-full px-5 py-3 justify-center mt-5">
                                    <div className="flex flex-row justify-between items-center max-h-[50px]">
                                        <div>
                                            <div className="text-[12px] font-medium">QUADHASH</div>
                                            <div className="text-[24px] font-black">
                                                {metadata?.name.split(':')[1].trim()}
                                            </div>
                                        </div>

                                        {owner && (
                                            <div className="font-medium">
                                                <Link
                                                    href={`/collector/${owner}`}
                                                    className="flex gap-4 justify-start items-center hover:opacity-70 cursor-pointer group/owner">
                                                    <div className="group-hover/owner:translate-x-2 transition-all">
                                                        <svg
                                                            className={`
                                                            ${
                                                                backgroundColor === '#FFFFFF'
                                                                    ? '!text-black'
                                                                    : '!text-[#FFFFFF]'
                                                            }`}
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
                                                                stroke={`${
                                                                    backgroundColor === '#FFFFFF'
                                                                        ? 'black'
                                                                        : 'white'
                                                                }`}
                                                            />
                                                            <g clipPath="url(#clip0_639_242601)">
                                                                <path
                                                                    d="M24.172 19.5002H12V21.5002H24.172L18.808 26.8642L20.222 28.2782L28 20.5002L20.222 12.7222L18.808 14.1362L24.172 19.5002Z"
                                                                    fill={`${
                                                                        backgroundColor ===
                                                                        '#FFFFFF'
                                                                            ? 'black'
                                                                            : 'white'
                                                                    }`}
                                                                />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_639_242601">
                                                                    <rect
                                                                        width="24"
                                                                        height="24"
                                                                        fill={`${
                                                                            backgroundColor ===
                                                                            '#FFFFFF'
                                                                                ? 'black'
                                                                                : 'white'
                                                                        }`}
                                                                        transform="matrix(-1 0 0 1 32 8.5)"
                                                                    />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>

                                                    <div className="text-[9.4px]">
                                                        {owner && (
                                                            <>
                                                                <div>OWNER</div>
                                                                <div className="text-[13px] font-black">
                                                                    {formatAddress(owner)}
                                                                </div>
                                                                <div>CLICK TO DISCOVER</div>
                                                            </>
                                                        )}
                                                    </div>
                                                </Link>
                                            </div>
                                        )}
                                    </div>

                                    <div className="w-full relative mt-4">
                                        <Swiper
                                            slidesPerView={1}
                                            spaceBetween={-30}
                                            pagination={{
                                                clickable: true,
                                            }}
                                            modules={[Pagination]}>
                                            {metadata?.attributes
                                                .filter((item, index) => index !== 0)
                                                .map((item) => (
                                                    <SwiperSlide>
                                                        <div className="bg-opacity-20 bg-black w-[80%] px-2 py-1 pl-4 rounded-md">
                                                            <div className="text-[10.85px]">
                                                                {item.trait_type !== 'Dcount'
                                                                    ? item.trait_type.toUpperCase()
                                                                    : 'Dynamic NFT'}
                                                            </div>
                                                            <div className="font-black text-[11.81px]">
                                                                {item.value}
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                            <SwiperSlide>
                                                <div className="bg-opacity-20 bg-black w-[80%] px-2 py-1 pl-4 rounded-md">
                                                    <div className="text-[10.85px]">
                                                        {metadata?.attributes[0].trait_type}
                                                    </div>
                                                    <div className="font-black text-[11.81px]">
                                                        {metadata?.attributes[0].value}
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        </Swiper>
                                    </div>
                                </div>
                            )}
                        </div>
                        {!burtonMorris && (
                            <div
                                className={`w-[calc(100%-581px)] lg:flex flex-col justify-start py-3 items-start hidden`}>
                                <div className="flex flex-row flex-wrap gap-4 max-w-[550px] justify-start items-center pl-10">
                                    <div className="flex w-[calc(100%/2-4rem)] min-w-[250px] flex-col justify-center font-bold p-2">
                                        <div className="text-[11.81px]">
                                            {metadata?.name.split(':')[0].trim()}
                                        </div>
                                        <div className="text-[25px]">
                                            {metadata?.name.split(':')[1].trim()}
                                        </div>
                                    </div>
                                    <div className="w-[calc(100%/2-4rem)] flex flex-row justify-center"></div>

                                    {metadata?.attributes
                                        .filter((item, index) => index !== 0)
                                        .map((item) => (
                                            <div
                                                key={item.trait_type}
                                                className="w-[calc(100%/2-4rem)] max-w-[250px] flex flex-row items-center gap-3 p-2 pl-4 bg-opacity-20 bg-black rounded-lg">
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
                                    <div className="mt-4 font-medium pl-10">
                                        <Link
                                            href={`/collector/${owner}`}
                                            className="flex gap-4 justify-start items-center hover:opacity-70 cursor-pointer group/owner">
                                            <div className="group-hover/owner:translate-x-2 transition-all">
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
                                                        stroke={`${
                                                            backgroundColor === '#FFFFFF'
                                                                ? 'black'
                                                                : 'white'
                                                        }`}
                                                    />
                                                    <g clipPath="url(#clip0_639_242601)">
                                                        <path
                                                            d="M24.172 19.5002H12V21.5002H24.172L18.808 26.8642L20.222 28.2782L28 20.5002L20.222 12.7222L18.808 14.1362L24.172 19.5002Z"
                                                            fill={`${
                                                                backgroundColor === '#FFFFFF'
                                                                    ? 'black'
                                                                    : 'white'
                                                            }`}
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_639_242601">
                                                            <rect
                                                                width="24"
                                                                height="24"
                                                                fill={`${
                                                                    backgroundColor === '#FFFFFF'
                                                                        ? 'black'
                                                                        : 'white'
                                                                }`}
                                                                transform="matrix(-1 0 0 1 32 8.5)"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>

                                            <div className="text-[9.4px]">
                                                <div>OWNER</div>
                                                <div className="text-[13px] font-black">
                                                    {formatAddress(owner)}
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
