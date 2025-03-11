// TODO: fix this 


"use client";

import { signOut } from "next-auth/react";
import { Button } from "@mantine/core";

const SignOutButton = () => {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/" })}
      color="red"
      radius="md"
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
