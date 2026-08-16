CREATE TABLE IF NOT EXISTS "pages" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "title" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "nav_label" text DEFAULT '' NOT NULL,
  "nav_order" integer DEFAULT 0 NOT NULL,
  "show_in_nav" boolean DEFAULT true NOT NULL,
  "published" boolean DEFAULT false NOT NULL,
  "meta_title" text DEFAULT '' NOT NULL,
  "meta_description" text DEFAULT '' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE IF NOT EXISTS "sections" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "page_id" uuid NOT NULL REFERENCES "pages"("id") ON DELETE CASCADE,
  "type" text NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "visible" boolean DEFAULT true NOT NULL,
  "content" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "sections_page_order_idx" ON "sections" ("page_id", "sort_order");
