-- =============================================================================
-- INITIAL SCHEMA - Body Fat View Database
-- =============================================================================
-- This migration creates all the core tables for the application.
-- Run this in your Supabase SQL Editor.

-- -----------------------------------------------------------------------------
-- 1. USER PROFILES
-- -----------------------------------------------------------------------------
-- Extends Supabase Auth users with app-specific data

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  age_verified BOOLEAN DEFAULT FALSE,
  age_verification_date TIMESTAMPTZ,
  has_used_free_scan BOOLEAN DEFAULT FALSE,
  free_scan_used_at TIMESTAMPTZ,

  -- Biometric data
  height_cm DECIMAL(5,2), -- Height in centimeters (e.g., 175.5)
  height_unit VARCHAR(10) DEFAULT 'cm', -- 'cm' or 'ft/in' for display preference
  last_weight_kg DECIMAL(5,2), -- Last entered weight (for pre-filling)
  unit_system VARCHAR(10) DEFAULT 'metric', -- 'metric' or 'imperial' for user preference

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add comment
COMMENT ON TABLE user_profiles IS 'Extended user profile data beyond auth.users';

-- -----------------------------------------------------------------------------
-- 2. SCAN CREDITS
-- -----------------------------------------------------------------------------
-- Tracks user scan credits (purchased and remaining)

CREATE TABLE IF NOT EXISTS scan_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  credits_remaining INTEGER DEFAULT 0,
  credits_purchased INTEGER DEFAULT 0,
  last_purchase_date TIMESTAMPTZ,
  credits_expire_at TIMESTAMPTZ, -- 12 months from last purchase
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id)
);

COMMENT ON TABLE scan_credits IS 'Tracks scan credits for each user';

-- -----------------------------------------------------------------------------
-- 3. SCANS
-- -----------------------------------------------------------------------------
-- Stores body scan analysis results (no images stored)

CREATE TABLE IF NOT EXISTS scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Scan mode
  scan_mode VARCHAR(20) NOT NULL, -- 'quick' or 'detail'
  photos_uploaded INTEGER NOT NULL, -- 1 for quick, 2 for detail

  -- User input data (captured at time of scan)
  height_cm DECIMAL(5,2) NOT NULL, -- Height in cm at time of scan
  weight_kg DECIMAL(5,2) NOT NULL, -- Weight in kg at time of scan

  -- Analysis results
  scan_results JSONB NOT NULL,
  confidence_score DECIMAL(3,2),

  -- Validation metadata
  validation_passed BOOLEAN DEFAULT TRUE,
  validation_issues TEXT[],

  -- Billing
  was_charged BOOLEAN DEFAULT FALSE,
  used_free_tier BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE scans IS 'Stores scan analysis results (images are never stored)';

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_scans_user_id ON scans(user_id);
CREATE INDEX IF NOT EXISTS idx_scans_created_at ON scans(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scans_user_created ON scans(user_id, created_at DESC);

-- -----------------------------------------------------------------------------
-- 4. TRANSACTIONS
-- -----------------------------------------------------------------------------
-- Tracks all payment transactions

CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Credits
  credits_purchased INTEGER NOT NULL,

  -- Payment details
  amount_paid DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',

  -- Stripe
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_checkout_session_id TEXT,

  -- Status
  status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed, refunded

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

COMMENT ON TABLE transactions IS 'Payment transaction history';

-- Indexes
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_stripe_payment_intent ON transactions(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);

-- -----------------------------------------------------------------------------
-- 5. CREDIT PACKAGES
-- -----------------------------------------------------------------------------
-- Defines available credit packages (for dynamic pricing)

CREATE TABLE IF NOT EXISTS credit_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  credits INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  discount_percentage INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE credit_packages IS 'Available credit packages for purchase';

-- Seed data
INSERT INTO credit_packages (name, credits, price, discount_percentage, sort_order) VALUES
  ('Single Scan', 1, 9.99, 0, 1),
  ('5-Pack', 5, 39.99, 20, 2),
  ('10-Pack', 10, 69.99, 30, 3)
ON CONFLICT DO NOTHING;

-- -----------------------------------------------------------------------------
-- Success message
-- -----------------------------------------------------------------------------
DO $$
BEGIN
  RAISE NOTICE 'Initial schema created successfully!';
  RAISE NOTICE 'Next step: Run the RLS policies migration (20250101000001_add_rls_policies.sql)';
END $$;
