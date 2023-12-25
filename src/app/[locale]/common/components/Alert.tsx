import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
} from '@material-tailwind/react'

interface IAlertProps {
    open: boolean
    message: string
    onClose: any
}

export function Alert({ open, message, onClose }: IAlertProps) {
    return (
        <>
            <Dialog open={open} handler={onClose} placeholder={undefined}>
                <DialogHeader className="flex flex-col items-start" placeholder={undefined}>
                    <Typography className="mb-1" variant="h4" placeholder={undefined}>
                        Alert
                    </Typography>
                </DialogHeader>
                <DialogBody placeholder={undefined}>{message ? message : ''}</DialogBody>
                <DialogFooter placeholder={undefined}>
                    <Button
                        variant="gradient"
                        color="gray"
                        onClick={onClose}
                        placeholder={undefined}>
                        <span>OK</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}
