"use client";
import { authApi } from "@/lib/kyInstance";
import { signUpSchema } from "@/lib/schema";
import { URLS } from "@/lib/urls";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Anchor,
  Button,
  Flex,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import AuthFormWrapper from "./AuthFormWrapper";

type T_SignUpSchema = z.infer<typeof signUpSchema>;

export interface AuthResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

const signUp = async (data: T_SignUpSchema): Promise<AuthResponse> => {
  return await authApi
    .post(URLS.apiSignUp, { json: data })
    .json<AuthResponse>();
};

const SignupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T_SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "some@mail.com",
      first_name: "some some",
      last_name: "some some",
      password: "helloWorld@2024",
      re_password: "helloWorld@2024",
    },
  });

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: async (data) => {
      toast.success(
        `Welcome ${data.email}! Please be patient as we redirect you to the dashboard.`
      );
      router.push(URLS.dashboard);
    },
    onError: async (error: any) => {
      let errorMessage = "Signup failed. Please try again.";

      try {
        if (error.response) {
          const errorData = await error.response.json();

          errorMessage = Object.entries(errorData)
            .map(([_, messages]) => `${(messages as string[]).join(", ")}`)
            .join(" | ");
        }
      } catch (err) {
        console.error("Error parsing backend response:", err);
      }

      toast.error(errorMessage);
      console.error("Signup failed", errorMessage);
    },
  });

  const onSubmit = (values: T_SignUpSchema) => mutation.mutate(values);

  return (
    <AuthFormWrapper title="Create an Account">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            required
            label="First Name"
            {...register("first_name")}
            error={errors.first_name?.message}
          />
          <TextInput
            required
            label="Last Name"
            {...register("last_name")}
            error={errors.last_name?.message}
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
            {...register("re_password")}
            error={errors.re_password?.message}
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
