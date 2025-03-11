import { redirect } from "next/navigation";
import Providers from "@/components/core/Providers";
import { URLS } from "@/lib/urls";
import React from "react";
import { auth } from "@/lib/auth";

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  if (session) {
    redirect(URLS.dashboard);
  }

  return (
    <>
      <Providers>{children}</Providers>
    </>
  );
};

export default AuthLayout;
