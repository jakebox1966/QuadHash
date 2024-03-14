'use client'

import * as React from 'react'
import { useInfiniteQuery } from 'react-query'

export interface ICardListComponentProps {
    tokenType: string

    openDetailModal: (token_id: any, token_type: any) => Promise<void>
}

export default function CardListComponent({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row justify-start items-center gap-[26px] rounded-2xl flex-wrap pt-[32px] w-full">
            {children}
        </div>
    )
}
