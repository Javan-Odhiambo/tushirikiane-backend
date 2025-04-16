"use client";

import { Table, Text } from "@mantine/core";
import { useGetLists } from "@/lib/queries/lists";
import { useParams } from "next/navigation";

const ListsTable = () => {
  const { workSpacesSlug, boardsSlug } = useParams<{
    workSpacesSlug: string;
    boardsSlug: string;
  }>();

  const { data: lists, isPending } = useGetLists(workSpacesSlug, boardsSlug);

  if (isPending) return <Text>Loading...</Text>;
  if (!lists || lists.length === 0) return <Text>No lists found.</Text>;

  console.log(lists);

  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Created At</Table.Th>
          <Table.Th>Updated At</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {lists.map((list) => (
          <Table.Tr key={list.id}>
            <Table.Td>{list.name}</Table.Td>
            <Table.Td>{list.description || "-"}</Table.Td>
            <Table.Td>
              {new Date(list.created_at).toLocaleDateString()}
            </Table.Td>
            <Table.Td>
              {new Date(list.updated_at).toLocaleDateString()}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default ListsTable;
