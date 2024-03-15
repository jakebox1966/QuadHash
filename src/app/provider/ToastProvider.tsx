import { createContext, PropsWithChildren, useRef, useState } from 'react'
import Toast from '../[locale]/common/components/Toast'

export const ToastContext = createContext({ showToast(message: string, isSuccess: boolean) {} })

export const ToastProvider = ({ children }: PropsWithChildren) => {
    const [message, setMessage] = useState('')
    const [isOpenToast, setIsOpenToast] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const toastTimer = useRef<NodeJS.Timeout>()

    const showToast = (message: string, isSuccess: boolean) => {
        setIsOpenToast(true)
        setIsSuccess(isSuccess)
        setMessage(message)

        if (toastTimer.current) {
            clearTimeout(toastTimer.current)
        }

        const timer = setTimeout(() => {
            setIsOpenToast(false)
            setMessage('')
        }, 3000)
        toastTimer.current = timer
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {isOpenToast && (
                <Toast message={message} isSuccess={isSuccess} setIsOpenToast={setIsOpenToast} />
            )}
        </ToastContext.Provider>
    )
}
