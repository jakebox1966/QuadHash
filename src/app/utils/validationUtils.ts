export const emailCheck = (email: string) => {
    const reg =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

    return reg.test(email)
}

// export const phoneCheck = (phone : string) =>  {
//     const reg = /^01([0|1|6|7|8])

// }
