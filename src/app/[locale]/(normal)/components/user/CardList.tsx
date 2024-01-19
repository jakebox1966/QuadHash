'use client'
import * as React from 'react'
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Spinner } from '@material-tailwind/react'

import { getNftsForOwner } from '@/app/api/alchemy/api'
export interface ICardListProps {}

export default function CardList({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex flex-row justify-start items-center border-4 p-5 gap-[10px] rounded-2xl flex-wrap">
                {children}
            </div>
        </>
    )
}
