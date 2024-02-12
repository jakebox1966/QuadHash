import * as React from 'react'
import UserContainer from '../../containers/UserContainer'

export interface IUserDetailPageProps {
    params: {
        wallet_address: string
    }
}

export default function UserDetailPage({ params: { wallet_address } }: IUserDetailPageProps) {
    console.log(wallet_address)
    return (
        <>
            <UserContainer wallet_address={wallet_address} />
        </>
    )
}
