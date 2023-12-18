import { Alchemy, GetTransfersForOwnerTransferType, Network } from 'alchemy-sdk'

const config = {
    apiKey: '2jp0674GCJeIZW9qmM3WB92wslh1P8yM', // Replace with your API key
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

export const getBlock = async (blockId: string) => {
    const response = await alchemy.core.getBlock(blockId)
    return response
}
