import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  async jwt({ token, account, profile }) {
    if (account) {
      token.accessToken = account.access_token;
      token.id = profile.id;
    }
    return token;
  },
  async session({ session, token }) {
    session.accessToken = token.accessToken;
    return session;
  },
  // events: {
  //   async signIn({ user, account, profile, isNewUser }) {
  //     console.log({ user, account, profile, isNewUser });
  //   },
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
