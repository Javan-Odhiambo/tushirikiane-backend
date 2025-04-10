import { BoardsProvider } from "@/providers/BoardsProvider";

export default async function BoardsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BoardsProvider>{children}</BoardsProvider>;
}
