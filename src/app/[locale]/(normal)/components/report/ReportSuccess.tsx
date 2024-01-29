import * as React from 'react'

export interface IReportSuccessComponentProps {}

export default function ReportSuccessComponent(props: IReportSuccessComponentProps) {
    return (
        <>
            <div className="flex flex-col w-full justify-center items-center pt-20 gap-10">
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="text-[#F46221] text-sm  font-black">QUADHASH</div>
                    <div className="text-xl lg:text-3xl font-black">해킹 신고 센터</div>
                    <div>STEP. 3</div>
                    <div className="text-gray-900/40">
                        해킹신고가 완료 되었습니다. 기재해주신 메일을 확인해 주세요.
                    </div>
                </div>
            </div>
        </>
    )
}
