"use client";

import { I_GetCardRespone } from "@/lib/interfaces/responses";
import { M_Tasks } from "@/lib/mockData";
import {
  ActionIcon,
  Badge,
  Box,
  Divider,
  Group,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useParams } from "next/navigation";
import AvatarsContainer from "../core/AvatarsContainer";
import { IconCollection } from "../core/IconCollection";
import RichTextEditor from "../core/RichTextEditor";
import StatusCheckBox from "../core/StatusCheckBox";

interface CardDetailModalProps extends I_GetCardRespone {
  opened: boolean;
  onClose: () => void;
}

const CardDetailModal: React.FC<CardDetailModalProps> = ({
  opened,
  onClose,
  ...card
}) => {
  const { workSpacesSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const handleOnTaskDelete = (taskId: string) => {
    console.log(`Deleted task with ID ${taskId}`);
  };

  const handleOnCardStatusChange = (cardId: string) => {
    console.log(`Toggling status of card ${cardId}`);
  };

  const handleOnTaskStatusChange = (taskId: string) => {
    console.log(`Toggling status of task ${taskId}`);
  };

  const handleOnCreateLabel = () => {};

  return (
    <Modal opened={opened} onClose={onClose} size="xl">
      <Stack>
        <Group>
          <StatusCheckBox
            handleOnChange={() => handleOnCardStatusChange("")}
            isChecked
          />
          <Title>{card.name}</Title>
        </Group>

        <Group justify="space-between" align="center">
          <Stack>
            <Text>Members</Text>
            <AvatarsContainer workSpaceSlug={workSpacesSlug} />
          </Stack>

          <Stack>
            <Group align="center">
              <Text>Labels</Text>
              <ActionIcon onClick={handleOnCreateLabel} variant="subtle">
                <IconCollection.Create />
              </ActionIcon>
            </Group>
            <Group>
              {/* {card.labels.map((l, index) => (
                <Badge key={index}>{l}</Badge>
              ))} */}
            </Group>
          </Stack>
        </Group>

        <Text>Notes</Text>
        <RichTextEditor />

        <Stack>
          <Text>CheckList</Text>
          <Divider size={"lg"} />
          <Box>
            {M_Tasks.map((t) => (
              <Group justify="space-between" key={t.id}>
                <Group>
                  <StatusCheckBox
                    handleOnChange={() => handleOnTaskStatusChange("")}
                    isChecked={t.isDone}
                  />
                  <Text>{t.title}</Text>
                </Group>
                <ActionIcon
                  onClick={() => handleOnTaskDelete("")}
                  variant="subtle"
                  color="red"
                >
                  <IconCollection.Delete />
                </ActionIcon>
              </Group>
            ))}
          </Box>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default CardDetailModal;
