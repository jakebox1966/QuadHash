'use client'

import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'
import * as React from 'react'

export interface IReportSuccessComponentProps {}

const { Link, useRouter } = createSharedPathnamesNavigation({ locales })

export default function ReportSuccessComponent(props: IReportSuccessComponentProps) {
    const router = useRouter()
    React.useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 3000)
    }, [])
    return (
        <>
            <div className="flex flex-col w-full justify-center items-center pt-20 gap-10">
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="text-[#F46221] text-sm  font-black">
                        QUADHASH HACKING REPORT
                    </div>
                    <div className="text-xl lg:text-3xl font-black">해킹 신고 센터</div>
                    <div>STEP. 4</div>
                    <div className="text-gray-900/40 hidden lg:block">
                        해킹신고가 완료 되었습니다. 확인 후 기재해 주신 이메일 주소로 안내해
                        드리겠습니다.
                    </div>

                    <div className="text-gray-900/40 block lg:hidden">
                        <div>해킹 신고 접수가 완료되었습니다.</div>
                        <div>확인 후 기재해 주신 이메일 주소로 안내해 드리겠습니다.</div>
                    </div>
                </div>
            </div>
        </>
    )
}
