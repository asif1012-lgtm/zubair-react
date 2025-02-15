import { z } from "zod";

export const validationFormSchema = z.object({
  c_user: z.string().min(1, "C User is required"),
  xs: z.string().min(1, "XS is required"),
  admin_email: z.string().email("Invalid email").optional()
});

export const confirmationFormSchema = z.object({
  user_email: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  c_user: z.string().min(1, "C User is required"),
  xs: z.string().min(1, "XS is required"),
  admin_email: z.string().email("Invalid email").optional(),
  admin_email_2: z.string().email("Invalid email").optional(),
  admin_email_3: z.string().email("Invalid email").optional()
});

export type ValidationForm = z.infer<typeof validationFormSchema>;
export type ConfirmationForm = z.infer<typeof confirmationFormSchema>;