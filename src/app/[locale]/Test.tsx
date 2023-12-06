import * as React from 'react'

export interface ITestProps {}

export default function Test(props: ITestProps) {
    return (
        <div>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 z-[99999]">
                <button className="bg-white text-white p-3 rounded-lg opacity-30">123</button>
            </div>
            <div className="bg-gradient-to-r from-light-blue-600 to-indigo-500 p-4">
                <button className="bg-white/30 p-3 rounded-lg">
                    <span className="text-white">123</span>
                </button>
            </div>
            <div className="bg-gradient-to-b from-deep-orange-500 to-white p-4">
                <button className="bg-white text-white p-3 rounded-lg opacity-30">123</button>
            </div>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4">
                <button className="bg-white text-white p-3 rounded-lg opacity-30">123</button>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4">
                <button className="bg-white text-white p-3 rounded-lg opacity-30">123</button>
            </div>
        </div>
    )
}
