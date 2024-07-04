ALTER TABLE "codes" ADD COLUMN "discipline" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "codes" ADD COLUMN "matricula" uuid DEFAULT gen_random_uuid() NOT NULL;