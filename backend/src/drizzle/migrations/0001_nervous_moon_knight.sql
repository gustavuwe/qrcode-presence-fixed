ALTER TABLE "portugues" ALTER COLUMN "matricula" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "portugues" ADD CONSTRAINT "portugues_matricula_unique" UNIQUE("matricula");