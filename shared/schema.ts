import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  education: text("education").notNull(),
  course: text("course").default("ai-genai"),
  mode: text("mode").notNull(),
  experience: text("experience").notNull(),
  motivation: text("motivation").notNull(),
  country: text("country").default("US").notNull(),
  state: text("state"),
  city: text("city"),
  referral: text("referral"),
  createdAt: text("created_at").notNull(),
  status: text("status").default("pending").notNull(),
  notes: text("notes")
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
  status: true,
  notes: true
});

export const updateApplicationSchema = createInsertSchema(applications).pick({
  status: true,
  notes: true
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;

export type UpdateApplication = z.infer<typeof updateApplicationSchema>;
