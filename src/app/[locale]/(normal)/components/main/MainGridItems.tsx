import Image from 'next/image'
import * as React from 'react'

export interface IMainGridItemsProps {}

export default function MainGridItems(props: IMainGridItemsProps) {
    return (
        <>
            <div className="w-full">
                <div className="main_grid_section gap-2">
                    <div className="border-2 rounded-lg overflow-hidden aspect-[1/1]">
                        <img
                            className="w-full h-full object-contain p-3 dark:fill-white"
                            src="/logo2.svg"
                            alt="123"
                        />
                    </div>
                    <div className="col-span-2 rounded-lg overflow-hidden aspect-[1/1]">
                        <img className="w-full h-full object-cover" src="/1.png" alt="1.png" />
                    </div>
                    <div className="border-2 rounded-lg flex flex-col justify-center items-center overflow-hidden">
                        <div className="text-sm text-gray-600">JOIN US ON</div>
                        <img src="/twitter.svg" alt="twitter" />
                    </div>
                    <div className="border-2 rounded-lg overflow-hidden"></div>
                    <div className="col-span-2 rounded-lg overflow-hidden">
                        <img className="w-full h-full object-cover" src="/1.png" alt="1.png" />
                    </div>
                    <div className="border-2 rounded-lg flex flex-col justify-center items-center overflow-hidden">
                        <div className="text-sm text-gray-600">JOIN US ON</div>
                        <img src="/instagram.svg" alt="instagram" />
                    </div>
                    <div className="border-2 rounded-lg overflow-hidden"></div>
                    <div className="border-2 rounded-lg overflow-hidden"></div>
                    <div className="border-2 rounded-lg flex flex-col justify-center items-center overflow-hidden">
                        <div className="text-sm text-gray-600">JOIN US ON</div>
                        <img src="/discord.png" alt="discord" />
                    </div>
                    <div className="border-2 rounded-lg overflow-hidden"></div>
                    <div className="border-2 rounded-lg overflow-hidden"></div>
                    <div className="col-span-2 rounded-lg overflow-hidden">
                        <img className="w-full h-full object-cover" src="/1.png" alt="1.png" />
                    </div>
                </div>
            </div>
        </>
    )
}
