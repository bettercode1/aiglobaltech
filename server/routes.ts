import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertApplicationSchema, 
  updateApplicationSchema, 
  insertContentSchema, 
  updateContentSchema 
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  const isAuthenticated = setupAuth(app);
  
  // API routes
  const apiRouter = express.Router();
  
  // ============= APPLICATION ENDPOINTS =============
  
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
  apiRouter.get("/applications", isAuthenticated, async (req, res) => {
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
  
  // Get a specific application by ID
  apiRouter.get("/applications/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid application ID"
        });
      }
      
      const application = await storage.getApplicationById(id);
      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Application not found"
        });
      }
      
      res.json({
        success: true,
        data: application
      });
    } catch (error) {
      console.error("Error fetching application:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch application. Please try again later."
      });
    }
  });
  
  // Update application status and notes
  apiRouter.patch("/applications/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid application ID"
        });
      }
      
      const updateData = updateApplicationSchema.parse(req.body);
      const updatedApplication = await storage.updateApplicationStatus(id, updateData);
      
      if (!updatedApplication) {
        return res.status(404).json({
          success: false,
          message: "Application not found"
        });
      }
      
      res.json({
        success: true,
        message: "Application updated successfully",
        data: updatedApplication
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
        console.error("Error updating application:", error);
        res.status(500).json({
          success: false,
          message: "Failed to update application. Please try again later."
        });
      }
    }
  });
  
  // ============= CONTENT MANAGEMENT ENDPOINTS =============
  
  // Get all content sections
  apiRouter.get("/content", isAuthenticated, async (req, res) => {
    try {
      const allContent = await storage.getAllContent();
      res.json({
        success: true,
        data: allContent
      });
    } catch (error) {
      console.error("Error fetching content:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch content. Please try again later."
      });
    }
  });
  
  // Get content for a specific section
  apiRouter.get("/content/:section", async (req, res) => {
    try {
      const section = req.params.section;
      const contentItem = await storage.getContent(section);
      
      if (!contentItem) {
        return res.status(404).json({
          success: false,
          message: "Content section not found"
        });
      }
      
      res.json({
        success: true,
        data: contentItem
      });
    } catch (error) {
      console.error("Error fetching content section:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch content section. Please try again later."
      });
    }
  });
  
  // Create new content section
  apiRouter.post("/content", isAuthenticated, async (req, res) => {
    try {
      const contentData = insertContentSchema.parse(req.body);
      
      // Check if section already exists
      const existingContent = await storage.getContent(contentData.section);
      if (existingContent) {
        return res.status(400).json({
          success: false,
          message: "Content section already exists"
        });
      }
      
      const newContent = await storage.createContent(contentData);
      
      res.status(201).json({
        success: true,
        message: "Content section created successfully",
        data: newContent
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
        console.error("Error creating content section:", error);
        res.status(500).json({
          success: false,
          message: "Failed to create content section. Please try again later."
        });
      }
    }
  });
  
  // Update existing content section
  apiRouter.put("/content/:section", isAuthenticated, async (req, res) => {
    try {
      const section = req.params.section;
      const updateData = updateContentSchema.parse(req.body);
      
      const existingContent = await storage.getContent(section);
      if (!existingContent) {
        return res.status(404).json({
          success: false,
          message: "Content section not found"
        });
      }
      
      const updatedContent = await storage.updateContent(section, updateData);
      
      res.json({
        success: true,
        message: "Content section updated successfully",
        data: updatedContent
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
        console.error("Error updating content section:", error);
        res.status(500).json({
          success: false,
          message: "Failed to update content section. Please try again later."
        });
      }
    }
  });

  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
