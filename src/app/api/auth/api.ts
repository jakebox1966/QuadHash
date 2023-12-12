/* eslint-disable @typescript-eslint/no-explicit-any */

import { JWT } from 'next-auth/jwt'

/**
 * 가입이력을 확인
 *
 * @param account
 * @returns string
 */
export const getUuidByAccount = async (account: any | string) => {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/users/${account}`)
    const response = await fetch(`/api/v1/users/${account}`)
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
 * jwt refresh_token으로 access_token 재요청
 *
 * @param refresh_token
 * @returns string
 */
export const refreshToken = async (last_token: JWT) => {
    const refresh_token = last_token.refresh_token
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/sessions/new?refresh_token=${refresh_token}`,
    )

    const result = await response.json()
    return result
}
