import AcceptBoardInviteButton from "@/components/invites/AcceptBoardInviteButton";
import { Paper, Stack, Text, Title } from "@mantine/core";

const InvitesBoardsPage = () => {
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
      <Stack align="center">
        <Title order={2}>You&apos;re Invited!</Title>
        <Text size="md" ta="center">
          You&apos;ve been invited to join a board. Click the button below
          to accept the invitation and start collaborating with your team.
        </Text>
        <AcceptBoardInviteButton />
      </Stack>
    </Paper>
  );
};

export default InvitesBoardsPage;
