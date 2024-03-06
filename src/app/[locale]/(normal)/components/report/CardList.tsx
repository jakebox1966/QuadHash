import * as React from 'react'

export interface ICardListProps {}

export default function CardList({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex flex-row justify-start items-center gap-[10px] rounded-2xl flex-wrap w-full">
                {children}
            </div>
        </>
    )
}
