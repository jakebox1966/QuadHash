'use client'
import * as React from 'react'
import { locales } from '@/i18nconfig'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { ConfirmContext } from '@/app/provider/ConfirmProvider'
import { AlertContext } from '@/app/provider/AlertProvider'
import { postCalendar } from '@/app/api/calendar/api'

export interface ICalendarCreateContainerProps {}

const ALLOW_FILE_EXTENSION = ['image/jpeg', 'image/jpg', 'image/png']
const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024 // 5MB

const { Link, useRouter } = createSharedPathnamesNavigation({ locales })
export default function CalendarCreateContainer(props: ICalendarCreateContainerProps) {
    const router = useRouter()
    const { $confirm } = React.useContext(ConfirmContext)
    const { $alert } = React.useContext(AlertContext)
    const [inputs, setInputs] = React.useState({
        title: '',
        content: '',
        download: '',
        image: '',
    })

    const [files, setFiles] = React.useState<File>()

    const titleRef = React.useRef(null)
    const contentRef = React.useRef(null)
    const downloadRef = React.useRef(null)
    const imageRef = React.useRef(null)

    const formValidation = () => {
        let titleValidation = true
        let contentValidation = true
        let downloadValidation = true
        let imageValidation = true

        if (inputs.title === '') {
            titleRef?.current.classList.remove('invisible')
            titleRef.current.focus()
            titleValidation = false
        } else {
            titleRef?.current?.classList.add('invisible')
            titleValidation = true
        }

        if (inputs.content === '') {
            contentRef?.current.classList.remove('invisible')
            contentRef.current.focus()
            contentValidation = false
        } else {
            contentRef?.current?.classList.add('invisible')
            contentValidation = true
        }

        if (inputs.download === '') {
            downloadRef?.current.classList.remove('invisible')
            downloadRef.current.focus()
            downloadValidation = false
        } else {
            downloadRef?.current?.classList.add('invisible')
            downloadValidation = true
        }

        if (inputs.image === '') {
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

    const inputsHandler = (e: React.ChangeEvent) => {
        if (e.target instanceof HTMLInputElement) {
            const { value, name } = e.target
            setInputs({ ...inputs, [name]: value })
        } else if (e.target instanceof HTMLTextAreaElement) {
            const { value, name } = e.target
            setInputs({ ...inputs, [name]: value })
        }
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
            setInputs((prev) => ({
                ...prev,
                image: files.name,
            }))
            setFiles(files)
        }

        // if (
        //     file &&
        //     (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')
        // ) {
        //     setInputs((prev) => ({
        //         ...prev,
        //         image: file,
        //     }))
        // } else {
        //     await $alert('jpg 또는 png 파일만 업로드 가능합니다.')
        // }
    }

    React.useEffect(() => {
        console.log(inputs)
    }, [inputs])

    const writeCalendar = async () => {
        if (formValidation()) {
            if (await $confirm('작성하시겠습니까?')) {
                try {
                    const formData = new FormData()

                    formData.append('title', inputs.title)
                    formData.append('content', inputs.content)
                    formData.append('download', inputs.download)
                    formData.append('image', files)

                    const result = await postCalendar(formData)

                    $alert('등록이 완료되었습니다.')
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
                    <div className="text-3xl text-medium">캘린더</div>

                    <div className="flex flex-col justify-center items-start gap-3 mt-10 w-full">
                        <div className="flex flex-row items-start gap-2 w-full">
                            <div className="min-w-[120px] text-white bg-gray-500 p-2 rounded-lg border-2 text-center">
                                TITLE
                            </div>
                            <div className="w-full">
                                <input
                                    onChange={inputsHandler}
                                    name="title"
                                    type="text"
                                    className={`border-2 rounded-lg p-2 w-full`}
                                    value={inputs.title}
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
                                    value={inputs.content}
                                    className={`border-2 rounded-lg p-2 w-full h-[100px] resize-none `}
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
                                    type="text"
                                    className={`border-2 rounded-lg p-2 w-full`}
                                    value={inputs.download}
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
                                <div className={`border-2 rounded-lg p-2 w-full`}>
                                    <label className="w-full inline-block" htmlFor={'imageFile'}>
                                        {!inputs.image ? 'Select Image File' : inputs.image}
                                    </label>
                                </div>
                                <input
                                    accept=".jpg, .jpeg, .png"
                                    onChange={fileHandler}
                                    id="imageFile"
                                    name="image"
                                    type="file"
                                    className={'hidden'}
                                />
                                <div
                                    ref={imageRef}
                                    className="mt-1 invisible px-2 text-sm text-red-400">
                                    필수 항목입니다.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row justify-end items-center gap-3 w-full mt-10">
                        <>
                            <Link
                                href="/admin/calendar"
                                className="border-2 rounded-lg px-4 py-2 hover:opacity-65">
                                목록
                            </Link>

                            <button
                                className="border-2 rounded-lg px-4 py-2 hover:opacity-65"
                                onClick={writeCalendar}>
                                확인
                            </button>
                        </>
                    </div>
                </div>
            </div>
        </>
    )
}
