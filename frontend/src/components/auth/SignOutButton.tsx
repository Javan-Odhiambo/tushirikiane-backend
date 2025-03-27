"use client";

import { signOut } from "next-auth/react";
import { Button } from "@mantine/core";
import { URLS } from "@/lib/urls";

const SignOutButton = () => {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: URLS.signIn })}
      color="red"
      radius="md"
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
