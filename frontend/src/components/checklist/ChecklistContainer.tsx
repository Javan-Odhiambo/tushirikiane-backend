"use client";

import { I_GetCardRespone } from "@/lib/interfaces/responses";
import { useGetChecklists } from "@/lib/queries/checklists";
import { Box, Divider, Stack, Text } from "@mantine/core";
import { useParams } from "next/navigation";
import ChecklistItem from "./ChecklistItem";
import CreateChecklistForm from "./CreateChecklistForm";

interface ChecklistContainerProps {
  card: I_GetCardRespone;
}

const ChecklistContainer: React.FC<ChecklistContainerProps> = ({ card }) => {
  const { workSpacesSlug, boardsSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const { data: checklists, isPending } = useGetChecklists(
    workSpacesSlug,
    boardsSlug,
    card.task_list_id,
    card.id
  );

  return (
    <Stack>
      <Text>CheckList</Text>
      <Divider size="lg" />

      {isPending ? (
        <>Loading...</>
      ) : (
        <Box>
          {checklists && checklists.length > 0 ? (
            checklists.map((ch, index) => (
              <div key={index}>
                <ChecklistItem {...ch} listId={card.task_list_id} />
              </div>
            ))
          ) : (
            <Text c="dimmed">No checklists found.</Text>
          )}
        </Box>
      )}
      <CreateChecklistForm {...card} />
    </Stack>
  );
};

export default ChecklistContainer;
