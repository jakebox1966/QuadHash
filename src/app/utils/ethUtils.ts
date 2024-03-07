import { Utils } from 'alchemy-sdk'

export const formatBalance = (rawBalance: string) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
    return balance
}

export const formatChainAsNum = (chainIdHex: string) => {
    const chainIdNum = parseInt(chainIdHex)
    return chainIdNum
}

export const formatAddress = (addr: string) => {
    return `${addr.substring(0, 13)}...`
}

export const calcCoinPriceWithWei = (coinAmount: number, coinPriceInWei: number) => {
    console.log('coinAmount : ', coinAmount)
    console.log('coinPriceInWei : ', coinPriceInWei)
    const weiAmount = Utils.parseUnits((coinAmount * coinPriceInWei).toString(), 18)
    // const weiAmount = Utils.parseUnits((0.05).toString(), 18)
    // console.log(weiAmount)
    const value = coinAmount * coinPriceInWei

    const hexValue = Utils.hexlify(BigInt(value))
    return hexValue
}

export const formatToken = (token) => {
    return token / 10 ** 6
}
