CREATE TABLE IF NOT EXISTS "membership_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"duration" integer NOT NULL,
	"benefits" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "news" RENAME COLUMN "image_url" TO "featured_image";--> statement-breakpoint
ALTER TABLE "volunteers" RENAME COLUMN "phone_number" TO "telephone_number";--> statement-breakpoint
ALTER TABLE "volunteers" RENAME COLUMN "volunteer_areas" TO "interests";--> statement-breakpoint
ALTER TABLE "donations" ADD COLUMN "currency" text DEFAULT 'CAD';--> statement-breakpoint
ALTER TABLE "donations" ADD COLUMN "message" text;--> statement-breakpoint
ALTER TABLE "donations" ADD COLUMN "is_anonymous" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "donations" ADD COLUMN "payment_method" text DEFAULT 'card';--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "category" text;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "tags" text;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "published_at" timestamp;--> statement-breakpoint
ALTER TABLE "store_orders" ADD COLUMN "payment_status" text DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "volunteers" DROP COLUMN IF EXISTS "address";--> statement-breakpoint
ALTER TABLE "volunteers" DROP COLUMN IF EXISTS "motivation";--> statement-breakpoint
ALTER TABLE "volunteers" DROP COLUMN IF EXISTS "skills";--> statement-breakpoint
ALTER TABLE "volunteers" DROP COLUMN IF EXISTS "is_member";--> statement-breakpoint
ALTER TABLE "volunteers" DROP COLUMN IF EXISTS "membership_id";--> statement-breakpoint
ALTER TABLE "volunteers" DROP COLUMN IF EXISTS "notes";