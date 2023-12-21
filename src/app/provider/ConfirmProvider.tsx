import { createContext, useState } from 'react'
import { Confirm } from '../[locale]/common/components/Confirm'
// import Confirm from './Confirm';
// import ConfirmContext from '../../context/confirm/ConfirmContext';

type ConfirmState = {
    message: string
    onClickOK: () => void
    onClickCancel: () => void
}
type Type = {
    $confirm: (message?: string) => Promise<boolean>
}

export const ConfirmContext = createContext<Type>({
    $confirm: () => new Promise((_, reject) => reject()),
})

const ConfirmProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<ConfirmState>()
    const [open, setOpen] = useState(false)

    const $confirm = (message?: string): Promise<boolean> => {
        setOpen(true)
        return new Promise((resolve) => {
            setState({
                message: message ?? '',
                onClickOK: () => {
                    setState(undefined)
                    setOpen(false)
                    resolve(true)
                },
                onClickCancel() {
                    setState(undefined)
                    setOpen(false)
                    resolve(false)
                },
            })
        })
    }

    return (
        <ConfirmContext.Provider value={{ $confirm }}>
            {children}
            (
            <Confirm
                open={open}
                message={state?.message}
                onClickOK={state?.onClickOK}
                onClickCancel={state?.onClickCancel}
            />
            )
        </ConfirmContext.Provider>
    )
}

export default ConfirmProvider
