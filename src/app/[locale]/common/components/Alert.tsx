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
            <div className="!z-[9999]">
                <Dialog
                    open={open}
                    handler={onClose}
                    placeholder={undefined}
                    className="border-2 border-black">
                    <DialogBody placeholder={undefined}>
                        <div className="flex flex-row items-start gap-5">
                            <div className="w-[72px] lg:w-[60px] h-auto">
                                <img
                                    src="/alert_icon.svg"
                                    alt="alert_icon"
                                    className="w-full h-auto"
                                />
                            </div>
                            <div className="flex flex-col text-black gap-2">
                                <div className="font-black text-3xl">Alert</div>
                                <div className="font-medium">{message ? message : ''}</div>
                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter placeholder={undefined}>
                        <Button
                            onClick={onClose}
                            placeholder={undefined}
                            className=" w-[128px] bg-[#F46221] border-2 border-[#F46221] text-[#FFFFFF]">
                            <span>OK</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </div>
        </>
    )
}
