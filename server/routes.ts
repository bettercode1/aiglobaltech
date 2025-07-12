import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertApplicationSchema, 
  updateApplicationSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { setupAuth } from "./auth";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  // ============= BROCHURE DOWNLOAD ENDPOINT =============
  
  // Secure brochure download endpoint
  apiRouter.post("/download-brochure", async (req, res) => {
    try {
      const { courseName } = req.body;
      
      // You can add authentication/authorization here
      // For example: if (!req.user) return res.status(401).json({ error: "Unauthorized" });
      
      // Rate limiting (optional)
      // You can implement rate limiting here to prevent abuse
      
      // Determine which brochure to serve based on course name
      let brochurePath;
      if (courseName) {
        // Course-specific brochure
        const courseFileName = courseName.replace(/\s+/g, '-').toLowerCase();
        brochurePath = path.join(__dirname, '..', 'client', 'src', 'assets', 'brochure', `${courseFileName}-brochure.pdf`);
      } else {
        // General brochure
        brochurePath = path.join(__dirname, '..', 'client', 'src', 'assets', 'brochure', 'general-brochure.pdf');
      }
      
      // Check if file exists
      if (!fs.existsSync(brochurePath)) {
        // Fallback to general brochure
        brochurePath = path.join(__dirname, '..', 'client', 'src', 'assets', 'brochure', 'general-brochure.pdf');
        
        if (!fs.existsSync(brochurePath)) {
          return res.status(404).json({
            success: false,
            message: "Brochure not found"
          });
        }
      }
      
      // Set headers for file download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${path.basename(brochurePath)}"`);
      
      // Stream the file
      const fileStream = fs.createReadStream(brochurePath);
      fileStream.pipe(res);
      
    } catch (error) {
      console.error("Error downloading brochure:", error);
      res.status(500).json({
        success: false,
        message: "Failed to download brochure. Please try again later."
      });
    }
  });

  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
