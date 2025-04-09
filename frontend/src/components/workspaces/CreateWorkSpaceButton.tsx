"use client";

import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CreateWorkSpaceFormModal from "./CreateWorkSpaceFormModal";
import { IconCollection } from "../core/IconCollection";

const CreateWorkSpaceButton = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    // TODO: __k make this more descriptive in the /workspaces
    <>
      <ActionIcon variant="subtle" onClick={open}>
        <IconCollection.Create />
      </ActionIcon>

      <CreateWorkSpaceFormModal opened={opened} close={close} />
    </>
  );
};

export default CreateWorkSpaceButton;
