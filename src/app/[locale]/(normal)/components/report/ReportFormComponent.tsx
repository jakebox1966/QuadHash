import { Checkbox } from '@material-tailwind/react'
import * as React from 'react'

export interface IReportFormComponentProps {
    inputs: {
        user_name: string
        title: string
        post_nfts: any[]
        user_email: string
        user_phone: string
        content: string
        checkbox: boolean
    }
    inputsHandler: (e: React.ChangeEvent) => void
    emailValidationText: string
    contentValidationText: string
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
    inputs,
    inputsHandler,
    emailValidationText,
    contentValidationText,
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
            <div className="flex flex-col w-full justify-center items-center lg:pt-[96px] gap-[100px]">
                <div className="flex flex-col justify-start items-center gap-[12px] w-full">
                    <div className="text-[#F46221] text-[16px] font-black">
                        QUADHASH HACKING REPORT
                    </div>
                    <div className="text-[35px] lg:text-[36px] font-black">해킹 신고 센터</div>
                    <div>STEP. 3</div>
                    <div className="text-gray-900/40">아래의 입력란에 내용을 기재해주세요.</div>
                </div>

                <div className="flex flex-col justify-center items-start gap-[24px] w-full max-w-[600px] text-[15.4px]">
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex flex-row items-center gap-1 font-[700]">
                            <p>이름</p>
                            <span className="text-[#FF0000]">*</span>
                            <p className="text-sm text-red-600 invisible" ref={nameRef}>
                                * 이름은 필수 항목입니다.
                            </p>
                        </div>
                        <input
                            value={inputs.user_name}
                            className="w-full p-3 rounded-lg bg-[#F5F5F5]"
                            type="text"
                            name="user_name"
                            placeholder="이름을 입력해주세요."
                            onChange={inputsHandler}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex flex-row items-center gap-1 font-[700]">
                            <p>제목</p>
                            <span className="text-[#FF0000]">*</span>
                            <p className="text-sm text-red-600 invisible" ref={titleRef}>
                                * 제목은 필수 항목입니다.
                            </p>
                        </div>
                        <input
                            className="w-full p-3 rounded-lg bg-[#F5F5F5]"
                            value={inputs.title}
                            type="text"
                            name="title"
                            placeholder="제목을 입력해주세요."
                            onChange={inputsHandler}
                        />
                    </div>
                    {/* <div className="flex flex-col w-full gap-2">
                        <div className="flex flex-row items-center gap-1 font-[700]">
                            <p>신고자 지갑 주소</p>
                            <span className="text-[#FF0000]">*</span>
                            <p className="text-sm text-red-600 invisible" ref={walletAddressRef}>
                                * 지갑주소는 필수 항목입니다.
                            </p>
                        </div>
                        <input
                            className="w-full p-3 rounded-lg bg-[#F5F5F5]"
                            type="text"
                            name="wallet_address"
                            placeholder="지갑 주소를 입력해주세요."
                            onChange={inputsHandler}
                        />
                    </div> */}
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex flex-row items-center gap-1 font-[700]">
                            <p>해당 콜렉션 넘버</p>
                            <span className="text-[#FF0000]">*</span>
                            <p className="text-sm text-red-600 invisible" ref={NFTListRef}>
                                * NFT목록은 필수 항목입니다.
                            </p>
                        </div>
                        <input
                            className="w-full p-3 rounded-lg bg-[#F5F5F5]"
                            readOnly
                            type="text"
                            value={targetList
                                .map((item) => `${item.token_type} #${item.token_id}`)
                                .join(', ')}
                            name="post_nfts"
                            placeholder="신고하고자 하는 NFT ID를 입력해주세요."
                            // onChange={inputsHandler}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex flex-row items-center gap-1 font-[700]">
                            <p>이메일</p>
                            <span className="text-[#FF0000]">*</span>
                            <p className="text-sm text-red-600 invisible" ref={emailRef}>
                                {emailValidationText}
                            </p>
                        </div>
                        <input
                            className="w-full p-3 rounded-lg bg-[#F5F5F5]"
                            value={inputs.user_email}
                            type="text"
                            name="user_email"
                            placeholder=" 이메일 주소를 입력해주세요."
                            onChange={inputsHandler}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex flex-row items-center gap-1 font-[700]">
                            <p>연락처</p>
                            <span className="text-[#FF0000]">*</span>
                            <p className="text-sm text-red-600 invisible" ref={phoneRef}>
                                * 연락처는 필수 항목입니다.
                            </p>
                        </div>
                        <input
                            className="w-full p-3 rounded-lg bg-[#F5F5F5]"
                            value={inputs.user_phone}
                            type="text"
                            name="user_phone"
                            placeholder="전화번호를 입력해주세요."
                            onChange={inputsHandler}
                        />
                    </div>
                    {/* <div className="flex flex-col w-full gap-2">
                        <div className="flex flex-row items-center gap-1 font-[700]">
                            <p>주민등록번호</p>
                            <span className="text-[#FF0000]">*</span>
                            <p className="text-sm text-red-600 invisible" ref={phoneRef}>
                                * 연락처는 필수 항목입니다.
                            </p>
                        </div>
                        <input
                            className="w-full p-3 rounded-lg bg-[#F5F5F5]"
                            type="tel"
                            name="citizen_number"
                            placeholder="주민등록번호를 입력해주세요."
                            onChange={inputsHandler}
                        />
                    </div> */}
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex flex-row items-center gap-1 font-[700]">
                            <p>신고 내용</p>
                            <span className="text-[#FF0000]">*</span>
                            <p className="text-sm text-red-600 invisible" ref={contentRef}>
                                {contentValidationText}
                            </p>
                        </div>
                        <textarea
                            className="resize-none p-3 rounded-lg bg-[#F5F5F5] h-[74px]"
                            value={inputs.content}
                            placeholder="내용을 입력해주세요."
                            name="content"
                            onChange={inputsHandler}></textarea>
                    </div>

                    <div className="w-full mt-10">
                        <div className="w-full flex flex-row justify-start items-start gap-2">
                            <Checkbox
                                ripple={false}
                                checked={finalAgreement}
                                onChange={handleFinalAgreementChange}
                                name="finalAgree"
                                className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                                crossOrigin={undefined}
                            />
                            <div className="text-[15.4px] p-3">
                                <div className="font-[700]">해킹 신고 동의 확인</div>
                                <div>
                                    NFT 해킹 신고의 모든 법적책임은 신청자에게 있으며, 명시된
                                    신청목적 이외의 활용 및 타인에게 재산피해를 일으킬 경우 민형사상
                                    불이익이 발생할 수 있습니다.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
