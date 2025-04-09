"use client";

import { URLS } from "@/lib/urls";
import { BoardsProvider, useBoards } from "@/providers/BoardsProvider";
import { useWorkSpaces } from "@/providers/WorkSpacesProvider";
import { Button, Group, Menu, Skeleton, Stack, Text } from "@mantine/core";
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
import DeleteWorkSpaceButton from "./DeleteWorkSpaceButton";
import DeleteBoardButton from "../boards/DeleteBoardButton";
import InviteToWorkSpaceButton from "./InviteToWorkSpaceButton";

const mainMenuItems = [
  { icon: <IconHome size={18} />, label: "Home", href: URLS.workspaces },
  { icon: <IconListCheck size={18} />, label: "Tasks", href: URLS.tasks },
  { icon: <IconCalendar size={18} />, label: "Calendar", href: URLS.calendar },
  { icon: <IconUsers size={18} />, label: "Team", href: URLS.team },
];

const Navbar = () => {
  const { workSpacesSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  return (
    <BoardsProvider>
      <Stack>
        <WorkSpacesMenu />
        <WorkspaceMainMenuCard />
        {workSpacesSlug && <WorkspaceBoards />}
      </Stack>
    </BoardsProvider>
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
  const { data: workSpaces, isLoading } = useWorkSpaces();

  const { workSpacesSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const activeWorkSpace = workSpaces?.find(
    (workSpace) => workSpace?.id === workSpacesSlug
  );

  return (
    <Menu shadow="md" width="target" disabled={isLoading}>
      <Menu.Target>
        <Button variant="light" w="100%" disabled={isLoading}>
          <Group w="100%" justify="space-between">
            <Text>
              {workSpacesSlug && activeWorkSpace
                ? activeWorkSpace.name
                : "Workspaces"}
            </Text>
            <IconChevronDown size={16} />
          </Group>
        </Button>
      </Menu.Target>
      <Menu.Dropdown style={{ width: "100%" }}>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Menu.Item key={index} style={{ width: "100%" }}>
                <Skeleton height={20} radius="sm" />
              </Menu.Item>
            ))
          : workSpaces?.map((workSpace) => {
              const isActive = workSpacesSlug === workSpace?.id;

              return (
                <Menu.Item
                  key={workSpace?.id}
                  component={Link}
                  href={URLS.workspacesSlug(workSpace.id)}
                  style={{
                    fontWeight: isActive ? "bold" : "normal",
                    backgroundColor: isActive ? "#f5f5f5" : "transparent",
                    width: "100%",
                    display: "block",
                  }}
                >
                  <Text>{workSpace.name}</Text>
                </Menu.Item>
              );
            })}
      </Menu.Dropdown>
      <DeleteWorkSpaceButton />
      <InviteToWorkSpaceButton />
    </Menu>
  );
};

const WorkspaceBoards = () => {
  const { data: boards, isLoading } = useBoards();
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

      {isLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} height={36} radius="sm">
              <Button
                variant="light"
                fullWidth
                justify="start"
                leftSection={<IconLayout />}
                disabled
              >
                <Text>Loading...</Text>
              </Button>
            </Skeleton>
          ))
        : boards?.map((board) => {
            const isActive = boardsSlug === board?.slug;

            return (
              <>
                <Button
                  key={board.slug}
                  component={Link}
                  href={URLS.boardsSlug(workSpacesSlug, board?.id)}
                  variant={isActive ? "filled" : "light"}
                  fullWidth
                  justify="start"
                  leftSection={<IconLayout />}
                >
                  <Text fw={isActive ? 700 : 400}>{board.name}</Text>
                </Button>
                <DeleteBoardButton boardSlug={board.id} />
              </>
            );
          })}
    </Stack>
  );
};

export default Navbar;
