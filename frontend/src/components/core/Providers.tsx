"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import {
  MantineColorsTuple,
  createTheme,
  MantineProvider,
} from "@mantine/core";
import { SessionProvider } from "next-auth/react";

const skyBlue: MantineColorsTuple = [
  "#e1f8ff",
  "#cbedff",
  "#9ad7ff",
  "#64c1ff",
  "#3aaefe",
  "#20a2fe",
  "#099cff",
  "#0088e4",
  "#0079cd",
  "#0068b6",
];

const theme = createTheme({
  colors: {
    skyBlue,
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <MantineProvider theme={theme}>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <NuqsAdapter>
            <Toaster richColors />
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </NuqsAdapter>
        </QueryClientProvider>
      </SessionProvider>
    </MantineProvider>
  );
}
