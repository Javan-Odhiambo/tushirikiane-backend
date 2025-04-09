"use client";

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
import StatusCheckBox from "../core/StatusCheckBox";

const CardDetailModal = () => {
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
    <Modal opened={true} onClose={() => {}} size={"xl"}>
      <Stack>
        <Group>
          <StatusCheckBox
            handleOnChange={() => handleOnCardStatusChange("")}
            isChecked
          />
          <Title>Card Name in List name</Title>
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
              <Badge>Red</Badge>
              <Badge>Orange</Badge>
              <Badge>Yellow</Badge>
              <Badge>Blue</Badge>
              <Badge>Green</Badge>
            </Group>
          </Stack>
        </Group>

        <Text>Notes</Text>
        <Box p={200} bg={"gray"}></Box>

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
