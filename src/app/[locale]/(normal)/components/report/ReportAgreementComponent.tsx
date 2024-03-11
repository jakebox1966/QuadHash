'use client'

import * as React from 'react'
import { Button, Checkbox, Typography } from '@material-tailwind/react'

export interface IReportAgreementComponentProps {
    allAgreed: boolean
    setAllAgreed: React.Dispatch<React.SetStateAction<boolean>>
    agreements: {
        firstTerm: boolean
        secondTerm: boolean
        thirdTerm: boolean
        fourthTerm: boolean
        // fifthTerm: boolean
    }
    setAgreements: React.Dispatch<
        React.SetStateAction<{
            firstTerm: boolean
            secondTerm: boolean
            thirdTerm: boolean
            fourthTerm: boolean
            // fifthTerm: boolean
        }>
    >
    handleAgreementChange: (e: {
        target: {
            name: any
            checked: any
        }
    }) => void
    handleAllAgreementChange: (e: {
        target: {
            checked: any
        }
    }) => void
}

export default function ReportAgreementComponent({
    allAgreed,
    agreements,
    handleAgreementChange,
    handleAllAgreementChange,
}: IReportAgreementComponentProps) {
    return (
        <>
            <div className="flex flex-col w-full justify-center items-center lg:pt-[96px] gap-[100px]">
                <div className="flex flex-col justify-start items-center gap-[12px] w-full">
                    <div className="text-[#F46221] text-[16px] font-black">
                        QUADHASH HACKING REPORT
                    </div>
                    <div className="text-[35px] lg:text-[36px] font-black">해킹 신고 센터</div>
                    <div>STEP. 1</div>
                    <div className="text-gray-900/40">약관에 동의해 주세요.</div>
                </div>
                <div className="flex flex-col gap-5 ">
                    <div className="text-[20px] lg:text-[36px] font-black flex flex-row justify-start items-center gap-3">
                        <div>주의사항 및 신고 안내 가이드</div>
                    </div>
                    <div className="flex flex-row justify-start items-start gap-2">
                        <Checkbox
                            ripple={false}
                            id="allAghreed"
                            name="allAgreed"
                            className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                            crossOrigin={undefined}
                            checked={allAgreed}
                            onChange={handleAllAgreementChange}
                        />
                        <div className="text-[12px] p-3 lg:text-[20px]">전체동의</div>
                    </div>

                    <div className="flex flex-row justify-start items-start gap-2">
                        <Checkbox
                            ripple={false}
                            name="firstTerm"
                            className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                            crossOrigin={undefined}
                            checked={agreements.firstTerm}
                            onChange={handleAgreementChange}
                        />
                        <div className="text-[12px] p-3 lg:text-[20px]">
                            해킹 피해 신고를 위해 제공된 모든 정보가 사실임을 확신하며, 만일 기재된
                            정보가 사실과 다르거나 고의적으로 생략되었을 경우 발생하는 모든 문제와
                            책임은 신고자에게 있습니다. (법적분쟁 발생 시 사법기관의 요청에 따라
                            신고자의 개인정보가 제공될 수 있습니다.)
                        </div>
                    </div>
                    <div className="flex flex-row justify-start items-start gap-2">
                        <Checkbox
                            ripple={false}
                            name="secondTerm"
                            className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                            crossOrigin={undefined}
                            checked={agreements.secondTerm}
                            onChange={handleAgreementChange}
                        />
                        <div className="text-[12px] p-3 lg:text-[20px]">
                            본 서비스는 피해 발생 시점의 온체인 데이터를 기준으로 7일 이내에 신고된
                            해킹 피해에 대해서만 지원됩니다. 단, 이미 거래가 되었거나 이동이 발생한
                            경우에는 신고 시점과 관계 없이 서비스 지원이 제한될 수 있습니다. 또한
                            신고 접수 이후 서비스 제공 중에 거래 또는 이동이 발생한 경우에도 서비스
                            지원이 중단될 수 있습니다.
                        </div>
                    </div>
                    <div className="flex flex-row justify-start items-start gap-2">
                        <Checkbox
                            ripple={false}
                            name="thirdTerm"
                            className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                            crossOrigin={undefined}
                            checked={agreements.thirdTerm}
                            onChange={handleAgreementChange}
                        />
                        <div className="text-[12px] p-3 lg:text-[20px]">
                            해킹 신고 접수가 완료된 계정이나 토큰은 조사 및 복구를 위해 일시적으로
                            이용이 제한될 수 있습니다.
                        </div>
                    </div>
                    <div className="flex flex-row justify-start items-start gap-2">
                        <Checkbox
                            ripple={false}
                            name="fourthTerm"
                            className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                            crossOrigin={undefined}
                            checked={agreements.fourthTerm}
                            onChange={handleAgreementChange}
                        />
                        <div className="text-[12px] p-3 lg:text-[20px]">
                            이상 위의 모든 조항을 충분히 이해하고, 이에 동의합니다.
                        </div>
                    </div>
                    {/* <div className="flex flex-row justify-start items-start gap-2">
                        <Checkbox
                            ripple={false}
                            name="fifthTerm"
                            className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                            crossOrigin={undefined}
                            checked={agreements.fifthTerm}
                            onChange={handleAgreementChange}
                        />
                        <div className="text-[12px] p-3 lg:text-[20px]">
                            이상 위의 모든 조항을 충분히 이해하고, 이에 동의합니다.
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}
