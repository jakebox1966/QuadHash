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
            <div className="!z-[9999]">
                <Dialog open={open} handler={onClickCancel} placeholder={undefined}>
                    <DialogHeader className="flex flex-col items-start" placeholder={undefined}>
                        <Typography className="mb-1" variant="h4" placeholder={undefined}>
                            Confirm
                        </Typography>
                    </DialogHeader>
                    <DialogBody placeholder={undefined}>{message ? message : ''}</DialogBody>
                    <DialogFooter placeholder={undefined}>
                        <Button
                            variant="gradient"
                            color="gray"
                            onClick={onClickCancel}
                            className="mr-1"
                            placeholder={undefined}>
                            <span>CANCEL</span>
                        </Button>
                        <Button
                            variant="gradient"
                            color="gray"
                            onClick={onClickOK}
                            placeholder={undefined}>
                            <span>OK</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </div>
        </>
    )
}
