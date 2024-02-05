import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            access_token: string
            refresh_token: string
            // expired_at: number
            id: number
            wallet_address: string
            token_id: number
            token_type: string
            is_admin: number
            created_at: string
            updated_at: string
            ticket_num: number
        } & DefaultSession['user']
    }
}
