"use client";

import { I_GetCardRespone as CardProps } from "@/lib/interfaces/responses";
import { useGetCardMembers } from "@/lib/queries/cards";
import { ActionIcon, Group, Card as MantineCard, Text } from "@mantine/core";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import AvatarsContainer from "../core/AvatarsContainer";
import { IconCollection } from "../core/IconCollection";
import CardDetailModal from "./CardDetailModal";

const Card: React.FC<CardProps> = (card) => {
  const { workSpacesSlug, boardsSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const { name, description } = card;
  const [isOpen, setIsOpen] = useState(false);

  const { data: cardMembers, isPending } = useGetCardMembers(
    workSpacesSlug,
    boardsSlug,
    card.task_list_id,
    card.id
  );

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
          <Text size="sm" truncate w={"84%"}>{name}</Text>
          <ActionIcon variant="subtle" size="sm" color="black">
            <IconCollection.Edit />
          </ActionIcon>
        </Group>
        <Text size="xs" mb="xs">
          {description}
        </Text>
        <AvatarsContainer
          members={cardMembers?.map((c) => c.member)}
          isLoading={isPending}
        />
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
