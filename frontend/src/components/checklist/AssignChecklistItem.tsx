"use client";

import { I_GetChecklistItemResponse } from "@/lib/interfaces/responses";
import { M_People } from "@/lib/mockData";
import { useAssignChecklistItem } from "@/lib/mutations/checklists";
import { ActionIcon, Group, Menu, ScrollArea, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "next/navigation";
import React from "react";
import { IconCollection } from "../core/IconCollection";
import MemberAvatar from "../core/MemberAvatar";

interface AssignChecklistItemProps extends I_GetChecklistItemResponse {
  listId: string;
}

const AssignChecklistItem: React.FC<AssignChecklistItemProps> = ({
  listId,
  task_id,
  id,
}) => {
  const { workSpacesSlug, boardsSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const [opened, { open, close }] = useDisclosure(false);

  const { mutate: assignChecklistItem, isPending } = useAssignChecklistItem(
    workSpacesSlug,
    boardsSlug,
    listId,
    task_id,
    id
  );

  const handleOnMemberClick = (userId: string) => {
    assignChecklistItem({ assignee_id: userId });
  };

  return (
    <Menu shadow="md" width={220} opened={opened} onClose={close}>
      <Menu.Target>
        <ActionIcon onClick={open} loading={isPending}>
          <IconCollection.Assign />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <ScrollArea.Autosize mah={300} type="scroll">
          {[...M_People, ...M_People, ...M_People].map((p, index) => (
            <Menu.Item
              key={index}
              onClick={() => handleOnMemberClick(p.member.id)}
            >
              <Group>
                <MemberAvatar
                  fullName={`${p.member.first_name} ${p.member.last_name}`}
                  initials={
                    p.member.first_name.charAt(0).toUpperCase() +
                    (p.member.last_name.charAt(0)?.toUpperCase() || "")
                  }
                />
                <Text>{`${p.member.first_name} ${p.member.last_name}`}</Text>
              </Group>
            </Menu.Item>
          ))}
        </ScrollArea.Autosize>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AssignChecklistItem;
