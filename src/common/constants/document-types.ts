// src\common\constants\document-types.ts
export const SERVICE_DOCUMENT_TYPES = {
  EXPERIENCE_PROOF: "experience_proof",
  CERTIFICATE: "certificate",
  PORTFOLIO: "portfolio",
  OTHER: "other",
} as const;

export const OPPORTUNITY_DOCUMENT_TYPES = {
  BUSINESS_REGISTRATION: "business_registration",
  LEGAL_PERMIT: "legal_permit",
  PROJECT_PROPOSAL: "project_proposal",
  PITCH_DECK: "pitch_deck",
  FINANCIAL_PROJECTION: "financial_projection",
  PARTNERSHIP_AGREEMENT: "partnership_agreement",
  PAST_PROJECT_REPORT: "past_project_report",
  INVESTOR_BENEFITS_ATTACHMENT: "investor_benefits_attachment",
  OTHER: "other",
} as const;

export const IDENTITY_DOCUMENT_TYPES = {
  ID_CARD: "id_card",
  PASSPORT: "passport",
  DRIVING_LICENSE: "driving_license",
  BUSINESS_OWNER_VERIFICATION: "business_owner_verification",
} as const;