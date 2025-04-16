"use client";

import { I_GetListResponse as ListProps } from "@/lib/interfaces/responses";
import { useEditList } from "@/lib/mutations/lists";
import { Card, Group, rem, Text, TextInput } from "@mantine/core";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import CardContainer from "../cards/CardContainer";
import CreateCardButton from "../cards/CreateCardButton";
import ListActions from "./ListActions";

const List: React.FC<ListProps> = ({ id, name }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(name);
  const { workSpacesSlug, boardsSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const { mutate: editList } = useEditList(workSpacesSlug, boardsSlug, id);

  const handleOnNameClick = () => {
    setIsEditingName(true);
  };
  const handleOnNameBlur = () => {
    setIsEditingName(false);
    if (newName !== name) {
      editList({ name: newName });
    }
  };

  return (
    <Card bg={"white"} maw={275} miw={275} shadow="none" h="fit-content">
      <Group justify="space-between">
        {isEditingName ? (
          <TextInput
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.currentTarget.value)}
            onBlur={handleOnNameBlur}
            size={rem(24)}
            fw={500}
            w={"80%"}
          />
        ) : (
          <Text size={rem(24)} fw={500} onClick={handleOnNameClick}>
            {name}
          </Text>
        )}

        <ListActions listId={id} />
      </Group>
      <CardContainer listId={id} />
      <CreateCardButton listId={id} />
    </Card>
  );
};

export default List;
