"use client";

import { useInviteToWorkSpace } from "@/lib/mutations/workspaces";
import { T_Z_EmailsSchema } from "@/lib/schema";
import { Button, Group, Modal } from "@mantine/core";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import EmailPillsMultiInput from "../core/EmailPillsMultiInput";

interface InviteToWorkSpaceFormModalProps {
  opened: boolean;
  close: () => void;
}

const InviteToWorkSpaceFormModal: React.FC<InviteToWorkSpaceFormModalProps> = ({
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

  const { mutate: inviteToWorkSpace, isPending } = useInviteToWorkSpace(
    workSpacesSlug,
    () => {
      form.reset();
      close();
    }
  );

  const handleOnCancel = () => {
    form.reset();
    close();
  };

  const handleOnEmailsChange = (emails: string[]) => {
    form.setValue("emails", emails, {
      shouldValidate: true,
    });
  };

  const handleOnSubmit = (values: T_Z_EmailsSchema) => {
    inviteToWorkSpace(values);
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Invite new members to this workspace"
      centered
    >
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <EmailPillsMultiInput
          disabled={isPending}
          label="Invite Emails"
          emails={form.watch("emails")}
          onChange={handleOnEmailsChange}
          error={form.formState.errors.emails?.message as string}
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

export default InviteToWorkSpaceFormModal;
