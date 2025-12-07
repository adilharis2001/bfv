// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

// -----------------------------------------------------------------------------
// User Types
// -----------------------------------------------------------------------------

export interface UserProfile {
  id: string;
  age_verified: boolean;
  age_verification_date: string | null;
  has_used_free_scan: boolean;
  free_scan_used_at: string | null;
  height_cm: number | null;
  height_unit: "cm" | "ft/in";
  last_weight_kg: number | null;
  unit_system: "metric" | "imperial";
  created_at: string;
  updated_at: string;
}

export interface ScanCredits {
  id: string;
  user_id: string;
  credits_remaining: number;
  credits_purchased: number;
  last_purchase_date: string | null;
  credits_expire_at: string | null;
  created_at: string;
  updated_at: string;
}

// -----------------------------------------------------------------------------
// Scan Types
// -----------------------------------------------------------------------------

export type ScanMode = "quick" | "detail";

export type ClothingCoverage = "heavy_coat" | "baggy" | "moderate" | "fitted" | "minimal";

export type ImageQuality = "excellent" | "good" | "fair" | "poor";

export interface BodyPartEstimate {
  fat_percentage: { min: number; max: number };
  lean_percentage: { min: number; max: number };
}

export interface ScanResults {
  input_data: {
    height_cm: number;
    weight_kg: number;
    bmi: number;
  };
  overall: {
    body_fat_percentage: { min: number; max: number };
    lean_mass_percentage: { min: number; max: number };
    estimated_fat_mass_kg: { min: number; max: number };
    estimated_lean_mass_kg: { min: number; max: number };
  };
  body_parts: {
    arms: BodyPartEstimate | null;
    chest: BodyPartEstimate | null;
    abdomen: BodyPartEstimate | null;
    legs: BodyPartEstimate | null;
    back: BodyPartEstimate | null;
  };
  validation: {
    person_count: number;
    is_full_body: boolean;
    clothing_coverage: ClothingCoverage;
    image_quality: ImageQuality;
    pose_suitable: boolean;
  };
  recommendations: string[];
  accuracy_disclaimer: string;
  special_notes: string | null;
}

export interface Scan {
  id: string;
  user_id: string;
  scan_mode: ScanMode;
  photos_uploaded: number;
  height_cm: number;
  weight_kg: number;
  scan_results: ScanResults;
  confidence_score: number;
  validation_passed: boolean;
  validation_issues: string[] | null;
  was_charged: boolean;
  used_free_tier: boolean;
  created_at: string;
}

// -----------------------------------------------------------------------------
// Payment Types
// -----------------------------------------------------------------------------

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  discount_percentage: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type TransactionStatus = "pending" | "completed" | "failed" | "refunded";

export interface Transaction {
  id: string;
  user_id: string;
  credits_purchased: number;
  amount_paid: number;
  currency: string;
  stripe_payment_intent_id: string | null;
  stripe_checkout_session_id: string | null;
  status: TransactionStatus;
  created_at: string;
  completed_at: string | null;
}

// -----------------------------------------------------------------------------
// API Request/Response Types
// -----------------------------------------------------------------------------

export interface AnalyzeScanRequest {
  scanMode: ScanMode;
  images: string[]; // Base64-encoded images
  userId: string;
  heightCm: number;
  weightKg: number;
}

export interface AnalyzeScanResponse {
  success: boolean;
  scanId: string;
  results: ScanResults;
  wasCharged: boolean;
  creditsRemaining: number;
  hasWarnings: boolean;
  validationIssues?: string[];
  safetyError?: {
    reason: "pregnancy_detected" | "minor_detected" | "medical_condition_detected";
    message: string;
  };
}
