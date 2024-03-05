/**
 * 설정된 NFT토큰 아이디 변경
 *
 * @param tokenId
 * @returns
 */

import { getSession } from 'next-auth/react'

export const updateUserProfileTokenId = async (parameter: {
    token_id: string
    token_type: string
    wallet_signature: any
    wallet_address: any
}) => {
    const session = await getSession()

    const result = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/users/${session.user.id}`,
        {
            method: 'PATCH',
            cache: 'no-store',
            headers: {
                Authorization: session.user.access_token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameter),
        },
    )

    console.log(result)
    // return await result.json()
}
