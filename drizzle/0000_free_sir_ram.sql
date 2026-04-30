CREATE TABLE "opportunity_identity_draft_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"opportunity_listing_draft_id" uuid NOT NULL,
	"identity_type" varchar(50) NOT NULL,
	"front_image_url" varchar(1000),
	"back_image_url" varchar(1000),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "opportunity_listing_draft_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"opportunity_listing_draft_id" uuid NOT NULL,
	"document_type" varchar(100) NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"file_url" varchar(1000) NOT NULL,
	"mime_type" varchar(100),
	"file_size_bytes" bigint,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "opportunity_listing_draft_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"opportunity_listing_draft_id" uuid NOT NULL,
	"image_url" varchar(1000) NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"is_thumbnail" boolean DEFAULT false NOT NULL,
	"is_cover" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_listing_draft_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_listing_draft_id" uuid NOT NULL,
	"document_type" varchar(100),
	"file_name" varchar(255) NOT NULL,
	"file_url" varchar(1000) NOT NULL,
	"mime_type" varchar(100),
	"file_size_bytes" bigint,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_listing_draft_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_listing_draft_id" uuid NOT NULL,
	"image_url" varchar(1000) NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"is_thumbnail" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "opportunity_listing_drafts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_upload_id" uuid,
	"ai_output_id" uuid,
	"provider_draft_id" uuid,
	"matched_opportunity_listing_id" uuid,
	"draft_status" varchar(50) DEFAULT 'pending_review' NOT NULL,
	"review_status" varchar(50) DEFAULT 'not_reviewed' NOT NULL,
	"title" varchar(255) NOT NULL,
	"category" varchar(100),
	"short_summary" text,
	"full_description" text,
	"province" varchar(100),
	"district" varchar(100),
	"city" varchar(100),
	"postal_code" varchar(20),
	"project_start_date" date,
	"expected_completion_date" date,
	"cover_image_url" varchar(1000),
	"investment_type" varchar(50),
	"expected_roi_text" varchar(100),
	"funding_goal" numeric(14, 2),
	"funding_goal_currency" varchar(10) DEFAULT 'LKR' NOT NULL,
	"minimum_raise_amount" numeric(14, 2),
	"minimum_raise_currency" varchar(10) DEFAULT 'LKR' NOT NULL,
	"minimum_investment" numeric(14, 2),
	"minimum_investment_currency" varchar(10) DEFAULT 'LKR' NOT NULL,
	"maximum_investment" numeric(14, 2),
	"maximum_investment_currency" varchar(10) DEFAULT 'LKR' NOT NULL,
	"deal_duration_value" integer,
	"deal_duration_unit" varchar(20),
	"funding_deadline" date,
	"investor_benefits_text" text,
	"risk_level" varchar(50),
	"risk_investors_may_lose_capital" boolean DEFAULT false NOT NULL,
	"risk_returns_not_guaranteed" boolean DEFAULT false NOT NULL,
	"risk_timeline_may_change" boolean DEFAULT false NOT NULL,
	"compliance_info_accurate" boolean DEFAULT false NOT NULL,
	"compliance_platform_policies" boolean DEFAULT false NOT NULL,
	"confidence_score" numeric(5, 2),
	"review_notes" text,
	"created_by" uuid,
	"updated_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "provider_drafts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_upload_id" uuid,
	"ai_output_id" uuid,
	"matched_provider_id" uuid,
	"draft_status" varchar(50) DEFAULT 'pending_review' NOT NULL,
	"review_status" varchar(50) DEFAULT 'not_reviewed' NOT NULL,
	"is_placeholder" boolean DEFAULT false NOT NULL,
	"business_name" varchar(255) NOT NULL,
	"display_name" varchar(255),
	"provider_type" varchar(50) NOT NULL,
	"description" text,
	"short_description" varchar(500),
	"primary_phone" varchar(30),
	"whatsapp_number" varchar(30),
	"email" varchar(255),
	"website_url" varchar(1000),
	"facebook_url" varchar(1000),
	"instagram_url" varchar(1000),
	"tiktok_url" varchar(1000),
	"linkedin_url" varchar(1000),
	"address_line_1" varchar(255),
	"address_line_2" varchar(255),
	"city" varchar(100),
	"district" varchar(100),
	"province" varchar(100),
	"postal_code" varchar(20),
	"country" varchar(100) DEFAULT 'Sri Lanka',
	"latitude" numeric(10, 7),
	"longitude" numeric(10, 7),
	"logo_url" varchar(1000),
	"cover_image_url" varchar(1000),
	"confidence_score" numeric(5, 2),
	"review_notes" text,
	"created_by" uuid,
	"updated_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_listing_drafts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_upload_id" uuid,
	"ai_output_id" uuid,
	"provider_draft_id" uuid,
	"matched_service_listing_id" uuid,
	"draft_status" varchar(50) DEFAULT 'pending_review' NOT NULL,
	"review_status" varchar(50) DEFAULT 'not_reviewed' NOT NULL,
	"title" varchar(255) NOT NULL,
	"category" varchar(100),
	"location_text" varchar(255),
	"tags_json" jsonb,
	"description" text,
	"per_work_rate" numeric(12, 2),
	"currency" varchar(10) DEFAULT 'LKR' NOT NULL,
	"availability" varchar(100),
	"warranty_type" varchar(100),
	"experience_text" text,
	"thumbnail_image_url" varchar(1000),
	"confidence_score" numeric(5, 2),
	"review_notes" text,
	"created_by" uuid,
	"updated_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_user_id" uuid,
	"entity_type" varchar(50) NOT NULL,
	"entity_id" uuid,
	"action" varchar(100) NOT NULL,
	"metadata_json" jsonb,
	"ip_address" varchar(100),
	"user_agent" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "provider_account_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"link_source" varchar(50) NOT NULL,
	"linked_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "provider_claim_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"status" varchar(50) DEFAULT 'active' NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used_at" timestamp with time zone,
	"generated_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "review_actions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entity_type" varchar(50) NOT NULL,
	"entity_id" uuid NOT NULL,
	"action" varchar(50) NOT NULL,
	"old_status" varchar(50),
	"new_status" varchar(50),
	"reviewed_by" uuid NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"role" varchar(50) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"auth_user_id" uuid,
	"email" varchar(255),
	"phone" varchar(30),
	"full_name" varchar(255) NOT NULL,
	"avatar_url" varchar(1000),
	"status" varchar(50) DEFAULT 'active' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_login_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "providers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_user_id" uuid,
	"slug" varchar(255) NOT NULL,
	"provider_type" varchar(50) NOT NULL,
	"status" varchar(50) DEFAULT 'draft' NOT NULL,
	"claim_status" varchar(50) DEFAULT 'unclaimed' NOT NULL,
	"is_placeholder" boolean DEFAULT false NOT NULL,
	"business_name" varchar(255) NOT NULL,
	"display_name" varchar(255),
	"description" varchar(5000),
	"short_description" varchar(500),
	"primary_phone" varchar(30),
	"whatsapp_number" varchar(30),
	"email" varchar(255),
	"website_url" varchar(1000),
	"facebook_url" varchar(1000),
	"instagram_url" varchar(1000),
	"tiktok_url" varchar(1000),
	"linkedin_url" varchar(1000),
	"address_line_1" varchar(255),
	"address_line_2" varchar(255),
	"city" varchar(100),
	"district" varchar(100),
	"province" varchar(100),
	"postal_code" varchar(20),
	"country" varchar(100) DEFAULT 'Sri Lanka',
	"latitude" numeric(10, 7),
	"longitude" numeric(10, 7),
	"logo_url" varchar(1000),
	"cover_image_url" varchar(1000),
	"is_verified" boolean DEFAULT false NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_listing_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_listing_id" uuid NOT NULL,
	"document_type" varchar(100),
	"file_name" varchar(255) NOT NULL,
	"file_url" varchar(1000) NOT NULL,
	"mime_type" varchar(100),
	"file_size_bytes" bigint,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_listing_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_listing_id" uuid NOT NULL,
	"image_url" varchar(1000) NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"is_thumbnail" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_listings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" uuid NOT NULL,
	"slug" varchar(255) NOT NULL,
	"status" varchar(50) DEFAULT 'draft' NOT NULL,
	"title" varchar(255) NOT NULL,
	"category" varchar(100),
	"location_text" varchar(255),
	"tags_json" jsonb,
	"description" varchar(5000),
	"per_work_rate" numeric(12, 2),
	"currency" varchar(10) DEFAULT 'LKR' NOT NULL,
	"availability" varchar(100),
	"warranty_type" varchar(100),
	"experience_text" varchar(3000),
	"thumbnail_image_url" varchar(1000),
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "opportunity_identity_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"opportunity_listing_id" uuid NOT NULL,
	"identity_type" varchar(50) NOT NULL,
	"front_image_url" varchar(1000),
	"back_image_url" varchar(1000),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "opportunity_listing_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"opportunity_listing_id" uuid NOT NULL,
	"document_type" varchar(100) NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"file_url" varchar(1000) NOT NULL,
	"mime_type" varchar(100),
	"file_size_bytes" bigint,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "opportunity_listing_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"opportunity_listing_id" uuid NOT NULL,
	"image_url" varchar(1000) NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"is_thumbnail" boolean DEFAULT false NOT NULL,
	"is_cover" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "opportunity_listings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" uuid NOT NULL,
	"slug" varchar(255) NOT NULL,
	"status" varchar(50) DEFAULT 'draft' NOT NULL,
	"title" varchar(255) NOT NULL,
	"category" varchar(100),
	"short_summary" varchar(1000),
	"full_description" varchar(8000),
	"province" varchar(100),
	"district" varchar(100),
	"city" varchar(100),
	"postal_code" varchar(20),
	"project_start_date" date,
	"expected_completion_date" date,
	"cover_image_url" varchar(1000),
	"investment_type" varchar(50),
	"expected_roi_text" varchar(100),
	"funding_goal" numeric(14, 2),
	"funding_goal_currency" varchar(10) DEFAULT 'LKR' NOT NULL,
	"minimum_raise_amount" numeric(14, 2),
	"minimum_raise_currency" varchar(10) DEFAULT 'LKR' NOT NULL,
	"minimum_investment" numeric(14, 2),
	"minimum_investment_currency" varchar(10) DEFAULT 'LKR' NOT NULL,
	"maximum_investment" numeric(14, 2),
	"maximum_investment_currency" varchar(10) DEFAULT 'LKR' NOT NULL,
	"deal_duration_value" integer,
	"deal_duration_unit" varchar(20),
	"funding_deadline" date,
	"investor_benefits_text" varchar(5000),
	"risk_level" varchar(50),
	"risk_investors_may_lose_capital" boolean DEFAULT false NOT NULL,
	"risk_returns_not_guaranteed" boolean DEFAULT false NOT NULL,
	"risk_timeline_may_change" boolean DEFAULT false NOT NULL,
	"compliance_info_accurate" boolean DEFAULT false NOT NULL,
	"compliance_platform_policies" boolean DEFAULT false NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_upload_id" uuid NOT NULL,
	"ocr_result_id" uuid NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"request_payload_json" jsonb,
	"response_payload_json" jsonb,
	"error_message" text,
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_outputs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ai_job_id" uuid NOT NULL,
	"source_upload_id" uuid NOT NULL,
	"provider_data_json" jsonb,
	"services_data_json" jsonb,
	"opportunities_data_json" jsonb,
	"confidence_score" numeric(5, 2),
	"warnings_json" jsonb,
	"missing_fields_json" jsonb,
	"raw_output_json" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ocr_results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_upload_id" uuid NOT NULL,
	"ocr_provider" varchar(100) NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"raw_text" text,
	"cleaned_text" text,
	"text_hash" text,
	"confidence_score" numeric(5, 2),
	"error_message" text,
	"raw_response_json" jsonb,
	"processed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "source_uploads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"drive_file_id" text NOT NULL,
	"drive_folder_id" text,
	"file_name" varchar(255) NOT NULL,
	"mime_type" varchar(100),
	"file_size_bytes" bigint,
	"checksum_md5" text,
	"checksum_sha256" text,
	"image_hash" text,
	"source_platform" varchar(100),
	"uploaded_by_employee" varchar(255),
	"uploaded_at_drive" timestamp with time zone,
	"imported_at" timestamp with time zone DEFAULT now() NOT NULL,
	"status" varchar(50) DEFAULT 'uploaded' NOT NULL,
	"duplicate_status" varchar(50) DEFAULT 'not_checked' NOT NULL,
	"original_upload_id" uuid,
	"ocr_status" varchar(50) DEFAULT 'pending' NOT NULL,
	"ai_status" varchar(50) DEFAULT 'pending' NOT NULL,
	"error_message" text,
	"raw_metadata_json" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "upload_duplicate_matches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_upload_id" uuid NOT NULL,
	"matched_upload_id" uuid NOT NULL,
	"match_type" varchar(50) NOT NULL,
	"match_score" numeric(5, 2),
	"decision" varchar(50) NOT NULL,
	"reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "opportunity_identity_draft_documents" ADD CONSTRAINT "opportunity_identity_draft_documents_opportunity_listing_draft_id_opportunity_listing_drafts_id_fk" FOREIGN KEY ("opportunity_listing_draft_id") REFERENCES "public"."opportunity_listing_drafts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "opportunity_listing_draft_documents" ADD CONSTRAINT "opportunity_listing_draft_documents_opportunity_listing_draft_id_opportunity_listing_drafts_id_fk" FOREIGN KEY ("opportunity_listing_draft_id") REFERENCES "public"."opportunity_listing_drafts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "opportunity_listing_draft_images" ADD CONSTRAINT "opportunity_listing_draft_images_opportunity_listing_draft_id_opportunity_listing_drafts_id_fk" FOREIGN KEY ("opportunity_listing_draft_id") REFERENCES "public"."opportunity_listing_drafts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_listing_draft_documents" ADD CONSTRAINT "service_listing_draft_documents_service_listing_draft_id_service_listing_drafts_id_fk" FOREIGN KEY ("service_listing_draft_id") REFERENCES "public"."service_listing_drafts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_listing_draft_images" ADD CONSTRAINT "service_listing_draft_images_service_listing_draft_id_service_listing_drafts_id_fk" FOREIGN KEY ("service_listing_draft_id") REFERENCES "public"."service_listing_drafts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "opportunity_listing_drafts" ADD CONSTRAINT "opportunity_listing_drafts_source_upload_id_source_uploads_id_fk" FOREIGN KEY ("source_upload_id") REFERENCES "public"."source_uploads"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "opportunity_listing_drafts" ADD CONSTRAINT "opportunity_listing_drafts_ai_output_id_ai_outputs_id_fk" FOREIGN KEY ("ai_output_id") REFERENCES "public"."ai_outputs"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "opportunity_listing_drafts" ADD CONSTRAINT "opportunity_listing_drafts_provider_draft_id_provider_drafts_id_fk" FOREIGN KEY ("provider_draft_id") REFERENCES "public"."provider_drafts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "opportunity_listing_drafts" ADD CONSTRAINT "opportunity_listing_drafts_matched_opportunity_listing_id_opportunity_listings_id_fk" FOREIGN KEY ("matched_opportunity_listing_id") REFERENCES "public"."opportunity_listings"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "opportunity_listing_drafts" ADD CONSTRAINT "opportunity_listing_drafts_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "opportunity_listing_drafts" ADD CONSTRAINT "opportunity_listing_drafts_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_drafts" ADD CONSTRAINT "provider_drafts_source_upload_id_source_uploads_id_fk" FOREIGN KEY ("source_upload_id") REFERENCES "public"."source_uploads"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_drafts" ADD CONSTRAINT "provider_drafts_ai_output_id_ai_outputs_id_fk" FOREIGN KEY ("ai_output_id") REFERENCES "public"."ai_outputs"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_drafts" ADD CONSTRAINT "provider_drafts_matched_provider_id_providers_id_fk" FOREIGN KEY ("matched_provider_id") REFERENCES "public"."providers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_drafts" ADD CONSTRAINT "provider_drafts_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_drafts" ADD CONSTRAINT "provider_drafts_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_listing_drafts" ADD CONSTRAINT "service_listing_drafts_source_upload_id_source_uploads_id_fk" FOREIGN KEY ("source_upload_id") REFERENCES "public"."source_uploads"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_listing_drafts" ADD CONSTRAINT "service_listing_drafts_ai_output_id_ai_outputs_id_fk" FOREIGN KEY ("ai_output_id") REFERENCES "public"."ai_outputs"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_listing_drafts" ADD CONSTRAINT "service_listing_drafts_provider_draft_id_provider_drafts_id_fk" FOREIGN KEY ("provider_draft_id") REFERENCES "public"."provider_drafts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_listing_drafts" ADD CONSTRAINT "service_listing_drafts_matched_service_listing_id_service_listings_id_fk" FOREIGN KEY ("matched_service_listing_id") REFERENCES "public"."service_listings"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_listing_drafts" ADD CONSTRAINT "service_listing_drafts_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_listing_drafts" ADD CONSTRAINT "service_listing_drafts_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_user_id_users_id_fk" FOREIGN KEY ("actor_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_account_links" ADD CONSTRAINT "provider_account_links_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_account_links" ADD CONSTRAINT "provider_account_links_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_account_links" ADD CONSTRAINT "provider_account_links_linked_by_users_id_fk" FOREIGN KEY ("linked_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_claim_tokens" ADD CONSTRAINT "provider_claim_tokens_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider_claim_tokens" ADD CONSTRAINT "provider_claim_tokens_generated_by_users_id_fk" FOREIGN KEY ("generated_by") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_actions" ADD CONSTRAINT "review_actions_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "providers" ADD CONSTRAINT "providers_owner_user_id_users_id_fk" FOREIGN KEY ("owner_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_listing_documents" ADD CONSTRAINT "service_listing_documents_service_listing_id_service_listings_id_fk" FOREIGN KEY ("service_listing_id") REFERENCES "public"."service_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_listing_images" ADD CONSTRAINT "service_listing_images_service_listing_id_service_listings_id_fk" FOREIGN KEY ("service_listing_id") REFERENCES "public"."service_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_listings" ADD CONSTRAINT "service_listings_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "opportunity_identity_documents" ADD CONSTRAINT "opportunity_identity_documents_opportunity_listing_id_opportunity_listings_id_fk" FOREIGN KEY ("opportunity_listing_id") REFERENCES "public"."opportunity_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "opportunity_listing_documents" ADD CONSTRAINT "opportunity_listing_documents_opportunity_listing_id_opportunity_listings_id_fk" FOREIGN KEY ("opportunity_listing_id") REFERENCES "public"."opportunity_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "opportunity_listing_images" ADD CONSTRAINT "opportunity_listing_images_opportunity_listing_id_opportunity_listings_id_fk" FOREIGN KEY ("opportunity_listing_id") REFERENCES "public"."opportunity_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "opportunity_listings" ADD CONSTRAINT "opportunity_listings_provider_id_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."providers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_jobs" ADD CONSTRAINT "ai_jobs_source_upload_id_source_uploads_id_fk" FOREIGN KEY ("source_upload_id") REFERENCES "public"."source_uploads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_jobs" ADD CONSTRAINT "ai_jobs_ocr_result_id_ocr_results_id_fk" FOREIGN KEY ("ocr_result_id") REFERENCES "public"."ocr_results"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_outputs" ADD CONSTRAINT "ai_outputs_ai_job_id_ai_jobs_id_fk" FOREIGN KEY ("ai_job_id") REFERENCES "public"."ai_jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_outputs" ADD CONSTRAINT "ai_outputs_source_upload_id_source_uploads_id_fk" FOREIGN KEY ("source_upload_id") REFERENCES "public"."source_uploads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ocr_results" ADD CONSTRAINT "ocr_results_source_upload_id_source_uploads_id_fk" FOREIGN KEY ("source_upload_id") REFERENCES "public"."source_uploads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "upload_duplicate_matches" ADD CONSTRAINT "upload_duplicate_matches_source_upload_id_source_uploads_id_fk" FOREIGN KEY ("source_upload_id") REFERENCES "public"."source_uploads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "upload_duplicate_matches" ADD CONSTRAINT "upload_duplicate_matches_matched_upload_id_source_uploads_id_fk" FOREIGN KEY ("matched_upload_id") REFERENCES "public"."source_uploads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "opportunity_identity_draft_documents_draft_id_idx" ON "opportunity_identity_draft_documents" USING btree ("opportunity_listing_draft_id");--> statement-breakpoint
