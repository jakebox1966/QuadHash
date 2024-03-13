'use client'
import detectEthereumProvider from '@metamask/detect-provider'
import * as React from 'react'

import { useMetaMask } from '../hooks/useMetaMask'
import NetworkErrorPage from '../[locale]/(error)/network-error/page'
import { locales } from '@/i18nconfig'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export interface INetworkCheckProviderProps {}

declare enum Networks {
    ETH_MAINNET = '0x1',
    ETH_SEPOLIA = '0xaa36a7',
}

export const NetworkCheckContext = React.createContext<INetworkCheckProviderProps>(
    {} as INetworkCheckProviderProps,
)

const privatePages = ['/dynamicNFT', '/report']

const { Link, redirect, usePathname } = createSharedPathnamesNavigation({ locales })
export default function NetworkCheckProvider({ children }: React.PropsWithChildren) {
    const pathName = usePathname()
    const { wallet } = useMetaMask()

    const [isMainNetwork, setIsMainNetwork] = React.useState(true)
    const [chainId, setChainId] = React.useState('')

    const privatePathnameRegex = RegExp(
        `^(/(${locales.join('|')})?)?(${privatePages
            .flatMap((p) => (p === '/' ? ['', '/'] : p))
            .join(
                '|',
            )})(?:\/(?:list|[a-zA-Z]+\/\d+))?(?!\/dynamicNFT(?:\/(?:list|saza\/'\d+'|gaza\/'\d+'))(?:\/|$)).*$`,
        'i',
    )

    const isPrivatePages = privatePathnameRegex.test(pathName)

    const checkNetwork = React.useCallback(
        (network) => {
            console.log('network changed', network)
            if (network !== Networks[process.env.NEXT_PUBLIC_NETWORK]) {
                setIsMainNetwork(false)
            } else {
                setIsMainNetwork(true)
            }
        },
        [chainId],
    )

    React.useEffect(() => {
        checkNetwork(chainId)
    }, [chainId])

    React.useEffect(() => {
        const init = async () => {
            const provider = await detectEthereumProvider({ silent: true })
            if (provider) {
                window.ethereum.on('chainChanged', checkNetwork)
            }
            const chainId = await window.ethereum.request({
                method: 'eth_chainId',
                params: [],
            })

            setChainId(chainId)
        }
        init()
        return () => {
            window.ethereum?.removeListener('chainChanged', checkNetwork)
        }
    }, [])

    if (!isPrivatePages)
        return <NetworkCheckContext.Provider value={null}>{children}</NetworkCheckContext.Provider>

    if (isMainNetwork)
        return <NetworkCheckContext.Provider value={null}>{children}</NetworkCheckContext.Provider>

    if (!isMainNetwork) return <NetworkErrorPage />
}
