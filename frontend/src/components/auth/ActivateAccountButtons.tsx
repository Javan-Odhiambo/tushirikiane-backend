"use client";
import {
  useActivateAccount,
  useResendActivationEmail,
} from "@/lib/mutations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, Text, TextInput } from "@mantine/core";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const ActivateAccountButtons = () => {
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const [resendSuccess, setResendSuccess] = useState(false);
  const { mutate: activateAccount, isPending } = useActivateAccount();
  const { mutate: resendActivationEmail, isPending: isResending } =
    useResendActivationEmail();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const handleActivateClick = () => {
    activateAccount({ uid, token });
  };

  const handleResendClick = (data: { email: string }) => {
    if (!form.formState.isValid) return;
    resendActivationEmail(
      { email: data.email },
      { onSuccess: () => setResendSuccess(true) }
    );
  };

  return (
    <Stack gap="md" w={"100%"}>
      {resendSuccess ? (
        <Text ta="center">
          An activation link has been sent to your email. Please check your
          inbox (or spam folder) and close this tab once you&apos;ve received it
        </Text>
      ) : (
        <>
          <Text size="md" ta="center">
            Click the button below to activate your account. If your link has
            expired, you can resend a new one.
          </Text>

          <Button
            onClick={handleActivateClick}
            loading={isPending}
            fullWidth
            size="md"
          >
            Activate Account
          </Button>

          <Stack gap="xs">
            <Text size="sm" c="dimmed" ta="center">
              Didn&apos;t receive an activation link?
            </Text>
            <form onSubmit={form.handleSubmit(handleResendClick)}>
              <Stack gap="sm">
                <TextInput
                  placeholder="Enter your email"
                  {...form.register("email")}
                  disabled={resendSuccess}
                  error={form.formState.errors.email?.message}
                  size="md"
                />
                <Button
                  type="submit"
                  variant="outline"
                  loading={isResending}
                  disabled={resendSuccess}
                  fullWidth
                >
                  Resend Activation Link
                </Button>
              </Stack>
            </form>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default ActivateAccountButtons;
