'use client'

import * as React from 'react'
import ProfileSection from '../components/collector/ProfileSection'
import NFTSection from '../components/collector/NFTSection'
import { useSession } from 'next-auth/react'
import { getMetadata } from '@/app/api/dynamicNFT/api'
import { updateUserProfileTokenId } from '@/app/api/collector/api'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { getAccounts, personalSign } from '@/app/api/wallet/api'
import { getUserInfoByWalletAddress, getUuidByAccount } from '@/app/api/auth/api'
import { getNFTMetadata } from '@/app/api/alchemy/api'

export interface ICollectorContainerProps {
    wallet_address: string
}

export default function CollectorContainer({ wallet_address }: ICollectorContainerProps) {
    // const [activeNFT, setActiveNFT] = React.useState(null)
    const [profileNFT, setProfileNFT] = React.useState(null)

    const [collector_address, setCollector_address] = React.useState(null)

    const { wallet } = useMetaMask()

    const { data: session, update } = useSession()

    const updateSession = async (tokenId: string, tokenType: string) => {
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
        if (wallet_address) {
            try {
                const result = await getUserInfoByWalletAddress(wallet_address)
                console.log(result)
                const token_type = result.token_type
                const token_id = result.token_id
                let metadata = null

                setCollector_address(result.wallet_address)

                if (token_type && token_id) {
                    console.log('now setting profile')
                    if (token_type === 'saza' || token_type === 'gaza') {
                        metadata = await getMetadata({ nftType: token_type, tokenId: token_id })
                        setProfileNFT(metadata)
                    } else if (token_type === 'reset') {
                        setProfileNFT(null)
                    }
                }
            } catch (error) {
                console.error(error)
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
            // console.log(updateSessionResponse)

            // console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="max-w-[1296px] w-full px-[24px]">
                <ProfileSection
                    collector_address={collector_address}
                    profileNFT={profileNFT}
                    updateUserProfile={updateUserProfile}
                />
                <NFTSection
                    collector_address={collector_address}
                    updateUserProfile={updateUserProfile}
                    wallet_address={wallet_address}
                />
            </div>
        </>
    )
}
