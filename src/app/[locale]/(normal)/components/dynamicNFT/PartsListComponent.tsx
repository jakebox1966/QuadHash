import * as React from 'react'
import CardListComponent from './CardListComponent'
import CardComponent from './CardComponent'
import PartCardComponent from './PartCardComponent'

export interface IPartsListComponentProps {
    selectedPartsData: {
        traitType: string
        tokenType: string
        availability: boolean
        pool: string[]
    }
}

export default function PartsListComponent({ selectedPartsData }: IPartsListComponentProps) {
    const { traitType, tokenType, availability, pool } = selectedPartsData
    return (
        <>
            <CardListComponent>
                {pool.map((item) => (
                    <PartCardComponent
                        key={item}
                        tokenType={tokenType}
                        traitType={traitType}
                        item={item}
                    />
                ))}
            </CardListComponent>
        </>
    )
}
