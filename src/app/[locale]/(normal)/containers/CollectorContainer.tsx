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
import { getLockedNFTs } from '@/app/api/collection/api'

export interface ICollectorContainerProps {
    wallet_address: string
    isUsingLockedNFT: boolean
}

const { useRouter } = createSharedPathnamesNavigation({ locales })
export default function CollectorContainer({
    wallet_address,
    isUsingLockedNFT,
}: ICollectorContainerProps) {
    const router = useRouter()
    const { showToast } = React.useContext(ToastContext)
    const { $alert } = React.useContext(AlertContext)
    const [isLoading, setIsLoading] = React.useState(false)
    const [profileNFT, setProfileNFT] = React.useState(null)
    const [tokenType, setTokenType] = React.useState('saza')

    const [lockedNFTs, setLockedNFTs] = React.useState({ saza: [], gaza: [] })

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
        if (session && wallet_address) {
            init()
        }
    }, [session, wallet_address, wallet.accounts[0]])

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

            if (result.status !== 'NotFound') {
                const token_type = result.data.token_type
                const token_id = result.data.token_id
                let metadata = null
                setCollector_address(result.data.wallet_address)

                if (token_type === 'saza' || token_type === 'gaza') {
                    metadata = await getMetadata({ nftType: token_type, tokenId: token_id })
                    setProfileNFT(metadata)
                } else if (!token_type) {
                    setProfileNFT('none')
                }
                // 로그인 시 받아온 NFT tokenId가 로그인된 사용자의 NFT인지 확인하고 Profile 이미지와 session 업데이트
                const isOwner = await checkOwner(token_id, token_type)
                console.log(isOwner)
                if (!isOwner) {
                    setProfileNFT('none')
                    // updateSession(token_id, token_type)
                }

                // 로그인 시 받아온 NFT tokenId가 Locked 인지 확인하고 Profile 이미지와 session 업데이트
                if (isUsingLockedNFT) {
                    setProfileNFT('none')
                    // updateSession(token_id, token_type)
                }
            } else {
                setProfileNFT('none')
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }

    React.useEffect(() => {
        const getLockedList = async () => {
            const result = await getLockedNFTs()
            setLockedNFTs(result?.data)
        }
        getLockedList()
    }, [])

    const checkOwner = async (tokenId, tokenType) => {
        let result
        if (tokenType === 'saza') {
            result = await getOwnerForNft(process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS, tokenId)
        } else if (tokenType === 'gaza') {
            result = await getOwnerForNft(process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS, tokenId)
        }

        console.log('tokenType===>', tokenType)
        console.log('result=====>', result)
        // return true
        if (result && wallet.accounts[0]) {
            console.log('주인은', result.owners[0])
            console.log('지갑주소는', wallet.accounts[0])

            console.log(result.owners[0].toLowerCase() === wallet.accounts[0].toLowerCase())
            if (result.owners[0].toLowerCase() === wallet.accounts[0].toLowerCase()) {
                return true
            }
            return false
        }
    }

    const updateUserProfile = async ({ tokenId, tokenType }) => {
        setIsLoading(true)
        try {
            const isOwner = await checkOwner(tokenId, tokenType)

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
            if (response.ok) {
                const updateSessionResponse = await updateSession(tokenId, tokenType)

                if (tokenType === 'reset') {
                    showToast('프로필 해제 완료', true)
                } else {
                    showToast('프로필 설정 완료', true)
                }
                setOpen(false)
                window.scrollTo(0, 0)
                setIsLoading(false)
            } else {
                throw new Error()
            }
        } catch (error) {
            showToast('프로필 설정 실패', false)
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
                    collector_address={wallet_address}
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
                        lockedNFTs={lockedNFTs}
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
