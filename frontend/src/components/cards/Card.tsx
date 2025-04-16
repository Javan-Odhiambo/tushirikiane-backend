"use client";

import { I_GetCardRespone as CardProps } from "@/lib/interfaces/responses";
import { ActionIcon, Group, Card as MantineCard, Text } from "@mantine/core";
import React, { useState } from "react";
import AvatarsContainer from "../core/AvatarsContainer";
import { IconCollection } from "../core/IconCollection";
import CardDetailModal from "./CardDetailModal";
import { M_People } from "@/lib/mockData";

const Card: React.FC<CardProps> = (card) => {
  const { name, description } = card;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MantineCard
        w="100%"
        shadow="sm"
        radius="md"
        onClick={() => setIsOpen(true)}
        style={{ cursor: "pointer" }}
      >
        <Group justify="space-between" mt="xs" mb="xs">
          <Text size="sm">{name}</Text>
          <ActionIcon variant="subtle" size="sm" color="black">
            <IconCollection.Edit />
          </ActionIcon>
        </Group>
        <Text size="xs" mb="xs">
          {description}
        </Text>
        <AvatarsContainer members={M_People} isLoading={false} />
      </MantineCard>

      <CardDetailModal
        {...card}
        opened={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default Card;
