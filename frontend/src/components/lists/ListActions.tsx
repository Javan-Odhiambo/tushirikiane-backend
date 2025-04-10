"use client";

import { useDeleteList } from "@/lib/mutations/lists";
import { ActionIcon, Menu } from "@mantine/core";
import { useParams } from "next/navigation";
import { useState } from "react";
import ConfirmActionModal from "../core/ConfirmActionModal";
import { IconCollection } from "../core/IconCollection";

interface ListActionsProps {
  listId: string;
}

const ListActions: React.FC<ListActionsProps> = ({ listId }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
    setMenuOpened(false);
  };

  return (
    <>
      <Menu
        shadow="md"
        width={200}
        opened={menuOpened}
        onChange={setMenuOpened}
        closeOnItemClick={true}
      >
        <Menu.Target>
          <ActionIcon variant="subtle" radius="xl" color="black">
            <IconCollection.Actions />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <EditListMenuItem listId={listId} />
          <Menu.Item
            leftSection={<IconCollection.Delete />}
            color="red"
            onClick={handleDeleteClick}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <DeleteListConfirmModal
        listId={listId}
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      />
    </>
  );
};

const EditListMenuItem: React.FC<ListActionsProps> = ({ listId }) => {
  return <Menu.Item leftSection={<IconCollection.Edit />}>{listId}</Menu.Item>;
};

const DeleteListConfirmModal: React.FC<{
  listId: string;
  isOpen: boolean;
  onClose: () => void;
}> = ({ listId, isOpen, onClose }) => {
  const { workSpacesSlug, boardsSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const { mutate: deleteList, isPending } = useDeleteList(
    workSpacesSlug,
    boardsSlug,
    listId
  );

  const handleOnDeleteConfirm = () => {
    deleteList();
    onClose();
  };

  return (
    <ConfirmActionModal
      isOpen={isOpen}
      isLoading={isPending}
      message="Are you sure you want to delete this list? This action cannot be undone."
      onConfirm={handleOnDeleteConfirm}
      onCancel={onClose}
    />
  );
};

export default ListActions;