CREATE INDEX "opportunity_listing_draft_documents_draft_id_idx" ON "opportunity_listing_draft_documents" USING btree ("opportunity_listing_draft_id");--> statement-breakpoint
CREATE INDEX "opportunity_listing_draft_images_draft_id_idx" ON "opportunity_listing_draft_images" USING btree ("opportunity_listing_draft_id");--> statement-breakpoint
CREATE INDEX "service_listing_draft_documents_draft_id_idx" ON "service_listing_draft_documents" USING btree ("service_listing_draft_id");--> statement-breakpoint
CREATE INDEX "service_listing_draft_images_draft_id_idx" ON "service_listing_draft_images" USING btree ("service_listing_draft_id");--> statement-breakpoint
CREATE INDEX "opportunity_listing_drafts_provider_draft_id_idx" ON "opportunity_listing_drafts" USING btree ("provider_draft_id");--> statement-breakpoint
CREATE INDEX "opportunity_listing_drafts_source_upload_id_idx" ON "opportunity_listing_drafts" USING btree ("source_upload_id");--> statement-breakpoint
CREATE INDEX "opportunity_listing_drafts_draft_status_idx" ON "opportunity_listing_drafts" USING btree ("draft_status");--> statement-breakpoint
CREATE INDEX "provider_drafts_source_upload_id_idx" ON "provider_drafts" USING btree ("source_upload_id");--> statement-breakpoint
CREATE INDEX "provider_drafts_ai_output_id_idx" ON "provider_drafts" USING btree ("ai_output_id");--> statement-breakpoint
CREATE INDEX "provider_drafts_draft_status_idx" ON "provider_drafts" USING btree ("draft_status");--> statement-breakpoint
CREATE INDEX "provider_drafts_matched_provider_id_idx" ON "provider_drafts" USING btree ("matched_provider_id");--> statement-breakpoint
CREATE INDEX "service_listing_drafts_provider_draft_id_idx" ON "service_listing_drafts" USING btree ("provider_draft_id");--> statement-breakpoint
CREATE INDEX "service_listing_drafts_source_upload_id_idx" ON "service_listing_drafts" USING btree ("source_upload_id");--> statement-breakpoint
CREATE INDEX "service_listing_drafts_draft_status_idx" ON "service_listing_drafts" USING btree ("draft_status");--> statement-breakpoint
CREATE INDEX "audit_logs_actor_user_id_idx" ON "audit_logs" USING btree ("actor_user_id");--> statement-breakpoint
CREATE INDEX "audit_logs_entity_idx" ON "audit_logs" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "audit_logs_action_idx" ON "audit_logs" USING btree ("action");--> statement-breakpoint
CREATE UNIQUE INDEX "provider_account_links_provider_user_idx" ON "provider_account_links" USING btree ("provider_id","user_id");--> statement-breakpoint
CREATE INDEX "provider_account_links_provider_id_idx" ON "provider_account_links" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX "provider_account_links_user_id_idx" ON "provider_account_links" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "provider_claim_tokens_token_hash_idx" ON "provider_claim_tokens" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "provider_claim_tokens_provider_id_idx" ON "provider_claim_tokens" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX "provider_claim_tokens_status_idx" ON "provider_claim_tokens" USING btree ("status");--> statement-breakpoint
CREATE INDEX "review_actions_entity_idx" ON "review_actions" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "review_actions_reviewed_by_idx" ON "review_actions" USING btree ("reviewed_by");--> statement-breakpoint
CREATE UNIQUE INDEX "user_roles_user_id_role_idx" ON "user_roles" USING btree ("user_id","role");--> statement-breakpoint
CREATE UNIQUE INDEX "users_auth_user_id_idx" ON "users" USING btree ("auth_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "users_phone_idx" ON "users" USING btree ("phone");--> statement-breakpoint
CREATE UNIQUE INDEX "providers_slug_idx" ON "providers" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "providers_owner_user_id_idx" ON "providers" USING btree ("owner_user_id");--> statement-breakpoint
CREATE INDEX "providers_status_idx" ON "providers" USING btree ("status");--> statement-breakpoint
CREATE INDEX "providers_provider_type_idx" ON "providers" USING btree ("provider_type");--> statement-breakpoint
CREATE INDEX "providers_claim_status_idx" ON "providers" USING btree ("claim_status");--> statement-breakpoint
CREATE INDEX "service_listing_documents_listing_id_idx" ON "service_listing_documents" USING btree ("service_listing_id");--> statement-breakpoint
CREATE INDEX "service_listing_images_listing_id_idx" ON "service_listing_images" USING btree ("service_listing_id");--> statement-breakpoint
CREATE UNIQUE INDEX "service_listings_slug_idx" ON "service_listings" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "service_listings_provider_id_idx" ON "service_listings" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX "service_listings_status_idx" ON "service_listings" USING btree ("status");--> statement-breakpoint
CREATE INDEX "service_listings_category_idx" ON "service_listings" USING btree ("category");--> statement-breakpoint
CREATE INDEX "opportunity_identity_documents_listing_id_idx" ON "opportunity_identity_documents" USING btree ("opportunity_listing_id");--> statement-breakpoint
CREATE INDEX "opportunity_listing_documents_listing_id_idx" ON "opportunity_listing_documents" USING btree ("opportunity_listing_id");--> statement-breakpoint
CREATE INDEX "opportunity_listing_images_listing_id_idx" ON "opportunity_listing_images" USING btree ("opportunity_listing_id");--> statement-breakpoint
CREATE UNIQUE INDEX "opportunity_listings_slug_idx" ON "opportunity_listings" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "opportunity_listings_provider_id_idx" ON "opportunity_listings" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX "opportunity_listings_status_idx" ON "opportunity_listings" USING btree ("status");--> statement-breakpoint
CREATE INDEX "opportunity_listings_category_idx" ON "opportunity_listings" USING btree ("category");--> statement-breakpoint
CREATE INDEX "ai_jobs_source_upload_id_idx" ON "ai_jobs" USING btree ("source_upload_id");--> statement-breakpoint
CREATE INDEX "ai_jobs_ocr_result_id_idx" ON "ai_jobs" USING btree ("ocr_result_id");--> statement-breakpoint
CREATE INDEX "ai_jobs_status_idx" ON "ai_jobs" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "ai_outputs_ai_job_id_idx" ON "ai_outputs" USING btree ("ai_job_id");--> statement-breakpoint
CREATE INDEX "ai_outputs_source_upload_id_idx" ON "ai_outputs" USING btree ("source_upload_id");--> statement-breakpoint
CREATE INDEX "ocr_results_source_upload_id_idx" ON "ocr_results" USING btree ("source_upload_id");--> statement-breakpoint
CREATE INDEX "ocr_results_status_idx" ON "ocr_results" USING btree ("status");--> statement-breakpoint
CREATE INDEX "ocr_results_text_hash_idx" ON "ocr_results" USING btree ("text_hash");--> statement-breakpoint
CREATE UNIQUE INDEX "source_uploads_drive_file_id_idx" ON "source_uploads" USING btree ("drive_file_id");--> statement-breakpoint
CREATE INDEX "source_uploads_status_idx" ON "source_uploads" USING btree ("status");--> statement-breakpoint
CREATE INDEX "source_uploads_duplicate_status_idx" ON "source_uploads" USING btree ("duplicate_status");--> statement-breakpoint
CREATE INDEX "source_uploads_ocr_status_idx" ON "source_uploads" USING btree ("ocr_status");--> statement-breakpoint
CREATE INDEX "source_uploads_ai_status_idx" ON "source_uploads" USING btree ("ai_status");--> statement-breakpoint
CREATE INDEX "upload_duplicate_matches_source_upload_id_idx" ON "upload_duplicate_matches" USING btree ("source_upload_id");--> statement-breakpoint
CREATE INDEX "upload_duplicate_matches_matched_upload_id_idx" ON "upload_duplicate_matches" USING btree ("matched_upload_id");