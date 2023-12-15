import * as React from 'react'
import Sidebar from './sidebar/Sidebar'

export interface IAdminWrapperProps {}

export default function AdminWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main className="flex flex-row min-h-screen w-full bg-green-300 p-4 border-black">
                <Sidebar />
                <div className="w-full bg-red-300">{children}</div>
            </main>
        </>
    )
}
