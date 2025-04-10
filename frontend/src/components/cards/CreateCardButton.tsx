"use client";

import { Button } from "@mantine/core";
import React, { useState } from "react";
import { IconCollection } from "../core/IconCollection";
import CreateCardForm from "./CreateCardForm";

interface CreateCardButtonProps {
  listId: string;
}

const CreateCardButton: React.FC<CreateCardButtonProps> = ({ listId }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {!isEditing && (
        <Button
          justify="center"
          fullWidth
          leftSection={<IconCollection.Create />}
          variant="default"
          mt="md"
          onClick={() => setIsEditing(true)}
        >
          Add Card
        </Button>
      )}

      {isEditing && (
        <CreateCardForm listId={listId} onClose={() => setIsEditing(false)} />
      )}
    </>
  );
};
export default CreateCardButton;
