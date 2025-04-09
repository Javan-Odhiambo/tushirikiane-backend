"use client";

import { useDeleteWorkSpace } from "@/lib/mutations";
import { URLS } from "@/lib/urls";
import { ActionIcon } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { IconCollection } from "../core/IconCollection";
import ConfirmActionModal from "../core/ConfirmActionModal";

const DeleteWorkSpaceButton = () => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);

  const { workSpacesSlug } = useParams<{ workSpacesSlug: string }>();

  const { mutate: deleteWorkSpace, isPending } = useDeleteWorkSpace(
    workSpacesSlug,
    () => {
      router.push(URLS.workspaces);
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
        <IconCollection.Delete />
      </ActionIcon>

      <ConfirmActionModal
        isOpen={isModalOpen}
        isLoading={isPending}
        message="Are you sure you want to delete this workspace? This action cannot be undone."
        onConfirm={deleteWorkSpace}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};

export default DeleteWorkSpaceButton;
