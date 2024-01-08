import { Alchemy, GetTransfersForOwnerTransferType, Network } from 'alchemy-sdk'
import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import EtherToQHT_ContractABI from '@/app/abi/EtherToQHT.json'
import { calcCoinPriceWithWei } from '@/app/utils/ethUtils'

const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)
const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_RAW_API_KEY, // Replace with your API key
    network: Network.ETH_SEPOLIA, // Replace with your network
}

const alchemy = new Alchemy(config)

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
