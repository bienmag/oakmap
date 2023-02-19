import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

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
    /////////////////////////////////////////////////////////////////
    ///// this is to connect with 8080 and add to DB // later //////
    ////////////////////////////////////////////////////////////////

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
    }
  }
}

export default NextAuth(authOptions)
