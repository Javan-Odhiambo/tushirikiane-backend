"use client";

import { T_CreateBoardSchema } from "@/lib/schema";
import {
  Modal,
  Stack,
  Textarea,
  TextInput,
  MultiSelect,
  Select,
  Button,
} from "@mantine/core";
import React from "react";
import { useForm, Controller } from "react-hook-form";

interface CreateBoardFormModalProps {
  opened: boolean;
  close: () => void;
}

const CreateBoardFormModal: React.FC<CreateBoardFormModalProps> = ({
  opened,
  close,
}) => {
  const form = useForm<T_CreateBoardSchema>({
    defaultValues: {
      name: "",
      description: "",
      inviteMembers: [],
      visibility: "",
    },
  });

  const handleOnSubmit = (values: T_CreateBoardSchema) => {
    console.log(values);
  };

  return (
    <Modal opened={opened} onClose={close} title="Create New Board" centered>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <Stack>
          <Controller
            name="visibility"
            control={form.control}
            render={({ field }) => (
              <Select
                {...field}
                label="Board Visibility"
                placeholder="Select who can see your board"
                data={[
                  { value: "public", label: "Public - Anyone can see" },
                  { value: "private", label: "Private - Only invited members" },
                  {
                    value: "workspace",
                    label: "Workspace - Members of workspace",
                  },
                ]}
                value={field.value || ""}
                onChange={field.onChange}
                withAsterisk
              />
            )}
          />
          <TextInput
            withAsterisk
            label="Board Name"
            {...form.register("name")}
            error={form.formState.errors.name?.message}
            description="Enter a name for the board."
          />

          <Textarea
            withAsterisk
            label="Board Description"
            {...form.register("description")}
            error={form.formState.errors.description?.message}
            description="Provide a brief description of the board."
          />

          <Controller
            name="inviteMembers"
            control={form.control}
            render={({ field }) => (
              <MultiSelect
                {...field}
                label="Invite Members"
                placeholder="Invite members of your workspace to join the board"
                data={[
                  { value: "1", label: "Alice" },
                  { value: "2", label: "Bob" },
                  { value: "3", label: "Charlie" },
                  { value: "4", label: "David" },
                ]}
                value={field.value.map(String)}
                onChange={(values) => field.onChange(values.map(Number))}
                withAsterisk
                searchable
                clearable
                hidePickedOptions
              />
            )}
          />

          <Button type="submit">Create Board</Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateBoardFormModal;
