import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Please enter your email." })
    .email({ message: "Please enter a valid email" }),
  password: z.string({ required_error: "Please enter your password" }),
});

export const signUpSchema = z
  .object({
    first_name: z.string().min(1, "Please enter your first name."),
    last_name: z.string().min(1, "Please enter your last name."),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    re_password: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.re_password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const resetPasswordSchema = z
  .object({
    password: z.string({ required_error: "Please enter your password" }),
    confirmPassword: z.string({ required_error: "Please enter your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export const createBoardSchema = z.object({
  visibility: z.string({
    required_error: "Select who this board will be visible to",
  }),
  name: z.string({
    required_error: "Please provide a name for your board",
  }),
  description: z.string({
    required_error: "Please provide a name for your board",
  }),
  inviteMembers: z.array(z.number()),
});

export type T_CreateBoardSchema = z.infer<typeof createBoardSchema>;
