import {
    useState,
    useEffect,
    createContext,
    PropsWithChildren,
    useContext,
    useCallback,
} from 'react'

import detectEthereumProvider from '@metamask/detect-provider'
import { formatBalance } from '@/app/utils/ethUtils'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from '@/i18nconfig'
interface WalletState {
    accounts: any[]
    balance: string
    chainId: string
}

interface MetaMaskContextData {
    wallet: WalletState
    hasProvider: boolean | null
    error: boolean
    errorMessage: string
    isConnecting: boolean
    connectMetaMask: () => void
    clearError: () => void
}

const disconnectedState: WalletState = {
    accounts: [],
    balance: '',
    chainId: '',
}

const { useRouter } = createSharedPathnamesNavigation({ locales })

export const MetaMaskContext = createContext<MetaMaskContextData>({} as MetaMaskContextData)

export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
    const router = useRouter()
    const [hasProvider, setHasProvider] = useState<boolean | null>(null)

    const [prevWallet, setPrevWallet] = useState('')

    const [isConnecting, setIsConnecting] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')
    const clearError = () => setErrorMessage('')

    const [wallet, setWallet] = useState(disconnectedState)

    const _goToMain = useCallback(() => {
        router.push('/')
    }, [])

    // useCallback ensures that you don't uselessly recreate the _updateWallet function on every render
    const _updateWallet = useCallback(async (providedAccounts?: any) => {
        console.log('변화')
        const accounts =
            providedAccounts || (await window.ethereum.request({ method: 'eth_accounts' }))

        if (accounts.length === 0) {
            // If there are no accounts, then the user is disconnected
            setWallet(disconnectedState)
            router.push('/')
            return
        }

        const balance = formatBalance(
            await window.ethereum.request({
                method: 'eth_getBalance',
                params: [accounts[0], 'latest'],
            }),
        )
        const chainId = await window.ethereum.request({
            method: 'eth_chainId',
        })

        setWallet({ accounts, balance, chainId })
    }, [])

    const refresh = useCallback(async (providedAccounts?: any) => {
        const accounts =
            providedAccounts || (await window.ethereum.request({ method: 'eth_accounts' }))

        if (accounts.length === 0) {
            // If there are no accounts, then the user is disconnected
            setWallet(disconnectedState)
            return
        }
        const balance = formatBalance(
            await window.ethereum.request({
                method: 'eth_getBalance',
                params: [accounts[0], 'latest'],
            }),
        )
        const chainId = await window.ethereum.request({
            method: 'eth_chainId',
        })

        setWallet({ accounts, balance, chainId })
    }, [])

    const updateWalletAndAccounts = useCallback(() => _updateWallet(), [_updateWallet])
    const updateWallet = useCallback((accounts: any) => _updateWallet(accounts), [_updateWallet])
    const goToMain = useCallback(() => _goToMain(), [])
    /**
     * This logic checks if MetaMask is installed. If it is, some event handlers are set up
     * to update the wallet state when MetaMask changes. The function returned by useEffect
     * is used as a "cleanup": it removes the event handlers whenever the MetaMaskProvider
     * is unmounted.
     */
    useEffect(() => {
        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true })
            setHasProvider(Boolean(provider))

            if (provider) {
                updateWalletAndAccounts()
                window.ethereum.on('accountsChanged', updateWallet)
                window.ethereum.on('chainChanged', updateWalletAndAccounts)
                window.ethereum.on('disconnect', () => goToMain)
            }
        }

        getProvider()

        return () => {
            window.ethereum?.removeListener('accountsChanged', updateWallet)
            window.ethereum?.removeListener('chainChanged', updateWalletAndAccounts)
            window.ethereum?.removeListener('disconnect', goToMain)
        }
    }, [updateWallet, updateWalletAndAccounts])

    const connectMetaMask = async () => {
        setIsConnecting(true)

        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })
            clearError()
            updateWallet(accounts)
        } catch (err: any) {
            setErrorMessage(err.message)
        }
        setIsConnecting(false)
    }

    return (
        <MetaMaskContext.Provider
            value={{
                wallet,
                hasProvider,
                error: !!errorMessage,
                errorMessage,
                isConnecting,
                connectMetaMask,
                clearError,
            }}>
            {children}
        </MetaMaskContext.Provider>
    )
}
