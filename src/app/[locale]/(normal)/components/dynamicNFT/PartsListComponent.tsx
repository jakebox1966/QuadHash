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
        console.log(selectedPartsData)
    }, [selectedPartsData])

    return (
        <>
            <CardListComponent>
                {selectedPartsData.availability &&
                    selectedPartsData.pool.length > 0 &&
                    pool.map((item) => (
                        <PartCardComponent
                            key={item}
                            tokenType={tokenType}
                            partsData={partsData}
                            item={item}
                        />
                    ))}

                {!selectedPartsData.availability && selectedPartsData.pool.length === 0 && (
                    <PartCardComponent
                        tokenType={tokenType}
                        partsData={partsData}
                        item={partsData.value}
                    />
                )}
            </CardListComponent>
        </>
    )
}
