import Image from 'next/image'
import * as React from 'react'
import logo from '/logo.svg'

export interface ILogoProps {}

export default function Logo(props: ILogoProps) {
    return (
        <>
            <div className="flex-1 items-center">
                <Image alt="quadhash_logo" src={'/logo/logo.svg'} width={150} height={200} />
            </div>
        </>
    )
}
