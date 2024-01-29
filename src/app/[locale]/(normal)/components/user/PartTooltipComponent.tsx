'use client'
import * as React from 'react'
import { Tooltip, Typography } from '@material-tailwind/react'

export interface IPartTooltipComponentProps {
    partKey: string
    partValue: string
    partIcon: string
}

export default function PartTooltipComponent({
    partKey,
    partValue,
    partIcon,
}: IPartTooltipComponentProps) {
    return (
        <>
            <Tooltip
                placement="right-start"
                className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 z-[9999]"
                content={
                    <div className="w-full">
                        <Typography
                            color="blue-gray"
                            className="font-medium"
                            placeholder={undefined}>
                            {partKey}
                        </Typography>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-80"
                            placeholder={undefined}>
                            {partValue}
                        </Typography>
                    </div>
                }>
                <div>
                    <img src={partIcon} alt={partIcon} />
                </div>
            </Tooltip>
        </>
    )
}
