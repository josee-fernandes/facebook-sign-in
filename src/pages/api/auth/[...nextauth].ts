import NextAuth from "next-auth"
import FacebookProvider, { FacebookProfile } from "next-auth/providers/facebook"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '',
      profile: (profile: FacebookProfile) => {
        return {
          id: profile.id,
          name: profile.name,
          username: '',
          email: profile.email,
          image: profile.picture,
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
      return session
    },
  }
}
export default NextAuth(authOptions)