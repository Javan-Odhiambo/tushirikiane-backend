import React from "react";
import CardMembersList from "../members/CardMembersList";
import { ActionIcon, Card, Group, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

const CardList = () => {
  return (
    <Card w="100%" shadow="sm" radius="md" >
      <Group justify="space-between" mt="xs" mb="xs">
        <Text size="sm">My card 1</Text>
        <ActionIcon variant="subtle" size="sm" color="black" >
          <IconEdit stroke={1.0} />
        </ActionIcon>
      </Group>
      <Text size="xs" mb="xs">
        Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Et,
        fugiat? Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
      </Text>
      <CardMembersList />
    </Card>
  );
};

export default CardList;
