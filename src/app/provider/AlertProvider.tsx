import { createContext, useState } from 'react'
import { Alert } from '../[locale]/common/components/Alert'
import { resolve } from 'path'

type Type = {
    $alert: (message?: any) => Promise<undefined>
}

export const AlertContext = createContext<Type>({
    $alert: () => new Promise((_, reject) => reject()),
})

type AlertState = {
    message: string | undefined
    onClose: () => void
}

const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<AlertState>()
    const [open, setOpen] = useState(false)

    const $alert = (message?: any): Promise<undefined> => {
        setOpen(true)
        return new Promise((resolve) => {
            setState({
                message: message ?? '',
                onClose: () => {
                    setState(undefined)
                    setOpen(false)
                    resolve(undefined)
                },
            })
        })
    }

    return (
        <AlertContext.Provider value={{ $alert }}>
            {children}
            <Alert open={open} message={state?.message} onClose={state?.onClose} />
        </AlertContext.Provider>
    )
}

export default AlertProvider
