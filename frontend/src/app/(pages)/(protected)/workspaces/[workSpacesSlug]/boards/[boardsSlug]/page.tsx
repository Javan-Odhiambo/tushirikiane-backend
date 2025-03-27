import SecondaryHeader from "@/components/boards/SecondaryHeader";
import AddList from "@/components/lists/AddList";
import List from "@/components/lists/List";
import { Flex, ScrollArea } from "@mantine/core";

const BoardsSlugPage = () => {
  return (
    <>
      <SecondaryHeader />
      <ScrollArea scrollbars="x">
        <Flex bg="gray.1" h="calc(100vh - 64px)" p={16} gap="lg">
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <AddList />
        </Flex>
      </ScrollArea>
    </>
  );
};

export default BoardsSlugPage;
