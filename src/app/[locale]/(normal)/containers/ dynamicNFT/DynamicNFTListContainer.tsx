'use client'
import * as React from 'react'
import TabComponent from '../../components/dynamicNFT/TabComponent'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import NFTListComponent from '../../components/dynamicNFT/NFTListComponent'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'
import { getLockedNFTs } from '@/app/api/collection/api'

export interface IDynamicNFTListContainerProps {}

const { usePathname, useRouter, Link } = createSharedPathnamesNavigation({ locales })

export default function DynamicNFTListContainer(props: IDynamicNFTListContainerProps) {
    const [tokenType, setTokenType] = React.useState('saza')
    const router = useRouter()

    const [lockedNFTs, setLockedNFTs] = React.useState({ saza: [], gaza: [] })

    const handleNFTType = (type: string) => {
        setTokenType(type)
    }

    React.useEffect(() => {
        const getLockedList = async () => {
            const result = await getLockedNFTs()
            console.log(result)
            setLockedNFTs(result?.data)
        }

        getLockedList()
    }, [])

    const { wallet } = useMetaMask()
    return (
        <>
            <div className="max-w-[1400px] w-full px-5 lg:px-[50px]">
                <div className="flex flex-col justify-center items-center w-full mt-10">
                    <TabComponent tokenType={tokenType} handleNFTType={handleNFTType} />
                    <NFTListComponent
                        tokenType={tokenType}
                        wallet_address={wallet.accounts[0]}
                        lockedNFTs={lockedNFTs}
                    />
                </div>
            </div>
        </>
    )
}
