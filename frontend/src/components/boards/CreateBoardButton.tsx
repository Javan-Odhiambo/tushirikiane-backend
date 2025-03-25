"use client";

import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CreateBoardFormModal from "./CreateBoardFormModal";
import { IconLibrary } from "../core/IconsLibrary";

const CreateBoardButton = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ActionIcon variant="subtle" onClick={open}>
        <IconLibrary.Create />
      </ActionIcon>

      <CreateBoardFormModal opened={opened} close={close} />
    </>
  );
};

export default CreateBoardButton;
