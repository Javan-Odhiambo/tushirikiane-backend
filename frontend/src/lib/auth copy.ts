import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { serverApi } from "./kyInstance";
import { URLS } from "./urls";

interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
  };
}

const authOptions: NextAuthConfig = {
  debug: process.env.NODE_ENV === "development",
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
        try {
          // Get the response object first
          const response = await serverApi.post(URLS.apiSignIn, {
            json: credentials,
          });
          // Then use the json method
          const data: AuthResponse = await response.json<AuthResponse>();

          console.log(data);

          if (!data.user) {
            throw new Error("Invalid credentials");
          }

          return {
            id: data.user.id,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            phone: data.user.phone,
            isEmailVerified: data.user.isEmailVerified,
            isPhoneVerified: data.user.isPhoneVerified,
            accessToken: data.access,
            refreshToken: data.refresh,
            emailVerified: data.user.isEmailVerified ? new Date() : null, // Required for NextAuth types
          };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          isEmailVerified: user.isEmailVerified,
          isPhoneVerified: user.isPhoneVerified,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Include all required AdapterUser properties
      session.user = {
        id: token.id as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        email: token.email as string,
        phone: token.phone as string | undefined,
        isEmailVerified: token.isEmailVerified as boolean,
        isPhoneVerified: token.isPhoneVerified as boolean,
        // Add these required properties
        emailVerified: token.isEmailVerified ? new Date() : null,
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
      };

      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { auth, signIn, signOut, handlers } = NextAuth(authOptions);
