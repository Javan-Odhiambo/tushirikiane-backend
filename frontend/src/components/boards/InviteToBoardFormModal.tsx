"use client";

import { useInviteToBoard } from "@/lib/mutations/boards";
import { useGetWorkSpaceMembers } from "@/lib/queries/workspaces";
import { T_Z_EmailsSchema } from "@/lib/schema";
import { Button, Group, Modal } from "@mantine/core";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import EmailPillsMultiInput from "../core/EmailPillsMultiInput";

interface InviteToBoardFormModalProps {
  boardId: string;
  opened: boolean;
  close: () => void;
}

const InviteToBoardFormModal: React.FC<InviteToBoardFormModalProps> = ({
  boardId,
  opened,
  close,
}) => {
  const { workSpacesSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const form = useForm<T_Z_EmailsSchema>({
    defaultValues: {
      emails: [],
    },
  });

  const { data: workSpaceMembers } = useGetWorkSpaceMembers(workSpacesSlug);

  const members = workSpaceMembers?.map((w) => w.member.email);

  const { mutate: inviteToBoard, isPending } = useInviteToBoard(
    workSpacesSlug,
    boardId,
    () => {
      form.reset();
      close();
    }
  );

  const handleOnCancel = () => {
    form.reset();
    close();
  };

  const handleOnSubmit = (values: T_Z_EmailsSchema) => {
    inviteToBoard(values);
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Invite new members to this board"
      centered
    >
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
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

        <Group justify="right" mt="md">
          <Button
            onClick={handleOnCancel}
            color="red"
            variant="outline"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" loading={isPending}>
            Invite
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default InviteToBoardFormModal;
