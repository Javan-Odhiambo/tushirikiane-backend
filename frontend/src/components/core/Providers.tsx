"use client";
import { WorkSpacesProvider } from "@/providers/WorkSpacesProvider";
import {
  createTheme,
  MantineColorsTuple,
  MantineProvider,
} from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { useState } from "react";
import { Toaster } from "sonner";

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
            <WorkSpacesProvider>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </WorkSpacesProvider>
          </NuqsAdapter>
        </QueryClientProvider>
      </SessionProvider>
    </MantineProvider>
  );
}
