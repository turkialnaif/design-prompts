CREATE TABLE "prospect_contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"prospect_id" uuid NOT NULL,
	"full_name" text,
	"title" text,
	"email" text,
	"phone" text,
	"linkedin_url" text,
	"basis" text DEFAULT 'manual' NOT NULL,
	"channel" text DEFAULT 'named' NOT NULL,
	"email_on" boolean DEFAULT true NOT NULL,
	"email_step" integer DEFAULT 0 NOT NULL,
	"last_email_at" timestamp with time zone,
	"replied" boolean DEFAULT false NOT NULL,
	"bounced" boolean DEFAULT false NOT NULL,
	"unsubscribed" boolean DEFAULT false NOT NULL,
	"linkedin" text DEFAULT 'none' NOT NULL,
	"linkedin_note" text,
	"linkedin_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "prospect_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"prospect_id" uuid NOT NULL,
	"contact_id" uuid,
	"kind" text NOT NULL,
	"body" text,
	"actor_name" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prospects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"list" text DEFAULT 'khobar-dammam' NOT NULL,
	"rank" integer,
	"name" text NOT NULL,
	"name_key" text NOT NULL,
	"priority" boolean DEFAULT false NOT NULL,
	"website" text,
	"sector" text,
	"phone" text,
	"tier" integer,
	"size_note" text,
	"source_url" text,
	"status" text DEFAULT 'new' NOT NULL,
	"owner_id" uuid,
	"notes" text,
	"last_activity_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "prospect_contacts" ADD CONSTRAINT "prospect_contacts_prospect_id_prospects_id_fk" FOREIGN KEY ("prospect_id") REFERENCES "public"."prospects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prospect_events" ADD CONSTRAINT "prospect_events_prospect_id_prospects_id_fk" FOREIGN KEY ("prospect_id") REFERENCES "public"."prospects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prospect_events" ADD CONSTRAINT "prospect_events_contact_id_prospect_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."prospect_contacts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "prospects" ADD CONSTRAINT "prospects_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "prospect_contacts_prospect_idx" ON "prospect_contacts" USING btree ("prospect_id");--> statement-breakpoint
CREATE INDEX "prospect_contacts_email_idx" ON "prospect_contacts" USING btree ("email");--> statement-breakpoint
CREATE INDEX "prospect_events_prospect_idx" ON "prospect_events" USING btree ("prospect_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "prospects_list_name_uq" ON "prospects" USING btree ("list","name_key");--> statement-breakpoint
CREATE INDEX "prospects_status_idx" ON "prospects" USING btree ("status");