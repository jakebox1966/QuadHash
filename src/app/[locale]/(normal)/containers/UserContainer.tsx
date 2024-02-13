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

export interface IUserContainerProps {
    // wallet_address: string
}

export default function UserContainer(props: IUserContainerProps) {
    // const [activeNFT, setActiveNFT] = React.useState(null)
    const [profileNFT, setProfileNFT] = React.useState(null)

    const { wallet } = useMetaMask()

    const { data: session, update } = useSession()

    const updateSession = async (tokenId, tokenType) => {
        console.log(tokenId)
        await update({
            ...session,
            user: {
                ...session?.user,
                token_id: tokenId,
                token_type: tokenType,
            },
        })
    }

    React.useEffect(() => {
        init()
    }, [session])

    const init = async () => {
        console.log('start init')
        // if (wallet.accounts[0]) {
        if (session?.user?.token_type && session?.user?.token_id) {
            console.log(session)
            let NFTType = session?.user.token_type
            let tokenId = session?.user.token_id
            console.log('NFTType =>', NFTType)
            console.log('tokenId =>', tokenId)
            let metadata = null
            if (tokenId && NFTType) {
                console.log('now setting profile')
                if (NFTType === 'saza' || NFTType === 'gaza') {
                    metadata = await getMetadata({ nftType: NFTType, tokenId: tokenId })
                    console.log(metadata)
                    setProfileNFT(metadata)
                } else if (NFTType === 'reset') {
                    setProfileNFT(null)
                }
            }
        }
    }

    // React.useEffect(() => {
    //     console.log(profileNFT)
    // }, [profileNFT])

    // React.useEffect(() => {
    //     console.log('sessionsessionsession===>', session)
    // }, [session])

    const updateUserProfile = async ({ tokenId, tokenType }) => {
        try {
            const accounts = await getAccounts()

            let signResult = await getUuidByAccount(accounts[0])
            const signature = await personalSign(accounts[0], signResult.eth_nonce)

            const parameter = {
                token_id: tokenId,
                token_type: tokenType,
                wallet_signature: signature,
                wallet_address: wallet.accounts[0],
            }
            const response = await updateUserProfileTokenId(parameter)

            const updateSessionResponse = await updateSession(tokenId, tokenType)
            console.log(updateSessionResponse)

            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="max-w-[1296px] w-full px-[24px]">
                <ProfileSection profileNFT={profileNFT} updateUserProfile={updateUserProfile} />
                <NFTSection updateUserProfile={updateUserProfile} />
            </div>
        </>
    )
}
