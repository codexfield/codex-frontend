import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

const options: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 2 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }

      // console.log('toekmn', token);
      return token;
    },
    async session({ session, token, user }) {
      // console.log('session', session, token, user);
      // Send properties to the client, like an access_token from a provider.
      // @ts-ignore
      session.accessToken = token.accessToken;
      return session;
    },
  },
  // debug: true,
};

export default NextAuth(options);
