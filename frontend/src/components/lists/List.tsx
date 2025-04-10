import { I_GetListResponse as ListProps } from "@/lib/interfaces/responses";
import { Card, Group, Text } from "@mantine/core";
import { } from "@tabler/icons-react";
import React from "react";
import CardContainer from "../cards/CardContainer";
import CreateCardButton from "../cards/CreateCardButton";
import ListActions from "./ListActions";

const List: React.FC<ListProps> = ({ id, name }) => {
  return (
    <Card bg={"white"} maw={275} miw={275} shadow="none" h="fit-content">
      <Group justify="space-between">
        <Text fw={500} size="lg">
          {name}
        </Text>

        <ListActions listId={id} />
      </Group>
      <CardContainer listId={id} />
      <CreateCardButton listId={id} />
    </Card>
  );
};

export default List;
