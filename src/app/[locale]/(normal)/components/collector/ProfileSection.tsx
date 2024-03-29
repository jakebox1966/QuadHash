'use client'

export const dynamic = 'force-dynamic'

import { useSession } from 'next-auth/react'
import * as React from 'react'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import NFTSetting from './NFTSetting'
import { backgroundPallete } from '@/app/[locale]/common/color/colorPalette'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import CardLoading from '@/app/[locale]/common/components/CardLoading'
import { copyWalletAddress, formatAddress } from '@/app/utils/ethUtils'
import { ThemeProvider, Tooltip } from '@material-tailwind/react'
import { tooltipTheme } from '@/app/[locale]/common/materialUI/theme'

export interface IProfileSectionProps {
    tokenType: string
    isLoading: boolean
    collector_address: any
    profileNFT: any
    updateUserProfile: ({ tokenId, tokenType }: { tokenId: any; tokenType: any }) => Promise<void>
}

export default function ProfileSection({
    tokenType,
    isLoading,
    collector_address,
    profileNFT,
    updateUserProfile,
}: IProfileSectionProps) {
    const { wallet } = useMetaMask()

    const [toolipMessage, setTooltipMessage] = React.useState('Copy Address')
    const { data: session } = useSession()

    const copy = () => {
        copyWalletAddress(wallet.accounts[0])
        setTooltipMessage('Copied!')
        setTimeout(() => {
            setTooltipMessage('Copy Address')
        }, 1000)
    }

    if (isLoading || !profileNFT) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[716.12px] lg:min-h-[581px]">
                <CardLoading />
            </div>
        )
    }
    if (profileNFT === 'none') {
        let profileNFT
        if (tokenType === 'saza') {
            profileNFT = {
                attributes: [
                    'BACKGROUND',
                    'MANE',
                    'BODY',
                    'HEAD',
                    'EYES',
                    'MOUTH',
                    'HEADWEAR',
                    'EXTRAS',
                    'RANKING',
                ],
                name: '',
            }
        } else if (tokenType === 'gaza') {
            profileNFT = {
                attributes: [
                    'BACKGROUND',
                    'BODY',
                    'TOP',
                    'BOTTOMS',
                    'ONESIE',
                    'EYES',
                    'MOUTH',
                    'HEADWEAR',
                    'EXTRAS',
                    'RANKING',
                ],
            }
        }
        return (
            <>
                <div
                    className={`flex flex-col lg:flex-row items-center lg:items-start w-full relative rounded-lg shadow-lg overflow-hidden bg-[#C4CDE0] text-[#FFFFFF] `}>
                    <div className={`max-w-[581px] lg:max-h-[581px] w-full h-full`}>
                        {tokenType === 'saza' && (
                            <img
                                src={'/saza_none.png'}
                                alt="profile_image"
                                width={581}
                                height={0}
                            />
                        )}
                        {tokenType === 'gaza' && (
                            <img
                                src={'/gaza_none.png'}
                                alt="profile_image"
                                width={581}
                                height={0}
                            />
                        )}

                        {/* MOBILE 버전 */}
                        <div className="block lg:hidden w-full relative mt-4 px-4">
                            <div className="font-medium mt-4">
                                <div className="flex gap-4 justify-start items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        width={40}
                                        height={40}
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                        />
                                    </svg>

                                    <div className="text-[9.4px] font-Poppins_semiBold">
                                        <div>ADDRESS</div>
                                        <div className="text-[13px] font-black">
                                            {formatAddress(collector_address).toUpperCase()}
                                        </div>
                                    </div>

                                    <div>
                                        <ThemeProvider value={tooltipTheme}>
                                            <Tooltip content={toolipMessage} placement="top">
                                                <div
                                                    className="hover:opacity-65 active:opacity-65"
                                                    onClick={copy}>
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
                                                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                                                        />
                                                    </svg>
                                                </div>
                                            </Tooltip>
                                        </ThemeProvider>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row items-center mt-4">
                                <div className="w-full font-[700] leading-[25px] flex flex-row items-center">
                                    <div className="text-nowrap">
                                        <div className="text-[11.81px] font-Poppins_semiBold">
                                            QUADHASH
                                        </div>
                                        <div className="text-[25px] font-Poppins_bold">
                                            {tokenType.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-[28px]">
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={-30}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Pagination]}>
                                    {profileNFT?.attributes.map((item, index) => (
                                        <SwiperSlide key={`${item}_${index}_mobile`}>
                                            <div className="bg-opacity-20 bg-black w-[80%] px-2 py-1 pl-4 rounded-md min-h-[41.98px]">
                                                <div className="text-[10.85px] font-Poppins_light font-semibold text-[#E0E0E0] tracking-[0.56px]">
                                                    {item.toUpperCase()}
                                                </div>
                                                <div className="font-Poppins_semiBold text-[11.81px]"></div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    {/* PC 버전 */}
                    <div className="w-[calc(100%-581px)] mx-[60px] hidden lg:flex flex-col justify-start items-start pt-[30px]">
                        <div className="max-w-[550px]">
                            <div className="w-full font-[700] leading-[25px] flex flex-row items-center">
                                <div className="text-nowrap">
                                    <div className="text-[11.81px] font-Poppins_semiBold">
                                        QUADHASH
                                    </div>
                                    <div className="text-[25px] font-Poppins_bold">
                                        {tokenType.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between mt-[15px] flex-wrap gap-4 min-w-[540px]">
                                {profileNFT?.attributes.map((item, index) => (
                                    <div
                                        key={`${item}_${index}_pc`}
                                        className="bg-opacity-10 bg-black rounded-md p-[8px] text-[12px] max-w-[250px] w-full min-h-[49.98px]">
                                        <div className="text-[10.85px] font-Poppins_light font-semibold text-[#E0E0E0] tracking-[0.56px]">
                                            {item.toUpperCase()}
                                        </div>
                                        <div className="font-Poppins_semiBold text-[11.81px]"></div>
                                    </div>
                                ))}
                            </div>
                            <div className="font-medium mt-4">
                                <div className="flex gap-4 justify-start items-center">
                                    <div className="">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            width={40}
                                            height={40}
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                            />
                                        </svg>
                                    </div>

                                    <div className="text-[9.4px] font-Poppins_semiBold">
                                        <div>ADDRESS</div>
                                        <div className="text-[13px] font-black">
                                            {formatAddress(collector_address).toUpperCase()}
                                        </div>
                                    </div>
                                    <div>
                                        <ThemeProvider value={tooltipTheme}>
                                            <Tooltip content={toolipMessage} placement="top">
                                                <div
                                                    className="hover:opacity-65 active:opacity-65"
                                                    onClick={copy}>
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
                                                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                                                        />
                                                    </svg>
                                                </div>
                                            </Tooltip>
                                        </ThemeProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    if (profileNFT && profileNFT !== 'none') {
        const backgroundColor = profileNFT?.attributes.find((item) => {
            return item.trait_type === 'Background'
        })

        const tokenId = profileNFT?.name.split('#')[1]
        const tokenType = profileNFT?.name.split('#')[0].split(':')[1].trim().toLowerCase()

        let imageUrl
        if (tokenType === 'saza') {
            imageUrl = `${
                process.env.NEXT_PUBLIC_SAZA_S3_IMG_URL
            }/${tokenId}.png?${new Date().getTime()}`
        } else if (tokenType === 'gaza') {
            imageUrl = `${
                process.env.NEXT_PUBLIC_GAZA_S3_IMG_URL
            }/${tokenId}.png?${new Date().getTime()}`
        }

        return (
            <div
                className={`flex flex-col lg:flex-row items-center lg:items-end w-full relative rounded-lg shadow-lg overflow-hidden ${
                    backgroundColor?.value === 'White' ? '!text-black' : '!text-[#FFFFFF]'
                } `}
                style={{
                    backgroundColor: backgroundPallete[backgroundColor?.value.toLowerCase()],
                }}>
                <div
                    className={`flex flex-col items-end max-w-[581px] lg:max-h-[581px] w-full h-full`}>
                    <img src={imageUrl} alt="profileNFT" />

                    {/* MOBILE 버전 */}
                    <div className="block lg:hidden w-full relative mt-4 px-4">
                        <div className="font-medium mt-4">
                            <div className="flex gap-4 justify-start items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    width={40}
                                    height={40}
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                    />
                                </svg>

                                <div className="text-[9.4px] font-Poppins_semiBold">
                                    <div>ADDRESS</div>
                                    <div className="text-[13px] font-black">
                                        {formatAddress(collector_address).toUpperCase()}
                                    </div>
                                </div>
                                <div>
                                    <ThemeProvider value={tooltipTheme}>
                                        <Tooltip content={toolipMessage} placement="top">
                                            <div
                                                className="hover:opacity-65 active:opacity-65"
                                                onClick={copy}>
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
                                                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                                                    />
                                                </svg>
                                            </div>
                                        </Tooltip>
                                    </ThemeProvider>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center mt-4">
                            <div className="w-full font-[700] leading-[25px] flex flex-row items-center">
                                <div className="whitespace-nowrap">
                                    <div className="text-[11.81px] font-Poppins_semiBold">
                                        QUADHASH
                                    </div>
                                    <div className="text-[25px] font-Poppins_bold">
                                        {profileNFT?.name.split(':')[1].trim()}
                                    </div>
                                </div>
                                {session && collector_address === wallet?.accounts[0] && (
                                    <NFTSetting
                                        backgroundColor={backgroundColor?.value.toLowerCase()}
                                        updateUserProfile={updateUserProfile}
                                        tokenId={tokenId}
                                        tokenType={tokenType}
                                        isFrom={'profile'}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="my-[28px]">
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={-30}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination]}>
                                {profileNFT?.attributes
                                    .filter((item, index) => index !== 0)
                                    .map((item, index) => (
                                        <SwiperSlide
                                            key={`${item.trait_type}_${item.value}_mobile`}>
                                            <div className="bg-opacity-20 bg-black w-[80%] px-2 py-1 pl-4 rounded-md">
                                                <div
                                                    className={`text-[10.85px] font-Poppins_light font-semibold ${
                                                        backgroundColor?.value === 'White'
                                                            ? '!text-black'
                                                            : '!text-[#E0E0E0]'
                                                    } tracking-[0.56px]`}>
                                                    {item.trait_type.toUpperCase()}
                                                </div>
                                                <div className="font-Poppins_semiBold text-[11.81px]">
                                                    {item.value}
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                <SwiperSlide>
                                    <div className="bg-opacity-20 bg-black w-[80%] px-2 py-1 pl-4 rounded-md">
                                        <div
                                            className={`text-[10.85px] font-Poppins_light font-semibold ${
                                                backgroundColor?.value === 'White'
                                                    ? '!text-black'
                                                    : '!text-[#E0E0E0]'
                                            } tracking-[0.56px]`}>
                                            {profileNFT?.attributes[0].trait_type.toUpperCase()}
                                        </div>
                                        <div className="font-Poppins_semiBold text-[11.81px]">
                                            {profileNFT?.attributes[0].value}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>

                {/* PC 버전 */}
                <div className="w-[calc(100%-581px)] mx-[30px] hidden lg:flex flex-col justify-start items-center h-[581px] pt-[45px]">
                    <div className="max-w-[550px] flex flex-col justify-center">
                        <div className="w-full font-[700] leading-[25px] flex flex-row justify-start items-center">
                            <div className="text-nowrap">
                                <div className="text-[11.81px] font-Poppins_semiBold">QUADHASH</div>
                                <div className="text-[25px] font-Poppins_bold">
                                    {profileNFT?.name.split(':')[1].trim()}
                                </div>
                            </div>
                            {session && collector_address === wallet?.accounts[0] && (
                                <NFTSetting
                                    backgroundColor={backgroundColor?.value.toLowerCase()}
                                    updateUserProfile={updateUserProfile}
                                    tokenId={tokenId}
                                    tokenType={tokenType}
                                    isFrom={'profile'}
                                />
                            )}
                        </div>
                        <div className="flex flex-row items-center justify-between mt-[15px] flex-wrap gap-4 min-w-[530px]">
                            {profileNFT?.attributes
                                .filter((item, index) => index !== 0)
                                .map((item) => (
                                    <div
                                        key={`${item.trait_type}_${item.value}_pc`}
                                        className="bg-opacity-10 bg-black rounded-md p-[8px] text-[12px] max-w-[250px] w-full">
                                        <div
                                            className={`text-[10.85px] font-Poppins_light font-semibold ${
                                                backgroundColor?.value === 'White'
                                                    ? '!text-black'
                                                    : '!text-[#E0E0E0]'
                                            } tracking-[0.56px]`}>
                                            {item.trait_type.toUpperCase()}
                                        </div>
                                        <div className="font-Poppins_semiBold text-[11.81px]">
                                            {item.value}
                                        </div>
                                    </div>
                                ))}
                            <div className="bg-opacity-10 bg-black rounded-md p-[8px] text-[12px] max-w-[250px] w-full">
                                <div
                                    className={`text-[10.85px] font-Poppins_light font-semibold ${
                                        backgroundColor?.value === 'White'
                                            ? '!text-black'
                                            : '!text-[#E0E0E0]'
                                    } tracking-[0.56px]`}>
                                    {profileNFT?.attributes[0].trait_type.toUpperCase()}
                                </div>
                                <div className="font-Poppins_semiBold text-[11.81px]">
                                    {profileNFT?.attributes[0].value}
                                </div>
                            </div>
                        </div>
                        <div className="font-medium mt-4">
                            <div className="flex gap-4 justify-start items-center">
                                <div className="">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        width={40}
                                        height={40}
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                        />
                                    </svg>
                                </div>

                                <div className="text-[9.4px] font-Poppins_semiBold">
                                    <div>ADDRESS</div>
                                    <div className="text-[13px] font-black">
                                        {formatAddress(collector_address).toUpperCase()}
                                    </div>
                                </div>
                                <div>
                                    <ThemeProvider value={tooltipTheme}>
                                        <Tooltip content={toolipMessage} placement="top">
                                            <div
                                                className="hover:opacity-65 active:opacity-65"
                                                onClick={copy}>
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
                                                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                                                    />
                                                </svg>
                                            </div>
                                        </Tooltip>
                                    </ThemeProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
// }
// if (isLoading) {
//     return (
//         <div className="w-[581px] rounded-lg flex lg:flex-row flex-col items-center justify-center">
//             <div className="w-full">
//                 <CardLoading />
//             </div>
//         </div>
//     )
// }
// }
