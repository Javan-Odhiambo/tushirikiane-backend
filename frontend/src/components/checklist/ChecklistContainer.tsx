"use client";

import { I_GetCardRespone } from "@/lib/interfaces/responses";
import { useGetChecklists } from "@/lib/queries/checklists";
import { Box, Divider, Stack, Text } from "@mantine/core";
import { useParams } from "next/navigation";
import Checklist from "./Checklist";

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
            checklists.map((c, index) => (
              <div key={index}>
                <Checklist {...c} />
              </div>
            ))
          ) : (
            <Text c="dimmed">No checklists found.</Text>
          )}
        </Box>
      )}
    </Stack>
  );
};

export default ChecklistContainer;
