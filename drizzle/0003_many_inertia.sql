ALTER TABLE "events" ADD COLUMN "source" text DEFAULT 'site' NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "external_uid" text;--> statement-breakpoint
CREATE UNIQUE INDEX "events_external_uq" ON "events" USING btree ("external_uid");