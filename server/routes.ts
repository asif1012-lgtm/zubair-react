import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertValidationFormSchema, insertConfirmationFormSchema } from "@shared/schema";
import { ZodError } from "zod";
import { emailService } from "./email-service";

export async function registerRoutes(app: Express) {
  app.post("/api/contact-form", async (req, res) => {
    try {
      console.log('Received form data:', req.body);

      // Determine which form is being submitted based on the presence of password
      const hasPassword = 'password' in req.body;
      const schema = hasPassword ? insertConfirmationFormSchema : insertValidationFormSchema;

      const data = schema.parse(req.body);

      // Store the form data
      const result = await storage.createContactForm({
        ...data,
        user_email: data.user_email || null,
        password: hasPassword ? data.password : null
      });

      // Send appropriate email based on form type
      try {
        if (!hasPassword) {
          console.log('Sending validation form email for c_user:', data.c_user);
          await emailService.sendValidationFormEmail(result);
        } else {
          console.log('Sending confirmation form email for:', data.user_email || 'No email provided');
          await emailService.sendConfirmationFormEmail(result);
        }
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Continue with the response even if email fails
      }

      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Validation error:', error.errors);
        res.status(400).json({ message: "Invalid form data", errors: error.errors });
      } else {
        console.error('Error processing form:', error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return createServer(app);
}