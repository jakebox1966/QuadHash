export const checkMobile = () => {
    const user = navigator.userAgent

    let isCheck = false

    if (user.indexOf('iPhone') > -1 || user.indexOf('Android') > -1) {
        isCheck = true
    }

    return isCheck
}

export const checkIsInApp = () => {
    const user = navigator.userAgent

    let isCheck = false

    if (user.indexOf('MetaMaskMobile') > -1) {
        isCheck = true
    }
    return isCheck
}
