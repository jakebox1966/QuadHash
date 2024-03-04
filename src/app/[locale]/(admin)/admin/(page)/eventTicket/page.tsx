import * as React from 'react'
import EventTicketContainer from '../../containers/EventTicketContainer'

export interface IEventTicketPageProps {}

export default function EventTicketPage(props: IEventTicketPageProps) {
    return (
        <>
            <EventTicketContainer />
        </>
    )
}
