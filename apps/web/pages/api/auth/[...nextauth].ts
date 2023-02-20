import axios from 'axios'
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

    async signIn({ profile, account }) {
      console.log('profile from singing', account)
      const userId = profile?.sub
      const email = profile?.email
      const accessToken = account?.id_token

      const response = await axios.post('http://localhost:8080/users', {
        userId, email, accessToken
      }).then(function (response) {
        console.log(response.data);
      })
        .catch(function (error) {
          console.log(error);
        });



      // user from profile {
      // iss: 'https://accounts.google.com',
      // azp: '1011566304996-qp7tecc8v921pfdlv7ta6i5hu2umaad2.apps.googleusercontent.com',
      // aud: '1011566304996-qp7tecc8v921pfdlv7ta6i5hu2umaad2.apps.googleusercontent.com',
      // sub: '111993592575618588576',
      // email: 'mvaretckaia@gmail.com',
      // email_verified: true,
      // at_hash: 'KN0ujQNtixubKnDQI4AJOg',
      // name: 'Margarita Varetckaia',
      // picture: 'https://lh3.googleusercontent.com/a/AEdFTp5Pe0roeHwuwkijx_o_kHj-Q0RxT0Xp_7pKaIQM=s96-c',
      // given_name: 'Margarita',
      // family_name: 'Varetckaia',
      // locale: 'ru',
      // iat: 1676884952,
      // exp: 1676888552
      //  }


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
