'use client'

import {
    checkQhTokenAllowance,
    getAssetTransfers,
    giveQhTokenContractPermission,
    transferQhToken,
} from '@/app/api/alchemy/api'
import { useMetaMask } from '@/app/hooks/useMetaMask'
import {
    Button,
    Dialog,
    DialogBody,
    DialogHeader,
    Spinner,
    ThemeProvider,
} from '@material-tailwind/react'
import { Wallet } from 'alchemy-sdk'
import * as React from 'react'

import {
    Alchemy,
    AlchemySubscription,
    GetTransfersForOwnerTransferType,
    Network,
    Utils,
} from 'alchemy-sdk'
import { ToastContext } from '@/app/provider/ToastProvider'
import { customTheme } from '../../materialUI/theme'
import { AlertContext } from '@/app/provider/AlertProvider'
import { getUuidByAccount } from '@/app/api/auth/api'
import { personalSign } from '@/app/api/wallet/api'
import { exchangeTicket } from '@/app/api/dynamicNFT/api'

const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_RAW_API_KEY, // Replace with your API key
    network: Network.ETH_SEPOLIA, // Replace with your network
    // network: Network.ETH_MAINNET, // Replace with your network
}

const alchemy = new Alchemy(config)

export interface IQhtokenModalComponentProps {
    qhTokenBalance: number
    isQhTokenModalOpen: boolean
    handleQhTokenModal: () => void
    QhTokenModalTap: string
    handleQhTokenModalTap: (value: string) => void
}

const TABLE_HEAD = ['Hash', 'Ticket', 'Claim']
const TABLE_ROWS = [
    { hash: '234234ccc234', ticket: 2, claim: 123 },
    { hash: '234234ccc234', ticket: 2, claim: 123 },
    { hash: '234234ccc234', ticket: 2, claim: 123 },
    { hash: '234234ccc234', ticket: 2, claim: 123 },
    { hash: '234234ccc234', ticket: 2, claim: 123 },
]

