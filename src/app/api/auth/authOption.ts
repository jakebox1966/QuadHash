import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthOptions } from 'next-auth'
import { getUserInfo, refreshToken, signInUser } from './api'
import { signOut } from 'next-auth/react'

export const authOption: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'Credentials',
            name: 'credentials',
            credentials: {
                wallet_address: {
                    type: 'text',
                },
                wallet_signature: {
                    type: 'text',
                },
            },

            async authorize(credentials, req) {
                const formData = new FormData()

                // credentials 파라미터로 넘어온 인증 필수 데이터를 formData로 묶어 API 요청 (백엔드에서 form 형식으로 받음)
                formData.append('wallet_address', credentials?.wallet_address)
                formData.append('wallet_signature', credentials?.wallet_signature)

                const tokenResponse = await signInUser(formData)

                console.log('tokenResponse', tokenResponse)

                // 인증 API 요청 후 받아온 응답데이터를 user정보 API호출을 위해 destructuring 한다.
                const { access_token } = tokenResponse

                // authorize에서 최종적으로 return할 user 객체에 담을 데이터를 분리하기위해 destructuring 한다.
                const { status, token_type, expired_at, ...rest } = tokenResponse
                // console.log('expired_at', expired_at)
                // 백엔드에서 넘어온 access_token 만료 시간을 계산하기 편하게 milisecond로 변환한다.

                const unixTimestamp = Date.parse(`${expired_at} UTC`)

                // console.log('unixtimestamp from login', unixTimestamp)
                rest.expired_at = unixTimestamp

                // authorize에서 최종적으로 return할 user 객체에 담을 user 정보를 얻기 위해 위에서 추출한 access_token을 파라미터로하여 API 호출
                const userInfoResponse = await getUserInfo(access_token as string)

                // user 정보 조합
                const user = { ...rest, ...userInfoResponse.data }

                // console.log('user', user)

                if (user) {
                    // authorize 함수에서 user가 반환되면 이후의 모든 callback에서 인증이 되었다고 간주한다.
                    return user
                } else {
                    // authorize 함수에서 null이 반환되면 인증실패로 간주한다.
                    return null
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 7,
    },
    callbacks: {
        //jwt 콜백은 jwt기반 인증 process에서만 실행된다. 파라미터에 있는 user는 로그인 첫 시도에만 반환됨
        async jwt({ token, user, trigger, session }) {
            if (trigger === 'update') {
                console.log('session update')
                return { ...token, ...session.user }
            }

            const nowTime = Date.now()
            // console.log('첫 token', token)

            //refresh token은 token안에 기본적으로 세팅된 exp 값과 같기 때문에 exp로 비교
            // if ((token?.exp as number) * 1000 < nowTime) {
            //     return null
            // }
            // 어차피 refresh 토큰이 만료되면 cookie(session) 이 사라지므로 이대로도 괜찮을 듯

            // 만료 10분전 refresh token 호출

            console.log('gggggg', Math.floor(Date.now() / 1000))
            if ((token && (token?.expired_at as number) - 60 * 60 * 1000) < nowTime) {
                console.log('========== 토큰 만료 ==========')
                console.log(token)
                try {
                    const result = await refreshToken(token)
                    console.log('result===>', result)
                    const new_token = {
                        ...token,
                        access_token: result.access_token,
                        refresh_token: result.refresh_token,
                        expired_at: Date.parse(`${result.expired_at} UTC`),
                        iat: Date.now() / 1000,
                        exp: Date.parse(`${result.expired_at} UTC`) / 100,
                    }

                    return new_token
                } catch (error) {
                    console.error(error)
                }
            }
            // console.log((token?.exp as number) * 1000)
            // if (token && (token?.exp as number) * 1000 - 10000 < nowTime) {
            //     console.log('========== 토큰 만료 ==========')
            //     try {
            //         const result = await refreshToken(token)
            //         console.log('result===>', result)
            //         const new_token = {
            //             ...token,
            //             access_token: result.access_token,
            //             refresh_token: result.refresh_token,
            //             expired_at: Date.parse(`${result.expired_at} UTC`),
            //             exp: Date.parse(`${result.expired_at} UTC`) / 1000,
            //         }

            //         return new_token
            //     } catch (error) {
            //         console.error(error)
            //     }
            // }

            return { ...token, ...user }
        },

        async session({ session, token }) {
            // console.log('ggggg')
            // console.log('form session', session)
            // console.log('form token', token)
            return { ...session, ...{ user: token } }
            // session.user = token as any
            // return session
        },
    },
    // jwt: {
    //     maxAge: 60 * 60,
    // },
    // pages: {
    //     signIn: '/ko/access-denied',
    // },
}
