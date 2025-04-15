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
  mode: text("mode").notNull(),
  experience: text("experience").notNull(),
  motivation: text("motivation").notNull(),
  referral: text("referral"),
  createdAt: text("created_at").notNull(),
  status: text("status").default("pending").notNull(),
  notes: text("notes")
});

export const content = pgTable("content", {
  id: serial("id").primaryKey(),
  section: text("section").notNull().unique(),
  title: text("title"),
  subtitle: text("subtitle"),
  description: text("description"),
  content: jsonb("content"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  updatedBy: integer("updated_by").references(() => users.id)
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

export const insertContentSchema = createInsertSchema(content).omit({
  id: true,
  updatedAt: true,
});

export const updateContentSchema = createInsertSchema(content).omit({
  id: true,
  updatedAt: true,
});

export const updateApplicationSchema = createInsertSchema(applications).pick({
  status: true,
  notes: true
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;

export type InsertContent = z.infer<typeof insertContentSchema>;
export type UpdateContent = z.infer<typeof updateContentSchema>;
export type Content = typeof content.$inferSelect;

export type UpdateApplication = z.infer<typeof updateApplicationSchema>;
