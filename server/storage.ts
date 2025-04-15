import {
  users, type User, type InsertUser,
  applications, type Application, type InsertApplication, type UpdateApplication,
  content, type Content, type InsertContent, type UpdateContent
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createApplication(application: InsertApplication): Promise<Application>;
  getApplications(): Promise<Application[]>;
  getApplicationById(id: number): Promise<Application | undefined>;
  updateApplicationStatus(id: number, updateData: UpdateApplication): Promise<Application | undefined>;
  
  getContent(section: string): Promise<Content | undefined>;
  getAllContent(): Promise<Content[]>;
  createContent(content: InsertContent): Promise<Content>;
  updateContent(section: string, updates: UpdateContent): Promise<Content | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const [application] = await db
      .insert(applications)
      .values({
        ...insertApplication,
        createdAt: new Date().toISOString(),
        status: "pending"
      })
      .returning();
    return application;
  }

  async getApplications(): Promise<Application[]> {
    return await db
      .select()
      .from(applications)
      .orderBy(desc(applications.createdAt));
  }
  
  async getApplicationById(id: number): Promise<Application | undefined> {
    const [application] = await db
      .select()
      .from(applications)
      .where(eq(applications.id, id));
    return application || undefined;
  }
  
  async updateApplicationStatus(id: number, updateData: UpdateApplication): Promise<Application | undefined> {
    const [updatedApplication] = await db
      .update(applications)
      .set(updateData)
      .where(eq(applications.id, id))
      .returning();
    return updatedApplication;
  }
  
  async getContent(section: string): Promise<Content | undefined> {
    const [contentItem] = await db
      .select()
      .from(content)
      .where(eq(content.section, section));
    return contentItem || undefined;
  }
  
  async getAllContent(): Promise<Content[]> {
    return await db
      .select()
      .from(content);
  }
  
  async createContent(contentData: InsertContent): Promise<Content> {
    const [newContent] = await db
      .insert(content)
      .values({
        ...contentData,
        updated_at: new Date().toISOString()
      })
      .returning();
    return newContent;
  }
  
  async updateContent(section: string, updates: UpdateContent): Promise<Content | undefined> {
    const [updatedContent] = await db
      .update(content)
      .set({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .where(eq(content.section, section))
      .returning();
    return updatedContent;
  }
}

export const storage = new DatabaseStorage();
