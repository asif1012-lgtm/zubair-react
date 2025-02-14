import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertContactFormSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express) {
  app.post("/api/contact-form", async (req, res) => {
    try {
      const data = insertContactFormSchema.parse(req.body);
      const result = await storage.createContactForm(data);
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid form data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return createServer(app);
}
