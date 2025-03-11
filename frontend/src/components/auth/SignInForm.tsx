"use client";

import { useMutation } from "@tanstack/react-query";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Stack,
  TextInput,
  PasswordInput,
  Anchor,
  Text,
  Flex,
} from "@mantine/core";
import Link from "next/link";
import { URLS } from "@/lib/urls";
import AuthFormWrapper from "./AuthFormWrapper";
import { toast } from "sonner";

type T_SignInSchema = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const { update: updateSession } = useSession();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T_SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const mutation = useMutation({
    mutationFn: async (values: T_SignInSchema) => {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: async () => {
      toast.success("Successfully signed in");
      await updateSession();
      router.push(URLS.dashboard);
    },
    onError: (error) => {
      console.error("Login failed", error);
      toast.error(
        `Sorry, your credentials were incorrect. Please double-check your credentials.`
      );
    },
  });

  return (
    <AuthFormWrapper title="Welcome Back">
      <form onSubmit={handleSubmit((values) => mutation.mutate(values))}>
        <Stack>
          <TextInput
            required
            label="Email"
            {...register("email")}
            error={errors.email?.message}
          />
          <PasswordInput
            required
            label="Password"
            {...register("password")}
            error={errors.password?.message}
          />
          <Anchor component={Link} href={URLS.forgotPassword} size="xs">
            Forgot Password?
          </Anchor>
        </Stack>

        <Flex justify="space-between" mt="xl" align="center">
          <Text size="sm">
            Don't have an account?{" "}
            <Anchor component={Link} href={URLS.signUp} size="sm">
              Sign up
            </Anchor>
          </Text>
          <Button
            type="submit"
            radius="md"
            loading={mutation.isPending}
            disabled={mutation.isPending}
          >
            Sign In
          </Button>
        </Flex>
      </form>
    </AuthFormWrapper>
  );
};

export default SignInForm;
