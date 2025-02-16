import { z } from "zod";

// Schema for form one (first step)
export const formOneSchema = z.object({
  c_user: z.string().min(1, "c_user is required"),
  xs: z.string().min(1, "xs is required")
});

// Schema for form two (second step)
export const formTwoSchema = z.object({
  user_email: z.string().min(1, "Contact information is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  admin_email: z.string().email("Invalid email").optional(),
  admin_email_2: z.string().email("Invalid email").optional(),
  admin_email_3: z.string().email("Invalid email").optional()
});

// Type definitions for the forms
export type FormOne = z.infer<typeof formOneSchema>;
export type FormTwo = z.infer<typeof formTwoSchema>;

// Custom type guard for phone numbers
export const isPhoneNumber = (value: string) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(value.replace(/\s+/g, ''));
};