CREATE TABLE IF NOT EXISTS "contact_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"email_address" text NOT NULL,
	"subject" text NOT NULL,
	"phone_number" text,
	"message" text NOT NULL,
	"consent_given" boolean DEFAULT false,
	"status" text DEFAULT 'new',
	"admin_notes" text,
	"responded_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
