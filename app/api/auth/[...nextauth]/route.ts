import { login } from "@/app/backend";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

 const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userID: { label: "UserID", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("Missing UserID or Password");
        }

        const res = await login(credentials);
        const user = res.data;

        if (user) {
          return {
            ...user,
            id: user.id.toString(),
            name: user.staffName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            accessToken: user.accessToken,
            sessionToken: user.sessionToken,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user }) => {
      return true;
    },
    jwt: async ({ token, user, profile, account, session, trigger }) => {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          sessionToken: user.sessionToken,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken as string;
      session.sessionToken = token.sessionToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
