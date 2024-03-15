'use client'
import { contactWithMail } from '@/app/api/common/api'
import { ConfirmContext } from '@/app/provider/ConfirmProvider'
import { emailCheck } from '@/app/utils/validationUtils'
import { Checkbox } from '@material-tailwind/react'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'
import * as React from 'react'
import Loading from '../../common/components/Loading'
import { AlertContext } from '@/app/provider/AlertProvider'

export interface IContactContainerProps {}

const { useRouter } = createSharedPathnamesNavigation({ locales })
export default function ContactContainer() {
    const { $confirm } = React.useContext(ConfirmContext)
    const { $alert } = React.useContext(AlertContext)
    const router = useRouter()

    const user_nameRef = React.useRef(null)
    const user_emailRef = React.useRef(null)
    // const user_phoneRef = React.useRef(null)
    const contentRef = React.useRef(null)

    const [emailValidationText, setEmailVaidationText] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)

    const [inputs, setInputs] = React.useState({
        // purpose: '',
        partner: 'NO',
        co_marketing: 'NO',
        user_name: '',
        user_email: '',
        user_phone: '',
        content: '',
    })

    const inputsHandler = (e: React.ChangeEvent) => {
        if (e.target instanceof HTMLInputElement) {
            let { value, name } = e.target

            if (name === 'user_phone') {
                value = value.replace(/[^0-9]/g, '')
            }
            setInputs({ ...inputs, [name]: value })
        } else if (e.target instanceof HTMLTextAreaElement) {
            const { value, name } = e.target
            setInputs({ ...inputs, [name]: value })
        }
    }

    const checkBoxHandler = (e: React.ChangeEvent) => {
        if (e.target instanceof HTMLInputElement) {
            const { name, checked } = e.target
            setInputs({ ...inputs, [name]: checked ? 'YES' : 'NO' })
        }
    }
    const submit = async () => {
        if (formValidation()) {
            if (await $confirm('제출하시겠습니까?')) {
                try {
                    setIsLoading(true)
                    const result = await contactWithMail(inputs)
                    if (result.status === 'Success') {
                        setIsLoading(false)
                        await $alert('접수되었습니다.')
                        router.push('/')
                    }
                } catch (error) {
                    setIsLoading(false)
                    console.error(error)
                }
            }
        }
    }

    const formValidation = () => {
        let user_nameValidation = true
        let user_emailValidation = true
        // let user_phoneValidation = true
        let contentValidation = true

        if (inputs.user_name === '') {
            user_nameRef?.current?.classList.remove('invisible')
            user_nameRef.current.focus()
            user_nameValidation = false
        } else {
            user_nameRef?.current?.classList.add('invisible')
            user_nameValidation = true
        }
        if (inputs.user_email === '') {
            user_emailRef?.current?.classList.remove('invisible')
            user_emailRef.current.focus()
            setEmailVaidationText('* 이메일은 필수 항목입니다.')
            user_emailValidation = false
        } else {
            if (!emailCheck(inputs.user_email)) {
                user_emailRef?.current?.classList.remove('invisible')
                user_emailRef.current.focus()
                setEmailVaidationText('* 이메일 형식에 맞지 않습니다.')
                user_emailValidation = false
            } else {
                user_emailRef?.current?.classList.add('invisible')
                user_emailValidation = true
            }
        }

        // if (inputs.user_phone === '') {
        //     user_phoneRef?.current?.classList.remove('invisible')
        //     user_phoneRef.current.focus()
        //     user_phoneValidation = false
        // } else {
        //     user_phoneRef?.current?.classList.add('invisible')
        //     user_phoneValidation = true
        // }
        if (inputs.content === '') {
            contentRef?.current?.classList.remove('invisible')
            contentRef.current.focus()
            contentValidation = false
        } else {
            contentRef?.current?.classList.add('invisible')
            contentValidation = true
        }

        if (
            user_nameValidation &&
            user_emailValidation &&
            // user_phoneValidation &&
            contentValidation
        ) {
            return true
        }
        return false
    }

    return (
        <>
            <div className="max-w-[600px] w-full mt-16 font-medium p-[32px]">
                <div className="text-center text-5xl font-medium w-full">CONTACT US</div>
                <div className="flex flex-col items-center w-full gap-10 mt-[70px]">
                    <div className="flex flex-row w-full leading-[56px]">
                        <div>제안하실 내용을 선택해주세요.</div>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full">
                        <div>파트너쉽 제안</div>

                        <div>
                            <Checkbox
                                ripple={false}
                                name="partner"
                                className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                                crossOrigin={undefined}
                                checked={inputs.partner === 'NO' ? false : true}
                                // ref={partnerRef}
                                onChange={checkBoxHandler}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full">
                        <div>마케팅 제안</div>
                        <div>
                            <Checkbox
                                ripple={false}
                                name="co_marketing"
                                className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#F46221] border-none hover:scale-105 hover:before:opacity-0"
                                crossOrigin={undefined}
                                checked={inputs.co_marketing === 'NO' ? false : true}
                                // ref={co_marketing}
                                onChange={checkBoxHandler}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-start items-start w-full h-[85px]">
                        <div>
                            이름<span className="text-[#FF0000]">*</span>
                        </div>

                        <div className="w-full">
                            <input
                                value={inputs.user_name}
                                name="user_name"
                                placeholder="이름"
                                className="w-full bg-[#F5F5F5] p-2 border-2 rounded-lg"
                                onChange={inputsHandler}
                                type="text"
                            />
                            <div className="pt-2">
                                <p className="text-sm text-red-600 invisible" ref={user_nameRef}>
                                    * 이름은 필수 항목입니다.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start items-start w-full h-[85px]">
                        <div>
                            이메일<span className="text-[#FF0000]">*</span>
                        </div>
                        <div className="w-full">
                            <input
                                value={inputs.user_email}
                                name="user_email"
                                placeholder="이메일"
                                className="w-full bg-[#F5F5F5] p-2 border-2 rounded-lg"
                                onChange={inputsHandler}
                                type="text"
                            />
                            <div className="pt-2">
                                <p className="text-sm text-red-600 invisible" ref={user_emailRef}>
                                    {emailValidationText}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start items-start w-full h-[85px]">
                        <div>
                            연락처
                            {/* <span className="text-[#FF0000]">*</span> */}
                        </div>
                        <div className="w-full">
                            <input
                                value={inputs.user_phone}
                                name="user_phone"
                                placeholder="연락처 ( '-' 제외 ) "
                                className="w-full bg-[#F5F5F5] p-2 border-2 rounded-lg"
                                onChange={inputsHandler}
                                type="text"
                            />
                            <div className="pt-2">
                                <p className="text-sm text-red-600 invisible">
                                    * 연락처는 필수 항목입니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-start items-start w-full">
                        <div>
                            제안 내용
                            <span className="text-[#FF0000]">*</span>
                        </div>
                        <div className="w-full">
                            <textarea
                                placeholder="제안 내용"
                                onChange={inputsHandler}
                                value={inputs.content}
                                name="content"
                                className="resize-none w-full bg-[#F5F5F5] p-2 border-2 rounded-lg h-[100px]"></textarea>
                            <div className="pt-2">
                                <p className="text-sm text-red-600 invisible" ref={contentRef}>
                                    * 제안 내용은 필수 항목입니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-end items-center mt-[50px] cursor-pointer">
                    <div
                        className="bg-[#FFFFFF] border-black text-black py-2 px-4 border-2 rounded-full shadow-[_5px_5px_black]"
                        onClick={submit}>
                        SUBMIT
                    </div>
                </div>
            </div>
            {isLoading && <Loading />}
        </>
    )
}
