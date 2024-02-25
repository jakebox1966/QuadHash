'use client'
import * as React from 'react'
import TabComponent from '../../components/dynamicNFT/TabComponent'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import NFTListComponent from '../../components/dynamicNFT/NFTListComponent'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'

export interface IDynamicNFTListContainerProps {}

const { usePathname, useRouter, Link } = createSharedPathnamesNavigation({ locales })

export default function DynamicNFTListContainer(props: IDynamicNFTListContainerProps) {
    const [tokenType, setTokenType] = React.useState('saza')
    const router = useRouter()

    const handleNFTType = (type: string) => {
        setTokenType(type)
    }

    const { wallet } = useMetaMask()
    return (
        <>
            <div className="max-w-[1300px] w-full px-[24px]">
                <div className="flex flex-col justify-center items-start w-full mt-10">
                    <TabComponent tokenType={tokenType} handleNFTType={handleNFTType} />
                    <NFTListComponent tokenType={tokenType} wallet_address={wallet.accounts[0]} />
                </div>
            </div>
        </>
    )
}
