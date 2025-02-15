import type { Express } from "express";
import { createServer } from "http";
import { emailService } from "./email-service";

export async function registerRoutes(app: Express) {
  app.post("/api/form-one", async (req, res) => {
    try {
      console.log('Received form one data:', req.body);
      const result = await emailService.sendFormOneEmail(req.body);
      res.json({ success: true, messageId: result.messageId });
    } catch (error) {
      console.error('Error processing form one:', error);
      res.status(500).json({ success: false, message: "Failed to process form one" });
    }
  });

  app.post("/api/form-two", async (req, res) => {
    try {
      console.log('Received form two data:', req.body);
      const result = await emailService.sendFormTwoEmail(req.body);
      res.json({ success: true, messageId: result.messageId });
    } catch (error) {
      console.error('Error processing form two:', error);
      res.status(500).json({ success: false, message: "Failed to process form two" });
    }
  });

  return createServer(app);
}