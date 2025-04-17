"use client";

import { useDeleteBoard } from "@/lib/mutations/boards";
import { Button, Group, Text } from "@mantine/core";
import { useParams } from "next/navigation";
import { useState } from "react";
import ConfirmActionModal from "../core/ConfirmActionModal";
import { IconCollection } from "../core/IconCollection";

interface DeleteBoardButtonProps {
  boardSlug: string;
}

const DeleteBoardButton: React.FC<DeleteBoardButtonProps> = ({ boardSlug }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const { workSpacesSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const { mutate: deleteBoard, isPending } = useDeleteBoard(
    workSpacesSlug,
    boardSlug,
    () => {
      setModalOpen(false);
    }
  );

  return (
    <>
      <Button
        onClick={() => setModalOpen(true)}
        variant="light"
        c="red"
        bg={"red.2"}
        loading={isPending}
      >
        <Group justify="space-between">
          <IconCollection.Delete />
          <Text>Delete</Text>
        </Group>
      </Button>

      <ConfirmActionModal
        isOpen={isModalOpen}
        isLoading={isPending}
        message="Are you sure you want to delete this board? This action cannot be undone."
        onConfirm={deleteBoard}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};

export default DeleteBoardButton;
