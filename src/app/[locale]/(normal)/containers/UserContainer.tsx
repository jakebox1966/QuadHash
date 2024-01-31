'use client'

import * as React from 'react'
import ProfileSection from '../components/user/ProfileSection'
import NFTSection from '../components/user/NFTSection'
import { useSession } from 'next-auth/react'
import { getMetadata } from '@/app/api/dynamicNFT/api'
import { updateUserProfileTokenId } from '@/app/api/user/api'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { getAccounts, personalSign } from '@/app/api/wallet/api'
import { getUuidByAccount } from '@/app/api/auth/api'
import { getNFTMetadata } from '@/app/api/alchemy/api'

export interface IUserContainerProps {}

const backgroundPallete = {
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
    spots: '#ffffff',
    grid: '#648d3c',
    stripes: '#0074ae',
    dots: '#d490aa',
}

export default function UserContainer(props: IUserContainerProps) {
    // const [NFTType, setNFTType] = React.useState(null)
    // const [tokenId, setTokenId] = React.useState(null)
    const [activeNFT, setActiveNFT] = React.useState(null)
    const [profileNFT, setProfileNFT] = React.useState(null)
    const [backgroundColor, setBackgroundColor] = React.useState(null)

    const { wallet } = useMetaMask()

    const { data: session } = useSession()

    React.useEffect(() => {
        init()
    }, [session])

    const init = async () => {
        console.log('[][[][][][]', session)
        console.log('wallet', wallet.accounts)
        // if (wallet.accounts[0]) {
        let NFTType = session?.user.user_info.token_type
        let tokenId = session?.user.user_info.token_id
        console.log('NFTType =>', NFTType)
        console.log('tokenId =>', tokenId)
        let metadata = null
        if (tokenId && NFTType) {
            console.log('now setting profile')

            if (NFTType === 'saza') {
                // metadata = await getMetadata({ nftType: NFTType, tokenId: tokenId })
                metadata = await getNFTMetadata(
                    process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS,
                    tokenId,
                )
                setProfileNFT(metadata)
            } else if (NFTType === 'gaza') {
                // metadata = await getMetadata({ nftType: NFTType, tokenId: tokenId })
                metadata = await getNFTMetadata(
                    process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS,
                    tokenId,
                )
                setProfileNFT(metadata)
            }
        }
    }

    React.useEffect(() => {
        console.log(profileNFT)
    }, [profileNFT])

    // const updateUserProfile = async () => {
    //     const accounts = await getAccounts()

    //     let signResult = await getUuidByAccount(accounts[0])
    //     const signature = await personalSign(accounts[0], signResult.eth_nonce)

    //     const parameter = {
    //         token_id: activeNFT.tokenId,
    //         token_type: activeTab.toLowerCase(),
    //         wallet_signature: signature,
    //         wallet_address: wallet.accounts[0],
    //     }
    //     const response = await updateUserProfileTokenId(parameter)

    //     console.log(response)
    // }

    return (
        <>
            <div className="max-w-[1296px] px-[24px]">
                <ProfileSection profileNFT={profileNFT} />
                <NFTSection />
            </div>
        </>
    )
}
