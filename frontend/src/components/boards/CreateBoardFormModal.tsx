"use client";
import { useCreateBoard, useInviteToBoard } from "@/lib/mutations/boards";
import { useGetWorkSpaceMembers } from "@/lib/queries/workspaces";
import { T_CreateBoardSchema } from "@/lib/schema";
import { Button, Modal, Stack, Textarea, TextInput } from "@mantine/core";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import EmailPillsMultiInput from "../core/EmailPillsMultiInput";

interface CreateBoardFormModalProps {
  opened: boolean;
  close: () => void;
}

const CreateBoardFormModal: React.FC<CreateBoardFormModalProps> = ({
  opened,
  close,
}) => {
  const { workSpacesSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const form = useForm<T_CreateBoardSchema>({
    defaultValues: {
      name: "",
      description: "",
      emails: [],
    },
  });

  const {
    mutate: createBoard,
    isPending,
    data: createdBoard,
    isSuccess,
  } = useCreateBoard(workSpacesSlug);

  const { mutate: inviteToBoard, isPending: isLoadingInviteToBoard } =
    useInviteToBoard(workSpacesSlug, createdBoard?.id ?? "", () => {
      form.reset();
      close();
    });

  useEffect(() => {
    if (isSuccess && createdBoard?.id) {
      const emails = form.getValues("emails");
      if (emails && emails.length > 0) {
        inviteToBoard({ emails });
      } else {
        form.reset();
        close();
      }
    }
  }, [isSuccess, createdBoard?.id, close, form, inviteToBoard]);

  const handleOnSubmit = (values: T_CreateBoardSchema) => {
    createBoard({
      name: values.name,
      description: values.description,
      workspace_id: workSpacesSlug,
    });
  };

  const { data: workSpaceMembers } = useGetWorkSpaceMembers(workSpacesSlug);
  const members = workSpaceMembers?.map((w) => w.member.email);

  return (
    <Modal opened={opened} onClose={close} title="Create New Board" centered>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <Stack>
          <TextInput
            withAsterisk
            label="Board Name"
            {...form.register("name")}
            error={form.formState.errors.name?.message}
            description="Enter a name for the board."
          />
          <Textarea
            label="Board Description"
            {...form.register("description")}
            error={form.formState.errors.description?.message}
            description="Provide a brief description of the board."
          />
          <Controller
            name="emails"
            control={form.control}
            render={({ field, fieldState }) => (
              <EmailPillsMultiInput
                disabled={isPending}
                label="Invite new members to this board"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                helperText
                data={members}
              />
            )}
          />
          <Button type="submit" loading={isPending || isLoadingInviteToBoard}>
            Create Board
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default CreateBoardFormModal;
