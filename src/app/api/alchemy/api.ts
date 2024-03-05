import {
    Alchemy,
    AlchemySubscription,
    GetTransfersForOwnerTransferType,
    Network,
    Utils,
} from 'alchemy-sdk'
import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import EtherToQHT_ContractABI from '@/app/abi/EtherToQHT.json'
import ERC20Token_ContractABI from '@/app/abi/ERC20Token.json'
import SendERC20Token_ContractABI from '@/app/abi/SendERC20Token.json'
import { calcCoinPriceWithWei } from '@/app/utils/ethUtils'

const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)
const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_RAW_API_KEY, // Replace with your API key
    network: Network[process.env.NEXT_PUBLIC_NETWORK], // Replace with your network
    // network: Network.ETH_MAINNET, // Replace with your network
}

const alchemy = new Alchemy(config)

/**
 * Get Owner For NFT
 *
 * @param contractAddress
 * @param token_id
 * @returns
 */
export const getOwnerForNft = async (contractAddress: string, token_id: string) => {
    const response = await alchemy.nft.getOwnersForNft(contractAddress, token_id)
    return response
}

/**
 * Get All NFT List For A Given Owner Address.
 *
 * @param wallet_address
 * @param option
 * @returns
 */
export const getNftsForOwner = async (wallet_address: string, option = null) => {
    const response = await alchemy.nft.getNftsForOwner(wallet_address, option)
    return response
}

/**
 * Get All NFT Transfers For A Given Owner Address.
 *
 * @param wallet_address
 * @param option
 * @returns
 */
export const getTransfersForOwner = async (
    wallet_address: string,
    category: GetTransfersForOwnerTransferType = null,
    option = null,
) => {
    const response = await alchemy.nft.getTransfersForOwner(wallet_address, category, option)
    return response
}

/**
 * Get Block Id
 *
 * @param blockId
 * @returns
 */
export const getBlock = async (blockId: string) => {
    const response = await alchemy.core.getBlock(blockId)
    return response
}

/**
 * Buy Coin for Dynamic NFT or Fractional Investing
 *
 * @param coinAmount
 * @param etherValue
 * @returns
 */
export const getCoin = async (coinAmount: number) => {
    window.contract = new web3.eth.Contract(
        EtherToQHT_ContractABI.abi as any,
        process.env.NEXT_PUBLIC_ETH_TO_ERC20_CONTRACT_ADDRESS,
    )

    const coinPriceInWei = await window.contract.methods._tokenPrice.call().call()

    const transactionParameters = {
        to: process.env.NEXT_PUBLIC_ETH_TO_ERC20_CONTRACT_ADDRESS,
        from: window.ethereum.selectedAddress,
        value: (coinAmount * coinPriceInWei).toString(16),
        data: window.contract.methods.etherToERC20(coinAmount).encodeABI(),
    }

    const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
    })
    return txHash
}

export const refreshMetadata = async ({ tokenId, contractAddress }) => {
    const response = await alchemy.nft.refreshNftMetadata(contractAddress, tokenId)
    console.log('refreshMetadata')
}

export const getNFTMetadata = async (contractAddress, tokenId) => {
    const response = await alchemy.nft.getNftMetadata(contractAddress, tokenId)
    console.log(response)
    return response
}

export const getQhTokenBalance = async (walletAddress) => {
    const response = await alchemy.core.getTokenBalances(walletAddress, [
        process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS,
    ])

    return response
}

export const getTicketPrice = async () => {
    window.contract = new web3.eth.Contract(
        SendERC20Token_ContractABI.abi as any,
        process.env.NEXT_PUBLIC_SEND_ERC20_CONTRACT_ADDRESS,
    )

    const ticketPrice = await window.contract.methods.getTicketPrice().call()
    console.log(ticketPrice)
    return ticketPrice
}

export const checkQhTokenAllowance = async (walletAddress) => {
    window.contract = new web3.eth.Contract(
        ERC20Token_ContractABI.abi as any,
        process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS,
    )

    const allowance = await window.contract.methods
        .allowance(walletAddress, process.env.NEXT_PUBLIC_SEND_ERC20_CONTRACT_ADDRESS)
        .call()
    console.log(allowance)
    return allowance

    // window.contract = new web3.eth.Contract(
    //     ERC20Token_ContractABI.abi as any,
    //     '0xec1e45aDE3cADaCDAcEd90Bb6c4A7Bc30e274864',
    // )
}

export const giveQhTokenContractPermission = async (walletAddress, value) => {
    window.contract = new web3.eth.Contract(
        ERC20Token_ContractABI.abi as any,
        process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS,
    )

    const transactionParameters = {
        to: process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS,
        from: walletAddress,
        data: window.contract.methods
            .approve(process.env.NEXT_PUBLIC_SEND_ERC20_CONTRACT_ADDRESS, value)
            .encodeABI(),
    }

    const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
    })

    return txHash
}

export const transferQhToken = async (walletAddress: string, amount: string) => {
    // window.contract = new web3.eth.Contract(
    //     SendERC20Token_ContractABI.abi as any,
    //     process.env.NEXT_PUBLIC_SEND_ERC20_CONTRACT_ADDRESS,
    // )

    window.contract = new web3.eth.Contract(
        SendERC20Token_ContractABI.abi as any,
        process.env.NEXT_PUBLIC_SEND_ERC20_CONTRACT_ADDRESS,
    )

    const transactionParameters = {
        to: process.env.NEXT_PUBLIC_SEND_ERC20_CONTRACT_ADDRESS,
        from: walletAddress,
        // value: amount,
        data: window.contract.methods.sendERC20(amount).encodeABI(),
    }

    const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
    })

    return txHash
}

export const getAssetTransfers = async ({
    // fromBlock,
    fromAddress,
    toAddress,
    category,
    contractAddresses,
}) => {
    const response = await alchemy.core.getAssetTransfers({
        // fromBlock: fromBlock,
        fromAddress: fromAddress,
        toAddress: toAddress,
        category: category,
        contractAddresses: contractAddresses,
    })

    // console.log(response)
    return response
}

export const getLogs = async (walletAddress: string) => {
    console.log(Utils.hexZeroPad(walletAddress, 32).toString())
    const response = await alchemy.core.getLogs({
        address: process.env.NEXT_PUBLIC_SEND_ERC20_CONTRACT_ADDRESS,
        topics: [
            '0x11df6712959cc8f8aab17d311d8d23a055eb63beca3cf9428063485f8d8c181d',
            Utils.hexZeroPad(walletAddress, 32).toString(),
        ],
        fromBlock: '0x00',
        toBlock: 'latest',
    })

    return response
}

// /**
//  *
//  * Transaction 실행 후, Alchemy websocket으로 Transaction 상태 응답
//  *
//  * @param txHash
//  */
// export const asnycCreateBlock = (txHash: string) => {
//     alchemy.ws.on(txHash, (tx) => {
//         console.log(tx)
//         alchemy.ws.off(tx)
//         return tx
//     })
// }
