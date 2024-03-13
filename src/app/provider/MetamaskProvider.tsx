/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    useState,
    useEffect,
    createContext,
    PropsWithChildren,
    useContext,
    useCallback,
    Dispatch,
    SetStateAction,
} from 'react'

import detectEthereumProvider from '@metamask/detect-provider'
import { formatBalance } from '../utils/ethUtils'
import { getUuidByAccount, signUpUser } from '../api/auth/api'
import { personalSign } from '../api/wallet/api'
import { signIn, signOut, useSession } from 'next-auth/react'

interface WalletState {
    accounts: any[]
    balance: string
    chainId: string
}

interface MetaMaskContextData {
    wallet: WalletState
    setWallet: Dispatch<SetStateAction<WalletState>>
    hasProvider: boolean | null
    error: boolean
    errorMessage: string
    isConnecting: boolean
    connectMetaMask: () => void
    clearError: () => void
    updateWalletAndAccounts: () => Promise<void>
    setPrevWallet: Dispatch<SetStateAction<string>>
}

declare enum Networks {
    ETH_MAINNET = '0x1',
    ETH_SEPOLIA = '0xaa36a7',
}

const disconnectedState: WalletState = { accounts: [], balance: '', chainId: '' }

export const MetaMaskContext = createContext<MetaMaskContextData>({} as MetaMaskContextData)

export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
    const { data: session } = useSession()
    const [hasProvider, setHasProvider] = useState<boolean | null>(null)

    const [prevWallet, setPrevWallet] = useState('')

    const [isConnecting, setIsConnecting] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')
    const clearError = () => setErrorMessage('')

    const [wallet, setWallet] = useState(disconnectedState)

    const renewSession = useCallback(async ({ accounts, balance, chainId }) => {
        let result = await getUuidByAccount(accounts[0])

        if (result.status === 'NotFound') {
            const formData = new FormData()
            formData.append('wallet_address', accounts[0])

            const response = await signUpUser(formData)

            result = await getUuidByAccount(accounts[0])
        }

        const signature = await personalSign(accounts[0], result.eth_nonce)

        const signInResult = await signIn('Credentials', {
            wallet_address: accounts[0],
            wallet_signature: signature,
            redirect: true,

            // callbackUrl: callbackUrl,
        })
        setPrevWallet(accounts[0])
    }, [])

    // useCallback ensures that you don't uselessly recreate the _updateWallet function on every render
    const _updateWallet = useCallback(async (providedAccounts?: any) => {
        console.log('update')
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

        if (prevWallet !== accounts[0]) {
            // await window.ethereum.request({
            //     method: 'wallet_revokePermissions',
            //     params: [
            //         {
            //             eth_accounts: wallet.accounts[0],
            //         },
            //     ],
            // })
            // signOut({ redirect: false })

            renewSession({ accounts, balance, chainId })
        }
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

    const updateWalletAndAccounts = useCallback(() => refresh(), [refresh])

    const updateWallet = useCallback((accounts: any) => _updateWallet(accounts), [_updateWallet])

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
                // window.ethereum.on('chainChanged', updateWalletAndAccounts)
            }
        }

        getProvider()

        return () => {
            window.ethereum?.removeListener('accountsChanged', updateWallet)
            // window.ethereum?.removeListener('chainChanged', updateWalletAndAccounts)
        }
    }, [updateWallet])

    const connectMetaMask = async () => {
        setIsConnecting(true)

        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })

            clearError()
            updateWallet(accounts)
            setPrevWallet(accounts[0])
        } catch (err: any) {
            setErrorMessage(err.message)
        }
        setIsConnecting(false)
    }

    return (
        <MetaMaskContext.Provider
            value={{
                wallet,
                setWallet,
                hasProvider,
                error: !!errorMessage,
                errorMessage,
                isConnecting,
                connectMetaMask,
                clearError,
                updateWalletAndAccounts,
                setPrevWallet,
            }}>
            {children}
        </MetaMaskContext.Provider>
    )
}
