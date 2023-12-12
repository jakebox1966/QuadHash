import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react'

interface SignInModalContextData {
    signInModalopen: boolean
    setSignInModalOpen: Dispatch<SetStateAction<boolean>>
    handleSignInModalOpen: () => void
}

export const SignInModalContext = createContext<SignInModalContextData>(
    {} as SignInModalContextData,
)

export const SignInModalContextProvider = ({ children }: PropsWithChildren) => {
    const [signInModalopen, setSignInModalOpen] = useState(false)

    const handleSignInModalOpen = () => setSignInModalOpen((cur) => !cur)

    return (
        <SignInModalContext.Provider
            value={{
                signInModalopen,
                setSignInModalOpen,
                handleSignInModalOpen,
            }}>
            {children}
        </SignInModalContext.Provider>
    )
}
