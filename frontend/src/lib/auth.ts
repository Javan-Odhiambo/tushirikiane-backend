import { jwtDecode } from "jwt-decode";
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
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
}

interface JwtPayload {
  exp: number;
  [key: string]: string | number | boolean | object | null | undefined;
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
          // Get tokens
          const tokenResponse = await serverApi.post(URLS.apiSignIn, {
            json: credentials,
          });
          const tokenData: TokenResponse =
            await tokenResponse.json<TokenResponse>();

          if (!tokenData.access || !tokenData.refresh) {
            throw new Error("Invalid token response");
          }

          // Get user data
          const userResponse = await serverApi.get(URLS.apiLoggedInUser, {
            token: tokenData.access,
          });
          const userData: UserResponse =
            await userResponse.json<UserResponse>();

          if (!userData.id) {
            throw new Error("Invalid user data");
          }

          return {
            id: userData.id,
            firstName: userData.first_name,
            lastName: userData.last_name,
            email: userData.email,
            phone: userData.phone,
            isEmailVerified: userData.isEmailVerified,
            isPhoneVerified: userData.isPhoneVerified,
            accessToken: tokenData.access,
            refreshToken: tokenData.refresh,
            accessTokenExpires:
              jwtDecode<JwtPayload>(tokenData.access).exp * 1000,
            emailVerified: userData.isEmailVerified ? new Date() : null,
          };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        return {
          ...token,
          ...user,
        };
      }

      // Handle session updates
      if (trigger === "update" && session?.accessToken) {
        return {
          ...token,
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
          accessTokenExpires:
            jwtDecode<JwtPayload>(session.accessToken).exp * 1000,
        };
      }

      // Return previous token if it's still valid
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Token is expired, try to refresh it
      try {
        const response = await serverApi.post(URLS.apiRefreshToken, {
          json: { refresh: token.refreshToken },
        });

        const refreshedTokens: TokenResponse = await response.json();

        if (!refreshedTokens.access) {
          throw new Error("Refresh failed");
        }

        const decoded = jwtDecode<JwtPayload>(refreshedTokens.access);

        return {
          ...token,
          accessToken: refreshedTokens.access,
          accessTokenExpires: decoded.exp * 1000,
          refreshToken: refreshedTokens.refresh ?? token.refreshToken,
        };
      } catch (error) {
        console.error("Error refreshing token:", error);
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        email: token.email as string,
        phone: token.phone as string | undefined,
        isEmailVerified: token.isEmailVerified as boolean,
        isPhoneVerified: token.isPhoneVerified as boolean,
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
  secret: process.env.AUTH_SECRET,
};

export const { auth, signIn, signOut, handlers } = NextAuth(authOptions);
