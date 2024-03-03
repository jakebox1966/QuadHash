import * as React from 'react'
import CardListComponent from './CardListComponent'
import CardComponent from './CardComponent'
import PartCardComponent from './PartCardComponent'

export interface IPartsListComponentProps {
    selectedPartsData: {
        partsData: {
            trait_type: string
            value: string
        }
        tokenType: string
        availability: boolean
        pool: string[]
    }
}

export default function PartsListComponent({ selectedPartsData }: IPartsListComponentProps) {
    const { partsData, tokenType, pool } = selectedPartsData

    React.useEffect(() => {
        console.log(pool)
    }, [pool])

    return (
        <>
            <CardListComponent>
                {pool.map((item) => (
                    <PartCardComponent
                        key={item}
                        tokenType={tokenType}
                        partsData={partsData}
                        item={item}
                    />
                ))}
            </CardListComponent>
        </>
    )
}
