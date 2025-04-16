"use client";

import { I_GetChecklistItemResponse } from "@/lib/interfaces/responses";
import { useDeleteChecklistItem } from "@/lib/mutations/checklists";
import { ActionIcon, Group, Text } from "@mantine/core";
import { useParams } from "next/navigation";
import React from "react";
import { IconCollection } from "../core/IconCollection";
import StatusCheckBox from "../core/StatusCheckBox";
import AssignChecklistItem from "./AssignChecklistItem";

interface ChecklistItemProps extends I_GetChecklistItemResponse {
  listId: string;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ ...checklistItem }) => {
  const { workSpacesSlug, boardsSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();
  const { mutate: deleteChecklistItem } = useDeleteChecklistItem(
    workSpacesSlug,
    boardsSlug,
    checklistItem.listId,
    checklistItem.task_id,
    checklistItem.id
  );

  const handleOnDeleteChecklistItemClick = () => {
    deleteChecklistItem();
  };

  const handleOnChecklistItemStatusChangeClick = () => {
    console.log(`Toggling status of task`);
  };
  return (
    <Group justify="space-between" key={checklistItem.id}>
      <Group>
        <StatusCheckBox
          handleOnChange={handleOnChecklistItemStatusChangeClick}
          isChecked={checklistItem.is_completed}
        />
        <Text>{checklistItem.name}</Text>
      </Group>
      <Group>
        <ActionIcon
          onClick={handleOnDeleteChecklistItemClick}
          variant="subtle"
          color="red"
        >
          <IconCollection.Delete />
        </ActionIcon>
        <AssignChecklistItem {...checklistItem} />
      </Group>
    </Group>
  );
};

export default ChecklistItem;
