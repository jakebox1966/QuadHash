import * as React from 'react'
import UserContainer from '../containers/UserContainer'

export interface IUserPageProps {}

export default function UserPage(props: IUserPageProps) {
    return (
        <>
            <UserContainer />
        </>
    )
}
