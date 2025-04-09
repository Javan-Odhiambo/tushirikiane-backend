import { BoardsProvider } from "@/providers/BoardsProvider";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BoardsProvider>{children}</BoardsProvider>;
}
