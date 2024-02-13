'use client'
import { contactWithMail } from '@/app/api/common/api'
import { ConfirmContext } from '@/app/provider/ConfirmProvider'
import { Checkbox, input } from '@material-tailwind/react'
import * as React from 'react'

export interface IContactContainerProps {
    // inputs: {
    //     purpose: string
    //     partner: string
    //     co_marketing: string
    //     user_name: string
    //     user_email: string
    //     user_phone: string
    //     content: string
    // }
}

export default function ContactContainer() {
    const { $confirm } = React.useContext(ConfirmContext)

    const [inputs, setInputs] = React.useState({
        purpose: '',
        partner: false,
        co_marketing: false,
        user_name: '',
        user_email: '',
        user_phone: '',
        content: '',
    })

    const inputsHandler = (e: React.ChangeEvent) => {
        if (e.target instanceof HTMLInputElement) {
            const { value, name } = e.target
            setInputs({ ...inputs, [name]: value })
        } else if (e.target instanceof HTMLTextAreaElement) {
            const { value, name } = e.target
            setInputs({ ...inputs, [name]: value })
        }
    }

    const checkBoxHandler = (e: React.ChangeEvent) => {
        if (e.target instanceof HTMLInputElement) {
            const { name, checked } = e.target
            setInputs({ ...inputs, [name]: checked })
        }
    }
    const submit = async () => {
        if (await $confirm('메일을 보내시겠습니까?')) {
            console.log('submit')
            console.log(inputs)
            const result = await contactWithMail(inputs)
        }
    }

    React.useEffect(() => {
        console.log(inputs)
    }, [inputs])
    return (
        <>
            <div className="max-w-[600px] w-full mt-16 font-medium p-[32px]">
                <div className="text-center text-5xl font-medium w-full">CONTACT US</div>
                <div className="flex flex-col items-center w-full gap-10 mt-[70px]">
                    <div className="flex flex-row w-full">
                        <div>
                            WHAT ARE YOU LOOKING TO DO? <span className="text-[#FF0000]">*</span>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full">
                        <div>PARTNER WITH QUADHASH</div>
                        <div>
                            <Checkbox
                                ripple={false}
                                name="partner"
                                className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#FFD748] border-none hover:scale-105 hover:before:opacity-0"
                                crossOrigin={undefined}
                                checked={inputs.partner}
                                onChange={checkBoxHandler}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full">
                        <div>CO-MARKETING WITH QUADHASH</div>
                        <div>
                            <Checkbox
                                ripple={false}
                                name="co_marketing"
                                className="h-8 w-8 transition-all border-gray-900/20 bg-gray-900/10 checked:!bg-[#FFD748] border-none hover:scale-105 hover:before:opacity-0"
                                crossOrigin={undefined}
                                checked={inputs.co_marketing}
                                onChange={checkBoxHandler}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-start items-start w-full">
                        <div>NAME</div>
                        <div className="w-full">
                            <input
                                value={inputs.user_name}
                                onChange={inputsHandler}
                                name="user_name"
                                placeholder="Your name..."
                                className="w-full bg-[#F5F5F5] p-2 border-2 rounded-lg"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-start items-start w-full">
                        <div>EMAIL</div>
                        <div className="w-full">
                            <input
                                value={inputs.user_email}
                                name="user_email"
                                placeholder="Your email address..."
                                className="w-full bg-[#F5F5F5] p-2 border-2 rounded-lg"
                                onChange={inputsHandler}
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-start items-start w-full">
                        <div>PHONE NUMBER</div>
                        <div className="w-full">
                            <input
                                value={inputs.user_phone}
                                name="user_phone"
                                placeholder="A contact telephone number"
                                className="w-full bg-[#F5F5F5] p-2 border-2 rounded-lg"
                                onChange={inputsHandler}
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-start items-start w-full">
                        <div>
                            PLEASE GIVE SOME MORE DETAIL REGARDING YOUR REQUEST
                            <span className="text-[#FF0000]">*</span>
                        </div>
                        <div className="w-full">
                            <textarea
                                onChange={inputsHandler}
                                value={inputs.content}
                                name="content"
                                id=""
                                className="resize-none w-full bg-[#F5F5F5] p-2 border-2 rounded-lg h-[100px]"></textarea>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-end items-center mt-[50px]">
                    <div
                        className="bg-[#FFFFFF] border-black text-black py-2 px-4 border-2 rounded-full shadow-[_5px_5px_black]"
                        onClick={submit}>
                        SUBMIT
                    </div>
                </div>
            </div>
        </>
    )
}
