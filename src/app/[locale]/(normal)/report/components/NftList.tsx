'use client'
import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react'
import { Dispatch, SetStateAction, useState } from 'react'

export interface INftListProps {
    exNftList: string[]
    setExNftList: Dispatch<SetStateAction<string[]>>
}

export default function NftList({ exNftList, setExNftList }: INftListProps) {
    const [isChecked, setIsChecked] = useState(false)

    const selectNft = (item: string) => {
        setIsChecked(true)
        if (exNftList.includes(item)) {
            setIsChecked(false)
            setExNftList(exNftList.filter((nft) => nft !== item))
            return
        }
        setExNftList([...exNftList, item])
    }

    return (
        <>
            <div className="flex flex-row justify-start gap-2 overflow-auto whitespace-nowrap w-[80%]">
                <div
                    className={`nft_card m-8 cursor-pointer ${
                        isChecked ? 'nft_card_checked' : ''
                    }`}>
                    <Card
                        className={`w-[200px] nft_card_shadow`}
                        onClick={() => {
                            selectNft('1')
                        }}
                        placeholder={undefined}>
                        <CardHeader floated={false} placeholder={undefined}>
                            <img
                                src="https://d1fv2z2t2pz1fy.cloudfront.net/images/0.png"
                                alt="profile-picture"
                            />
                        </CardHeader>
                        <CardBody className="text-center" placeholder={undefined}>
                            <Typography
                                variant="h4"
                                color="blue-gray"
                                className="mb-2"
                                placeholder={undefined}>
                                Natalie Paisley
                            </Typography>
                            <Typography
                                color="blue-gray"
                                className="font-medium"
                                textGradient
                                placeholder={undefined}>
                                CEO / Co-Founder
                            </Typography>
                        </CardBody>
                    </Card>
                    <Card
                        className={`w-[200px] nft_card_back nft_card_shadow`}
                        onClick={() => {
                            selectNft('1')
                        }}
                        placeholder={undefined}>
                        <CardBody className="text-center" placeholder={undefined}>
                            <Typography
                                variant="h4"
                                color="blue-gray"
                                className="mb-2"
                                placeholder={undefined}>
                                Locked
                            </Typography>
                            <Typography
                                color="blue-gray"
                                className="font-medium"
                                textGradient
                                placeholder={undefined}>
                                Locked
                            </Typography>
                        </CardBody>
                    </Card>
                </div>

                {/* <Card
                    className="w-[200px] cursor-pointer hover:opacity-80 m-4"
                    onClick={() => {
                        selectNft('2')
                    }}>
                    <CardHeader floated={false}>
                        <img
                            src="https://d1fv2z2t2pz1fy.cloudfront.net/images/0.png"
                            alt="profile-picture"
                        />
                    </CardHeader>
                    <CardBody className="text-center">
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                            Natalie Paisley
                        </Typography>
                        <Typography color="blue-gray" className="font-medium" textGradient>
                            CEO / Co-Founder
                        </Typography>
                    </CardBody>
                </Card>
                <Card
                    className="w-[200px] cursor-pointer hover:opacity-80 m-4"
                    onClick={() => {
                        selectNft('3')
                    }}>
                    <CardHeader floated={false}>
                        <img
                            src="https://d1fv2z2t2pz1fy.cloudfront.net/images/0.png"
                            alt="profile-picture"
                        />
                    </CardHeader>
                    <CardBody className="text-center">
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                            Natalie Paisley
                        </Typography>
                        <Typography color="blue-gray" className="font-medium" textGradient>
                            CEO / Co-Founder
                        </Typography>
                    </CardBody>
                </Card>
                <Card
                    className="w-[200px] cursor-pointer hover:opacity-80 m-4"
                    onClick={() => {
                        selectNft('4')
                    }}>
                    <CardHeader floated={false}>
                        <img
                            src="https://d1fv2z2t2pz1fy.cloudfront.net/images/0.png"
                            alt="profile-picture"
                        />
                    </CardHeader>
                    <CardBody className="text-center">
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                            Natalie Paisley
                        </Typography>
                        <Typography color="blue-gray" className="font-medium" textGradient>
                            CEO / Co-Founder
                        </Typography>
                    </CardBody>
                </Card> */}
            </div>
        </>
    )
}
