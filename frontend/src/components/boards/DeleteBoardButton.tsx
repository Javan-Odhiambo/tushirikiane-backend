"use client";

import { useDeleteBoard } from "@/lib/mutations";
import { ActionIcon } from "@mantine/core";
import { useParams } from "next/navigation";
import { useState } from "react";
import ConfirmActionModal from "../core/ConfirmActionModal";
import { IconLibrary } from "../core/IconsLibrary";

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
      <ActionIcon
        onClick={() => setModalOpen(true)}
        variant="subtle"
        c="red"
        loading={isPending}
      >
        <IconLibrary.Delete />
      </ActionIcon>

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
