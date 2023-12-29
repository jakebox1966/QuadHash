/**
 * MetaMask wallet 주소를 요청한다.
 *
 * @returns 지갑주소 반환
 */
export const getAccounts = async () => {
    const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
    })
    return accounts
}

/**
 * MetaMask ChainId 를 요청한다.
 *
 * @returns chainId 반환
 */
export const getChainId = async () => {
    const chainId = await window.ethereum.request({
        method: 'eth_chainId',
        params: [],
    })
    return chainId
}

/**
 * 사용자에게 서명을 요청한다.
 *
 * @param account
 * @param message
 * @returns 0x로 시작하는 16진수 인코딩된 서명 반환
 */
export const personalSign = async (account: any, message: any) => {
    const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, account],
    })
    return signature
}

/**
 * Transaction에 서명하고 메소드 실행한다.
 *
 * @param transactionParameters
 * @returns
 */
export const callContractMethod = async (transactionParameters: any) => {
    const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
    })
    return txHash
}
