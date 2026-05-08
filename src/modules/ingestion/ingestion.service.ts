// src\modules\ingestion\ingestion.service.ts
import { INGESTION_STATUSES, JOB_STATUSES } from "../../common/constants/index.js";
import type { IngestAiDraftBody } from "./ingestion.schema.js";
import * as repo from "./ingestion.repository.js";
import { buildProviderSheetRow, buildServiceSheetRow, buildOpportunitySheetRow } from "./ingestion-sheet.mapper.js";

function valueAsString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function valueAsNumberString(value: unknown): string | undefined {
  if (typeof value === "number") return value.toString();
  if (typeof value === "string" && value.trim()) return value;
  return undefined;
}

export async function ingestAiDraft(input: IngestAiDraftBody) {
  
  
  const { row: sourceUpload, isNew } = await repo.createSourceUpload({
    driveFileId: input.source.driveFileId,
    driveFolderId: input.source.driveFolderId,
    fileName: input.source.fileName,
    mimeType: input.source.mimeType,
    fileSizeBytes: input.source.fileSizeBytes,
    sourcePlatform: input.source.sourcePlatform,
    uploadedByEmployee: input.source.uploadedByEmployee,
    rawMetadataJson: input.source.rawMetadataJson,

    status: INGESTION_STATUSES.AI_DONE,
    ocrStatus: JOB_STATUSES.COMPLETED,
    aiStatus: JOB_STATUSES.COMPLETED,
    duplicateStatus: "unique",
  });

  // if duplicate, return existing data without re-processing
  if (!isNew) {
    return {
      sourceUpload,
      skipped: true,
      message: "File already processed. Skipping.",
    };
  }

  if(!sourceUpload) throw new Error("Failed to create source upload");

  
  const ocrResult = await repo.createOcrResult({
    sourceUploadId: sourceUpload.id,
    ocrProvider: input.ocr.ocrProvider,
    status: JOB_STATUSES.COMPLETED,
    rawText: input.ocr.rawText,
    cleanedText: input.ocr.cleanedText,
    confidenceScore: input.ocr.confidenceScore?.toString(),
    rawResponseJson: input.ocr.rawResponseJson,
    processedAt: new Date(),
  });

  const aiJob = await repo.createAiJob({
    sourceUploadId: sourceUpload.id,
    ocrResultId: ocrResult.id,
    status: JOB_STATUSES.COMPLETED,
    requestPayloadJson: input,
    responsePayloadJson: input.ai.rawOutputJson,
    startedAt: new Date(),
    completedAt: new Date(),
  });

  const aiOutput = await repo.createAiOutput({
    aiJobId: aiJob.id,
    sourceUploadId: sourceUpload.id,
    providerDataJson: input.ai.providerDataJson,
    servicesDataJson: input.ai.servicesDataJson,
    opportunitiesDataJson: input.ai.opportunitiesDataJson,
    confidenceScore: input.ai.confidenceScore?.toString(),
    warningsJson: input.ai.warningsJson,
    missingFieldsJson: input.ai.missingFieldsJson,
    rawOutputJson: input.ai.rawOutputJson,
  });

  const providerData = input.ai.providerDataJson ?? {};

  const providerDraft = await repo.createProviderDraft({
    sourceUploadId: sourceUpload.id,
    aiOutputId: aiOutput.id,

    businessName:
      valueAsString(providerData.businessName) ??
      valueAsString(providerData.business_name) ??
      "Unknown Provider",

    displayName: valueAsString(providerData.displayName),
    providerType:
      valueAsString(providerData.providerType) ??
      valueAsString(providerData.provider_type) ??
      "both",

    description: valueAsString(providerData.description),
    shortDescription: valueAsString(providerData.shortDescription),

    primaryPhone:
      valueAsString(providerData.primaryPhone) ??
      valueAsString(providerData.phone),

    whatsappNumber:
      valueAsString(providerData.whatsappNumber) ??
      valueAsString(providerData.whatsapp_number),

    email: valueAsString(providerData.email),
    websiteUrl: valueAsString(providerData.websiteUrl),

    city: valueAsString(providerData.city),
    district: valueAsString(providerData.district),
    province: valueAsString(providerData.province),

    isPlaceholder: !valueAsString(providerData.businessName),
    confidenceScore: input.ai.confidenceScore?.toString(),
  });

  const serviceDrafts = [];

  for (const service of input.ai.servicesDataJson ?? []) {
    const draft = await repo.createServiceDraft({
      sourceUploadId: sourceUpload.id,
      aiOutputId: aiOutput.id,
      providerDraftId: providerDraft.id,

      title:
        valueAsString(service.title) ??
        valueAsString(service.serviceName) ??
        "Untitled Service",

      category: valueAsString(service.category),
      locationText: valueAsString(service.locationText),
      tagsJson: service.tags,
      description: valueAsString(service.description),

      perWorkRate: valueAsNumberString(service.perWorkRate),
      currency: valueAsString(service.currency) ?? "LKR",
      availability: valueAsString(service.availability),
      warrantyType: valueAsString(service.warrantyType),
      experienceText: valueAsString(service.experienceText),

      confidenceScore: input.ai.confidenceScore?.toString(),
    });

    serviceDrafts.push(draft);
  }

  const opportunityDrafts = [];

  for (const opportunity of input.ai.opportunitiesDataJson ?? []) {
    const draft = await repo.createOpportunityDraft({
      sourceUploadId: sourceUpload.id,
      aiOutputId: aiOutput.id,
      providerDraftId: providerDraft.id,

      title:
        valueAsString(opportunity.title) ??
        valueAsString(opportunity.opportunityName) ??
        "Untitled Opportunity",

      category: valueAsString(opportunity.category),
      shortSummary: valueAsString(opportunity.shortSummary),
      fullDescription: valueAsString(opportunity.fullDescription),

      province: valueAsString(opportunity.province),
      district: valueAsString(opportunity.district),
      city: valueAsString(opportunity.city),

      investmentType: valueAsString(opportunity.investmentType),
      expectedRoiText: valueAsString(opportunity.expectedRoiText),

      fundingGoal: valueAsNumberString(opportunity.fundingGoal),
      minimumInvestment: valueAsNumberString(opportunity.minimumInvestment),
      maximumInvestment: valueAsNumberString(opportunity.maximumInvestment),

      riskLevel: valueAsString(opportunity.riskLevel),
      investorBenefitsText: valueAsString(opportunity.investorBenefitsText),

      confidenceScore: input.ai.confidenceScore?.toString(),
    });

    opportunityDrafts.push(draft);
  }

  // Build rows for Google Sheets export (for internal review purposes)
  const sheetRows = {
    provider: buildProviderSheetRow({
      sourceUpload,
      providerDraft,
      aiOutput,
    }),
    services: serviceDrafts.map((serviceDraft) =>
      buildServiceSheetRow({
        sourceUpload,
        providerDraft,
        serviceDraft,
        aiOutput,
      })
    ),
    opportunities: opportunityDrafts.map((opportunityDraft) =>
      buildOpportunitySheetRow({
        sourceUpload,
        providerDraft,
        opportunityDraft,
        aiOutput,
      })
    ),
  };

  return {
    sourceUpload,
    ocrResult,
    aiJob,
    aiOutput,
    providerDraft,
    serviceDrafts,
    opportunityDrafts,
    sheetRows,
  };
}