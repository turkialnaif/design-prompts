CREATE TABLE "lead_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" uuid NOT NULL,
	"kind" text NOT NULL,
	"body" text,
	"meta" jsonb,
	"actor_name" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"org" text,
	"email" text NOT NULL,
	"phone" text,
	"locale" text DEFAULT 'ar' NOT NULL,
	"source" text DEFAULT 'brief' NOT NULL,
	"matter_type" text,
	"description" text,
	"score" integer DEFAULT 0 NOT NULL,
	"tier" text DEFAULT 'cold' NOT NULL,
	"score_reasons" jsonb,
	"stage" text DEFAULT 'new' NOT NULL,
	"owner_id" uuid,
	"estimated_value" numeric(16, 2),
	"lost_reason" text,
	"first_contact_at" timestamp with time zone,
	"last_contact_at" timestamp with time zone,
	"utm" jsonb,
	"landing_path" text,
	"referrer" text,
	"ack_sent_at" timestamp with time zone,
	"followup_step" integer DEFAULT 0 NOT NULL,
	"last_followup_at" timestamp with time zone,
	"unsubscribed" boolean DEFAULT false NOT NULL,
	"ai_summary" text,
	"conflict_note" text,
	"client_id" uuid,
	"matter_id" uuid
);
--> statement-breakpoint
CREATE TABLE "proposals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lead_id" uuid NOT NULL,
	"token" text NOT NULL,
	"title" text NOT NULL,
	"intro" text,
	"scope" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"fee_kind" text DEFAULT 'fixed' NOT NULL,
	"fee_amount" numeric(16, 2),
	"fee_note" text,
	"valid_until" date,
	"status" text DEFAULT 'draft' NOT NULL,
	"sent_at" timestamp with time zone,
	"viewed_at" timestamp with time zone,
	"decided_at" timestamp with time zone,
	"accept_name" text,
	"accept_ip" text,
	"accept_user_agent" text,
	"content_hash" text,
	"created_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "suppressions" (
	"email" text PRIMARY KEY NOT NULL,
	"reason" text DEFAULT 'unsubscribe' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lead_events" ADD CONSTRAINT "lead_events_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_matter_id_matters_id_fk" FOREIGN KEY ("matter_id") REFERENCES "public"."matters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "lead_events_lead_idx" ON "lead_events" USING btree ("lead_id","created_at");--> statement-breakpoint
CREATE INDEX "leads_stage_idx" ON "leads" USING btree ("stage");--> statement-breakpoint
CREATE INDEX "leads_created_idx" ON "leads" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "leads_email_idx" ON "leads" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "proposals_token_uq" ON "proposals" USING btree ("token");--> statement-breakpoint
CREATE INDEX "proposals_lead_idx" ON "proposals" USING btree ("lead_id");