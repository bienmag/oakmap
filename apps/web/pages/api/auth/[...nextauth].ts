import axios from 'axios'
import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '../../../Resources/lib/constants'


export const authOptions: AuthOptions = {
  // pages: {
  //   signIn: '/signin'
  // },
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

    async signIn({ profile, account }) {
      const userId = profile?.sub
      const email = profile?.email
      const accessToken = account?.id_token

      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
        userId, email, accessToken
      }).then(function (response) {
      })
        .catch(function (error) {
          console.log(error);
        });
      return true
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.name = token.name
        session.user.image = token.picture
        session.user.email = token.email
      }
      return session
    }
  }
}

export default NextAuth(authOptions)
