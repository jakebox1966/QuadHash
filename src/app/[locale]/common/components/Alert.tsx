import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    ThemeProvider,
} from '@material-tailwind/react'
import { dialogTheme } from '../materialUI/theme'

interface IAlertProps {
    open: boolean
    message: string
    onClose: any
}

export function Alert({ open, message, onClose }: IAlertProps) {
    return (
        <>
            <div className="!z-[9999]">
                <ThemeProvider value={dialogTheme}>
                    <Dialog
                        open={open}
                        handler={onClose}
                        size="sm"
                        placeholder={undefined}
                        className="shadow-xl">
                        <DialogBody placeholder={undefined} className="p-[24px]">
                            <div className="flex flex-row items-center gap-5 relative w-full">
                                <div className="flex flex-col text-black gap-2 w-full ">
                                    <div className="font-Poppins_semiBold text-[16px]">
                                        QUADHASH
                                    </div>

                                    <div className="absolute right-0 top-0 translate-y-1/2">
                                        <img
                                            src="/exit.svg"
                                            alt="exit"
                                            onClick={onClose}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                    <div
                                        className="text-[13px] !font-Poppins_light !leading-[30px] w-full"
                                        dangerouslySetInnerHTML={{
                                            __html: message ? message : '',
                                        }}></div>

                                    <div className="flex flex-row justify-center items-center w-full mt-[32px] gap-[12px]">
                                        <div
                                            className="w-full text-center border-[1px] px-[18px] py-[10px] rounded-[8px] text-[#FFFFFF] cursor-pointer bg-[#F46221] border-[#D92D20] hover:opacity-65 active:opacity-65"
                                            onClick={onClose}>
                                            확인
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogBody>
                        {/* <DialogFooter placeholder={undefined}>
                            <Button
                                onClick={onClose}
                                placeholder={undefined}
                                className=" w-[128px] bg-[#F46221] border-2 border-[#F46221] text-[#FFFFFF]">
                                <span>OK</span>
                            </Button>
                        </DialogFooter> */}
                    </Dialog>
                </ThemeProvider>
            </div>
        </>
    )
}
