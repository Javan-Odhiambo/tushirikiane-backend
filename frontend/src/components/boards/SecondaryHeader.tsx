"use client";

import { useGetBoardMembers } from "@/lib/queries/boards";
import { useBoards } from "@/providers/BoardsProvider";
import { Group, Text } from "@mantine/core";
import { useParams } from "next/navigation";
import AvatarsContainer from "../core/AvatarsContainer";
import InviteToBoardButtonButton from "./InviteToBoardButton";

const SecondaryHeader = () => {
  const { workSpacesSlug, boardsSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const { data: boardMembers, isPending } = useGetBoardMembers(
    workSpacesSlug,
    boardsSlug
  );

  // const { setListsView, isBoardView, isTableView } = useListsView();

  const { data: boards } = useBoards();
  const selectedBoard = boards?.find((b) => b.id === boardsSlug);

  if (!selectedBoard) {
    return;
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

        {/* <Group gap="sm" ml="xl">
          <Button
            variant={isBoardView ? "light" : "subtle"}
            leftSection={<IconBrandTrello size={18} />}
            onClick={() => setListsView("board")}
          >
            Board
          </Button>

          <Button
            variant={isTableView ? "light" : "subtle"}
            leftSection={<IconTable size={18} />}
            onClick={() => setListsView("table")}
          >
            Table
          </Button>
        </Group>
        */}
      </Group>

      <Group>
        {/* <FilterIcon /> */}
        {/* TODO: fetch board people and pass here */}
        <AvatarsContainer
          members={boardMembers?.map((b) => b.member)}
          isLoading={isPending}
        />
        <InviteToBoardButtonButton boardId={selectedBoard.id} />
      </Group>
    </Group>
  );
};

export default SecondaryHeader;
