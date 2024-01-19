'use client'

import * as React from 'react'
import { Button, Checkbox } from '@material-tailwind/react'

export interface IReportAgreementComponentProps {
    allAgreed: boolean
    setAllAgreed: React.Dispatch<React.SetStateAction<boolean>>
    agreements: {
        firstTerm: boolean
        secondTerm: boolean
        thirdTerm: boolean
        fourthTerm: boolean
        fifthTerm: boolean
        sixthTerm: boolean
    }
    setAgreements: React.Dispatch<
        React.SetStateAction<{
            firstTerm: boolean
            secondTerm: boolean
            thirdTerm: boolean
            fourthTerm: boolean
            fifthTerm: boolean
            sixthTerm: boolean
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
    setAllAgreed,
    agreements,
    setAgreements,
    handleAgreementChange,
    handleAllAgreementChange,
}: IReportAgreementComponentProps) {
    return (
        <>
            <div>
                <div className="text-[#F46221] text-sm  font-black">QUADHASH</div>
                <div className="text-xl lg:text-3xl font-black">해킹 신고 센터</div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="text-xl lg:text-3xl font-black flex flex-row justify-start items-center gap-3">
                    <div>주의사항 및 신고 안내 가이드</div>
                    <div>
                        <Checkbox
                            label="전체동의"
                            ripple={false}
                            name="allAgreed"
                            className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                            crossOrigin={undefined}
                            checked={allAgreed}
                            onChange={handleAllAgreementChange}
                        />
                    </div>
                </div>
                <div>
                    <Checkbox
                        label="해킹 피해 신고를 한 계정에 등록된 개인정보가 허위이거나 부정확하게 기입되어
                        발생하는 모든 문제는 사용자 본인의 책임으로 간주하며, 이에 대해 동의합니다."
                        ripple={false}
                        name="firstTerm"
                        className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                        crossOrigin={undefined}
                        checked={agreements.firstTerm}
                        onChange={handleAgreementChange}
                    />
                </div>
                <div>
                    <Checkbox
                        label="신고된 계정에서 일어난 피해가 본인의 개인정보 유출이나 개인정보 관리 부실
                        등으로 인해 발생하지 않았음을 확인합니다"
                        ripple={false}
                        name="secondTerm"
                        className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                        crossOrigin={undefined}
                        checked={agreements.secondTerm}
                        onChange={handleAgreementChange}
                    />
                </div>
                <div>
                    <Checkbox
                        label="사용자는 토큰 구매와 서비스 이용에 필요한 모든 조건을 충분히 이해하고, 이에
                        동의합니다."
                        ripple={false}
                        name="thirdTerm"
                        className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                        crossOrigin={undefined}
                        checked={agreements.thirdTerm}
                        onChange={handleAgreementChange}
                    />
                </div>
                <div>
                    <Checkbox
                        label="해킹 피해 신고 시 제공한 모든 정보는 사실임을 확신하며, 허위로 기재하거나
                        고의적으로 신고 내용에서 생략한 사실로 인해 발생하는 모든 문제와 책임은
                        본인이 지게 됨을 약속합니다. (이 내용 및 신고 내용은 사법기관[사이버 수사대
                        등]의 공식 요청이 있을 경우 제공될 수 있습니다.)"
                        ripple={false}
                        name="fourthTerm"
                        className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                        crossOrigin={undefined}
                        checked={agreements.fourthTerm}
                        onChange={handleAgreementChange}
                    />
                </div>
                <div>
                    <Checkbox
                        label="해킹 신고에 대해 정상적으로 신고 접수가 완료된 계정은 조사 및 복구를 위해 일시적으로 이용이 제한될 수 있음을 이해하고 동의합니다. 복구가 완료될 때까지 이용이 제한될 수 있습니다."
                        ripple={false}
                        name="fifthTerm"
                        className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                        crossOrigin={undefined}
                        checked={agreements.fifthTerm}
                        onChange={handleAgreementChange}
                    />
                </div>
                <div>
                    <Checkbox
                        label="이상 위의 모든 조항을 충분히 이해하고, 이에 동의합니다."
                        ripple={false}
                        name="sixthTerm"
                        className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                        crossOrigin={undefined}
                        checked={agreements.sixthTerm}
                        onChange={handleAgreementChange}
                    />
                </div>
            </div>

            <div className="w-full flex flex-row justify-end items-center gap-3 text-white">
                {/* <Button
                        variant="outlined"
                        className="rounded-lg border-[#F46221] text-[#F46221]  px-10 shadow-lg"
                        // disabled={isConnecting}
                        placeholder={undefined}>
                        <span>취소</span>
                    </Button> */}
                <Button
                    className="rounded-lg px-10 bg-[#F46221] shadow-lg text-white"
                    disabled={!allAgreed}
                    placeholder={undefined}
                    // onClick={() => {
                    //     router.push('/report/nft-list')
                    // }}
                >
                    <span>확인</span>
                </Button>
            </div>
        </>
    )
}
