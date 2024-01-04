import { getSession } from 'next-auth/react'

export const postDynamicNFT = async (parameter: any) => {
    const session = await getSession()
    const result = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/nfts/dynamic`, {
        method: 'POST',
        body: JSON.stringify(parameter),
        headers: {
            Authorization: session.user.access_token,
            'Content-Type': 'application/json',
        },
    })
    return result
}
