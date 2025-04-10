"use client";

import { ActionIcon } from "@mantine/core";
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
      <ActionIcon variant="subtle" onClick={open}>
        <IconCollection.Share />
      </ActionIcon>

      <InviteToBoardFormModal opened={opened} close={close} boardId={boardId} />
    </>
  );
};

export default InviteToBoardButtonButton;
