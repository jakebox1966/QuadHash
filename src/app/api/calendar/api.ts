import { getSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOption } from '../auth/authOption'

export const getCalendars = async (pageParam: number) => {
    // const session = await getSession()
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/calendars?page=${pageParam}`,
        {
            method: 'GET',
            cache: 'no-store',
            headers: {
                // Authorization: session.user.access_token,
                'Content-Type': 'application/json',
            },
        },
    )

    const result = await response.json()
    return result
}

export const getCalendar = async (id: string) => {
    const session = await getServerSession(authOption)
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/calendars/${id}`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            Authorization: session.user.access_token,
            'Content-Type': 'application/json',
        },
    })

    const result = await response.json()
    return result
}

export const getCalendarFromClient = async (id: string) => {
    const session = await getSession()
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/calendars/${id}`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            Authorization: session.user.access_token,
            'Content-Type': 'application/json',
        },
    })

    const result = await response.json()
    return result
}

export const deleteCalendar = async (id: string) => {
    const session = await getSession()
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/calendars/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: session.user.access_token,
            'Content-Type': 'application/json',
        },
    })
}

export const postCalendar = async (formData) => {
    const session = await getSession()
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/calendars`, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: session.user.access_token,
            // 'Content-Type': 'multipart/form-data',
        },
    })

    const result = await response.json()
    return result
}

export const putCalendar = async (id, formData) => {
    const session = await getSession()
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/calendars/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {
            Authorization: session.user.access_token,
        },
    })
}
