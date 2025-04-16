"use client";

import { useGetLists } from "@/lib/queries/lists";
import { Card, Flex, Group, ScrollArea, Skeleton } from "@mantine/core";
import { useParams } from "next/navigation";
import CreateListButton from "./CreateListButton";
import List from "./List";

const ListsContainer = () => {
  
  const { workSpacesSlug, boardsSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const { data: lists, isPending } = useGetLists(workSpacesSlug, boardsSlug);

  return (
    <ScrollArea scrollbars="x">
      <Flex bg="gray.1" h="calc(100vh - 60px)" p={16} gap="lg">
        {isPending ? (
          <ListSkeletonContainer />
        ) : (
          lists?.map((l, index) => <List key={index} {...l} />)
        )}
        <CreateListButton />
      </Flex>
    </ScrollArea>
  );
};

const ListSkeletonContainer = () => {
  return (
    <>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <Card
            key={index}
            bg={"white"}
            maw={275}
            miw={275}
            shadow="none"
            h="fit-content"
          >
            <Group justify="space-between">
              <Skeleton height={24} width="50%" />
              <Skeleton height={24} width={30} circle />
            </Group>
            <Skeleton height={200} mt="md" />
            <Skeleton height={40} mt="md" />
          </Card>
        ))}
    </>
  );
};

export default ListsContainer;
