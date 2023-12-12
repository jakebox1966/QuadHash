import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthOptions } from 'next-auth'
import { getUserInfo, refreshToken, signInUser } from '../api'
import { authOption } from '../authOption'

const handler = NextAuth(authOption)

export { handler as GET, handler as POST }
