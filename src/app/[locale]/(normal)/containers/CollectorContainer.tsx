'use client'

import * as React from 'react'
import ProfileSection from '../components/collector/ProfileSection'
import NFTSection from '../components/collector/NFTSection'
import { signOut, useSession } from 'next-auth/react'
import { getMetadata } from '@/app/api/dynamicNFT/api'
import { updateUserProfileTokenId } from '@/app/api/collector/api'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import { getAccounts, personalSign } from '@/app/api/wallet/api'
import { getUserInfoByWalletAddress, getUuidByAccount } from '@/app/api/auth/api'
import { getNFTMetadata, getNftsForOwner, getOwnerForNft } from '@/app/api/alchemy/api'
import TabComponent from '../components/collector/TabComponent'
import NFTDetailModalComponent from '../components/collector/NFTDetialModalComponent'
import NFTListComponent from '../components/collector/NFTListComponent'
import { backgroundPallete } from '../../common/color/colorPalette'
import { setActive } from '@material-tailwind/react/components/Tabs/TabsContext'
import CardLoading from '../../common/components/CardLoading'
import { AlertContext } from '@/app/provider/AlertProvider'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'
import { ToastContext } from '@/app/provider/ToastProvider'

export interface ICollectorContainerProps {
    wallet_address: string
}

const { useRouter } = createSharedPathnamesNavigation({ locales })
export default function CollectorContainer({ wallet_address }: ICollectorContainerProps) {
    const router = useRouter()
    const { showToast } = React.useContext(ToastContext)
    const { $alert } = React.useContext(AlertContext)
    const [isLoading, setIsLoading] = React.useState(false)
    const [profileNFT, setProfileNFT] = React.useState(null)
    const [tokenType, setTokenType] = React.useState('saza')

    const [backgroundColor, setBackgroundColor] = React.useState(null)
    const [metadata, setMetadata] = React.useState(null)
    const [imageUrl, setImageUrl] = React.useState(null)

    const [nftCount, setNftCount] = React.useState({
        sazaCount: 0,
        gazaCount: 0,
    })

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

    const getCountForNFT = async () => {
        const response = await getNftsForOwner(wallet_address, {
            contractAddresses: [
                process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS,
                process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS,
            ],
        })

        const sazaCount = response.ownedNfts.filter(
            (item: any) => item.contract.address === process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS,
        )

        const gazaCount = response.ownedNfts.filter(
            (item: any) => item.contract.address === process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS,
        )

        setNftCount({
            sazaCount: sazaCount.length,
            gazaCount: gazaCount.length,
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

        setImageUrl(`${metadata.image}?${new Date().getTime()}`)

        const backgroundColor = metadata.attributes.find((item) => {
            return item.trait_type === 'Background'
        })
        setBackgroundColor(backgroundPallete[backgroundColor.value.toLowerCase()])
        handleOpen()
    }

    React.useEffect(() => {
        init()
    }, [session])

    const disconnect = async () => {
        await window.ethereum.request({
            method: 'wallet_revokePermissions',
            params: [
                {
                    eth_accounts: wallet.accounts[0],
                },
            ],
        })
        signOut({ redirect: true, callbackUrl: '/' })
    }

    const init = async () => {
        try {
            await getCountForNFT()
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
                setProfileNFT('none')
            }

            // 로그인 시 받아온 NFT tokenId가 로그인된 사용자의 NFT인지 확인하고 Profile 이미지와 session 업데이트
            const isOwner = await checkOwner(token_id)
            if (!isOwner) {
                setProfileNFT('none')
                // disconnect()
            }

            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }

    const checkOwner = async (tokenId) => {
        let result
        if (tokenType === 'saza') {
            result = await getOwnerForNft(process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS, tokenId)
        } else if (tokenType === 'gaza') {
            result = await getOwnerForNft(process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS, tokenId)
        }

        if (result.owners[0].toLowerCase() === wallet.accounts[0].toLowerCase()) {
            return true
        }
        return false
    }

    const updateUserProfile = async ({ tokenId, tokenType }) => {
        console.log(tokenType)
        setIsLoading(true)
        try {
            const isOwner = await checkOwner(tokenId)

            console.log('isOwner?', isOwner)
            if (!isOwner) {
                router.push('/access-denied')
                return
            }

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
            console.log(response)
            if (response.ok) {
                const updateSessionResponse = await updateSession(tokenId, tokenType)

                if (tokenType === 'reset') {
                    showToast('프로필 해제 완료')
                } else {
                    showToast('프로필 설정 완료')
                }
                setOpen(false)
                window.scrollTo(0, 0)
                setIsLoading(false)
            } else {
                throw new Error()
            }
            // console.log(updateSessionResponse)

            // console.log(response)
        } catch (error) {
            showToast('프로필 설정 실패')
            setIsLoading(false)
            console.error(error)
        }
    }

    return (
        <>
            <div className="max-w-[1400px] w-full px-5 lg:px-[50px]">
                <ProfileSection
                    tokenType={tokenType}
                    isLoading={isLoading}
                    collector_address={collector_address}
                    profileNFT={profileNFT}
                    updateUserProfile={updateUserProfile}
                />

                <div className="flex flex-col justify-center items-start w-full mt-10">
                    <div className="text-[24px] font-[700] mb-[50px]">Collectables</div>
                    <TabComponent
                        tokenType={tokenType}
                        handleNFTType={handleNFTType}
                        nftCount={nftCount}
                    />
                    <NFTListComponent
                        wallet_address={wallet_address}
                        tokenType={tokenType}
                        openDetailModal={openDetailModal}
                    />
                </div>
            </div>
            <NFTDetailModalComponent
                collector_address={wallet_address}
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
