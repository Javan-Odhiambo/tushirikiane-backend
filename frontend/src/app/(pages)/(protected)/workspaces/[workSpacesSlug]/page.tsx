import { Paper, Stack, Text, Title } from "@mantine/core";

const WorkSpaceSlugPage = () => {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      maw={500}
      mx={{ base: 16, sm: "auto" }}
      mt={"25vh"}
      withBorder
    >
      <Stack align="center" gap="sm">
        <Title order={2}>No Board Selected</Title>
        <Text size="md" ta="center" c="dimmed">
          Please select a board to get started.
        </Text>
      </Stack>
    </Paper>
  );
};

export default WorkSpaceSlugPage;
