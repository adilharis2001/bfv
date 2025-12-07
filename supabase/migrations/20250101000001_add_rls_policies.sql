-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================
-- This migration enables RLS and creates security policies for all tables.
-- Run this AFTER the initial schema migration.

-- -----------------------------------------------------------------------------
-- 1. USER PROFILES - RLS POLICIES
-- -----------------------------------------------------------------------------

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Users can insert their own profile (for manual profile creation)
CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- -----------------------------------------------------------------------------
-- 2. SCAN CREDITS - RLS POLICIES
-- -----------------------------------------------------------------------------

ALTER TABLE scan_credits ENABLE ROW LEVEL SECURITY;

-- Users can view their own credits
CREATE POLICY "Users can view own credits"
  ON scan_credits FOR SELECT
  USING (auth.uid() = user_id);

-- Only Edge Functions (service role) can update credits
-- No policy needed - service role bypasses RLS

-- -----------------------------------------------------------------------------
-- 3. SCANS - RLS POLICIES
-- -----------------------------------------------------------------------------

ALTER TABLE scans ENABLE ROW LEVEL SECURITY;

-- Users can view their own scans
CREATE POLICY "Users can view own scans"
  ON scans FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own scans (via Edge Function)
CREATE POLICY "Users can insert own scans"
  ON scans FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 4. TRANSACTIONS - RLS POLICIES
-- -----------------------------------------------------------------------------

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Users can view their own transactions
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Only Edge Functions (service role) can insert/update transactions
-- No policy needed - service role bypasses RLS

-- -----------------------------------------------------------------------------
-- 5. CREDIT PACKAGES - RLS POLICIES
-- -----------------------------------------------------------------------------

ALTER TABLE credit_packages ENABLE ROW LEVEL SECURITY;

-- Anyone (including unauthenticated users) can view active packages
CREATE POLICY "Anyone can view active packages"
  ON credit_packages FOR SELECT
  USING (is_active = TRUE);

-- Only admins can modify packages (via service role)
-- No policy needed - service role bypasses RLS

-- -----------------------------------------------------------------------------
-- Success message
-- -----------------------------------------------------------------------------
DO $$
BEGIN
  RAISE NOTICE 'RLS policies created successfully!';
  RAISE NOTICE 'Next step: Run the database functions migration (20250101000002_add_database_functions.sql)';
END $$;
