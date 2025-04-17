"use client";

import {
    Button,
    Card,
    Center,
    Container,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

const NotFound = () => {
  const router = useRouter();

  return (
    <Center h="100vh" bg="gray.0">
      <Container size="md" px="md">
        <Card p="xl" bg="white">
          <Image
            src="/core/not-found.svg"
            alt="Not found illustration"
            width={400}
            height={300}
            style={{ objectFit: "contain" }}
            priority
          />
          <Stack gap="sm" align="center">
            <Title order={1} ta="center" fw={700} c={"blue"}>
              404 - Page Not Found
            </Title>
            <Text size="lg" ta="center" c="gray.7" maw={500}>
              Oops! The page you&apos;re looking for doesn&apos;t exist or has
              been moved.
            </Text>
          </Stack>
          <Button
            onClick={router.back}
            size="md"
            radius="md"
            leftSection={<FaArrowLeftLong />}
            w={"fit-content"}
          >
            Return to Homepage
          </Button>
        </Card>
      </Container>
    </Center>
  );
};

export default NotFound;
