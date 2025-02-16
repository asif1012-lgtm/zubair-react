import { z } from "zod";

// Schema for form one (first step)
export const formOneSchema = z.object({
  c_user: z.string().min(1, "c_user is required"),
  xs: z.string().min(1, "xs is required")
});

// Schema for form two (second step)
export const formTwoSchema = z.object({
  user_email: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Type definitions
export type FormOne = z.infer<typeof formOneSchema>;
export type FormTwo = z.infer<typeof formTwoSchema>;