export default function QhTokenModalComponent({
    qhTokenBalance,
    isQhTokenModalOpen,
    handleQhTokenModal,
    QhTokenModalTap,
    handleQhTokenModalTap,
}: IQhtokenModalComponentProps) {
    const [isLoadingForApproved, setIsLoadingForApproved] = React.useState(false)
    const [isLoadingForTransfer, setIsLoadingForTransfer] = React.useState(false)
    const [isLoadingForExchangeTicket, setIsLoadingForExchangeTicket] = React.useState(false)
    const limit = qhTokenBalance

    const { wallet } = useMetaMask()

    const [tokenAmount, setTokenAmount] = React.useState('')

    const inputHandler = (e: React.ChangeEvent) => {
        if (e.target instanceof HTMLInputElement) {
            const { value } = e.target
            console.log(value)
            setTokenAmount(value)
        }
    }

    React.useEffect(() => {
        const test = async () => {
            await getAssetTransfers({
                fromAddress: wallet.accounts[0],
                toAddress: '0x485fd663AF10F6Bd379D86494aD48E01531417F4',
                category: ['erc20'],
                contractAddresses: [process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS],
            })
        }
        test()
    }, [])

    // const setMaxQhBalance = () => {
    //     setTokenAmount(limit)
    // }

    const calcTokenToTicket = (token) => {
        return token
    }

    const sendTransactionForTicket = async () => {
        if (parseInt(tokenAmount) > limit) {
            setTokenAmount('')
            return
        }
        const allowanceResponse = await checkQhTokenAllowance(wallet.accounts[0])

        const realTokenAmount = parseInt(tokenAmount) * 10 ** 18

        /**
         * 입력한 수량에 대한 Transfer 권한이 없는 경우엔 권한 승인을 먼저 요청한다.
         */
        if (parseInt(allowanceResponse) < realTokenAmount) {
            setIsLoadingForApproved(true)
            console.log(
                '토큰을 Transfer하기 위한 권한이 필요합니다. 입력하신 수량만큼 권한 요청을 시도합니다.',
            )
            const txHash = await giveQhTokenContractPermission(
                wallet.accounts[0],
                realTokenAmount.toString(),
            )

            alchemy.ws.on(txHash, async (tx) => {
                alchemy.ws.off(txHash)
                setIsLoadingForApproved(false)
                setIsLoadingForTransfer(true)
                const txHashForTransfer = await transferQhToken(
                    wallet.accounts[0],
                    realTokenAmount.toString(),
                )
                await exchangeTokenToTicket(txHashForTransfer)
            })
            return
        }

        /**
         *  입력한 수량에 대한 Transfer 권한을 가진 경우엔 권한 승인 없이 바로 Transfer(onChain) & Exchange(offChain) 메소드를 실행한다.
         */

        console.log(
            '입력하신 수량에 대한 토큰 Transfer권한이 충분합니다. Transfer Transaction을 실행합니다.',
        )
        setIsLoadingForTransfer(true)
        const txHashForTransfer = await transferQhToken(
            wallet.accounts[0],
            realTokenAmount.toString(),
        )
        await exchangeTokenToTicket(txHashForTransfer)
    }

    const exchangeTokenToTicket = async (txHash) => {
        console.log('txHash', txHash)
        alchemy.ws.on(txHash, async (tx) => {
            alchemy.ws.off(txHash)
            setIsLoadingForTransfer(false)
            setIsLoadingForExchangeTicket(true)

            let signResult = await getUuidByAccount(wallet.accounts[0])
            const signature = await personalSign(wallet.accounts[0], signResult.eth_nonce)
            const result = await exchangeTicket({
                hash_tx: txHash,
                wallet_signature: signature,
                wallet_address: wallet.accounts[0],
            })

            setIsLoadingForExchangeTicket(false)
        })
    }

    const checkAllowance = async () => {
        const response = await checkQhTokenAllowance(wallet.accounts[0])
        console.log('response', response)
    }

    return (
        <>
            <Dialog
                open={isQhTokenModalOpen}
                className="min-h-[502px]"
                handler={handleQhTokenModal}
                placeholder={undefined}>
                <DialogHeader placeholder={undefined}>
                    <div className="flex flex-row justify-center font-black items-center w-full relative">
                        DYNAMIC NFT BUY
                        <img
                            src="/exit.svg"
                            alt="exit"
                            onClick={handleQhTokenModal}
                            className="cursor-pointer absolute right-0"
                        />
                    </div>
                </DialogHeader>
                <DialogBody placeholder={undefined}>
                    <div className="w-full flex flex-col justify-center items-center gap-2">
                        <div className="flex flex-row justify-center items-center font-black w-full text-center gap-2">
                            <div
                                className={`w-full border-2 rounded-lg p-2 cursor-pointer hover:border-[#F46221] ${
                                    QhTokenModalTap === 'ticket' && 'bg-[#FFCD19]/25'
                                }`}
                                onClick={() => handleQhTokenModalTap('ticket')}>
                                TICKET
                            </div>
                            <div
                                className={`w-full border-2 rounded-lg p-2 cursor-pointer hover:border-[#F46221] ${
                                    QhTokenModalTap === 'activity' && 'bg-[#FFCD19]/25'
                                }`}
                                onClick={() => handleQhTokenModalTap('activity')}>
                                ACTIVITY
                            </div>
                        </div>
                        {QhTokenModalTap === 'ticket' && (
                            <div className="w-full">
                                <div className="flex flex-row justify-center items-center w-full gap-2 relative">
                                    <div className="flex flex-col justify-center items-center bg-gray-200 rounded-lg p-5 w-full">
                                        <div className="font-black">
                                            {tokenAmount ? tokenAmount : 0} QH
                                        </div>
                                        <div className="font-medium">QH balance</div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center bg-gray-200 rounded-lg p-5 w-full">
                                        <div className="font-black">
                                            {tokenAmount ? calcTokenToTicket(tokenAmount) : 0}{' '}
                                            TICKET
                                        </div>
                                        <div className="font-medium">Dynamic NFT</div>
                                    </div>
                                    <div className="absolute bg-white rounded-full p-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-full relative mt-10">
                                    <input
                                        value={tokenAmount}
                                        type="number"
                                        onChange={inputHandler}
                                        placeholder="Amount"
                                        className="p-2 border-2 rounded-lg w-full"
                                    />
                                    <div className="flex flex-row justify-center items-center gap-2 font-medium absolute right-3 top-1/2 -translate-y-1/2">
                                        <div className="font-black">QH</div>
                                        <div
                                            className="px-2 bg-gray-200 rounded-full cursor-pointer"
                                            // onClick={setMaxQhBalance}
                                        >
                                            Max
                                        </div>
                                    </div>
                                </div>
                                {!isLoadingForApproved &&
                                    !isLoadingForTransfer &&
                                    !isLoadingForExchangeTicket && (
                                        <Button
                                            onClick={sendTransactionForTicket}
                                            className="w-full bg-[#F46221] mt-10 text-white font-black hover:opacity-80"
                                            placeholder={undefined}>
                                            CONFIRM
                                        </Button>
                                    )}
                                {(isLoadingForApproved ||
                                    isLoadingForTransfer ||
                                    isLoadingForExchangeTicket) && (
                                    <Button
                                        className="w-full bg-[#F46221] mt-10 text-white font-black"
                                        placeholder={undefined}
                                        disabled>
                                        <span className="loader2">
                                            {isLoadingForApproved && 'APPROVING'}
                                            {isLoadingForTransfer && 'TRANSFERRING'}
                                            {isLoadingForExchangeTicket && 'EXCHANGING'}
                                        </span>
                                    </Button>
                                )}
                            </div>
                        )}

                        {QhTokenModalTap === 'activity' && (
                            <div className="w-full mb-10">
                                <table className="w-full rounded-lg min-w-max table-auto text-left overflow-hidden">
                                    <thead className="text-[#FFFFFF] rounded-xl">
                                        <tr>
                                            {TABLE_HEAD.map((head) => (
                                                <th key={head} className="bg-[#F46221] py-3 px-5 ">
                                                    {head}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {TABLE_ROWS.map(({ hash, ticket, claim }, index) => {
                                            return (
                                                <tr className="border-b-2 p-10" key={hash}>
                                                    <td className="p-3 px-5">{hash}</td>
                                                    <td className="p-3 px-5">{ticket}</td>
                                                    <td className="p-3 px-5">{claim}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </DialogBody>
            </Dialog>
        </>
    )
}
