"use client";

import { useCreateWorkSpace } from "@/lib/mutations";
import { createWorkSpaceSchema, T_CreateWorkSpaceSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Modal,
  Pill,
  PillsInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

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
      inviteEmails: [],
    },
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: createWorkSpace, isPending } = useCreateWorkSpace(() => {
    close();
    form.reset();
  });

  const inviteEmails = form.watch("inviteEmails");

  const addEmail = (email: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const currentEmails = form.getValues("inviteEmails");

    if (!trimmedEmail) return;

    try {
      createWorkSpaceSchema.shape.inviteEmails.element.parse(trimmedEmail);
      form.setValue("inviteEmails", [...currentEmails, trimmedEmail], {
        shouldValidate: true,
      });

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      form.setError("inviteEmails", {
        type: "manual",
        message: "Please enter a valid email address",
      });
    }
  };

  const removeEmail = (email: string) => {
    form.setValue(
      "inviteEmails",
      inviteEmails.filter((e) => e !== email),
      { shouldValidate: true }
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value.trim();

    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addEmail(inputValue);
    }

    if (
      event.key === "Backspace" &&
      inputValue === "" &&
      inviteEmails.length > 0
    ) {
      event.preventDefault();
      removeEmail(inviteEmails[inviteEmails.length - 1]);
    }
  };

  const onSubmit = (values: T_CreateWorkSpaceSchema) => {
    createWorkSpace(values);
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Create New Workspace"
      centered
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            withAsterisk
            label="Workspace Name"
            {...form.register("name")}
            error={form.formState.errors.name?.message}
          />

          <PillsInput
            label="Invite Emails"
            error={form.formState.errors.inviteEmails?.message}
          >
            {inviteEmails.map((email) => (
              <Pill
                key={email}
                withRemoveButton
                onRemove={() => removeEmail(email)}
              >
                {email}
              </Pill>
            ))}
            <PillsInput.Field
              ref={inputRef}
              placeholder="Enter an email (Press Enter or , to add)"
              onKeyDown={handleKeyDown}
            />
          </PillsInput>

          <Text size="xs" c="gray">
            Press <b>Enter</b> or <b>,</b> to add an email. Press{" "}
            <b>Backspace</b> to remove the last email.
          </Text>

          <Button type="submit" loading={isPending}>
            Create Workspace
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateWorkSpaceFormModal;
