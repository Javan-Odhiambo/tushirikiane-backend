"use client";

import { I_GetWorkspaceResponse as WorkSpaceCardProps } from "@/lib/interfaces/responses";
import { useGetWorkSpaceMembers } from "@/lib/queries/workspaces";
import { URLS } from "@/lib/urls";
import { useWorkSpaces } from "@/providers/WorkSpacesProvider";
import {
  Anchor,
  AvatarGroup,
  Card,
  Center,
  ScrollArea,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import React from "react";
import AvatarsContainer from "../core/AvatarsContainer";
import CreateWorkSpaceButton from "./CreateWorkSpaceButton";

const WorkSpacesContainer = () => {
  const { data: workSpaces, isPending } = useWorkSpaces();

  return (
    <Center style={{ flexDirection: "column" }} h={"80vh"} px={"xl"}>
      <Stack gap="md" align="center">
        <Title>Welcome! 👋</Title>
        <Text size="md" c="dimmed">
          Select a workspace below or create a new one to get started.
        </Text>
        <ScrollArea mah={"32vh"} type="auto" offsetScrollbars>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
            {isPending ? (
              <>
                {Array.from({ length: 3 }).map((_, index) => (
                  <WorkSpaceCardSkeleton key={index} />
                ))}
              </>
            ) : workSpaces && workSpaces.length > 0 ? (
              <>
                {workSpaces.map((w) => (
                  <WorkSpaceCard key={w.id} {...w} />
                ))}
              </>
            ) : (
              <Text size="sm" c="dimmed" ta="center">
                You have no workspaces yet. Create one to start collaborating!
              </Text>
            )}
          </SimpleGrid>
        </ScrollArea>

        {/* Create Workspace Button */}
        <CreateWorkSpaceButton />
      </Stack>
    </Center>
  );
};

const WorkSpaceCard: React.FC<WorkSpaceCardProps> = ({ id, name }) => {
  const { data: workspaceMembers, isPending } = useGetWorkSpaceMembers(id);

  return (
    <Anchor component={Link} href={URLS.workspacesSlug(id)} underline="never">
      <Card shadow="lg" p="lg" radius="lg" withBorder h={"100%"}>
        <Stack gap="sm" align="center">
          <Text size="lg" fw={700} className="truncate w-full">
            {name}
          </Text>
          <AvatarsContainer
            members={workspaceMembers}
            isLoading={isPending}
          />
        </Stack>
      </Card>
    </Anchor>
  );
};

const WorkSpaceCardSkeleton = () => {
  return (
    <Card
      shadow="lg"
      p="lg"
      radius="lg"
      withBorder
      maw={"250px"}
      w={"100%"}
      ta={"center"}
    >
      <Stack gap="sm" align="center">
        <Skeleton height={50} />
        <AvatarGroup>
          <Skeleton height={40} circle />
          <Skeleton height={40} circle />
          <Skeleton height={40} circle />
          <Skeleton height={40} circle />
          <Skeleton height={40} circle />
        </AvatarGroup>
      </Stack>
    </Card>
  );
};

export default WorkSpacesContainer;
