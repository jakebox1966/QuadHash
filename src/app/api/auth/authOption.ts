import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthOptions } from 'next-auth'
import { getUserInfo, refreshToken, signInUser } from './api'

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

                console.log(tokenResponse)

                // 인증 API 요청 후 받아온 응답데이터를 user정보 API호출을 위해 destructuring 한다.
                const { access_token } = tokenResponse

                // authorize에서 최종적으로 return할 user 객체에 담을 데이터를 분리하기위해 destructuring 한다.
                const { status, token_type, expired_at, ...rest } = tokenResponse

                // 백엔드에서 넘어온 access_token 만료 시간을 계산하기 편하게 milisecond로 변환한다.
                rest.expired_at = new Date(expired_at).getTime()

                // authorize에서 최종적으로 return할 user 객체에 담을 user 정보를 얻기 위해 위에서 추출한 access_token을 파라미터로하여 API 호출
                const userInfoResponse = await getUserInfo(access_token as string)

                console.log(userInfoResponse)

                // user 정보 조합
                const user = { ...rest, ...userInfoResponse.data }

                console.log('authorized user', user)

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
    callbacks: {
        //jwt 콜백은 jwt기반 인증 process에서만 실행된다. 파라미터에 있는 user는 로그인 첫 시도에만 반환됨
        async jwt({ token, user }) {
            // console.log('user', user)
            // console.log('여기')
            // console.log({ ...token, ...user })

            const nowTime = Date.now()

            // console.log(token)
            // console.log(token.expired_at)
            // console.log(nowTime)

            // if ((token && (token?.expired_at as number) - 540000) < nowTime) {
            //     console.log('========== 토큰 만료 ==========')

            //     try {
            //         const result = await refreshToken(token)
            //         console.log('result', result)
            //         console.log('result.expired_at', result.expired_at)
            //         const new_token = {
            //             ...token,
            //             access_token: result.access_token,
            //             refresh_token: result.refresh_token,
            //             expired_at: new Date(result.expired_at).getTime(),
            //         }
            //         return new_token
            //     } catch (error) {
            //         console.error(error)
            //     }
            // }

            return { ...token, ...user }
        },

        async session({ session, token }) {
            session.user = token as any
            return session
        },
    },
    // pages: {
    //     signIn: '/ko/access-denied',
    // },
}
