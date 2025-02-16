import type { Express } from "express";
import { createServer } from "http";
import { sendFormEmail } from "./lib/email";
import { formOneSchema, formTwoSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.post("/api/form-one", async (req, res) => {
    try {
      console.log('Received form one data:', req.body);
      const data = formOneSchema.parse(req.body);

      const emailResult = await sendFormEmail({
        formType: 'form-one',
        subject: "New Form One Submission",
        data: data,
      });

      if (!emailResult) {
        console.error('Email sending failed');
        throw new Error("Failed to send email");
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Error processing form one:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid form data",
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "Failed to process form one" 
      });
    }
  });

  app.post("/api/form-two", async (req, res) => {
    try {
      console.log('Received form two data:', req.body);
      const data = formTwoSchema.parse(req.body);

      const emailResult = await sendFormEmail({
        formType: 'form-two',
        subject: "New Form Two Submission",
        data: data,
      });

      if (!emailResult) {
        console.error('Email sending failed');
        throw new Error("Failed to send email");
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Error processing form two:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid form data",
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "Failed to process form two" 
      });
    }
  });

  return createServer(app);
}