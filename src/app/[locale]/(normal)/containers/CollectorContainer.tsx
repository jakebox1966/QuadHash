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
import TabComponent from '../components/collector/TabComponent'
import NFTDetailModalComponent from '../components/collector/NFTDetialModalComponent'
import NFTListComponent from '../components/collector/NFTListComponent'
import { backgroundPallete } from '../../common/color/colorPalette'
import { setActive } from '@material-tailwind/react/components/Tabs/TabsContext'
import CardLoading from '../../common/components/CardLoading'
import { AlertContext } from '@/app/provider/AlertProvider'

export interface ICollectorContainerProps {
    wallet_address: string
}

export default function CollectorContainer({ wallet_address }: ICollectorContainerProps) {
    const { $alert } = React.useContext(AlertContext)
    const [isLoading, setIsLoading] = React.useState(false)
    const [profileNFT, setProfileNFT] = React.useState(null)
    const [tokenType, setTokenType] = React.useState('saza')

    const [backgroundColor, setBackgroundColor] = React.useState(null)
    const [metadata, setMetadata] = React.useState(null)
    const [imageUrl, setImageUrl] = React.useState(null)

    const [open, setOpen] = React.useState(false)

    const [collector_address, setCollector_address] = React.useState(null)

    const { wallet } = useMetaMask()

    const { data: session, update } = useSession()

    /**
     * 모달 Control
     */

    const handleOpen = React.useCallback(() => {
        setOpen(!open)
    }, [open])

    const handleNFTType = async (type: string) => {
        if (type === 'qbt') {
            await $alert('현재 준비중 입니다.')
            return
        }
        setTokenType(type)
    }

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
    const openDetailModal = async (token_id, token_type) => {
        const metadata = await getMetadata({
            nftType: token_type,
            tokenId: token_id,
        })

        let contractAddress = ''
        if (token_type === 'saza') {
            contractAddress = process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS
        } else if (token_type === 'gaza') {
            contractAddress = process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS
        }

        setMetadata(metadata)

        setImageUrl(metadata.image)

        const backgroundColor = metadata.attributes.find((item) => {
            return item.trait_type === 'Background'
        })
        setBackgroundColor(backgroundPallete[backgroundColor.value.toLowerCase()])
        handleOpen()
    }

    React.useEffect(() => {
        init()
    }, [session])

    const init = async () => {
        try {
            setIsLoading(true)
            const result = await getUserInfoByWalletAddress(wallet_address)
            const token_type = result.token_type
            const token_id = result.token_id
            let metadata = null

            setCollector_address(result.wallet_address)

            console.log('now setting profile', token_type)

            if (token_type === 'saza' || token_type === 'gaza') {
                metadata = await getMetadata({ nftType: token_type, tokenId: token_id })
                setProfileNFT(metadata)
            } else if (!token_type) {
                console.log(123)
                setProfileNFT('none')
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }

    const updateUserProfile = async ({ tokenId, tokenType }) => {
        setIsLoading(true)
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
            setIsLoading(false)
            // console.log(updateSessionResponse)

            // console.log(response)
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }

    return (
        <>
            <div className="max-w-[1300px] w-full px-[24px]">
                <ProfileSection
                    tokenType={tokenType}
                    isLoading={isLoading}
                    collector_address={collector_address}
                    profileNFT={profileNFT}
                    updateUserProfile={updateUserProfile}
                />

                <div className="flex flex-col justify-center items-start w-full mt-10">
                    <TabComponent tokenType={tokenType} handleNFTType={handleNFTType} />
                    <NFTListComponent
                        wallet_address={wallet_address}
                        tokenType={tokenType}
                        openDetailModal={openDetailModal}
                    />
                </div>
            </div>
            <NFTDetailModalComponent
                collector_address={collector_address}
                metadata={metadata}
                imageUrl={imageUrl}
                backgroundColor={backgroundColor}
                open={open}
                handleOpen={handleOpen}
                updateUserProfile={updateUserProfile}
            />
        </>
    )
}
