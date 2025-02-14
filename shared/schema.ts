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
export const insertValidationFormSchema = createInsertSchema(contactForms).pick({
  c_user: true,
  xs: true,
});

// Schema for confirmation form (second step)
export const insertConfirmationFormSchema = createInsertSchema(contactForms).pick({
  c_user: true,
  xs: true,
  user_email: true,
  password: true,
}).extend({
  user_email: z.string().optional()
});

export type InsertContactForm = z.infer<typeof insertValidationFormSchema> | z.infer<typeof insertConfirmationFormSchema>;
export type ContactForm = typeof contactForms.$inferSelect;