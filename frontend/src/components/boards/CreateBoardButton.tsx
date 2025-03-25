"use client";

import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import CreateBoardFormModal from "./CreateBoardFormModal";

const CreateBoardButton = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ActionIcon variant="subtle" onClick={open}>
        <IconPlus />
      </ActionIcon>

      <CreateBoardFormModal opened={opened} close={close} />
    </>
  );
};

export default CreateBoardButton;
