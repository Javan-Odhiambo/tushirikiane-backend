import { I_GetCardRespone as CardProps } from "@/lib/interfaces";
import { ActionIcon, Group, Card as MantineCard, Text } from "@mantine/core";
import React from "react";
import AvatarsContainer from "../core/AvatarsContainer";
import { IconCollection } from "../core/IconCollection";

const Card: React.FC<CardProps> = ({ name, description }) => {
  return (
    <MantineCard w="100%" shadow="sm" radius="md">
      <Group justify="space-between" mt="xs" mb="xs">
        <Text size="sm">{name}</Text>
        <ActionIcon variant="subtle" size="sm" color="black">
          <IconCollection.Edit />
        </ActionIcon>
      </Group>
      <Text size="xs" mb="xs">
        {description}
      </Text>
      <AvatarsContainer workSpaceSlug="" />
    </MantineCard>
  );
};

export default Card;
