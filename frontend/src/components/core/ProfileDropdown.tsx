"use client";

import { URLS } from "@/lib/urls";
import { Avatar, Menu, Skeleton } from "@mantine/core";
import { IconLogout, IconSettings, IconUserCog } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import DisplayLoggedInUserInfo from "./DisplayLoggedInUserInfo";

const ProfileDropdown = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Avatar>
      <Skeleton circle />
    </Avatar>;
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar color="cyan" radius="xl">
          {`${session?.user.firstName.slice(
            0,
            1
          )}${session?.user.lastName.slice(0, 1)}`.toUpperCase()}
        </Avatar>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item component={DisplayLoggedInUserInfo}></Menu.Item>
        <Menu.Item leftSection={<IconUserCog size={14} />}>
          Manage Account
        </Menu.Item>

        <Menu.Divider />
        <Menu.Label>General</Menu.Label>
        <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>

        <Menu.Item
          color="red"
          onClick={() => signOut({ callbackUrl: URLS.signIn })}
          leftSection={<IconLogout size={14} />}
        >
          Signout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileDropdown;
