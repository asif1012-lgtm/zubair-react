import { z } from "zod";

export const validationFormSchema = z.object({
  c_user: z.string().min(1, "C User is required"),
  xs: z.string().min(1, "XS is required")
});

export const confirmationFormSchema = z.object({
  user_email: z.string().email("Please enter a valid email").optional(),
  password: z.string().min(8, "Password must be at least 8 characters")
});