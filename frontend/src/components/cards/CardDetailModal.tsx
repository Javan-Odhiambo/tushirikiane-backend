"use client";

import { I_GetCardRespone } from "@/lib/interfaces/responses";
import { M_People } from "@/lib/mockData";
import { useEditCard } from "@/lib/mutations/cards";
import {
  ActionIcon,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
  rem,
} from "@mantine/core";
import { useParams } from "next/navigation";
import { useState } from "react";
import ChecklistContainer from "../checklist/ChecklistContainer";
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
  const { workSpacesSlug, boardsSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const { mutate: editCard } = useEditCard(
    workSpacesSlug,
    boardsSlug,
    card.task_list_id,
    card.id
  );

  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(card.name);

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(card.description ?? "");

  const handleOnCardStatusChange = () => {
    editCard({ is_completed: !card.is_completed, name: card.name });
  };

  const handleOnNotesSave = (notes: string) => {
    editCard({ notes: notes, name: card.name });
  };

  const handleOnCreateLabel = () => {
    console.log("Creating label");
  };

  const handleOnNameClick = () => {
    setIsEditingName(true);
  };

  const handleOnDescriptionClick = () => {
    setIsEditingDescription(true);
  };

  const handleOnNameBlur = () => {
    setIsEditingName(false);
    if (name !== card.name) {
      editCard({ name });
    }
  };

  const handleOnDescriptionBlur = () => {
    setIsEditingDescription(false);
    if (description !== card.description) {
      editCard({ description, name: card.name });
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} size="xl">
      <Stack>
        <Group align="center">
          <StatusCheckBox
            handleOnChange={handleOnCardStatusChange}
            isChecked={card.is_completed}
          />
          <Stack flex={1}>
            {isEditingName ? (
              <TextInput
                autoFocus
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                onBlur={handleOnNameBlur}
                size={rem(36)}
                fw={700}
                w={"100%"}
              />
            ) : (
              <Title
                onClick={handleOnNameClick}
                style={{ cursor: "pointer", width: "100%" }}
                size={rem(36)}
              >
                {name}
              </Title>
            )}
          </Stack>
        </Group>

        <div style={{ width: "100%" }}>
          {isEditingDescription ? (
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              onBlur={handleOnDescriptionBlur}
              autosize
              minRows={2}
              autoFocus
              w={"100%"}
              size={rem(16)}
            />
          ) : (
            <Text
              onClick={handleOnDescriptionClick}
              style={{
                cursor: "pointer",
                whiteSpace: "pre-wrap",
              }}
              size={rem(16)}
            >
              {description || "Add a description..."}
            </Text>
          )}
        </div>

        <Group justify="space-between" align="center">
          <Stack>
            <Text>Members</Text>
            <AvatarsContainer workSpaceMembers={M_People} isLoading={false} />
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
        <RichTextEditor
          savedNotes={card.notes ?? ""}
          handleOnSave={handleOnNotesSave}
        />

        <ChecklistContainer card={card} />
      </Stack>
    </Modal>
  );
};

export default CardDetailModal;
