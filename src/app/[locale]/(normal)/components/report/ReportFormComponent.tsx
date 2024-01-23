import { Checkbox } from '@material-tailwind/react'
import * as React from 'react'

export interface IReportFormComponentProps {
    inputsHandler: (e: React.ChangeEvent) => void
    nameRef: React.MutableRefObject<any>
    titleRef: React.MutableRefObject<any>
    // walletAddressRef: React.MutableRefObject<any>
    NFTListRef: React.MutableRefObject<any>
    emailRef: React.MutableRefObject<any>
    phoneRef: React.MutableRefObject<any>
    contentRef: React.MutableRefObject<any>
    finalAgreement: boolean
    targetList: any[]

    handleFinalAgreementChange: (e: {
        target: {
            name: any
            checked: any
        }
    }) => void
}

export default function ReportFormComponent({
    inputsHandler,
    nameRef,
    titleRef,
    // walletAddressRef,
    NFTListRef,
    emailRef,
    phoneRef,
    contentRef,
    finalAgreement,
    targetList,
    handleFinalAgreementChange,
}: IReportFormComponentProps) {
    return (
        <>
            <div className="flex flex-col w-full justify-center items-center pt-20 gap-10">
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="text-[#F46221] text-sm font-black">QUADHASH</div>
                    <div className="text-xl lg:text-3xl font-black">해킹 신고 센터</div>
                    <div>STEP. 3</div>
                    <div className="text-gray-900/40">아래의 입력란에 내용을 기재해주세요.</div>
                </div>

                <div className="flex flex-col justify-center items-start gap-4 w-full max-w-[480px]">
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex flex-row items-center gap-5">
                            <p>이름</p>
                            <p className="text-sm text-red-600 invisible" ref={nameRef}>
                                * 이름은 필수 항목입니다.
                            </p>
                        </div>
                        <input
                            className="w-full p-3 rounded-lg"
                            type="text"
                            name="user_name"
                            placeholder="이름을 입력해주세요."
                            onChange={inputsHandler}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex flex-row items-center gap-5">
                            <p>제목</p>
                            <p className="text-sm text-red-600 invisible" ref={titleRef}>
                                * 제목은 필수 항목입니다.
                            </p>
                        </div>
                        <input
                            className="w-full p-3 rounded-lg"
                            type="text"
                            name="title"
                            placeholder="제목을 입력해주세요."
                            onChange={inputsHandler}
                        />
                    </div>
                    {/* <div className="flex flex-col w-full gap-2">
                        <div className="flex flex-row items-center gap-5">
                            <p>신고자 지갑 주소</p>
                            <p className="text-sm text-red-600 invisible" ref={walletAddressRef}>
                                * 지갑주소는 필수 항목입니다.
                            </p>
                        </div>
                        <input
                            className="w-full p-3 rounded-lg"
                            type="text"
                            name="wallet_address"
                            placeholder="지갑 주소를 입력해주세요."
                            onChange={inputsHandler}
                        />
                    </div> */}
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex flex-row items-center gap-5">
                            <p>해킹 NFT 목록</p>
                            <p className="text-sm text-red-600 invisible" ref={NFTListRef}>
                                * NFT목록은 필수 항목입니다.
                            </p>
                        </div>
                        <input
                            className="w-full p-3 rounded-lg"
                            readOnly
                            type="text"
                            value={targetList
                                .map((item) => `${item.token_type}_${item.token_id}`)
                                .join(', ')}
                            name="post_nfts"
                            placeholder="신고하고자 하는 NFT ID를 입력해주세요."
                            // onChange={inputsHandler}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex flex-row items-center gap-5">
                            <p>이메일</p>
                            <p className="text-sm text-red-600 invisible" ref={emailRef}>
                                * 이메일은 필수 항목입니다.
                            </p>
                        </div>
                        <input
                            className="w-full p-3 rounded-lg"
                            type="email"
                            name="user_email"
                            placeholder=" 이메일 주소를 입력해주세요."
                            onChange={inputsHandler}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex flex-row items-center gap-5">
                            <p>연락처</p>
                            <p className="text-sm text-red-600 invisible" ref={phoneRef}>
                                * 연락처는 필수 항목입니다.
                            </p>
                        </div>
                        <input
                            className="w-full p-3 rounded-lg"
                            type="tel"
                            name="user_phone"
                            placeholder="전화번호를 입력해주세요."
                            onChange={inputsHandler}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex flex-row items-center gap-5">
                            <p>신고 내용</p>
                            <p className="text-sm text-red-600 invisible" ref={contentRef}>
                                * 내용은 필수 항목입니다.
                            </p>
                        </div>
                        <textarea
                            className="resize-none p-3 rounded-lg"
                            placeholder="내용을 입력해주세요."
                            name="content"
                            onChange={inputsHandler}
                            cols={30}
                            rows={10}></textarea>
                    </div>

                    <div className="w-full">
                        <div className="w-full left-[-0.75rem] relative">
                            <Checkbox
                                label="해킹 신고 동의 확인"
                                ripple={false}
                                checked={finalAgreement}
                                onChange={handleFinalAgreementChange}
                                name="finalAgree"
                                className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                                crossOrigin={undefined}
                            />
                        </div>
                        <div>
                            NFT 해킹 신고의 모든 법적책임은 신청자에게 있으며, 명시된 신청목적
                            이외의 활용 및 타인에게 재산피해를 일으킬 경우 민형사상 불이익이 발생할
                            수 있습니다.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
