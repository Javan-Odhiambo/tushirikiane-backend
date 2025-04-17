"use client";

import { useCreateWorkSpace } from "@/lib/mutations/workspaces";
import { createWorkSpaceSchema, T_CreateWorkSpaceSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, Stack, TextInput } from "@mantine/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import EmailPillsMultiInput from "../core/EmailPillsMultiInput";

interface CreateWorkSpaceFormModalProps {
  opened: boolean;
  close: () => void;
}

const CreateWorkSpaceFormModal: React.FC<CreateWorkSpaceFormModalProps> = ({
  opened,
  close,
}) => {
  const form = useForm<T_CreateWorkSpaceSchema>({
    resolver: zodResolver(createWorkSpaceSchema),
    defaultValues: {
      name: "",
      emails: [],
    },
  });

  const { mutate: createWorkSpace, isPending } = useCreateWorkSpace(() => {
    close();
    form.reset();
  });

  const handleOnSubmit = (values: T_CreateWorkSpaceSchema) => {
    createWorkSpace(values);
  };

  const handleOnEmailsChange = (emails: string[]) => {
    form.setValue("emails", emails, {
      shouldValidate: true,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Create New Workspace"
      centered
    >
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <Stack>
          <TextInput
            withAsterisk
            label="Workspace Name"
            {...form.register("name")}
            error={form.formState.errors.name?.message}
          />

          <Controller
            name="emails"
            control={form.control}
            render={({ field, fieldState }) => (
              <EmailPillsMultiInput
                disabled={isPending}
                label="Invite new members to this board"
                value={field.value}
                onChange={handleOnEmailsChange}
                error={fieldState.error?.message}
                helperText
              />
            )}
          />

          <Button type="submit" loading={isPending}>
            Create Workspace
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateWorkSpaceFormModal;
