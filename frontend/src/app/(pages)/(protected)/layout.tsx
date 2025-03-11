import Providers from "@/components/core/Providers";
import getSession from "@/lib/get-session";
import { URLS } from "@/lib/urls";
import "@/styles/globals.css";
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

  // TODO: add app layout here
  return (
    <Providers>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </Providers>
  );
}
