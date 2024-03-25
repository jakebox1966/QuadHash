'use client'
import * as React from 'react'
import { Button, IconButton } from '@material-tailwind/react'
// import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

export interface IPaginationProps {
    fetchData: (pageParam: number) => Promise<void>
    listData: any
    activePage: number
    setActivePage: React.Dispatch<React.SetStateAction<number>>
}

export default function Pagination({
    fetchData,
    listData,
    activePage,
    setActivePage,
}: IPaginationProps) {
    const { paging } = listData
    const getItemProps = (index) =>
        ({
            variant: activePage === index ? 'filled' : 'text',
            color: 'gray',
            onClick: () => setActivePage(index),
        }) as any

    const next = () => {
        if (activePage === paging.total_pages) return

        setActivePage(activePage + 1)
    }

    const prev = () => {
        if (activePage === 1) return

        setActivePage(activePage - 1)
    }

    return (
        <div className="flex items-center gap-4">
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={prev}
                disabled={activePage === 1}
                placeholder={undefined}>
                {/* <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />  */}
                Previous
            </Button>
            <div className="flex items-center gap-2">
                {Array(paging.total_pages)
                    .fill(0)
                    .map((__, index) => (
                        <IconButton key={`${paging}_${index}`} {...getItemProps(index + 1)}>
                            {index + 1}
                        </IconButton>
                    ))}
            </div>
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={next}
                disabled={activePage === paging.total_pages}
                placeholder={undefined}>
                Next
                {/* <ArrowRightIcon strokeWidth={2} className="h-4 w-4" /> */}
            </Button>
        </div>
    )
}