"use client";

import { I_GetWorkspaceResponse as WorkSpaceCardProps } from "@/lib/interfaces";
import { URLS } from "@/lib/urls";
import { useWorkSpaces } from "@/providers/WorkSpacesProvider";
import {
  Anchor,
  AvatarGroup,
  Card,
  Center,
  Group,
  Skeleton,
  Stack,
  Text,
  Title
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

        {isPending ? (
          <Group gap="lg" justify="center" w="200%">
            {Array.from({ length: 3 }).map((_, index) => (
              <WorkSpaceCardSkeleton key={index} />
            ))}
          </Group>
        ) : workSpaces?.length ? (
          <Group gap="lg" justify="center">
            {workSpaces.map((w) => (
              <WorkSpaceCard key={w.id} {...w} />
            ))}
          </Group>
        ) : (
          <Text size="sm" c="dimmed">
            You have no workspaces yet. Create one to start collaborating!
          </Text>
        )}

        {/* Create Workspace Button */}
        <CreateWorkSpaceButton />
      </Stack>
    </Center>
  );
};


const WorkSpaceCard: React.FC<WorkSpaceCardProps> = ({ id, name }) => {
  return (
    <Anchor component={Link} href={URLS.workspacesSlug(id)} underline="never">
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
          <Text size="lg" fw={700}>
            {name}
          </Text>
          <AvatarsContainer workSpaceSlug={id} />
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
