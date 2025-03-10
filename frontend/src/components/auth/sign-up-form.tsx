"use client";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthFormWrapper from "./auth-form-wrapper";

type T_SignUpSchema = z.infer<typeof signUpSchema>;

const SignupForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T_SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: T_SignUpSchema) => {
    console.log("Signup Values:", values);
    // TODO: connect with backend, toast and redirect
    // router.push(URLS.dashboard);
  };

  return (
    <AuthFormWrapper title="Create an Account">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            required
            label="First Name"
            placeholder="John"
            {...register("firstName")}
            error={errors.firstName?.message}
            radius="md"
          />

          <TextInput
            label="Middle Name (Optional)"
            placeholder="Michael"
            {...register("middleName")}
            radius="md"
          />

          <TextInput
            required
            label="Last Name"
            placeholder="Doe"
            {...register("lastName")}
            error={errors.lastName?.message}
            radius="md"
          />

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

          <PasswordInput
            required
            label="Confirm Password"
            placeholder="superS3curePa$$w0rd"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            radius="md"
          />
        </Stack>

        <Flex
          justify="space-between"
          mt="xl"
          align="center"
          direction={{ base: "column", sm: "row" }}
          gap="sm"
        >
          <Text size="sm">
            Already have an account?{" "}
            <Anchor component={Link} href={URLS.signIn} size="sm">
              Sign In
            </Anchor>
          </Text>

          <Button type="submit" radius="md">
            Sign Up
          </Button>
        </Flex>
      </form>
    </AuthFormWrapper>
  );
};

export default SignupForm;
