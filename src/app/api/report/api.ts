import { IReportParameter } from '@/app/[locale]/(normal)/containers/ReportContainer'
import { getSession } from 'next-auth/react'

export const nftReport = async (parameter: IReportParameter) => {
    const session = await getSession()
    console.log(session)
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/v1/posts`, {
        method: 'POST',
        body: JSON.stringify(parameter),
        headers: { Authorization: session.user.access_token, 'Content-Type': 'application/json' },
    })

    const result = await response.json()
    return result
}
