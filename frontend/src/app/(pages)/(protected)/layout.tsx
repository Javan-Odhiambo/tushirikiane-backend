import AppShellWrapper from "@/components/core/AppShellWrapper";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <AppShellWrapper>{children}</AppShellWrapper>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
