'use client'

import * as React from 'react'
import ProfileSection from '../components/user/ProfileSection'
import NFTSection from '../components/user/NFTSection'
import { useSession } from 'next-auth/react'
import { getMetadata } from '@/app/api/dynamicNFT/api'

export interface IUserContainerProps {}

const backgroundPallete = {
    saza: {
        white: '#FFFFFF',
        sky: '#a5ddec',
        mint: '#abc178',
        jungle: '#3d6229',
        red: '#c5251b',
        blue: '#0074ae',
        pink: '#d490aa',
        storm: '#5d7784',
        night: '#143e47',
        lemon: '#ffd488',
        desert: '#c95128',
    },
    gaza: {
        spots: '#ffffff',
        grid: '#648d3c',
        stripes: '#0074ae',
        dots: '#d490aa',
        sky: '#a5ddec',
        mint: '#abc178',
        jungle: '#3d6229',
        red: '#c5251b',
        blue: '#0074ae',
        pink: '#d490aa',
        storm: '#5d7784',
        night: '#143e47',
        lemon: '#ffd488',
        desert: '#c95128',
    },
}

export default function UserContainer(props: IUserContainerProps) {
    const [backgroundColor, setBackgroundColor] = React.useState(null)
    const [metadata, setMetadata] = React.useState(null)
    const [imageUrl, setImageUrl] = React.useState(null)

    const { data: session } = useSession()

    React.useEffect(() => {
        const init = async () => {
            let nftType = session?.user.token_type
            let tokenId = session?.user.token_id
            let metadata = null
            nftType = 'saza'
            tokenId = 10

            if (tokenId && nftType) {
                // console.log('nftType => ', nftType)
                // console.log('tokenId => ', tokenId)

                if (nftType === 'saza') {
                    metadata = await getMetadata({ nftType: nftType, tokenId: tokenId })

                    setMetadata(metadata)
                    setImageUrl(metadata.image)
                } else if (nftType === 'gaza') {
                    metadata = await getMetadata({ nftType: nftType, tokenId: tokenId })

                    setMetadata(metadata)
                    setImageUrl(metadata.image)
                }
                const backgroundColor = metadata.attributes.find((item) => {
                    return item.trait_type === 'Background'
                })

                setBackgroundColor(backgroundPallete[nftType][backgroundColor.value.toLowerCase()])
            }
        }
        init()
    }, [])

    // React.useEffect(() => {
    //     console.log(imageUrl)
    //     console.log(metadata)
    // }, [imageUrl, metadata])

    return (
        <>
            <div className="max-w-[1296px] px-[24px]">
                <ProfileSection
                    metadata={metadata}
                    imageUrl={imageUrl}
                    backgroundColor={backgroundColor as string}
                />
                <NFTSection />
            </div>
        </>
    )
}
