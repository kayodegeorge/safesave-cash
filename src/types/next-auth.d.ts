import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

interface Auth {
  accessToken: string;
  sessionToken: string;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User extends DefaultUser {
    accessToken: string;
    sessionToken: string;
  }

  interface Session extends DefaultSession {
    accessToken: string;
    sessionToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Auth {}
}
