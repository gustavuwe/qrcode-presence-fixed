CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT "user_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "portugues" ALTER COLUMN "presencaDiaria" SET DATA TYPE boolean;--> statement-breakpoint
ALTER TABLE "portugues" ALTER COLUMN "presencaDiaria" SET DEFAULT false;