import AppShellWrapper from "@/components/core/AppShellWrapper";
import { WorkSpacesProvider } from "@/providers/WorkSpacesProvider";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WorkSpacesProvider>
      <AppShellWrapper>{children}</AppShellWrapper>
    </WorkSpacesProvider>
  );
}
