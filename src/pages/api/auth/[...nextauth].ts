import { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        }
      },
      userinfo: {
        params: {
          fields: "id,name,email,picture.type(large)"
        }
      }
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      session.user.id = token.sub
      return session
    },
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do stuff here ...

  return await NextAuth(req, res, authOptions)
}