"use client";

import { I_GetChecklistResponse as ChecklistProps } from "@/lib/interfaces/responses";
import { ActionIcon, Group, Text } from "@mantine/core";
import React from "react";
import { IconCollection } from "../core/IconCollection";
import StatusCheckBox from "../core/StatusCheckBox";

const Checklist: React.FC<ChecklistProps> = ({ id, name, is_completed }) => {
  const handleOnTaskDelete = (taskId: string) => {
    console.log(`Deleted task with ID ${taskId}`);
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
      <ActionIcon
        onClick={() => handleOnTaskDelete("")}
        variant="subtle"
        color="red"
      >
        <IconCollection.Delete />
      </ActionIcon>
    </Group>
  );
};

export default Checklist;
