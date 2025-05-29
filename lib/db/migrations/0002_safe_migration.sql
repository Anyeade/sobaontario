-- Create membership_types table
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

-- Add missing columns to donations table
ALTER TABLE "donations" ADD COLUMN "currency" text DEFAULT 'CAD';
ALTER TABLE "donations" ADD COLUMN "message" text;
ALTER TABLE "donations" ADD COLUMN "is_anonymous" boolean DEFAULT false;
ALTER TABLE "donations" ADD COLUMN "payment_method" text DEFAULT 'card';

-- Add missing columns to news table
ALTER TABLE "news" ADD COLUMN "category" text;
ALTER TABLE "news" ADD COLUMN "tags" text;
ALTER TABLE "news" ADD COLUMN "featured_image" text;
ALTER TABLE "news" ADD COLUMN "published_at" timestamp;

-- Add missing column to store_orders table
ALTER TABLE "store_orders" ADD COLUMN "payment_status" text DEFAULT 'pending';

-- Safely migrate volunteers table data
-- Step 1: Add new columns (nullable first)
ALTER TABLE "volunteers" ADD COLUMN "telephone_number" text;
ALTER TABLE "volunteers" ADD COLUMN "interests" text;

-- Step 2: Migrate data from old columns to new columns
UPDATE "volunteers" SET 
    "telephone_number" = "phone_number",
    "interests" = COALESCE("volunteer_areas", 'General volunteering');

-- Step 3: Make interests NOT NULL after data migration
ALTER TABLE "volunteers" ALTER COLUMN "interests" SET NOT NULL;

-- Step 4: Drop old/unused columns
ALTER TABLE "news" DROP COLUMN IF EXISTS "image_url";
ALTER TABLE "volunteers" DROP COLUMN IF EXISTS "phone_number";
ALTER TABLE "volunteers" DROP COLUMN IF EXISTS "address";
ALTER TABLE "volunteers" DROP COLUMN IF EXISTS "volunteer_areas";
ALTER TABLE "volunteers" DROP COLUMN IF EXISTS "motivation";
ALTER TABLE "volunteers" DROP COLUMN IF EXISTS "skills";
ALTER TABLE "volunteers" DROP COLUMN IF EXISTS "is_member";
ALTER TABLE "volunteers" DROP COLUMN IF EXISTS "membership_id";
ALTER TABLE "volunteers" DROP COLUMN IF EXISTS "notes"; 