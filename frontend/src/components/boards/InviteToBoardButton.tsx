"use client";

import { Button, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCollection } from "../core/IconCollection";
import InviteToBoardFormModal from "./InviteToBoardFormModal";

interface InviteToBoardButtonButtonProps {
  boardId: string;
}

const InviteToBoardButtonButton: React.FC<InviteToBoardButtonButtonProps> = ({
  boardId,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button variant="light" onClick={open}>
        <Group justify="space-between">
          <IconCollection.Share />
          <Text>Invite</Text>
        </Group>
      </Button>

      <InviteToBoardFormModal opened={opened} close={close} boardId={boardId} />
    </>
  );
};

export default InviteToBoardButtonButton;
