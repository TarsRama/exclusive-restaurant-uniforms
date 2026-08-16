import { boolean, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const siteContent = pgTable("site_content", {
  id: uuid("id").defaultRandom().primaryKey(), key: text("key").notNull().unique(), value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
export const designs = pgTable("designs", {
  id: uuid("id").defaultRandom().primaryKey(), name: text("name").notNull(), slug: text("slug").notNull().unique(), category: text("category").notNull(),
  description: text("description").notNull().default(""), imageUrl: text("image_url").notNull().default(""), status: text("status").notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0), featured: boolean("featured").notNull().default(false), createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(), updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
export const enquiries = pgTable("enquiries", {
  id: uuid("id").defaultRandom().primaryKey(), name: text("name").notNull(), email: text("email").notNull(), company: text("company").notNull().default(""), phone: text("phone").notNull().default(""),
  message: text("message").notNull().default(""), status: text("status").notNull().default("new"), notes: text("notes").notNull().default(""), createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(), updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
export const media = pgTable("media", {
  id: uuid("id").defaultRandom().primaryKey(), filename: text("filename").notNull(), url: text("url").notNull(), alt: text("alt").notNull().default(""), mimeType: text("mime_type").notNull().default("image/jpeg"), size: integer("size").notNull().default(0), createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
