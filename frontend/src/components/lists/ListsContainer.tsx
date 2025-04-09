import AddList from "@/components/lists/AddList";
import { Flex, ScrollArea } from "@mantine/core";
import List from "./List";

const ListsContainer = () => {
  return (
    <ScrollArea scrollbars="x">
      <Flex bg="gray.1" h="calc(100vh - 60px)" p={16} gap="lg">
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
        <AddList />
      </Flex>
    </ScrollArea>
  );
};

export default ListsContainer;
