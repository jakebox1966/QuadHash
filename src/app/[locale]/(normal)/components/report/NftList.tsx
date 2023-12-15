'use client'
import { useState } from 'react'
import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react'

export interface INftListProps {}

export default function NftList(props: INftListProps) {
    const selectNft = (item: string) => {
        console.log(item)
    }
    return (
        <>
            <div className="flex flex-row justify-center gap-2 overflow-auto whitespace-nowrap w-full">
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
