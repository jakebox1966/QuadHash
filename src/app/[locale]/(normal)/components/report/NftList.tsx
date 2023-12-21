'use client'
import { Card, CardHeader, CardBody, Typography, Spinner } from '@material-tailwind/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export interface INftListProps {
    exNftList: any[]
    setExNftList: any
    type: string
    isLoading: boolean
}

export default function NftList({ type, exNftList, setExNftList, isLoading }: INftListProps) {
    useEffect(() => {
        console.log(type)
        console.log(exNftList)
    }, [exNftList])

    const selectNft = (targetIndex: number) => {
        console.log(targetIndex)
        setExNftList(
            exNftList.map((nft, index) =>
                index === targetIndex ? { ...nft, isChecked: !nft.isChecked } : nft,
            ),
        )
    }

    return (
        <>
            <div className="w-full">
                {type === 'saza' ? (
                    <svg
                        width="70"
                        height="25"
                        viewBox="0 0 70 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.5 2.82812L14.6562 8.14062L8.10938 6.60938L15.5 17.5781L12.0469 24.5L1.04688 23L0.828125 16.8906L7.78125 18.0625L0.578125 6.375L5.15625 0.109375L15.5 2.82812ZM23.2031 19.7344L22.3125 23L16.1406 22.9375L22.8438 0.390625L30.5938 0.578125L35.5781 23.1094L29.0781 23.0625L28.4844 20.0625L23.2031 19.7344ZM27.2344 13.8125L26.2031 8.65625L24.8281 13.7188L27.2344 13.8125ZM43.1875 16.9688L49.875 17.1094L50.0625 23.2812L35.8125 22.8125L35.875 16.8281L42.6562 6.9375H35.9375L35.9844 0.671875L49.8594 0.65625L49.9375 6.9375L43.1875 16.9688ZM57.5156 19.7344L56.625 23L50.4531 22.9375L57.1562 0.390625L64.9062 0.578125L69.8906 23.1094L63.3906 23.0625L62.7969 20.0625L57.5156 19.7344ZM61.5469 13.8125L60.5156 8.65625L59.1406 13.7188L61.5469 13.8125Z"
                            fill="#F36D26"
                        />
                    </svg>
                ) : (
                    <svg
                        width="73"
                        height="25"
                        viewBox="0 0 73 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M17.8281 20.9219L8.73438 24.9219L0.90625 20.6875L1 4.96875L9.20312 0.890625L17.0781 5.04688L17.25 8.1875L11.125 9.26562L11.1094 8.17188L8.96875 7.34375L7.32812 8.51562L6.89062 17.6719L8.96875 18.4688L11.1562 16.9062V15.4375H8.98438L8.64062 10.7188L17.4688 10.5469L17.8281 20.9219ZM25.3281 20.7344L24.4375 24L18.2656 23.9375L24.9688 1.39062L32.7188 1.57812L37.7031 24.1094L31.2031 24.0625L30.6094 21.0625L25.3281 20.7344ZM29.3594 14.8125L28.3281 9.65625L26.9531 14.7188L29.3594 14.8125ZM45.3125 17.9688L52 18.1094L52.1875 24.2812L37.9375 23.8125L38 17.8281L44.7812 7.9375H38.0625L38.1094 1.67188L51.9844 1.65625L52.0625 7.9375L45.3125 17.9688ZM59.6406 20.7344L58.75 24L52.5781 23.9375L59.2812 1.39062L67.0312 1.57812L72.0156 24.1094L65.5156 24.0625L64.9219 21.0625L59.6406 20.7344ZM63.6719 14.8125L62.6406 9.65625L61.2656 14.7188L63.6719 14.8125Z"
                            fill="#F36D26"
                        />
                    </svg>
                )}
            </div>
            <div className="flex flex-row justify-start items-center overflow-y-hidden overflow-x-auto whitespace-nowrap gap-4 w-full">
                {isLoading && (
                    <div className="flex flex-col justify-center items-center w-[200px] h-[300px]">
                        <Spinner className="h-12 w-12" />
                    </div>
                )}

                {!isLoading && exNftList.length === 0 && (
                    <div
                        className={`flex flex-col justify-center items-center w-[200px] h-[300px] p-3`}>
                        요청하신 데이터가 없습니다.
                    </div>
                )}
                {exNftList.map((nft, index) => (
                    <div
                        key={nft.tokenId}
                        className={`min-w-[200px] max-w-[200px] nft_card cursor-pointer ${
                            nft.isChecked ? 'nft_card_checked' : ''
                        }`}>
                        <Card
                            className="nft_card_shadow"
                            onClick={() => {
                                selectNft(index)
                            }}>
                            <CardHeader floated={false}>
                                <img src={nft.image.originalUrl} alt="profile-picture" />
                            </CardHeader>
                            <CardBody className="text-center">
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    {nft.name.split(':')[1]}
                                </Typography>
                                <Typography color="blue-gray" className="font-medium" textGradient>
                                    {nft.name.split(':')[0]}
                                </Typography>
                            </CardBody>
                        </Card>
                        <Card
                            className={`w-full nft_card_back nft_card_shadow`}
                            onClick={() => {
                                selectNft(index)
                            }}>
                            <CardBody className="text-center">
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    Locked
                                </Typography>
                                <Typography color="blue-gray" className="font-medium" textGradient>
                                    Locked
                                </Typography>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    )
}
