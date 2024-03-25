import * as React from 'react'
import Sidebar from './sidebar/Sidebar'

export interface IAdminWrapperProps {}

export default function AdminWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main className="flex flex-row min-h-screen w-full border-black">
                <Sidebar />
                <div className="w-full m-3">{children}</div>
            </main>
        </>
    )
}
