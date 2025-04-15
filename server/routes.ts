import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertApplicationSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = express.Router();
  
  // Application submission endpoint
  apiRouter.post("/applications", async (req, res) => {
    try {
      const applicationData = insertApplicationSchema.parse(req.body);
      const newApplication = await storage.createApplication(applicationData);
      
      res.status(201).json({
        success: true,
        message: "Application submitted successfully",
        data: newApplication
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validationError.message
        });
      } else {
        console.error("Error creating application:", error);
        res.status(500).json({
          success: false,
          message: "Failed to submit application. Please try again later."
        });
      }
    }
  });

  // Get all applications (for admin purposes)
  apiRouter.get("/applications", async (req, res) => {
    try {
      const applications = await storage.getApplications();
      res.json({
        success: true,
        data: applications
      });
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch applications. Please try again later."
      });
    }
  });

  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
