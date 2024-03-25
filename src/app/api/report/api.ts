import { IReportParameter } from '@/app/[locale]/(normal)/containers/ReportContainer'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import { authOption } from '../auth/authOption'

export const postReport = async (parameter: IReportParameter) => {
    const session = await getSession()
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/posts`, {
        method: 'POST',
        body: JSON.stringify(parameter),
        headers: { Authorization: session.user.access_token, 'Content-Type': 'application/json' },
    })

    const result = await response.json()
    return result
}

export const getReport = async (id: string) => {
    const session = await getServerSession(authOption)
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/posts/${id}`, {
        method: 'GET',
        headers: {
            Authorization: session.user.access_token,
            'Content-Type': 'application/json',
        },
    })

    const result = await response.json()
    return result
}

export const getReports = async (pageParam: number) => {
    const session = await getSession()
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/posts?page=${pageParam}`,
        {
            method: 'GET',
            headers: {
                Authorization: session.user.access_token,
                'Content-Type': 'application/json',
            },
        },
    )

    const result = await response.json()
    return result
}

export const patchReport = async (id: number) => {
    const session = await getSession()

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/posts/${id}}`, {
        method: 'PATCH',
        headers: {
            Authorization: session.user.access_token,
            'Content-Type': 'application/json',
        },
    })

    const result = await response.json()
    return result
}

export const deleteReport = async (id: number) => {
    const session = await getSession()

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/posts/${id}}`, {
        method: 'DELETE',
        headers: {
            Authorization: session.user.access_token,
            'Content-Type': 'application/json',
        },
    })

    const result = await response.json()
    return result
}
