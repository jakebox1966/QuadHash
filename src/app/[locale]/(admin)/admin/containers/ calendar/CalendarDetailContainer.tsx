'use client'

import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import * as React from 'react'
import { locales } from '@/i18nconfig'
import { deleteCalendar, getCalendar, putCalendar } from '@/app/api/calendar/api'
import { ConfirmContext } from '@/app/provider/ConfirmProvider'
import { AlertContext } from '@/app/provider/AlertProvider'

export interface ICalendarDetailContainerProps {
    calendar: any
}

const ALLOW_FILE_EXTENSION = ['image/jpeg', 'image/jpg', 'image/png']
const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024 // 5MB

const { Link, useRouter } = createSharedPathnamesNavigation({ locales })
export default function CalendarDetailContainer({ calendar }: ICalendarDetailContainerProps) {
    const router = useRouter()
    const { $confirm } = React.useContext(ConfirmContext)
    const { $alert } = React.useContext(AlertContext)
    const [mode, setMode] = React.useState('read')
    const [inputs, setInputs] = React.useState({
        title: '',
        content: '',
        download: '',
        image: '',
        created_at: '',
        updated_at: '',
    })

    const [files, setFiles] = React.useState<File>()

    const [updateInputs, setUpdateInputs] = React.useState({
        title: '',
        content: '',
        download: '',
        image: '',
    })
    const [updateFiles, setUpdateFiles] = React.useState<File>()

    const titleRef = React.useRef(null)
    const contentRef = React.useRef(null)
    const downloadRef = React.useRef(null)
    const imageRef = React.useRef(null)

    const formValidation = () => {
        let titleValidation = true
        let contentValidation = true
        let downloadValidation = true
        let imageValidation = true

        if (updateInputs.title === '') {
            titleRef?.current.classList.remove('invisible')
            titleRef.current.focus()
            titleValidation = false
        } else {
            titleRef?.current?.classList.add('invisible')
            titleValidation = true
        }

        if (updateInputs.content === '') {
            contentRef?.current.classList.remove('invisible')
            contentRef.current.focus()
            contentValidation = false
        } else {
            contentRef?.current?.classList.add('invisible')
            contentValidation = true
        }

        if (updateInputs.download === '') {
            downloadRef?.current.classList.remove('invisible')
            downloadRef.current.focus()
            downloadValidation = false
        } else {
            downloadRef?.current?.classList.add('invisible')
            downloadValidation = true
        }

        if (updateInputs.image === '') {
            imageRef?.current.classList.remove('invisible')
            imageRef.current.focus()
            imageValidation = false
        } else {
            imageRef?.current?.classList.add('invisible')
            imageValidation = true
        }

        if (titleValidation && contentValidation && downloadValidation && imageValidation) {
            return true
        }
        return false
    }

    const fileTypeCheck = (file) => {
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
                $alert('jpg, jpeg, png 파일만 업로드 가능합니다.')
                return
            }

            // 파일 용량 체크
            if (files.size > FILE_SIZE_MAX_LIMIT) {
                e.target.value = ''
                $alert('업로드 가능한 최대 용량은 5MB입니다. ')
                return
            }
            setUpdateInputs((prev) => ({
                ...prev,
                image: files.name,
            }))
            setFiles(files)
        }
    }
    const inputsHandler = (e: React.ChangeEvent) => {
        if (e.target instanceof HTMLInputElement) {
            const { value, name } = e.target
            setUpdateInputs({ ...updateInputs, [name]: value })
        } else if (e.target instanceof HTMLTextAreaElement) {
            const { value, name } = e.target
            setUpdateInputs({ ...updateInputs, [name]: value })
        }
    }

    const modeHandler = (mode: string) => {
        if (mode === 'read') {
            setUpdateInputs(calendar)
        }
        validInit()
        setMode(mode)
    }

    const init = () => {
        if (calendar) {
            setInputs(calendar)
            setUpdateInputs(calendar)
        }
    }

    const validInit = () => {
        titleRef?.current?.classList.add('invisible')
        contentRef?.current?.classList.add('invisible')
        downloadRef?.current?.classList.add('invisible')
        imageRef?.current?.classList.add('invisible')
    }

    const deleteThisCalendar = async () => {
        if (await $confirm('삭제하시겠습니까?')) {
            try {
                // const result = await deleteCalendar(calendar.id)
                await $alert('삭제되었습니다.')
                router.push('/admin/calendar')
            } catch (error) {
                console.error(error)
            }
        }
    }

    const updateCalendar = async () => {
        if (formValidation()) {
            if (await $confirm('수정하시겠습니까?')) {
                try {
                    const formData = new FormData()

                    formData.append('title', inputs.title)
                    formData.append('content', inputs.content)
                    formData.append('download', inputs.download)
                    formData.append('image', files)

                    const result = await putCalendar(calendar.id, formData)

                    $alert('수정이 완료되었습니다.')

                    const refreshResult = await getCalendar(calendar.id)

                    setFiles(null)
                    setInputs(refreshResult.data)
                    validInit()
                    setMode('read')
                } catch (error) {
                    console.error(error)
                }
            }
        }
    }

    React.useEffect(() => {
        init()
    }, [])

    return (
        <>
            <div className="flex flex-col justify-center items-center mt-3 max-w-[900px]">
                <div className="flex flex-col justify-start items-start w-full">
                    <div className="text-3xl text-medium">캘린더</div>

                    <div className="flex flex-col justify-center items-start gap-4 mt-10 w-full">
                        <div className="flex flex-row items-start gap-2 w-full">
                            <div className="min-w-[120px] text-white bg-gray-500 p-2 rounded-lg border-2 text-center">
                                TITLE
                            </div>
                            <div className="w-full">
                                <input
                                    onChange={inputsHandler}
                                    name="title"
                                    readOnly={mode === 'read'}
                                    type="text"
                                    className={`border-2 rounded-lg p-2 w-full ${
                                        mode === 'read' && 'outline-none bg-gray-200'
                                    }`}
                                    value={mode === 'read' ? inputs.title : updateInputs.title}
                                />
                                <div
                                    ref={titleRef}
                                    className="mt-1 invisible px-2 text-sm text-red-400">
                                    필수 항목입니다.
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row items-start gap-2 w-full">
                            <div className="min-w-[120px] text-white bg-gray-500 p-2 rounded-lg border-2 text-center">
                                CONTENT
                            </div>
                            <div className="w-full">
                                <textarea
                                    onChange={inputsHandler}
                                    name="content"
                                    readOnly={mode === 'read'}
                                    value={mode === 'read' ? inputs.content : updateInputs.content}
                                    className={`border-2 rounded-lg p-2 w-full h-[100px] resize-none ${
                                        mode === 'read' && 'outline-none bg-gray-200'
                                    }`}
                                />
                                <div
                                    ref={contentRef}
                                    className=" px-2 invisible text-sm text-red-400">
                                    필수 항목입니다.
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-start gap-2 w-full">
                            <div className="min-w-[120px] text-white bg-gray-500 p-2 rounded-lg border-2 text-center">
                                DOWNLOAD
                            </div>
                            <div className="w-full">
                                <input
                                    onChange={inputsHandler}
                                    name="download"
                                    readOnly={mode === 'read'}
                                    type="text"
                                    className={`border-2 rounded-lg p-2 w-full ${
                                        mode === 'read' && 'outline-none bg-gray-200'
                                    }`}
                                    value={
                                        mode === 'read' ? inputs.download : updateInputs.download
                                    }
                                />
                                <div
                                    ref={downloadRef}
                                    className="mt-1 invisible px-2 text-sm text-red-400">
                                    필수 항목입니다.
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row items-start gap-2 w-full">
                            <div className="min-w-[120px] text-white bg-gray-500 p-2 rounded-lg border-2 text-center">
                                IMAGE
                            </div>
                            <div className="w-full">
                                <div
                                    className={`border-2 rounded-lg p-2 w-full ${
                                        mode === 'read' && 'outline-none bg-gray-200'
                                    }`}>
                                    <label className="w-full inline-block" htmlFor={'imageFile'}>
                                        <span className="mr-5 border-2 rounded-lg bg-black text-white p-1">
                                            FILE
                                        </span>
                                        {mode === 'read' && inputs.image}
                                        {mode === 'update' && updateInputs.image}
                                    </label>
                                </div>
                                <input
                                    disabled={mode === 'read'}
                                    accept=".jpg, .jpeg, .png"
                                    onChange={fileHandler}
                                    id="imageFile"
                                    name="image"
                                    readOnly={mode === 'read'}
                                    type="file"
                                    className={'hidden'}
                                    // value={mode === 'read' ? inputs.image : updateInputs.image}
                                />
                                <div
                                    ref={imageRef}
                                    className="mt-1 invisible px-2 text-sm text-red-400">
                                    필수 항목입니다.
                                </div>
                            </div>
                        </div>

                        {mode === 'read' && (
                            <>
                                <div className="flex flex-row items-start gap-2 w-full">
                                    <div className="min-w-[120px] text-white bg-gray-500 p-2 rounded-lg border-2 text-center">
                                        CREATED AT
                                    </div>
                                    <div className="w-full">
                                        <input
                                            readOnly={mode === 'read'}
                                            type="text"
                                            className={`border-2 rounded-lg p-2 w-full ${
                                                mode === 'read' && 'outline-none bg-gray-200'
                                            }`}
                                            value={inputs.created_at}
                                        />
                                        <div className="mt-1 invisible px-2 text-sm text-red-400">
                                            필수 항목입니다.
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-start gap-2 w-full">
                                    <div className="min-w-[120px] text-white bg-gray-500 p-2 rounded-lg border-2 text-center">
                                        UPDATED AT
                                    </div>
                                    <div className="w-full">
                                        <input
                                            readOnly={mode === 'read'}
                                            type="text"
                                            className={`border-2 rounded-lg p-2 w-full ${
                                                mode === 'read' && 'outline-none bg-gray-200'
                                            }`}
                                            value={inputs.updated_at}
                                        />
                                        <div className="mt-1 invisible px-2 text-sm text-red-400">
                                            필수 항목입니다.
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex flex-row justify-end items-center gap-3 w-full mt-10">
                        {mode === 'read' && (
                            <>
                                <Link
                                    href="/admin/calendar"
                                    className="border-2 rounded-lg px-4 py-2 hover:opacity-65">
                                    목록
                                </Link>
                                <button
                                    className="border-2 rounded-lg px-4 py-2 hover:opacity-65"
                                    onClick={() => {
                                        modeHandler('update')
                                    }}>
                                    수정
                                </button>
                                <button
                                    className="border-2 bg-red-200 rounded-lg px-4 py-2 hover:opacity-65"
                                    onClick={deleteThisCalendar}>
                                    삭제
                                </button>
                                <Link
                                    href={'/admin/calendar/create'}
                                    className="border-2 rounded-lg px-4 py-2 hover:opacity-65">
                                    글쓰기
                                </Link>
                            </>
                        )}
                        {mode === 'update' && (
                            <>
                                <button
                                    className="border-2 rounded-lg px-4 py-2 hover:opacity-65"
                                    onClick={() => modeHandler('read')}>
                                    취소
                                </button>
                                <button
                                    onClick={updateCalendar}
                                    className="border-2 rounded-lg px-4 py-2 hover:opacity-65">
                                    확인
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
