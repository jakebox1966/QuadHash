/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
    interface Window {
        ethereum?: any
        contract?: any
    }
}

export const ethereum = window.ethereum
