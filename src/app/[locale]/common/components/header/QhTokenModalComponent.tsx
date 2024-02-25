'use client'

import {
    checkQhTokenAllowance,
    getAssetTransfers,
    getLogs,
    getTicketPrice,
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
import { customTheme, customTheme1 } from '../../materialUI/theme'
import { AlertContext } from '@/app/provider/AlertProvider'
import { getUuidByAccount } from '@/app/api/auth/api'
import { personalSign } from '@/app/api/wallet/api'
import { exchangeTicket, getUsedTicketList } from '@/app/api/dynamicNFT/api'
import { formatToken } from '@/app/utils/ethUtils'
import { ConfirmContext } from '@/app/provider/ConfirmProvider'
import InnerToast from '../InnerToast'
import InnerConfirm from '../InnerConfirm'

// import { Dialog } from '@headlessui/react'

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

    const toastTimer = React.useRef<NodeJS.Timeout>()

    // const [toastMessage, setToastMessage] = React.useState(null)
    // const [confirmMessage, setConfirmMessage] = React.useState(null)

    const { $confirm, open } = React.useContext(ConfirmContext)
    const { showToast } = React.useContext(ToastContext)

    const [ticketPrice, setTicketPrice] = React.useState(0)
    const [ticketAmount, setTicketAmount] = React.useState(0)
    const [tokenAmount, setTokenAmount] = React.useState(0)

    const myElementRef = React.useRef(null)

    const [missingTransactionForTicket, setMissingTransactionForTicket] = React.useState<any>([])

    // const showTaost = (message) => {
    //     setToastMessage(message)

    //     if (toastTimer.current) {
    //         clearTimeout(toastTimer.current)
    //     }
    //     const timer = setTimeout(() => {
    //         setToastMessage(null)
    //     }, 3000)
    //     toastTimer.current = timer
    // }

    const inputHandler = (e: React.ChangeEvent) => {
        if (e.target instanceof HTMLInputElement) {
            const { value } = e.target
            // let targetValue = value.replace(/^0+/, '')

            // 현재 보유한 Token Balance에 따라 MAX Token amount 변경
            if (parseInt(value) * ticketPrice > limit) {
                console.log('삑')
                const maxTicket = limit / ticketPrice
                setTicketAmount(maxTicket)
                setTokenAmount(maxTicket * ticketPrice)
                return
            }
            console.log(value)
            setTicketAmount(parseInt(value))
            setTokenAmount(parseInt(value) * ticketPrice)
        }
    }

    const clearLoading = () => {
        setIsLoadingForApproved(false)
        setIsLoadingForTransfer(false)
        setIsLoadingForExchangeTicket(false)
    }

    const exchangeHashToTicket = async (txHash) => {
        let signResult = await getUuidByAccount(wallet.accounts[0])
        const signature = await personalSign(wallet.accounts[0], signResult.eth_nonce)
        const result = await exchangeTicket({
            hash_tx: txHash,
            wallet_signature: signature,
            wallet_address: wallet.accounts[0],
        })

        setTokenAmount(0)
        setTicketAmount(0)
        setZindex()
        showToast(`Dynamic NFT 티켓 연동을 완료하였습니다`)
        getMissingTicketList()
    }

    const getMissingTicketList = async () => {
        const txListFromOnChain = await getLogs(wallet.accounts[0])
        const txListFromOffChain = await getUsedTicketList()

        const processingList = txListFromOffChain?.data?.tickets.map((item) => {
            return item.hash_tx
        })

        const missingTicketList = txListFromOnChain.filter(
            (item) => !processingList.includes(item.transactionHash),
        )

        setMissingTransactionForTicket(missingTicketList)
    }

    const setMaxTicketBalance = () => {
        const maxTicket = limit / ticketPrice
        setTicketAmount(maxTicket)
        setTokenAmount(maxTicket * ticketPrice)
    }

    const setZindex = () => {
        if (myElementRef.current) {
            // 선택된 요소의 부모 노드에 접근
            const parentElement = myElementRef.current.parentNode

            // 부모 노드의 부모 노드에 클래스 추가
            if (parentElement && parentElement.parentNode) {
                parentElement.parentNode.classList.add('!z-[9998]')
            }
        }
    }

    const sendTransactionForTicket = async () => {
        setZindex()
        if (tokenAmount > limit) {
            setTokenAmount(0)
            return
        }

        if (await $confirm('Ticket을 구매하시겠습니까?')) {
            const allowanceResponse = await checkQhTokenAllowance(wallet.accounts[0])

            const realTokenAmount = tokenAmount * 10 ** 18

            /**
             * 입력한 수량에 대한 Transfer 권한이 없는 경우엔 권한 승인을 먼저 요청한다.
             */
            try {
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
                        try {
                            const txHashForTransfer = await transferQhToken(
                                wallet.accounts[0],
                                realTokenAmount.toString(),
                            )
                            await exchangeTokenToTicket(txHashForTransfer)
                        } catch (error) {
                            console.log('Transfer Error')
                            console.error(error)
                            clearLoading()
                        }
                    })
                    return
                }
            } catch (error) {
                console.error(error)
                console.log('Approve Error')
                clearLoading()
                return
            }

            /**
             *  입력한 수량에 대한 Transfer 권한을 가진 경우엔 권한 승인 없이 바로 Transfer(onChain) & Exchange(offChain) 메소드를 실행한다.
             */

            console.log(
                '입력하신 수량에 대한 토큰 Transfer권한이 충분합니다. Transfer Transaction을 실행합니다.',
            )
            setIsLoadingForTransfer(true)
            try {
                const txHashForTransfer = await transferQhToken(
                    wallet.accounts[0],
                    realTokenAmount.toString(),
                )
                await exchangeTokenToTicket(txHashForTransfer)
            } catch (error) {
                console.log('Transfer Error')
                console.error(error)
                getMissingTicketList()
                clearLoading()
            }
        }
    }

    const exchangeTokenToTicket = async (txHash) => {
        console.log('txHash', txHash)
        alchemy.ws.on(txHash, async (tx) => {
            try {
                // console.log('tx', tx)
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

                setZindex()
                showToast(`Dynamic NFT 티켓 연동을 완료하였습니다`)
                setTokenAmount(0)
                setTicketAmount(0)
                setIsLoadingForExchangeTicket(false)
            } catch (error) {
                console.log('Ticket Error')
                console.error(error)
                getMissingTicketList()
                clearLoading()
            }
        })
    }

    const checkAllowance = async () => {
        const response = await checkQhTokenAllowance(wallet.accounts[0])
        console.log('response', response)
    }
    React.useEffect(() => {
        if (missingTransactionForTicket.length === 0) {
            handleQhTokenModalTap('ticket')
        }
    }, [missingTransactionForTicket])

    React.useEffect(() => {
        const getTicketPriceFromChain = async () => {
            const ticketPrice = await getTicketPrice()

            console.log('ticketPrice', ticketPrice)

            setTicketPrice(ticketPrice / 10 ** 18)
        }
        setTokenAmount(0)
        setTicketAmount(0)
        getMissingTicketList()
        getTicketPriceFromChain()
    }, [])

    React.useEffect(() => {
        setTokenAmount(0)
        setTicketAmount(0)
    }, [isQhTokenModalOpen])

    return (
        <>
            <Dialog
                ref={myElementRef}
                dismiss={open ? { outsidePress: false } : { outsidePress: true }}
                open={isQhTokenModalOpen}
                className="!min-h-[305px] relative border-2"
                handler={handleQhTokenModal}
                placeholder={undefined}>
                <DialogHeader placeholder={undefined}>
                    <div className="flex flex-row justify-center font-black items-center w-full relative">
                        Dynamic NFT Buy
                        <img
                            src="/exit.svg"
                            alt="exit"
                            onClick={handleQhTokenModal}
                            className="cursor-pointer absolute right-0"
                        />
                    </div>
                </DialogHeader>
                <DialogBody placeholder={undefined}>
                    <div className="w-full flex flex-col justify-center items-center gap-1">
                        <div className="flex flex-row justify-center items-center font-black w-full text-center gap-1">
                            <div
                                className={`w-full border-2 rounded-l-xl p-2 cursor-pointer text-[#F46221] border-[#F46221] hover:border-[#F46221]`}
                                onClick={() => handleQhTokenModalTap('ticket')}>
                                TICKET
                            </div>
                            <div
                                className={`w-full border-2 border-[#F46221] rounded-r-xl p-2 relative bg-[#F46221] text-[#FFFFFF] ${
                                    missingTransactionForTicket.length > 0 &&
                                    'hover:border-[#F46221] cursor-pointer'
                                }  ${QhTokenModalTap === 'activity' && 'bg-[#FFCD19]/25'}`}
                                onClick={() =>
                                    missingTransactionForTicket.length > 0 &&
                                    handleQhTokenModalTap('activity')
                                }>
                                ACTIVITY
                                <div
                                    className={`${
                                        missingTransactionForTicket.length > 0 ? 'block' : 'hidden'
                                    } absolute text-red-700 text-2xl -translate-y-1/2 left-32 top-1/2`}>
                                    !
                                </div>
                            </div>
                        </div>
                        {QhTokenModalTap === 'ticket' && (
                            <div className="w-full mt-[47px]">
                                <div className="flex flex-row justify-center items-center w-full gap-1 relative">
                                    <div className="flex flex-col justify-center items-center border-2 border-[#F46221] rounded-l-xl p-5 w-full text-[#F46221]">
                                        <div className="font-black">
                                            {tokenAmount ? tokenAmount : 0} QH
                                        </div>
                                        <div className="font-medium">QH balance</div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center border-2 border-[#F46221] bg-[#F46221] text-[#FFFFFF] rounded-r-xl p-5 w-full">
                                        <div className="font-black">
                                            {ticketAmount ? ticketAmount : 0} TICKET
                                        </div>
                                        <div className="font-medium">Dynamic NFT</div>
                                    </div>
                                    <div className="absolute bg-white rounded-full border-2 p-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 text-black">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="w-full relative mt-[62px]">
                                    <input
                                        value={ticketAmount === 0 ? 'Ticket' : ticketAmount}
                                        disabled={
                                            isLoadingForApproved ||
                                            isLoadingForTransfer ||
                                            isLoadingForExchangeTicket
                                        }
                                        type="number"
                                        onChange={inputHandler}
                                        placeholder="TICKET"
                                        className="outline-none p-2 border-2 border-[#F46221] focus:border-[#F46221] bg-[#FFF5F0] rounded-lg w-full"
                                    />
                                    <div className="flex flex-row justify-center items-center gap-2 font-medium absolute right-3 top-1/2 -translate-y-1/2">
                                        <button
                                            className="px-3 rounded-full cursor-pointer text-[#F46221] font-black bg-[#F46221]/15"
                                            disabled={
                                                isLoadingForApproved ||
                                                isLoadingForTransfer ||
                                                isLoadingForExchangeTicket
                                            }
                                            onClick={setMaxTicketBalance}>
                                            Max
                                        </button>
                                    </div>
                                </div>
                                {!isLoadingForApproved &&
                                    !isLoadingForTransfer &&
                                    !isLoadingForExchangeTicket && (
                                        <Button
                                            onClick={sendTransactionForTicket}
                                            className="w-full bg-[#F46221] mt-[62px] mb-[15px] text-white font-black hover:opacity-80"
                                            placeholder={undefined}
                                            disabled={tokenAmount === 0 || !tokenAmount}>
                                            Next
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
                            <table className="w-full font-medium rounded-lg table-auto text-left">
                                <thead className="text-[#FFFFFF] rounded-xl w-full">
                                    <tr>
                                        {TABLE_HEAD.map((head) => (
                                            <th key={head} className="bg-[#F46221] py-3 px-5 ">
                                                {head}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="w-full">
                                    {missingTransactionForTicket.map(
                                        ({ transactionHash, data, claim }, index) => {
                                            return (
                                                <tr
                                                    className="border-b-2 p-10 cursor-pointer hover:opacity-70"
                                                    key={transactionHash}
                                                    onClick={() =>
                                                        exchangeHashToTicket(transactionHash)
                                                    }>
                                                    <td className="p-3 px-5 truncate max-w-[300px]">
                                                        {transactionHash}
                                                    </td>
                                                    <td className="p-3 px-5">
                                                        {parseInt(data, 16) / 10 ** 18 / 10}
                                                    </td>
                                                    <td className="p-3 px-5 text-[#FFFFFF]">
                                                        <div className="flex flex-row justify-center items-center bg-[#18AB56] px-5 py-1 rounded-full gap-2 align-middle">
                                                            <div>
                                                                <img src="/dot.svg" alt="dot" />
                                                            </div>
                                                            <div>Available</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        },
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </DialogBody>
                {/* <InnerConfirm
                    confirmMessage={confirmMessage}
                    setConfirmMessage={setConfirmMessage}
                />
                <InnerToast toastMessage={toastMessage} setToastMessage={setToastMessage} /> */}
            </Dialog>
        </>
    )
}
