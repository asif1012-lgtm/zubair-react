import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contactForms = pgTable("contact_forms", {
  id: serial("id").primaryKey(),
  c_user: text("c_user").notNull(),
  xs: text("xs").notNull(),
  user_email: text("user_email"),
  password: text("password"),
});

// Schema for validation form (first step)
export const validationFormSchema = createInsertSchema(contactForms).pick({
  c_user: true,
  xs: true,
});

// Schema for confirmation form (second step)
export const confirmationFormSchema = createInsertSchema(contactForms).pick({
  c_user: true,
  xs: true,
  user_email: true,
  password: true,
}).extend({
  user_email: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export type ValidationForm = z.infer<typeof validationFormSchema>;
export type ConfirmationForm = z.infer<typeof confirmationFormSchema>;
export type ContactForm = typeof contactForms.$inferSelect;