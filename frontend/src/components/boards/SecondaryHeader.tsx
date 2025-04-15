"use client";

import { useBoards } from "@/providers/BoardsProvider";
import { Button, Group, Text } from "@mantine/core";
import { IconBrandTrello, IconTable } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import AvatarsContainer from "../core/AvatarsContainer";
import FilterIcon from "../core/FilterIcon";
import InviteToBoardButtonButton from "./InviteToBoardButton";
import { M_People } from "@/lib/mockData";

const SecondaryHeader = () => {
  const { boardsSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const { data: boards } = useBoards();
  const selectedBoard = boards?.find((b) => b.id === boardsSlug);

  if (!selectedBoard) {
    return <>select a board to continue</>;
  }

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
        <Text>{selectedBoard.name}</Text>

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
        <AvatarsContainer workSpaceMembers={M_People} isLoading={false} />
        <InviteToBoardButtonButton boardId={selectedBoard.id} />
      </Group>
    </Group>
  );
};

export default SecondaryHeader;
