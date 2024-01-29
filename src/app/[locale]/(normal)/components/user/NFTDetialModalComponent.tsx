'use client'

import * as React from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Typography,
    ThemeProvider,
} from '@material-tailwind/react'
import ProfileSection from './ProfileSection'
import Image from 'next/image'
import PartTooltipComponent from './PartTooltipComponent'

export interface INFTDetailModalComponentProps {
    metadata?: any
    imageUrl?: string
    backgroundColor?: string
    open?: boolean
    handleOpen?: () => void
}

const customTheme = {
    dialog: {
        defaultProps: {
            size: 'md',
            dismiss: {},
            animate: {
                unmount: {},
                mount: {},
            },
            className: '',
        },
        valid: {
            sizes: ['sm', 'md', 'lg'],
        },
        styles: {
            base: {
                backdrop: {
                    display: 'grid',
                    placeItems: 'place-items-center',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: 'w-screen',
                    height: 'h-screen',
                    backgroundColor: 'bg-black',
                    backgroundOpacity: 'bg-opacity-60',
                    backdropFilter: 'backdrop-blur-sm',
                },
                container: {
                    position: 'relative',
                    bg: 'bg-white',
                    m: 'm-4',
                    borderRadius: 'rounded-lg',
                    boxShadow: 'shadow-2xl',
                    color: 'text-blue-gray-500',
                    fontSmoothing: 'antialiased',
                    fontFamily: 'font-sans',
                    fontSize: 'text-base',
                    fontWeight: 'font-light',
                    lineHeight: 'leading-relaxed',
                },
            },
            sizes: {
                sm: {
                    width: 'w-full md:w-2/3 lg:w-2/4',
                    minWidth: 'min-w-[70%] md:min-w-[66.666667%] lg:min-w-[50%]',
                    maxWidth: 'max-w-[70%] md:max-w-[66.666667%] lg:max-w-[1200px]',
                },
                md: {
                    width: 'w-full md:w-3/4 lg:w-3/5',
                    minWidth: 'min-w-[80%] md:min-w-[75%] lg:min-w-[60%]',
                    maxWidth: 'max-w-[80%] md:max-w-[75%] lg:max-w-[1200px]',
                },
                lg: {
                    width: 'w-full md:w-5/6 lg:w-3/4',
                    minWidth: 'min-w-[90%] md:min-w-[700px] lg:min-w-[1200px]',
                    maxWidth: 'max-w-[90%] md:max-w-[700px] lg:max-w-[1200px] ',
                },
            },
        },
    },
}

export default function NFTDetailModalComponent({
    metadata,
    imageUrl,
    backgroundColor,
    open,
    handleOpen,
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

    React.useEffect(() => {
        console.log(backgroundColor)
    }, [backgroundColor])
    return (
        <>
            <ThemeProvider value={customTheme}>
                <Dialog
                    className="rounded-lg overflow-hidden"
                    size="lg"
                    open={open}
                    handler={handleOpen}
                    placeholder={undefined}
                    style={{ backgroundColor: backgroundColor }}>
                    <DialogBody
                        className="p-0 overflow-hidden flex lg:flex-row justify-center lg:justify-start"
                        placeholder={undefined}>
                        <div className="absolute flex flex-col gap-3 bg-opacity-20 bg-black rounded-lg p-4 top-0 left-0 lg:hidden z-10">
                            {metadata?.attributes.map((item) => (
                                <PartTooltipComponent
                                    key={item.trait_type}
                                    partKey={item.trait_type}
                                    partValue={item.value}
                                    partIcon={checkPartIcon(item.trait_type)}
                                />
                            ))}
                        </div>
                        <div className="absolute bottom-0 text-white font-black right-0 z-30 bg-opacity-20 bg-black p-3 rounded-lg lg:hidden cursor-pointer">
                            메인 NFT로 설정하기
                        </div>
                        <div className="lg:w-[530px] flex flex-col justify-end items-center lag:items-start relative overflow-hidden">
                            <Image src={imageUrl} alt="profile_image" width={530} height={0} />
                        </div>
                        <div
                            className={`text-white w-[calc(100%-530px)] lg:flex flex-col justify-center gap-5 hidden`}>
                            <div className="flex flex-row flex-wrap gap-6 justify-center items-center ">
                                <div className="flex w-[calc(100%/2-4rem)] flex-col justify-center">
                                    <div>{metadata?.name.split(':')[0].trim()}</div>
                                    <div className="text-2xl font-bold">
                                        {metadata?.name.split(':')[1].trim()}
                                    </div>
                                    <div>
                                        {metadata?.attributes[0].trait_type} -{' '}
                                        {metadata?.attributes[0].value}
                                    </div>
                                </div>
                                <div
                                    className="w-[calc(100%/2-4rem)] cursor-pointer p-3 bg-opacity-20 text-center bg-black rounded-lg"
                                    onClick={() => {
                                        alert('하시겠습니까?')
                                    }}>
                                    메인 NFT로 설정하기
                                </div>
                                {metadata?.attributes
                                    .filter((item, index) => index !== 0)
                                    .map((item) => (
                                        <div
                                            key={item.trait_type}
                                            className="w-[calc(100%/2-4rem)] flex flex-row items-center gap-3 p-3 bg-opacity-20 bg-black rounded-lg">
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
                                            </div>
                                            <div>
                                                <div>{item.trait_type}</div>
                                                <div className="font-black">{item.value}</div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </DialogBody>
                </Dialog>
            </ThemeProvider>
        </>
    )
}
