import { getCalendar } from '@/app/api/calendar/api'
import * as React from 'react'
import CalendarDetailContainer from '../../../containers/ calendar/CalendarDetailContainer'

export interface ICalendarDetailPageProps {
    params: {
        id: string
    }
}

export default async function CalendarDetailPage({ params: { id } }: ICalendarDetailPageProps) {
    const result = await getCalendar(id)
    console.log('result', result)
    return (
        <>
            <CalendarDetailContainer calendar={result.data} />
        </>
    )
}
