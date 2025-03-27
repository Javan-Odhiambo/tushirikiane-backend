import { auth } from "@/lib/auth";
import { URLS } from "@/lib/urls";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  if (session) {
    redirect(URLS.dashboard);
  }

  return <>{children}</>;
};

export default AuthLayout;
