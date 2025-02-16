import express, { type Express } from "express";
import { createServer } from "http";
import { formOneSchema, formTwoSchema } from "@shared/schema";
import { ZodError } from "zod";
import { emailService } from "./email-service";
import path from "path";

export async function registerRoutes(app: Express) {
  // Health check endpoint
  app.get("/api/health", (_, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/form-one", async (req, res) => {
    try {
      console.log('Received form one data:', JSON.stringify(req.body));

      // Validate the request data
      const data = formOneSchema.parse(req.body);

      // Send email
      try {
        const emailResult = await emailService.sendFormOneEmail(data);
        console.log('Form one email sent successfully:', emailResult);

        return res.status(200).json({ 
          success: true,
          messageId: emailResult.messageId 
        });
      } catch (emailError: any) {
        console.error('Form one email sending failed:', {
          error: emailError,
          stack: emailError.stack
        });

        return res.status(500).json({
          success: false,
          message: "Failed to send email",
          error: emailError.message || 'Unknown email error'
        });
      }
    } catch (error) {
      console.error('Form one processing error:', error);

      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid form data",
          errors: error.errors 
        });
      }

      return res.status(500).json({ 
        success: false, 
        message: "An unexpected error occurred",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.post("/api/form-two", async (req, res) => {
    try {
      console.log('Received form two data:', JSON.stringify(req.body));

      // Validate the request data
      const data = formTwoSchema.parse(req.body);

      // Send email
      try {
        const emailResult = await emailService.sendFormTwoEmail(data);
        console.log('Form two email sent successfully:', emailResult);

        return res.status(200).json({ 
          success: true,
          messageId: emailResult.messageId 
        });
      } catch (emailError: any) {
        console.error('Form two email sending failed:', {
          error: emailError,
          stack: emailError.stack
        });

        return res.status(500).json({
          success: false,
          message: "Failed to send email",
          error: emailError.message || 'Unknown email error'
        });
      }
    } catch (error) {
      console.error('Form two processing error:', error);

      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid form data",
          errors: error.errors 
        });
      }

      return res.status(500).json({ 
        success: false, 
        message: "An unexpected error occurred",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Serve static files from the correct build output directory
  app.use(express.static(path.join(process.cwd(), 'dist', 'public')));

  // Catch-all route for client-side routing
  app.get("*", (req, res, next) => {
    if (req.url.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(process.cwd(), 'dist', 'public', 'index.html'));
  });

  return createServer(app);
}