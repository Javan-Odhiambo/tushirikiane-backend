"use client";

import { Box, Button } from "@mantine/core";
import { useState } from "react";
import { IconCollection } from "../core/IconCollection";
import CreateListForm from "./CreateListForm";

const CreateListButton = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Box w="25%" miw={250}>
      {!isEditing && (
        <Button
          justify="center"
          leftSection={<IconCollection.Create />}
          onClick={() => setIsEditing(true)}
          w={"100%"}
        >
          Add List
        </Button>
      )}
      {isEditing && <CreateListForm onClose={() => setIsEditing(false)} />}
    </Box>
  );
};
export default CreateListButton;
