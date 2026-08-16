CREATE TABLE "designs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"category" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"image_url" text DEFAULT '' NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "designs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "enquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"company" text DEFAULT '' NOT NULL,
	"phone" text DEFAULT '' NOT NULL,
	"message" text DEFAULT '' NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"filename" text NOT NULL,
	"url" text NOT NULL,
	"alt" text DEFAULT '' NOT NULL,
	"mime_type" text DEFAULT 'image/jpeg' NOT NULL,
	"size" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_content" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"value" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "site_content_key_unique" UNIQUE("key")
);
