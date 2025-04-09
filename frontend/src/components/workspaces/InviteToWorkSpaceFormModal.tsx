"use client";

import { T_Z_EmailsSchema } from "@/lib/schema";
import { Button, Group, Modal } from "@mantine/core";
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
  const form = useForm<T_Z_EmailsSchema>({
    defaultValues: {
      emails: [],
    },
  });

  const handleOnSubmit = (values: T_Z_EmailsSchema) => {
    console.log(values);
  };

  const handleOnCancel = () => {
    form.reset();
    close();
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
        <EmailPillsMultiInput
          label="Invite Emails"
          emails={form.watch("emails")}
          onChange={handleOnEmailsChange}
          error={form.formState.errors.emails?.message as string}
        />

        <Group justify="right" mt="md">
          <Button onClick={handleOnCancel} color="red" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Invite</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default InviteToWorkSpaceFormModal;
