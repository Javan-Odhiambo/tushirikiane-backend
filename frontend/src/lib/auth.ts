// TODO: clean this file, remove logs
import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { serverApi } from "./kyInstance";
import { URLS } from "./urls";

interface TokenResponse {
  access: string;
  refresh: string;
}

interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  // Add any other fields your API returns
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
          // Step 1: Get the token response
          const tokenResponse = await serverApi.post(URLS.apiSignIn, {
            json: credentials,
          });
          const tokenData: TokenResponse =
            await tokenResponse.json<TokenResponse>();

          console.log("Token data:", tokenData);

          if (!tokenData.access || !tokenData.refresh) {
            throw new Error("Invalid token response");
          }

          // Step 2: Fetch user data using the access token
          const userResponse = await serverApi.get(URLS.apiLoggedInUser, {
            token: tokenData.access,
          });
          const userData: UserResponse =
            await userResponse.json<UserResponse>();

          console.log("User data:", userData);

          if (!userData.id) {
            throw new Error("Invalid user data");
          }

          // Return complete user object with tokens
          return {
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            isEmailVerified: userData.isEmailVerified,
            isPhoneVerified: userData.isPhoneVerified,
            accessToken: tokenData.access,
            refreshToken: tokenData.refresh,
            emailVerified: userData.isEmailVerified ? new Date() : null, // Required for NextAuth types
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
