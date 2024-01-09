import * as React from 'react'

export interface ITestProps {}

export default function Test(props: ITestProps) {
    return (
        <>
            <img className=" " src="/1.png" alt="" />
            <img className="" src="/item1.jpeg" alt="" />
            <img className="" src="/item2.png" alt="" />

            <div className="w-full h-full flex flex-row justify-start items-baseline flex-wrap p-4 gap-2">
                <div className="w-full md:w-[50%] lg:w-[calc(25%-7px)] h-full visible">
                    <img className=" " src="/1.png" alt="" />
                </div>
                <div className="w-full md:w-[50%] lg:w-[calc(25%-7px)] h-full visible bg-green-300">
                    <img
                        className="w-full h-full object-cover object-center "
                        src="/question-mark.svg"
                        alt=""
                    />
                </div>
                <div className="w-full md:w-[50%] lg:w-[calc(25%-7px)] visible bg-green-300">
                    <img
                        className="w-full h-full object-cover object-center "
                        src="/question-mark.svg"
                        alt=""
                    />
                </div>
                <div className="w-full md:w-[50%] lg:w-[calc(25%-7px)] visible bg-green-300">
                    <img className="" src="/item1.jpeg" alt="" />
                </div>
                <div className="w-full md:w-[50%] lg:w-[calc(25%-7px)] visible bg-green-300">
                    <img className="" src="/item2.png" alt="" />
                </div>
                <div className="w-full md:w-[50%] lg:w-[calc(25%-7px)] visible bg-green-300">
                    <img
                        className="w-full h-full object-cover object-center "
                        src="/question-mark.svg"
                        alt=""
                    />
                </div>
                <div className="w-full md:w-[50%] lg:w-[calc(25%-7px)] visible bg-green-300">
                    <img
                        className="w-full h-full object-cover object-center "
                        src="/question-mark.svg"
                        alt=""
                    />
                </div>
                <div className="w-full md:w-[50%] lg:w-[calc(25%-7px)] visible bg-green-300">
                    <img
                        className="w-full h-full object-cover object-center "
                        src="/question-mark.svg"
                        alt=""
                    />
                </div>
                <div className="w-full md:w-[50%] lg:w-[calc(25%-7px)] visible bg-green-300">
                    <img
                        className="w-full h-full object-cover object-center "
                        src="/question-mark.svg"
                        alt=""
                    />
                </div>
            </div>
        </>
    )
}
