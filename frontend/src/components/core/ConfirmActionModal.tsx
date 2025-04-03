import { Button, Group, Modal, Text } from "@mantine/core";

interface ConfirmActionModalProps {
  isOpen: boolean;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  isOpen,
  message = "Are you sure you want to proceed?",
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  return (
    <Modal
      opened={isOpen}
      onClose={isLoading ? () => {} : onCancel}
      title="Confirm Action"
      centered
    >
      <Text>{message}</Text>
      <Group justify="right" mt="md">
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          color="red"
          onClick={onConfirm}
          loading={isLoading}
          disabled={isLoading}
        >
          Confirm
        </Button>
      </Group>
    </Modal>
  );
};

export default ConfirmActionModal;
