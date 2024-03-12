'use client'
import detectEthereumProvider from '@metamask/detect-provider'
import * as React from 'react'

import { useMetaMask } from '../hooks/useMetaMask'
import NetworkErrorPage from '../[locale]/(error)/network-error/page'

export interface INetworkCheckProviderProps {}

declare enum Networks {
    ETH_MAINNET = '0x1',
    ETH_SEPOLIA = '0xaa36a7',
}

export const NetworkCheckContext = React.createContext<INetworkCheckProviderProps>(
    {} as INetworkCheckProviderProps,
)

export default function NetworkCheckProvider({ children }: React.PropsWithChildren) {
    const { wallet } = useMetaMask()

    const [isMainNetwork, setIsMainNetwork] = React.useState(true)

    const checkNetwork = React.useCallback(
        (network) => {
            console.log('network changed', network)
            if (network !== Networks[process.env.NEXT_PUBLIC_NETWORK]) {
                setIsMainNetwork(false)
            } else {
                setIsMainNetwork(true)
            }
        },
        [wallet.chainId],
    )

    React.useEffect(() => {
        checkNetwork(wallet.chainId)
    }, [wallet.chainId])

    React.useEffect(() => {
        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true })
            if (provider) {
                window.ethereum.on('chainChanged', checkNetwork)
            }
        }
        getProvider()
        return () => {
            window.ethereum?.removeListener('chainChanged', checkNetwork)
        }
    }, [])

    if (isMainNetwork)
        return <NetworkCheckContext.Provider value={null}>{children}</NetworkCheckContext.Provider>

    if (!isMainNetwork) return <NetworkErrorPage />
}
