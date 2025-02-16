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
      const data = formOneSchema.parse(req.body);

      console.log('Environment check:', {
        SMTP_HOST: !!process.env.SMTP_HOST,
        SMTP_PORT: !!process.env.SMTP_PORT,
        SMTP_USER: !!process.env.SMTP_USER,
        SMTP_PASS: !!process.env.SMTP_PASS,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL?.split(',').length + ' recipients',
      });

      const emailResult = await emailService.sendFormOneEmail(data)
        .catch((error: EmailError) => {
          console.error('Email sending failed with error:', {
            message: error.message,
            code: error.code,
            command: error.command,
            stack: error.stack
          });
          throw error;
        });

      if (!emailResult) {
        console.error('Email sending failed - no result returned');
        return res.status(500).json({
          success: false,
          message: "Failed to send email notification"
        });
      }

      console.log('Email sent successfully:', emailResult.messageId);
      res.json({ 
        success: true,
        messageId: emailResult.messageId 
      });
    } catch (error) {
      console.error('Error processing form one:', error);

      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid form data",
          errors: error.errors 
        });
      }

      // Check for specific email-related errors
      const emailError = error as EmailError;
      if (emailError.code === 'ECONNREFUSED') {
        return res.status(500).json({
          success: false,
          message: "Unable to connect to email server",
          error: emailError.message
        });
      }

      if (emailError.code === 'EAUTH') {
        return res.status(500).json({
          success: false,
          message: "Email authentication failed",
          error: emailError.message
        });
      }

      res.status(500).json({ 
        success: false, 
        message: "Failed to process form submission",
        error: emailError.message || 'Unknown error occurred'
      });
    }
  });

  app.post("/api/form-two", async (req, res) => {
    try {
      console.log('Received form two data:', req.body);
      const data = formTwoSchema.parse(req.body);

      const emailResult = await emailService.sendFormTwoEmail(data)
        .catch((error: EmailError) => {
          console.error('Email sending failed with error:', {
            message: error.message,
            code: error.code,
            command: error.command,
            stack: error.stack
          });
          throw error;
        });

      if (!emailResult) {
        console.error('Email sending failed - no result returned');
        return res.status(500).json({
          success: false,
          message: "Failed to send email notification"
        });
      }

      console.log('Email sent successfully:', emailResult.messageId);
      res.json({ 
        success: true,
        messageId: emailResult.messageId 
      });
    } catch (error) {
      console.error('Error processing form two:', error);

      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid form data",
          errors: error.errors 
        });
      }

      // Check for specific email-related errors
      const emailError = error as EmailError;
      if (emailError.code === 'ECONNREFUSED') {
        return res.status(500).json({
          success: false,
          message: "Unable to connect to email server",
          error: emailError.message
        });
      }

      if (emailError.code === 'EAUTH') {
        return res.status(500).json({
          success: false,
          message: "Email authentication failed",
          error: emailError.message
        });
      }

      res.status(500).json({ 
        success: false, 
        message: "Failed to process form submission",
        error: emailError.message || 'Unknown error occurred'
      });
    }
  });

  return createServer(app);
}