'use client'

import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'
import * as React from 'react'
import { ConfirmContext } from '@/app/provider/ConfirmProvider'
import { AlertContext } from '@/app/provider/AlertProvider'
import { postEventTicket } from '@/app/api/dynamicNFT/api'

export interface IEventTicketContainerProps {}
const ALLOW_FILE_EXTENSION = ['text/csv']
const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024 // 5MB

const { Link, useRouter } = createSharedPathnamesNavigation({ locales })
export default function EventTicketContainer(props: IEventTicketContainerProps) {
    const router = useRouter()
    const { $confirm } = React.useContext(ConfirmContext)
    const { $alert } = React.useContext(AlertContext)

    const [inputs, setInputs] = React.useState({
        eventName: '',
        csvFileName: '',
    })

    const eventNameRef = React.useRef(null)
    const csvFileNameRef = React.useRef(null)

    const formValidation = () => {
        let eventNameValidation = true
        let csvFileNameValidation = true

        if (inputs.eventName === '') {
            eventNameRef?.current.classList.remove('invisible')
            eventNameRef.current.focus()
            eventNameValidation = false
        } else {
            eventNameRef?.current?.classList.add('invisible')
            eventNameValidation = true
        }

        if (inputs.csvFileName === '') {
            csvFileNameRef?.current.classList.remove('invisible')
            csvFileNameRef.current.focus()
            csvFileNameValidation = false
        } else {
            csvFileNameRef?.current?.classList.add('invisible')
            csvFileNameValidation = true
        }

        if (eventNameValidation && csvFileNameValidation) {
            return true
        }
        return false
    }

    const [files, setFiles] = React.useState<File>()

    const inputsHandler = (e: React.ChangeEvent) => {
        if (e.target instanceof HTMLInputElement) {
            const { value, name } = e.target
            setInputs({ ...inputs, [name]: value })
        } else if (e.target instanceof HTMLTextAreaElement) {
            const { value, name } = e.target
            setInputs({ ...inputs, [name]: value })
        }
    }

    const fileTypeCheck = (file) => {
        console.log(file.type)
        if (file && ALLOW_FILE_EXTENSION.includes(file.type)) {
            return true
        }
        return false
    }

    const fileHandler = async (e: React.ChangeEvent) => {
        if (e.target instanceof HTMLInputElement) {
            const files = e.target.files[0]
            if (files === undefined) {
                return
            }

            // 파일 확장자 체크
            if (!fileTypeCheck(files)) {
                e.target.value = ''
                $alert('csv 파일만 업로드 가능합니다.')
                return
            }

            // 파일 용량 체크
            if (files.size > FILE_SIZE_MAX_LIMIT) {
                e.target.value = ''
                $alert('업로드 가능한 최대 용량은 5MB입니다. ')
                return
            }
            setInputs((prev) => ({
                ...prev,
                csvFileName: files.name,
            }))
            setFiles(files)
        }
    }

    const uploadTicketWithCSV = async () => {
        if (formValidation()) {
            if (await $confirm('작성하시겠습니까?')) {
                try {
                    const formData = new FormData()

                    formData.append('event_name', inputs.eventName)

                    formData.append('file', files)

                    const result = await postEventTicket(formData)

                    $alert('등록이 완료되었습니다.')
                    router.refresh()
                    router.push('/admin/calendar')
                } catch (error) {
                    console.error(error)
                }
            }
        }
    }
    return (
        <>
            <div className="flex flex-col justify-center items-center mt-3 max-w-[900px]">
                <div className="flex flex-col justify-start items-start w-full">
                    <div className="text-3xl text-medium">이벤트 티켓</div>

                    <div className="flex flex-col justify-center items-start gap-3 mt-10 w-full">
                        <div className="flex flex-row items-start gap-2 w-full">
                            <div className="min-w-[140px] whitespace-nowrap text-white bg-gray-500 p-2 rounded-lg border-2 text-center">
                                <span className="">EVENT TICKET</span>
                            </div>
                            <span className="text-[#FF0000]">*</span>
                            <div className="w-full">
                                <input
                                    onChange={inputsHandler}
                                    name="eventName"
                                    type="text"
                                    className={`border-2 rounded-lg p-2 w-full`}
                                    value={inputs.eventName}
                                />
                                <div
                                    ref={eventNameRef}
                                    className="mt-1 invisible px-2 text-sm text-red-400">
                                    필수 항목입니다.
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row items-start gap-2 w-full">
                            <div className="min-w-[140px] text-white bg-gray-500 p-2 rounded-lg border-2 text-center">
                                <label htmlFor="csvFile">CSV FILE</label>
                            </div>
                            <span className="text-[#FF0000]">*</span>
                            <div className="w-full">
                                <div className={`border-2 rounded-lg p-2 w-full`}>
                                    <label className="w-full inline-block" htmlFor={'csvFile'}>
                                        <span className="mr-5 border-2 rounded-lg bg-black text-white p-1">
                                            FILE
                                        </span>
                                        {inputs.csvFileName}
                                    </label>
                                </div>
                                <input
                                    // accept=".csv"
                                    onChange={fileHandler}
                                    id="csvFile"
                                    name="csvFile"
                                    type="file"
                                    className={'hidden'}
                                />
                                <div
                                    ref={csvFileNameRef}
                                    className="mt-1 invisible px-2 text-sm text-red-400">
                                    필수 항목입니다.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-end items-center gap-3 w-full mt-10">
                        <button
                            className="border-2 rounded-lg px-4 py-2 hover:opacity-65"
                            onClick={uploadTicketWithCSV}>
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
