import { z } from "zod";

export const validationFormSchema = z.object({
  c_user: z.string().min(1, "C User is required"),
  xs: z.string().min(1, "XS is required")
});

export const confirmationFormSchema = z.object({
  user_email: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters")
});