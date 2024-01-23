import * as React from 'react'
import ProfileSection from '../components/user/ProfileSection'
import NFTSection from '../components/user/NFTSection'

export interface IUserContainerProps {}

export default function UserContainer(props: IUserContainerProps) {
    return (
        <>
            <div className="max-w-[1296px]">
                <ProfileSection />
                <NFTSection />
            </div>
        </>
    )
}
