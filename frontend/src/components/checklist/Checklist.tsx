"use client";

import { I_GetChecklistResponse } from "@/lib/interfaces/responses";
import { ActionIcon, Group, Text } from "@mantine/core";
import React from "react";
import { IconCollection } from "../core/IconCollection";
import StatusCheckBox from "../core/StatusCheckBox";
import { useDeleteChecklistItem } from "@/lib/mutations/checklists";
import { useParams } from "next/navigation";

interface ChecklistProps extends I_GetChecklistResponse {
  listId: string;
}

const Checklist: React.FC<ChecklistProps> = ({
  id,
  name,
  listId,
  is_completed,
  task_id,
}) => {
  const { workSpacesSlug, boardsSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();
  const { mutate: deleteChecklistItem } = useDeleteChecklistItem(
    workSpacesSlug,
    boardsSlug,
    listId,
    task_id,
    id
  );

  const handleOnTaskDelete = () => {
    deleteChecklistItem();
  };

  const handleOnTaskStatusChange = () => {
    console.log(`Toggling status of task`);
  };
  return (
    <Group justify="space-between" key={id}>
      <Group>
        <StatusCheckBox
          handleOnChange={handleOnTaskStatusChange}
          isChecked={is_completed}
        />
        <Text>{name}</Text>
      </Group>
      <ActionIcon onClick={handleOnTaskDelete} variant="subtle" color="red">
        <IconCollection.Delete />
      </ActionIcon>
    </Group>
  );
};

export default Checklist;
