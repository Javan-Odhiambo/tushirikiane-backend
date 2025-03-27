import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
      isEmailVerified: boolean;
      isPhoneVerified: boolean;
      // Add these required AdapterUser properties
      emailVerified: Date | null;
      accessToken: string;
      refreshToken: string;
    };
    accessToken: string;
    refreshToken: string;
  }

  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    accessToken: string;
    refreshToken: string;
    emailVerified: Date | null;
  }

  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    accessToken: string;
    refreshToken: string;
  }
}
