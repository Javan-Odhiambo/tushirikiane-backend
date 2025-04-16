import ActivateAccountButtons from "@/components/auth/ActivateAccountButtons";
import { Paper, Stack, Title } from "@mantine/core";

const ActivateAccountPage = () => {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      maw={720}
      mx={{ base: 16, sm: "auto" }}
      mt={"25vh"}
      withBorder
    >
      <Stack align="center">
        <Title order={2}>Activate Your Account</Title>
        <ActivateAccountButtons />
      </Stack>
    </Paper>
  );
};

export default ActivateAccountPage;
