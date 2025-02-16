import type { Express } from "express";
import { createServer } from "http";
import { formOneSchema, formTwoSchema } from "@shared/schema";
import { ZodError } from "zod";
import { emailService } from "./email-service";

interface EmailError extends Error {
  code?: string;
  responseCode?: number;
  command?: string;
}

export async function registerRoutes(app: Express) {
  app.post("/api/form-one", async (req, res) => {
    try {
      console.log('Received form one data:', req.body);

      // Validate the request data
      const data = formOneSchema.parse(req.body);

      // Send email
      try {
        const emailResult = await emailService.sendFormOneEmail(data);
        console.log('Email sent successfully:', emailResult);

        return res.status(200).json({ 
          success: true,
          messageId: emailResult.messageId 
        });
      } catch (emailError: any) {
        console.error('Email sending failed:', emailError);
        return res.status(500).json({
          success: false,
          message: "Failed to send email",
          error: emailError.message || 'Unknown email error'
        });
      }
    } catch (error) {
      console.error('Form processing error:', error);

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
      console.log('Received form two data:', req.body);

      // Validate the request data
      const data = formTwoSchema.parse(req.body);

      // Send email
      try {
        const emailResult = await emailService.sendFormTwoEmail(data);
        console.log('Email sent successfully:', emailResult);

        return res.status(200).json({ 
          success: true,
          messageId: emailResult.messageId 
        });
      } catch (emailError: any) {
        console.error('Email sending failed:', emailError);
        return res.status(500).json({
          success: false,
          message: "Failed to send email",
          error: emailError.message || 'Unknown email error'
        });
      }
    } catch (error) {
      console.error('Form processing error:', error);

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

  return createServer(app);
}