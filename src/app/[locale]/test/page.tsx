import * as React from 'react'

export interface ITestProps {}

export default function Test(props: ITestProps) {
    return (
        <div className="card">
            <div className="card-front">국민카드</div>
            <div className="card-back">뒷면!!</div>
        </div>
    )
}
