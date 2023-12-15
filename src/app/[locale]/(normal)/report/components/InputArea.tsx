'use client'

import { Button, Chip, Input, Textarea } from '@material-tailwind/react'
import * as React from 'react'
import { Dispatch, SetStateAction } from 'react'

export interface IInputAreaProps {
    exNftList: string[]
    setExNftList: Dispatch<SetStateAction<string[]>>
}

export default function InputArea({ exNftList }: IInputAreaProps) {
    return (
        <>
            <div className="flex justify-center items-center w-full">
                <div className="w-[80%] flex flex-col justify-center items-center gap-5">
                    <div className="flex flex-row justify-start items-center w-full gap-3">
                        {exNftList.map((nft, index) => (
                            <Chip key={index} value={'A123'} open={true} onClose={() => {}} />
                        ))}
                    </div>
                    <Input label="제목" crossOrigin={undefined} />
                    <Input label="이메일" crossOrigin={undefined} />
                    <Textarea label="내용" />
                    <div className="flex flex-col justify-end items-end  w-full">
                        <Button>SUBMIT</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
