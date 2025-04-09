"use client";

import { useBoards } from "@/providers/BoardsProvider";
import { Button, Group, Text } from "@mantine/core";
import { IconBrandTrello, IconShare, IconTable } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import AvatarsContainer from "../core/AvatarsContainer";
import FilterIcon from "../core/FilterIcon";

const SecondaryHeader = () => {
  const { workSpacesSlug, boardsSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const { data: boards } = useBoards();
  const selectedBoard = boards?.find((b) => b.slug === boardsSlug);

  return (
    // TODO: make this responsive

    <Group
      align="center"
      justify="space-between"
      bg={"#F1F3F5"}
      py={"sm"}
      px={"md"}
    >
      <Group justify="space-between">
        <Text>{selectedBoard?.name}</Text>

        <Group gap={"sm"} ml={"xl"}>
          <Button variant="subtle" leftSection={<IconBrandTrello size={18} />}>
            Board
          </Button>

          <Button variant="subtle" leftSection={<IconTable size={18} />}>
            Table
          </Button>
        </Group>
      </Group>

      <Group>
        <FilterIcon />
        {/* TODO: fetch board people and pass here */}
        <AvatarsContainer workSpaceSlug={workSpacesSlug} />
        <Button leftSection={<IconShare />} variant="subtle">
          Invite
        </Button>
      </Group>
    </Group>
  );
};

export default SecondaryHeader;
