// src\modules\ingestion\ingestion-sheet.mapper.ts
//this file contains the mapping logic for Google Sheet rows
export function buildProviderSheetRow(data: {
  sourceUpload: any;
  providerDraft: any;
  aiOutput: any;
}) {
  return {
    review_row_id: `provider_${data.providerDraft.id}`,
    source_upload_id: data.sourceUpload.id,
    provider_draft_id: data.providerDraft.id,
    drive_file_id: data.sourceUpload.driveFileId,
    screenshot_url: "",
    source_platform: data.sourceUpload.sourcePlatform,

    business_name: data.providerDraft.businessName,
    display_name: data.providerDraft.displayName,
    provider_type: data.providerDraft.providerType,
    description: data.providerDraft.description,
    short_description: data.providerDraft.shortDescription,

    primary_phone: data.providerDraft.primaryPhone,
    whatsapp_number: data.providerDraft.whatsappNumber,
    email: data.providerDraft.email,
    website_url: data.providerDraft.websiteUrl,

    city: data.providerDraft.city,
    district: data.providerDraft.district,
    province: data.providerDraft.province,
    country: data.providerDraft.country,

    ai_confidence: data.providerDraft.confidenceScore,
    ai_warnings: JSON.stringify(data.aiOutput.warningsJson ?? []),
    missing_fields: JSON.stringify(data.aiOutput.missingFieldsJson ?? []),

    admin_decision: "pending",
    admin_notes: "",
    synced_to_db: "no",
    last_synced_at: "",
    sync_error: "",
    created_at: new Date().toISOString(),
  };
}

export function buildServiceSheetRow(data: {
  sourceUpload: any;
  providerDraft: any;
  serviceDraft: any;
  aiOutput: any;
}) {
  return {
    review_row_id: `service_${data.serviceDraft.id}`,
    source_upload_id: data.sourceUpload.id,
    provider_draft_id: data.providerDraft.id,
    service_draft_id: data.serviceDraft.id,
    drive_file_id: data.sourceUpload.driveFileId,
    screenshot_url: "",
    source_platform: data.sourceUpload.sourcePlatform,

    provider_business_name: data.providerDraft.businessName,
    provider_phone: data.providerDraft.primaryPhone,
    provider_city: data.providerDraft.city,

    title: data.serviceDraft.title,
    category: data.serviceDraft.category,
    location_text: data.serviceDraft.locationText,
    tags: JSON.stringify(data.serviceDraft.tagsJson ?? []),
    description: data.serviceDraft.description,

    per_work_rate: data.serviceDraft.perWorkRate,
    currency: data.serviceDraft.currency,
    availability: data.serviceDraft.availability,
    warranty_type: data.serviceDraft.warrantyType,
    experience_text: data.serviceDraft.experienceText,
    thumbnail_image_url: data.serviceDraft.thumbnailImageUrl,

    ai_confidence: data.serviceDraft.confidenceScore,
    ai_warnings: JSON.stringify(data.aiOutput.warningsJson ?? []),
    missing_fields: JSON.stringify(data.aiOutput.missingFieldsJson ?? []),

    admin_decision: "pending",
    admin_notes: "",
    synced_to_db: "no",
    last_synced_at: "",
    sync_error: "",
    created_at: new Date().toISOString(),
  };
}

export function buildOpportunitySheetRow(data: {
  sourceUpload: any;
  providerDraft: any;
  opportunityDraft: any;
  aiOutput: any;
}) {
  return {
    review_row_id: `opportunity_${data.opportunityDraft.id}`,
    source_upload_id: data.sourceUpload.id,
    provider_draft_id: data.providerDraft.id,
    opportunity_draft_id: data.opportunityDraft.id,
    drive_file_id: data.sourceUpload.driveFileId,
    screenshot_url: "",
    source_platform: data.sourceUpload.sourcePlatform,

    provider_business_name: data.providerDraft.businessName,
    provider_phone: data.providerDraft.primaryPhone,
    provider_city: data.providerDraft.city,

    title: data.opportunityDraft.title,
    category: data.opportunityDraft.category,
    short_summary: data.opportunityDraft.shortSummary,
    full_description: data.opportunityDraft.fullDescription,

    province: data.opportunityDraft.province,
    district: data.opportunityDraft.district,
    city: data.opportunityDraft.city,
    postal_code: data.opportunityDraft.postalCode,

    investment_type: data.opportunityDraft.investmentType,
    expected_roi_text: data.opportunityDraft.expectedRoiText,
    funding_goal: data.opportunityDraft.fundingGoal,
    minimum_investment: data.opportunityDraft.minimumInvestment,
    maximum_investment: data.opportunityDraft.maximumInvestment,
    funding_deadline: data.opportunityDraft.fundingDeadline,
    investor_benefits_text: data.opportunityDraft.investorBenefitsText,

    risk_level: data.opportunityDraft.riskLevel,

    ai_confidence: data.opportunityDraft.confidenceScore,
    ai_warnings: JSON.stringify(data.aiOutput.warningsJson ?? []),
    missing_fields: JSON.stringify(data.aiOutput.missingFieldsJson ?? []),

    admin_decision: "pending",
    admin_notes: "",
    synced_to_db: "no",
    last_synced_at: "",
    sync_error: "",
    created_at: new Date().toISOString(),
  };
}