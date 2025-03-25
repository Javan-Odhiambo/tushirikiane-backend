"use client";

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
import { useParams, usePathname } from "next/navigation";
import CreateBoardButton from "../boards/CreateBoardButton";

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

const mockWorkSpaces = [
  { name: "My Workspace", slug: "my-workspace" },
  { name: "Zen", slug: "zen" },
  { name: "AquaTwin", slug: "aquatwin" },
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

const WorkSpacesMenu = () => {
  const { workSpacesSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const activeWorkSpace = mockWorkSpaces.find(
    (workSpace) => workSpace.slug === workSpacesSlug
  );

  return (
    <Menu shadow="md">
      <Menu.Target>
        <Button variant="light" w="100%">
          <Group w="100%" justify="space-between">
            <Text>{workSpacesSlug ? activeWorkSpace?.name : "Workspaces"}</Text>
            <IconChevronDown size={16} />
          </Group>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {mockWorkSpaces.map((workSpace) => {
          const isActive = workSpacesSlug === workSpace.slug;

          return (
            <Menu.Item
              key={workSpace.slug}
              component={Link}
              href={URLS.workspacesSlug(workSpace.slug)}
              style={{
                fontWeight: isActive ? "bold" : "normal",
                backgroundColor: isActive ? "#f5f5f5" : "transparent",
              }}
            >
              <Text>{workSpace.name}</Text>
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
};

const WorkspaceBoards = () => {
  const { workSpacesSlug, boardsSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  return (
    <Stack>
      <Group justify="space-between">
        <Text size="xs">BOARDS</Text>
        <CreateBoardButton />
      </Group>
      {mockBoards.map((board, index) => {
        const isActive = boardsSlug === board.slug;

        return (
          <Button
            key={index}
            component={Link}
            href={URLS.boardsSlug(workSpacesSlug, board.slug)}
            variant={isActive ? "filled" : "light"}
            fullWidth
            justify="start"
            leftSection={<IconLayout />}
          >
            <Text fw={isActive ? 700 : 400}>{board.name}</Text>
          </Button>
        );
      })}
    </Stack>
  );
};

export default Navbar;
