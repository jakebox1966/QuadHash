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
            <Dialog open={open} handler={onClose}>
                <DialogHeader className="flex flex-col items-start">
                    <Typography className="mb-1" variant="h4">
                        Alert
                    </Typography>
                </DialogHeader>
                <DialogBody>{message ? message : ''}</DialogBody>
                <DialogFooter>
                    <Button variant="gradient" color="gray" onClick={onClose}>
                        <span>OK</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}
