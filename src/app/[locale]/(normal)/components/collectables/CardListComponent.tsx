import * as React from 'react'

export interface ICardListComponentProps {}

export default function CardListComponent({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row justify-start items-center gap-[26px] rounded-2xl flex-wrap lg:pt-[30px] w-full">
            {children}
        </div>
    )
}
