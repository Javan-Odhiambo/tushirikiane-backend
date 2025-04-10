"use client";

import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CreateBoardFormModal from "./CreateBoardFormModal";
import { IconCollection } from "../core/IconCollection";

const CreateBoardButton = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ActionIcon variant="subtle" onClick={open}>
        <IconCollection.Create />
      </ActionIcon>

      <CreateBoardFormModal opened={opened} close={close} />
    </>
  );
};

export default CreateBoardButton;
