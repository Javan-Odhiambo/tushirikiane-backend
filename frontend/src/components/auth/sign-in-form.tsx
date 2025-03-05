"use client";
import { signInSchema } from "@/lib/schema";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthFormWrapper from "./auth-form-wrapper";

type T_SignInSchema = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T_SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: T_SignInSchema) => {
    console.log("Form Values:", values);
    // TODO: connect with backend, toast, and redirect
    // router.push(URLS.dashboard);
  };

  return (
    <AuthFormWrapper title="Welcome to Tushirikiane">
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

          <PasswordInput
            required
            label="Password"
            placeholder="superS3curePa$$w0rd"
            {...register("password")}
            error={errors.password?.message}
            radius="md"
          />

          <Anchor
            component={Link}
            href={URLS.forgotPassword}
            c="dimmed"
            size="xs"
          >
            Forgot Password?
          </Anchor>
        </Stack>

        <Flex
          justify="space-between"
          mt="xl"
          align="center"
          direction={{ base: "column", sm: "row" }}
          gap="sm"
        >
          <Text size="sm">
            Don't have an account?{" "}
            <Anchor component={Link} href={URLS.signUp} size="sm">
              Sign up
            </Anchor>
          </Text>

          <Button type="submit" radius="md">
            Sign In
          </Button>
        </Flex>
      </form>
    </AuthFormWrapper>
  );
};

export default SignInForm;
