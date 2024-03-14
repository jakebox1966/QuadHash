import * as React from 'react'
import CardLoading from './CardLoading'

export interface ILoadingCardComponentProps {}

export default function LoadingCardComponent(props: ILoadingCardComponentProps) {
    return (
        <>
            <div className="w-[calc(50%-13px)] lg:w-[calc(25%-19.5px)]">
                <div className="overflow-hidden rounded-lg aspect-square">
                    <div className="relative cursor-pointer transition-all bg-gray-300 skeleton_loading hover:opacity-75 hover:scale-110 w-full h-full blur-md">
                        <img src="/1.png" alt="loading" className="invisible" />
                    </div>
                </div>
                <div className="w-full text-xs lg:text-base transition-all z-20 p-1 font-medium cursor-pointer flex flex-col items-center gap-2 mt-1">
                    <div className="skeleton_loading w-1/4 h-[16px]"></div>
                    <div className="skeleton_loading w-1/4 h-[16px]"></div>
                </div>
            </div>
        </>
    )
}
