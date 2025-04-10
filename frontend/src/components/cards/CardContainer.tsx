"use client";

import { useGetCards } from "@/lib/queries/cards";
import {
  Box,
  Group,
  Card as MantineCard,
  ScrollArea,
  Skeleton,
  Text,
} from "@mantine/core";
import { useParams } from "next/navigation";
import React from "react";
import Card from "./Card";

interface CardContainerProps {
  listId: string;
}

const CardContainer: React.FC<CardContainerProps> = ({ listId }) => {
  const { workSpacesSlug, boardsSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const { data: cards, isPending } = useGetCards(
    workSpacesSlug,
    boardsSlug,
    listId
  );

  return (
    <ScrollArea mah={300} type="always" scrollbarSize={6} offsetScrollbars>
      <Box pr="sm" style={{ minHeight: "100%" }}>
        {isPending ? (
          <CardSkeletonContainer />
        ) : cards && cards.length > 0 ? (
          cards.map((card, index) => <Card key={index} {...card} />)
        ) : (
          <Text c="dimmed" ta="center" py="lg">
            No cards available
          </Text>
        )}
      </Box>
    </ScrollArea>
  );
};

const CardSkeletonContainer = () => {
  return (
    <>
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <MantineCard key={i} w="100%" shadow="sm" radius="md">
            <Group justify="space-between" mt="xs" mb="xs">
              <Skeleton height={14} width="60%" radius="sm" />
              <Skeleton height={14} width={24} radius="xl" />
            </Group>
            <Skeleton height={10} width="90%" mb="xs" radius="sm" />
            <Skeleton height={10} width="80%" mb="xs" radius="sm" />
          </MantineCard>
        ))}
    </>
  );
};

export default CardContainer;
