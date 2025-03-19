"use client";

import { usePathname } from "next/navigation";
import { URLS } from "@/lib/urls";
import { Button, Group, Menu, Stack, Text } from "@mantine/core";
import {
  IconCalendar,
  IconChevronDown,
  IconHome,
  IconLayout,
  IconListCheck,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";

const mainMenuItems = [
  { icon: <IconHome size={18} />, label: "Home", href: URLS.workspaces },
  { icon: <IconListCheck size={18} />, label: "Tasks", href: URLS.tasks },
  { icon: <IconCalendar size={18} />, label: "Calendar", href: URLS.calendar },
  { icon: <IconUsers size={18} />, label: "Team", href: URLS.team },
];

const mockBoards = [
  { name: "Project Alpha", slug: "project-alpha" },
  { name: "Marketing Campaign", slug: "marketing-campaign" },
  { name: "Development Roadmap", slug: "development-roadmap" },
  { name: "Design Sprint", slug: "design-sprint" },
  { name: "Bug Tracking", slug: "bug-tracking" },
];

const Navbar = () => {
  return (
    <Stack>
      <WorkSpacesMenu />
      <WorkspaceMainMenuCard />
      <WorkspaceBoards />
    </Stack>
  );
};

const WorkspaceMainMenuCard = () => {
  const pathname = usePathname();

  return (
    <Stack>
      <Text size="xs">MAIN MENU</Text>
      {mainMenuItems.map((item, index) => {
        const isActive = pathname === item.href;

        return (
          <Button
            key={index}
            component={Link}
            href={item.href}
            variant={isActive ? "filled" : "light"}
            fullWidth
            justify="start"
            leftSection={item.icon}
          >
            <Text fw={isActive ? 700 : 400}>{item.label}</Text>
          </Button>
        );
      })}
    </Stack>
  );
};

export default Navbar;

const WorkSpacesMenu = () => {
  const pathname = usePathname();
  const activeBoard = mockBoards.find((board) => pathname.includes(board.slug));

  return (
    <Menu shadow="md">
      <Menu.Target>
        <Button variant="light" w="100%">
          <Group w="100%" justify="space-between">
            <Text>{activeBoard ? activeBoard.name : "Workspaces"}</Text>
            <IconChevronDown size={16} />
          </Group>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {mockBoards.map((board) => {
          const isActive = pathname.includes(board.slug);

          return (
            <Menu.Item
              key={board.slug}
              component={Link}
              href={URLS.boardsSlug("some", board.slug)}
              style={{
                fontWeight: isActive ? "bold" : "normal",
                backgroundColor: isActive ? "#f5f5f5" : "transparent",
              }}
            >
              <Text>{board.name}</Text>
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
};

const WorkspaceBoards = () => {
  const pathname = usePathname();

  return (
    <Stack>
      <Text size="xs">BOARDS</Text>
      {mockBoards.map((item, index) => {
        const isActive = pathname.includes(item.slug);

        return (
          <Button
            key={index}
            component={Link}
            href={URLS.boardsSlug("some", item.slug)}
            variant={isActive ? "filled" : "light"}
            fullWidth
            justify="start"
            leftSection={<IconLayout />}
          >
            <Text fw={isActive ? 700 : 400}>{item.name}</Text>
          </Button>
        );
      })}
    </Stack>
  );
};
