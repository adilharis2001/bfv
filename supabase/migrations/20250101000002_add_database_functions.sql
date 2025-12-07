-- =============================================================================
-- DATABASE FUNCTIONS & TRIGGERS
-- =============================================================================
-- This migration creates database functions and triggers for automated tasks.

-- -----------------------------------------------------------------------------
-- 1. FUNCTION: Handle New User Registration
-- -----------------------------------------------------------------------------
-- Automatically creates user_profile and scan_credits entries when a new user signs up

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create user profile
  INSERT INTO user_profiles (id)
  VALUES (NEW.id);

  -- Initialize scan credits (0 credits to start)
  INSERT INTO scan_credits (user_id, credits_remaining, credits_purchased)
  VALUES (NEW.id, 0, 0);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

COMMENT ON FUNCTION handle_new_user IS 'Automatically creates profile and credits for new users';

-- -----------------------------------------------------------------------------
-- 2. FUNCTION: Use Scan Credit
-- -----------------------------------------------------------------------------
-- Atomically decrements user credits by 1

CREATE OR REPLACE FUNCTION use_scan_credit(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  credits_available INTEGER;
BEGIN
  -- Check if user has credits
  SELECT credits_remaining INTO credits_available
  FROM scan_credits
  WHERE user_id = p_user_id;

  IF credits_available IS NULL OR credits_available <= 0 THEN
    RETURN FALSE;
  END IF;

  -- Deduct credit
  UPDATE scan_credits
  SET credits_remaining = credits_remaining - 1,
      updated_at = NOW()
  WHERE user_id = p_user_id
    AND credits_remaining > 0;

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION use_scan_credit IS 'Atomically decrements user credits by 1';

-- -----------------------------------------------------------------------------
-- 3. FUNCTION: Add Scan Credits
-- -----------------------------------------------------------------------------
-- Adds credits after successful payment

CREATE OR REPLACE FUNCTION add_scan_credits(
  p_user_id UUID,
  p_credits INTEGER,
  p_transaction_id UUID
)
RETURNS VOID AS $$
BEGIN
  -- Upsert credits
  INSERT INTO scan_credits (user_id, credits_remaining, credits_purchased, last_purchase_date, credits_expire_at)
  VALUES (p_user_id, p_credits, p_credits, NOW(), NOW() + INTERVAL '12 months')
  ON CONFLICT (user_id)
  DO UPDATE SET
    credits_remaining = scan_credits.credits_remaining + p_credits,
    credits_purchased = scan_credits.credits_purchased + p_credits,
    last_purchase_date = NOW(),
    credits_expire_at = NOW() + INTERVAL '12 months', -- Reset expiration on new purchase
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION add_scan_credits IS 'Adds credits to user account after purchase';

-- -----------------------------------------------------------------------------
-- 4. FUNCTION: Check Free Scan Eligibility
-- -----------------------------------------------------------------------------
-- Checks if user is eligible for free scan

CREATE OR REPLACE FUNCTION can_use_free_scan(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  has_used BOOLEAN;
  is_verified BOOLEAN;
BEGIN
  SELECT has_used_free_scan, age_verified
  INTO has_used, is_verified
  FROM user_profiles
  WHERE id = p_user_id;

  -- User must be age verified and not have used free scan
  RETURN (is_verified = TRUE AND has_used = FALSE);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION can_use_free_scan IS 'Checks if user can use their free scan';

-- -----------------------------------------------------------------------------
-- 5. FUNCTION: Mark Free Scan Used
-- -----------------------------------------------------------------------------
-- Marks the free scan as used

CREATE OR REPLACE FUNCTION mark_free_scan_used(p_user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE user_profiles
  SET has_used_free_scan = TRUE,
      free_scan_used_at = NOW(),
      updated_at = NOW()
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION mark_free_scan_used IS 'Marks the free scan as used for a user';

-- -----------------------------------------------------------------------------
-- 6. FUNCTION: Update Updated_At Timestamp
-- -----------------------------------------------------------------------------
-- Automatically updates the updated_at column on row updates

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_scan_credits_updated_at ON scan_credits;
CREATE TRIGGER update_scan_credits_updated_at
  BEFORE UPDATE ON scan_credits
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_credit_packages_updated_at ON credit_packages;
CREATE TRIGGER update_credit_packages_updated_at
  BEFORE UPDATE ON credit_packages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- Success message
-- -----------------------------------------------------------------------------
DO $$
BEGIN
  RAISE NOTICE 'Database functions and triggers created successfully!';
  RAISE NOTICE 'Database setup is complete! You can now start using the application.';
END $$;
