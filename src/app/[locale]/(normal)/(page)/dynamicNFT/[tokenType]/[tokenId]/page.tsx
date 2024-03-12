import * as React from 'react'
import DynamicNFTDetailContainer from '../../../../containers/ dynamicNFT/DynamicNFTDetailContainer'
import { getSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOption } from '@/app/api/auth/authOption'
import { getNftsForOwner, getOwnerForNft } from '@/app/api/alchemy/api'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'
import { redirect } from 'next/navigation'
import AccessDeniedErrorPage from '@/app/[locale]/(error)/access-denied/page'

export interface IDynamicDetailPageNFTProps {
    params: {
        tokenType: string
        tokenId: string
    }
}

const checkIsMyNFT = async (tokenType, tokenId) => {
    const session = await getServerSession(authOption)
    console.log('session', session)

    if (session) {
        const wallet_address = session?.user.wallet_address

        let contract_address = ''
        if (tokenType === 'saza') {
            contract_address = process.env.NEXT_PUBLIC_SAZA_CONTRACT_ADDRESS
        } else if (tokenType === 'gaza') {
            contract_address = process.env.NEXT_PUBLIC_GAZA_CONTRACT_ADDRESS
        }

        try {
            const result = await getOwnerForNft(contract_address, tokenId)

            if (result.owners[0].toLowerCase() !== wallet_address.toLowerCase()) {
                return false
            }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}
// const { Link, redirect } = createSharedPathnamesNavigation({ locales })
export default async function DynamicNFTDetailPage({
    params: { tokenType, tokenId },
}: IDynamicDetailPageNFTProps) {
    const result = await checkIsMyNFT(tokenType, tokenId)

    if (!result) {
        redirect('/access-denied')
    }
    return (
        <>
            <DynamicNFTDetailContainer tokenType={tokenType} tokenId={tokenId} />
        </>
    )
}
