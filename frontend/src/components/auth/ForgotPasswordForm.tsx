"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Anchor, Button, Flex, Stack, Text, TextInput } from "@mantine/core";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthFormWrapper from "./AuthFormWrapper";
import { URLS } from "@/lib/urls";
import { forgotPasswordSchema } from "@/lib/schema";
import { FcLeft } from "react-icons/fc";

type T_ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T_ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: T_ForgotPasswordSchema) => {
    console.log("Forgot Password Values:", values);
    // TODO: Send reset email request to backend

    // Simulate email sent
    setEmailSent(true);
  };

  return (
    <AuthFormWrapper
      title={emailSent ? "Check Your Email" : "Reset Your Password"}
    >
      {emailSent ? (
        <Stack align="center">
          <Text ta="center">
            We’ve sent an email with password reset instructions to your inbox.
            Please check your email and follow the instructions.
          </Text>

          <Flex justify="center" mt="lg">
            <Anchor component={Link} href={URLS.signIn} c="blue" size="sm">
              <Text size="sm" fw={500}>
                ← Back to Sign In
              </Text>
            </Anchor>
          </Flex>
        </Stack>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="johndoe@gmail.com"
              {...register("email")}
              error={errors.email?.message}
              radius="md"
            />
          </Stack>

          <Button type="submit" fullWidth mt="xl" radius="md">
            Send Reset Link
          </Button>

          <Flex justify="center" mt="lg">
            <Anchor component={Link} href={URLS.signIn} size="sm">
              <Flex align="center" gap="xs">
                <FcLeft />
                <Text size="sm" fw={500}>
                  Back to Sign In
                </Text>
              </Flex>
            </Anchor>
          </Flex>
        </form>
      )}
    </AuthFormWrapper>
  );
};

export default ForgotPasswordForm;
