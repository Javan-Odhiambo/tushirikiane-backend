"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Stack,
  TextInput,
  PasswordInput,
  Text,
  Flex,
  Anchor,
} from "@mantine/core";
import Link from "next/link";
import { URLS } from "@/lib/urls";
import AuthFormWrapper from "./AuthFormWrapper";
import { authApi } from "@/lib/kyInstance";

type T_SignUpSchema = z.infer<typeof signUpSchema>;

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const signUp = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  return await authApi.post("auth/signup", { json: data }).json<AuthResponse>();
};

const SignupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T_SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      router.push(URLS.dashboard);
    },
    onError: (error) => console.error("Signup failed", error),
  });

  const onSubmit = (values: T_SignUpSchema) => mutation.mutate(values);

  return (
    <AuthFormWrapper title="Create an Account">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            required
            label="First Name"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <TextInput
            required
            label="Last Name"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
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
          <PasswordInput
            required
            label="Confirm Password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </Stack>

        <Flex justify="space-between" mt="xl" align="center">
          <Text size="sm">
            Already have an account?{" "}
            <Anchor component={Link} href={URLS.signIn} size="sm">
              Sign In
            </Anchor>
          </Text>
          <Button type="submit" radius="md" loading={mutation.isPending}>
            Sign Up
          </Button>
        </Flex>
      </form>
    </AuthFormWrapper>
  );
};

export default SignupForm;
