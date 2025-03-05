"use client";
import {
  Box,
  Center,
  Paper,
  PaperProps,
  Text,
  Group,
  Divider,
  Button,
} from "@mantine/core";
import { FcGoogle } from "react-icons/fc";
import { ReactNode } from "react";

interface AuthFormWrapperProps extends PaperProps {
  children: ReactNode;
  title: string;
}

const AuthFormWrapper = ({
  children,
  title,
  ...props
}: AuthFormWrapperProps) => {
  return (
    <Center h={"100vh"}>
      <Paper
        radius="md"
        p="xl"
        withBorder
        w={{ base: "90%", sm: "60%", md: "30%" }}
        {...props}
        style={{
          backgroundImage: "url(/auth/auth-form-bg.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Text size="lg" fw={500} ta="center">
          {title}
        </Text>
        <Group grow mb="md" mt="md">
          {/* TODO: OnClick should go to Google consent form page */}
          <Button
            leftSection={<FcGoogle />}
            variant="default"
            fullWidth
            radius="md"
          >
            Continue with Google
          </Button>
        </Group>
        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />
        {children}
      </Paper>
    </Center>
  );
};

export default AuthFormWrapper;
