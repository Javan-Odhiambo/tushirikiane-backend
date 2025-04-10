"use client";

import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCollection } from "../core/IconCollection";
import InviteToWorkSpaceFormModal from "./InviteToWorkSpaceFormModal";

const InviteToWorkSpaceButton = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ActionIcon variant="subtle" onClick={open}>
        <IconCollection.Invite />
      </ActionIcon>

      <InviteToWorkSpaceFormModal opened={opened} close={close} />
    </>
  );
};

export default InviteToWorkSpaceButton;
