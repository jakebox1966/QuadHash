/* eslint-disable @typescript-eslint/no-explicit-any */

import { JWT } from 'next-auth/jwt'

/**
 * 가입이력을 확인
 *
 * @param account
 * @returns string
 */
export const getUuidByAccount = async (wallet_address: any | string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/users/${wallet_address}/nonce`,
    )
    const result = await response.json()
    return result
}

/**
 * 회원가입
 *
 * @param formData
 * @returns
 */
export const signUpUser = async (formData: FormData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/users`, {
        method: 'POST',
        body: formData,
    })

    const result = await response.json()
    return result
}

/**
 * 로그인(jwt생성 및 반환)
 *
 * @param formData
 * @returns object
 */
export const signInUser = async (formData: FormData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/sessions`, {
        method: 'POST',
        body: formData,
    })

    const result = await response.json()
    return result
}

/**
 * 회원정보
 *
 * @param access_token
 * @returns object
 */
export const getUserInfo = async (access_token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/users`, {
        method: 'GET',
        headers: { Authorization: access_token },
    })

    const result = await response.json()

    return result
}
/**
 *
 * 회원정보 (collection 페이지 => collector 페이지 이동 시, wallet_address로 사용자 정보 받아오기 위한 API)
 *
 * @param wallet_address
 * @returns
 */
export const getUserInfoByWalletAddress = async (wallet_address: string) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/users/${wallet_address}/info`,
        {
            method: 'GET',
        },
    )

    const result = await response.json()

    return result
}

/**
 * jwt refresh_token으로 access_token 재요청
 *
 * @param refresh_token
 * @returns string
 */
export const refreshToken = async (last_token: JWT) => {
    console.log('from api', last_token)

    const refresh_token = last_token.refresh_token
    console.log('refreshToken=====>', refresh_token)
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/sessions/new?refresh_token=${refresh_token}`,
    )

    const result = await response.json()
    return result
}
