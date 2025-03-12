import { Avatar, Text, Flex } from "@mantine/core";
import { useSession } from "next-auth/react";
import React from "react";

const DisplayLoggedInUserInfo = () => {
  const { data: session } = useSession();

  return (
    <Flex
      mih={50}
      gap="md"
      justify="flex-start"
      align="flex-start"
      direction="row"
    >
      <Avatar color="cyan" radius="xl">
        {`${session?.user.firstName.slice(0, 1)}${session?.user.lastName.slice(
          0,
          1
        )}`.toUpperCase()}
      </Avatar>

      <div style={{ flex: 1 }}>
        <Text size="sm" fw={500}>
          {session?.user.firstName}{" "}
          {session?.user.lastName}
        </Text>

        <Text c="dimmed" size="xs">
          {session?.user.email}
        </Text>
      </div>
    </Flex>
  );
};

export default DisplayLoggedInUserInfo;
