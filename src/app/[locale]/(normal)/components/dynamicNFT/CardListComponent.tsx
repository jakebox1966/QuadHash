'use client'

import * as React from 'react'

export default function CardListComponent({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row justify-start items-center gap-[10px] rounded-2xl flex-wrap pt-[32px] w-full">
            {children}
        </div>
    )
}
