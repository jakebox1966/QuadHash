import * as React from 'react'

export interface IProfileSectionProps {}

export default function ProfileSection(props: IProfileSectionProps) {
    return (
        <div className="w-full px-5">
            <div className="flex flex-row justify-center items-center w-full">
                <div className="bg-green-300 flex-[1_0_auto]">asdf</div>
                <div className="bg-blue-300 flex-[3_0_auto]">asdf</div>
            </div>
            <div className="flex flex-col lg:flex-row justify-stretch items-stretch w-full text-white rounded-lg overflow-hidden">
                <img className="flex-[1_0_auto] object-contain max-w-[40%]" src="/1.png" alt="" />
                <div className="flex flex-col justify-center items-center bg-[#C6251B] flex-[4_0_auto]">
                    <div className="flex flex-col justify-center items-start w-full p-3">
                        <div>QUADHASH</div>
                        <div className="text-2xl font-bold">SAZA #3910</div>
                        <div>OX8OD1...OF1C</div>
                    </div>

                    <div className="flex flex-row justify-start items-center flex-wrap gap-6 p-3">
                        <div className="w-[calc(100%/2-0.75rem)] flex flex-row items-center gap-3 p-3 bg-opacity-20 bg-white rounded-lg">
                            <div>
                                <img src="/mypage_square.svg" alt="mypage_square" />
                            </div>
                            <div>
                                <div>BACKGROUND</div>
                                <div className="font-black">Red</div>
                            </div>
                        </div>
                        <div className="w-[calc(100%/2-0.75rem)] flex flex-row items-center gap-3 p-3 bg-opacity-20 bg-white rounded-lg">
                            <div>
                                <img src="/mypage_body.svg" alt="mypage_body" />
                            </div>
                            <div>
                                <div>BODY</div>
                                <div className="font-black">Bow Tie</div>
                            </div>
                        </div>
                        <div className="w-[calc(100%/2-0.75rem)] flex flex-row items-center gap-3 p-3 bg-opacity-20 bg-white rounded-lg">
                            <div>
                                <img src="/mypage_plus.svg" alt="mypage_plus" />
                            </div>
                            <div>
                                <div>EXTRAS</div>
                                <div className="font-black">NONE</div>
                            </div>
                        </div>
                        <div className="w-[calc(100%/2-0.75rem)] flex flex-row items-center gap-3 p-3 bg-opacity-20 bg-white rounded-lg">
                            <div>
                                <img src="/mypage_eye.svg" alt="mypage_eye" />
                            </div>
                            <div>
                                <div>EYES</div>
                                <div className="font-black">NonChalant</div>
                            </div>
                        </div>
                        <div className="w-[calc(100%/2-0.75rem)] flex flex-row items-center gap-3 p-3 bg-opacity-20 bg-white rounded-lg">
                            <div>
                                <img src="/mypage_head.svg" alt="mypage_head" />
                            </div>
                            <div>
                                <div>HEAD</div>
                                <div className="font-black">Nonchalant</div>
                            </div>
                        </div>
                        <div className="w-[calc(100%/2-0.75rem)] flex flex-row items-center gap-3 p-3 bg-opacity-20 bg-white rounded-lg">
                            <div>
                                <img src="/mypage_headwear.svg" alt="mypage_headwear" />
                            </div>
                            <div>
                                <div>HEADWEAR</div>
                                <div className="font-black">Growl</div>
                            </div>
                        </div>
                        <div className="w-[calc(100%/2-0.75rem)] flex flex-row items-center gap-3 p-3 bg-opacity-20 bg-white rounded-lg">
                            <div>
                                <img src="/mypage_mane.svg" alt="mypage_mane" />
                            </div>
                            <div>
                                <div>MANE</div>
                                <div>RED</div>
                            </div>
                        </div>
                        <div className="w-[calc(100%/2-0.75rem)] flex flex-row items-center gap-3 p-3 bg-opacity-20 bg-white rounded-lg">
                            <div>
                                <img src="/mypage_mouth.svg" alt="mypage_mouth" />
                            </div>
                            <div>
                                <div>MOUTH</div>
                                <div>Kiss</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
