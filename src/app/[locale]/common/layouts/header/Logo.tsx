import Image from 'next/image'
import * as React from 'react'

export interface ILogoProps {}

export default function Logo(props: ILogoProps) {
    return (
        <>
            <div className="min-w-max">
                <Image alt="logo" src={'/logo/logo.svg'} width={100} height={100} />
            </div>
        </>
    )
}
