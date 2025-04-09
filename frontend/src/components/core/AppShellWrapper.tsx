"use client";

import { AppShell, Burger, Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBell } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

import Navbar from "../workspaces/Navbar";
import ProfileDropdown from "./ProfileDropdown";
import SiteLogo from "./SiteLogo";

interface AppShellWrapperProps {
  children: ReactNode;
}

const AppShellWrapper: React.FC<AppShellWrapperProps> = ({ children }) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const pathname = usePathname();

  // TODO: __k add these sidebars
  const getSidebar = () => {
    if (pathname.startsWith("/dashboard")) {
      return <>dashboard</>;
    }
    if (pathname.startsWith("/settings")) {
      return <>settings</>;
    }

    if (pathname.startsWith("/workspaces/")) {
      return <Navbar />;
    }

    return null;
  };

  const sidebarContent = getSidebar();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={
        sidebarContent
          ? {
              width: 300,
              breakpoint: "sm",
              collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }
          : undefined
      }
    >
      {/* Header */}
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between" align="center" w="100%">
          <Group align="center">
            {sidebarContent && (
              <>
                <Burger
                  opened={mobileOpened}
                  onClick={toggleMobile}
                  hiddenFrom="sm"
                  size="sm"
                />
                <Burger
                  opened={desktopOpened}
                  onClick={toggleDesktop}
                  visibleFrom="sm"
                  size="sm"
                />
              </>
            )}
            <SiteLogo />
          </Group>
          <Group>
            <Button unstyled>
              <IconBell />
            </Button>
            <ProfileDropdown />
          </Group>
        </Group>
      </AppShell.Header>

      {/* Conditional Sidebar */}
      {sidebarContent && (
        <AppShell.Navbar p="md">{sidebarContent}</AppShell.Navbar>
      )}

      {/* Main Content */}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AppShellWrapper;
