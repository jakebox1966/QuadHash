'use client'
import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react'
import { Dispatch, SetStateAction } from 'react'

export interface INftListProps {
    exNftList: string[]
    setExNftList: Dispatch<SetStateAction<string[]>>
}

export default function NftList({ exNftList, setExNftList }: INftListProps) {
    const selectNft = (item: string) => {
        console.log(item)
        exNftList.push(item)
        setExNftList(exNftList)
    }
    return (
        <>
            <div className="flex flex-row justify-start gap-2 overflow-auto whitespace-nowrap w-[80%]">
                <Card
                    className="w-[200px] cursor-pointer hover:opacity-80 m-4"
                    onClick={() => {
                        selectNft('A123')
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
                        selectNft('A123')
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
                        selectNft('A123')
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
                        selectNft('A123')
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
                        selectNft('A123')
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
                        selectNft('A123')
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
                        selectNft('A123')
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
                        selectNft('A123')
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
            </div>
        </>
    )
}
