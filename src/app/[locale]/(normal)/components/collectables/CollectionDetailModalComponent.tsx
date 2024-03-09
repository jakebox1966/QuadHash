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
import { customTheme, dialogTheme } from '@/app/[locale]/common/materialUI/theme'
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

    const getOwner = async () => {
        await getOwnerForNft(contractAddress, selectedTokenId)
            .then((response) => {
                if (parseInt(response.owners[0], 16) === 0) {
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

    React.useEffect(() => {
        console.log(backgroundColor)
    }, [backgroundColor])
    return (
        <>
            {imageUrl && (
                <ThemeProvider value={dialogTheme}>
                    <Dialog
                        open={open}
                        handler={handleOpen}
                        className={`rounded-lg relative overflow-hidden`}
                        style={{
                            backgroundColor: backgroundColor,
                        }}
                        placeholder={undefined}
                        size="lg">
                        <DialogBody
                            placeholder={undefined}
                            className={`p-0 rounded-lg overflow-hidden ${
                                backgroundColor === '#FFFFFF' ? '!text-black' : '!text-[#FFFFFF]'
                            }`}>
                            <div className={`flex flex-col lg:flex-row items-start w-full`}>
                                <div className="max-w-[350px] lg:max-w-[581px] lg:max-h-[581px] w-full h-full">
                                    <img src={imageUrl} alt="" />

                                    {/* MOBILE 버전 */}
                                    <div className={`block lg:hidden w-full relative mt-4 px-4`}>
                                        <div className="flex flex-row justify-between items-center max-h-[50px]">
                                            <div className="leading-[25px]">
                                                <div className="text-[12px] font-medium tracking-[0.05rem]">
                                                    QUADHASH
                                                </div>
                                                <div className="text-[24px] font-black tracking-[0.05rem]">
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
                                                                        backgroundColor ===
                                                                        '#FFFFFF'
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
                                                            <div>OWNER</div>
                                                            <div className="text-[13px] font-black">
                                                                {formatAddress(owner).toUpperCase()}
                                                            </div>
                                                            <div>GO TO PROFILE</div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                        <div className="my-[28px]">
                                            <Swiper
                                                slidesPerView={1}
                                                spaceBetween={-30}
                                                pagination={{
                                                    clickable: true,
                                                }}
                                                modules={[Pagination]}>
                                                {metadata?.attributes
                                                    .filter((item, index) => index !== 0)
                                                    .map((item, index) => (
                                                        <SwiperSlide>
                                                            <div className="bg-opacity-20 bg-black w-[80%] px-2 py-1 pl-4 rounded-md">
                                                                <div className="text-[12px] tracking-[0.56px]">
                                                                    {item.trait_type.toUpperCase()}
                                                                </div>
                                                                <div className="font-black text-[14px]">
                                                                    {item.value}
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                    ))}
                                                <SwiperSlide>
                                                    <div className="bg-opacity-20 bg-black w-[80%] px-2 py-1 pl-4 rounded-md">
                                                        <div className="text-[12px] tracking-[0.56px]">
                                                            {metadata?.attributes[0].trait_type.toUpperCase()}
                                                        </div>
                                                        <div className="font-black text-[14px]">
                                                            {metadata?.attributes[0].value}
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            </Swiper>
                                        </div>
                                    </div>
                                </div>
                                {/* PC 버전 */}
                                <div className="w-[calc(100%-581px)] mx-[25px] hidden lg:flex flex-col justify-start items-start pt-[15px]">
                                    <div className="max-w-[550px]">
                                        <div className="w-full font-[700] leading-[25px]">
                                            <div className="text-[12px]">QUADHASH</div>
                                            <div className="text-[25px]">
                                                {metadata?.name.split(':')[1].trim()}
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-between mt-[15px] flex-wrap gap-4">
                                            {metadata?.attributes
                                                .filter((item, index) => index !== 0)
                                                .map((item) => (
                                                    <div className="bg-opacity-10 bg-black rounded-md p-[8px] text-[12px] max-w-[250px] w-full">
                                                        <div className="tracking-[0.56px]">
                                                            {item.trait_type.toUpperCase()}
                                                        </div>
                                                        <div className="font-[700]">
                                                            {item.value}
                                                        </div>
                                                    </div>
                                                ))}
                                            <div className="bg-opacity-10 bg-black rounded-md p-[8px] text-[12px] max-w-[250px] w-full">
                                                <div className="tracking-[0.56px]">
                                                    {metadata?.attributes[0].trait_type.toUpperCase()}
                                                </div>
                                                <div className="font-[700]">
                                                    {metadata?.attributes[0].value}
                                                </div>
                                            </div>
                                        </div>
                                        {owner && (
                                            <div className="font-medium absolute bottom-5">
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
                                                        <div>OWNER</div>
                                                        <div className="text-[13px] font-black">
                                                            {formatAddress(owner).toUpperCase()}
                                                        </div>
                                                        <div>GO TO PROFILE</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </DialogBody>
                    </Dialog>
                </ThemeProvider>
            )}
        </>
    )
}
