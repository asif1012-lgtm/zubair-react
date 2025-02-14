import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contactForms = pgTable("contact_forms", {
  id: serial("id").primaryKey(),
  c_user: text("c_user").notNull(),
  xs: text("xs").notNull(),
  user_email: text("user_email"),
  password: text("password").notNull(),
});

export const insertContactFormSchema = createInsertSchema(contactForms).pick({
  c_user: true,
  xs: true,
  user_email: true,
  password: true,
}).extend({
  user_email: z.string().optional()
});

export type InsertContactForm = z.infer<typeof insertContactFormSchema>;
export type ContactForm = typeof contactForms.$inferSelect;