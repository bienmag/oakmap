import NextAuth, { NextAuthOptions, DefaultSession, TokenSet, Account, User, Session, SessionOptions, SessionStrategy, AuthOptions } from 'next-auth'
import { SessionStore, SessionToken } from 'next-auth/core/lib/cookie'
import { JWT, JWTOptions } from 'next-auth/jwt'
import GoogleProvider from 'next-auth/providers/google'
import { GetSessionParams, signIn, UseSessionOptions } from 'next-auth/react'

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '../../../Resources/lib/constants'


export const authOptions: AuthOptions = {
  providers: [
    // google
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'email openid profile',
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        },
      },
      idToken: true,
    }),
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   // const response = await axios.post('https://localhost:8080/users', {

    //   // })
    //   return true
    // },
    async jwt({ token, account }) {
      console.log('tooooken', token)
      console.log('tooooken acount', account)
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        console.log('session fron [nextauth] file', session)
        session.user.id = token.sub!
        session.user.name = token.name
        session.user.image = token.picture
        session.user.email = token.email
      }
      return session

      // Send properties to the client, like an access_token from a provider.

      // session.accessToken = token.accessToken

    }
  }
}

export default NextAuth(authOptions)
