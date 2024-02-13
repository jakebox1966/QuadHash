'use client'

import * as React from 'react'
import { Dialog, DialogBody, ThemeProvider } from '@material-tailwind/react'

import Image from 'next/image'

import { customTheme } from '@/app/[locale]/common/materialUI/theme'
import NFTSetting from './NFTSetting'
import { useSession } from 'next-auth/react'
import { useMetaMask } from '@/app/hooks/useMetaMask'

export interface INFTDetailModalComponentProps {
    collector_address: any
    activeNFT: any
    metadata?: any
    imageUrl?: string
    backgroundColor?: string
    open?: boolean
    handleOpen?: () => void
    updateUserProfile: (tokenId: any) => Promise<void>
}

export default function NFTDetailModalComponent({
    collector_address,
    activeNFT,
    metadata,
    imageUrl,
    backgroundColor,
    open,
    handleOpen,
    updateUserProfile,
}: INFTDetailModalComponentProps) {
    const checkPartIcon = (partKey) => {
        if (partKey === 'Ranking') {
            return '/mypage_square.svg'
        } else if (partKey === 'Background') {
            return '/mypage_square.svg'
        } else if (partKey === 'Mane') {
            return '/mypage_mane.svg'
        } else if (partKey === 'Body') {
            return '/mypage_body.svg'
        } else if (partKey === 'Head') {
            return '/mypage_head.svg'
        } else if (partKey === 'Eyes') {
            return '/mypage_plus.svg'
        } else if (partKey === 'Mouth') {
            return '/mypage_mouth.svg'
        } else if (partKey === 'Headwear') {
            return '/mypage_headwear.svg'
        } else if (partKey === 'Extras') {
            return '/mypage_square.svg'
        }
    }

    const { data: session } = useSession()
    const { wallet } = useMetaMask()

    // React.useEffect(() => {
    //     console.log(activeNFT)
    // }, [activeNFT])

    return (
        <>
            <ThemeProvider value={customTheme}>
                <Dialog
                    className="rounded-lg overflow-hidden !max-h-fit !max-w-fit"
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
                        <div className="lg:w-[650px] flex flex-col justify-end items-center lg:items-start relative overflow-hidden">
                            <Image
                                src={imageUrl}
                                alt="profile_image"
                                width={650}
                                height={650}
                                quality={100}
                            />

                            {/* <img src={imageUrl} alt="profile_image" width={530} height={0} /> */}
                        </div>
                        <div
                            className={`text-white w-[calc(100%-650px)] lg:flex flex-col justify-center items-center hidden`}>
                            <div className="flex flex-row flex-wrap gap-4 pl-10 justify-start items-start">
                                <div className="flex w-[calc(100%/2-4rem)] flex-col justify-center font-bold p-2 bg-opacity-20 bg-black rounded-lg">
                                    <div>{metadata?.name.split(':')[0].trim()}</div>
                                    <div className="text-2xl">
                                        {metadata?.name.split(':')[1].trim()}
                                    </div>
                                </div>

                                <div className="w-[calc(100%/2-4rem)] flex flex-row justify-between">
                                    {session && collector_address === wallet?.accounts[0] && (
                                        <NFTSetting
                                            updateUserProfile={updateUserProfile}
                                            profileNFT={activeNFT}
                                            isFrom={'list'}
                                        />
                                    )}
                                </div>
                                {metadata?.attributes
                                    .filter((item, index) => index !== 0)
                                    .map((item) => (
                                        <div
                                            key={item.trait_type}
                                            className="w-[calc(100%/2-4rem)] flex flex-row items-center gap-3 p-2 bg-opacity-20 bg-black rounded-lg">
                                            <div>
                                                {item.trait_type === 'Background' && (
                                                    <img
                                                        src="/mypage_square.svg"
                                                        alt="mypage_square"
                                                    />
                                                )}
                                                {item.trait_type === 'Mane' && (
                                                    <img src="/mypage_mane.svg" alt="mypage_mane" />
                                                )}
                                                {item.trait_type === 'Body' && (
                                                    <img src="/mypage_body.svg" alt="mypage_body" />
                                                )}
                                                {item.trait_type === 'Head' && (
                                                    <img src="/mypage_head.svg" alt="mypage_head" />
                                                )}
                                                {item.trait_type === 'Eyes' && (
                                                    <img src="/mypage_plus.svg" alt="mypage_plus" />
                                                )}
                                                {item.trait_type === 'Mouth' && (
                                                    <img
                                                        src="/mypage_mouth.svg"
                                                        alt="mypage_mouth"
                                                    />
                                                )}
                                                {item.trait_type === 'Headwear' && (
                                                    <img
                                                        src="/mypage_headwear.svg"
                                                        alt="mypage_headwear"
                                                    />
                                                )}
                                                {item.trait_type === 'Extras' && (
                                                    <img
                                                        src="/mypage_square.svg"
                                                        alt="mypage_square"
                                                    />
                                                )}
                                                {item.trait_type === 'Dcount' && (
                                                    <img
                                                        src="/mypage_dcount.svg"
                                                        alt="mypage_dcount"
                                                    />
                                                )}
                                                {item.trait_type === 'Ranking' && (
                                                    <img
                                                        src="/mypage_rank.svg"
                                                        alt="mypage_ranking"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium">
                                                    {item.trait_type !== 'Dcount'
                                                        ? item.trait_type
                                                        : 'Dynamic NFT'}
                                                </div>
                                                <div className="font-black">{item.value}</div>
                                            </div>
                                        </div>
                                    ))}
                                <div className="w-[calc(100%/2-4rem)] flex flex-row items-center gap-3 p-2 bg-opacity-20 bg-black rounded-lg">
                                    <div>
                                        <img src="/mypage_rank.svg" alt="mypage_rank" />
                                    </div>
                                    <div>
                                        <div className="font-medium">
                                            {metadata?.attributes[0].trait_type}
                                        </div>
                                        <div className="font-black">
                                            {metadata?.attributes[0].value}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogBody>
                </Dialog>
            </ThemeProvider>
        </>
    )
}
