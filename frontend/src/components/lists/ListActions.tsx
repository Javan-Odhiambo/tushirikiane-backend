"use client";

import { useDeleteList } from "@/lib/mutations/lists";
import { ActionIcon, Menu } from "@mantine/core";
import { useParams } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import ConfirmActionModal from "../core/ConfirmActionModal";
import { IconCollection } from "../core/IconCollection";

interface ListActionsProps {
  listId: string;
}

const ListActions: React.FC<ListActionsProps> = ({ listId }) => {
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [menuOpened, { open: openMenu, close: closeMenu }] =
    useDisclosure(false);

  const handleDeleteClick = () => {
    openModal();
    closeMenu();
  };

  return (
    <>
      <Menu
        shadow="md"
        width={200}
        opened={menuOpened}
        onOpen={openMenu}
        onClose={closeMenu}
        closeOnItemClick
      >
        <Menu.Target>
          <ActionIcon variant="subtle" radius="xl" color="black">
            <IconCollection.Actions />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          {/* <EditListMenuItem listId={listId} /> */}
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
        isOpen={modalOpened}
        onClose={closeModal}
      />
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
