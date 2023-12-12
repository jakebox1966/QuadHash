import { useContext } from 'react'
import { SignInModalContext } from '../provider/SignInModalProvider'

export const useSignInModal = () => {
    const context = useContext(SignInModalContext)

    if (context === undefined) {
        throw new Error('SignInModal must be used within a "SignInModalContextProvider"')
    }
    return context
}
