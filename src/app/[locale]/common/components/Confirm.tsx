import React from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
} from '@material-tailwind/react'

interface IConfirmProps {
    open: boolean
    message: string
    onClickOK: any
    onClickCancel: any
}

export function Confirm({ open, message, onClickOK, onClickCancel }: IConfirmProps) {
    return (
        <>
            <Dialog open={open} handler={onClickCancel}>
                <DialogHeader className="flex flex-col items-start">
                    <Typography className="mb-1" variant="h4">
                        Confirm
                    </Typography>
                </DialogHeader>
                <DialogBody>{message ? message : ''}</DialogBody>
                <DialogFooter>
                    <Button
                        variant="gradient"
                        color="gray"
                        onClick={onClickCancel}
                        className="mr-1">
                        <span>CANCEL</span>
                    </Button>
                    <Button variant="gradient" color="gray" onClick={onClickOK}>
                        <span>OK</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}
