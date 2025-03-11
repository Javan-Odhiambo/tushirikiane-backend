import AppShellWrapper from "@/components/core/AppShellWrapper";
import Providers from "@/components/core/Providers";
import getSession from "@/lib/get-session";
import { URLS } from "@/lib/urls";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  if (!session?.user) {
    redirect(URLS.signIn);
  }

  return (
    <Providers>
      <AppShellWrapper>{children}</AppShellWrapper>
      <ReactQueryDevtools initialIsOpen={false} />
    </Providers>
  );
}
