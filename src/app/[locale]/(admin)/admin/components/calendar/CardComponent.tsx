'use client'
import { locales } from '@/i18nconfig'

import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import * as React from 'react'

export interface ICardComponentProps {
    item: any
}

const { Link } = createSharedPathnamesNavigation({ locales })
export default function CardComponent({ item }: ICardComponentProps) {
    return (
        <>
            <div className="w-[calc(50%-5px)] lg:w-[calc(25%-10px)]">
                <div className="overflow-hidden rounded-lg aspect-square shadow-xl">
                    <div className="relative cursor-pointer transition-all hover:opacity-75 hover:scale-110 w-full h-full">
                        <Link href={`/admin/calendar/${item.id}`}>
                            <img
                                // src={`${process.env.NEXT_PUBLIC_SAZA_S3_IMG_URL}/${item.image}`}
                                src={`/1.png`}
                                width="100%"
                                height="auto"
                                alt="nft-image"
                            />
                        </Link>
                    </div>
                </div>
                <div className="w-full text-xs lg:text-base text-center transition-all z-20 p-1 font-medium cursor-pointer">
                    <div className="text-[10.4px] text-[#7A7A7A]">{item.title}</div>
                </div>
            </div>
        </>
    )
}
