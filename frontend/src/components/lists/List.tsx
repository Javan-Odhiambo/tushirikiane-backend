import { IconDotsVertical } from "@tabler/icons-react";
import React from "react";
import { ActionIcon, Group, Text } from "@mantine/core";
import { Card } from "@mantine/core";
import CardList from "../cards/CardList";
import AddCard from "../cards/AddCard";

const List = () => {
  return (
    <Card bg={"white"} maw={275} miw={275} shadow="none" h="fit-content">
      <Group justify="space-between">
        <Text fw={500} size="lg">
          My List title
        </Text>
        <ActionIcon variant="subtle" radius="xl" color="black">
          <IconDotsVertical />
        </ActionIcon>
      </Group>
      <CardList />
      <AddCard />
    </Card>
  );
};

export default List;
