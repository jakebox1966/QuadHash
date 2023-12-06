import { useContext } from 'react'
import { MetaMaskContext } from '../provider/MetamaskProvider'

export const useMetaMask = () => {
    const context = useContext(MetaMaskContext)

    if (context === undefined) {
        throw new Error('MetaMask must be used within a "MetaMaskContextProvider"')
    }
    return context
}
