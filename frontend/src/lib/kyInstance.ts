// Create separate instances for client and server usage
import ky from "ky";

const AUTH_API_PREFIX_URL = `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/auth`;

const baseApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BASE_BACKEND_URL,
  timeout: 10000,
});

// Public API (no authentication required)
export const authApi = baseApi.extend({
  prefixUrl: AUTH_API_PREFIX_URL,
});

// Lazy-load authentication (avoid circular imports)
const getAuthHeaders = async () => {
  const { getSession } = await import("next-auth/react"); // Import dynamically
  const session = await getSession();
  return session?.accessToken
    ? { Authorization: `Bearer ${session.accessToken}` }
    : {};
};

// Protected API (authentication required)
export const protectedApi = baseApi.extend({
  hooks: {
    beforeRequest: [
      async (request) => {
        const headers = await getAuthHeaders();
        Object.entries(headers).forEach(([key, value]) => {
          request.headers.set(key, value);
        });
      },
    ],
  },
});

// Server-side instance for NextAuth
export const serverApi = {
  async post(url: string, options: any) {
    console.log(`${AUTH_API_PREFIX_URL}${url}`);
    const response = await fetch(`${AUTH_API_PREFIX_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options.json),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Return an object with a json method that returns the parsed response
    return {
      async json<T>() {
        return (await response.json()) as T;
      },
    };
  },

  async get(url: string, options: any) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (options?.token) {
      headers["Authorization"] = `Bearer ${options.token}`;
    }

    const response = await fetch(`${AUTH_API_PREFIX_URL}${url}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      console.error(await response.json());
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return {
      async json<T>() {
        return (await response.json()) as T;
      },
    };
  },
};
