"use client";

import { I_GetCardRespone as CreateChecklistFormProps } from "@/lib/interfaces/responses";
import { useCreateChecklistItem } from "@/lib/mutations/checklists";
import { T_CreateChecklistItemSchema } from "@/lib/schema";
import { ActionIcon, Button, Group, TextInput } from "@mantine/core";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IconCollection } from "../core/IconCollection";

const CreateChecklistForm: React.FC<CreateChecklistFormProps> = ({
  id,
  task_list_id,
}) => {
  const { workSpacesSlug, boardsSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const [isAddingTasks, setIsAddingTasks] = useState(false);

  const form = useForm<T_CreateChecklistItemSchema>({
    defaultValues: {
      name: "",
    },
  });

  const { mutate: createChecklistItem } = useCreateChecklistItem(
    workSpacesSlug,
    boardsSlug,
    task_list_id,
    id
  );

  const handleOnSubmit = (values: T_CreateChecklistItemSchema) => {
    createChecklistItem(values);
    form.reset();
  };

  const handleOnCancelClick = () => {
    form.reset();
    setIsAddingTasks(false);
  };

  return (
    <>
      {isAddingTasks ? (
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          <TextInput
            required
            placeholder="Add a task"
            {...form.register("name")}
            error={form.formState.errors.name?.message}
          />
          <Group justify="end" my={"md"}>
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={handleOnCancelClick}
            >
              <IconCollection.Close />
            </ActionIcon>
            <Button>Add</Button>
          </Group>
        </form>
      ) : (
        <Button w="fit-content" onClick={() => setIsAddingTasks(true)}>
          Add Tasks
        </Button>
      )}
    </>
  );
};

export default CreateChecklistForm;
