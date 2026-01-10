-- ============================================
-- IMPORTANT: Run this in Supabase SQL Editor
-- ============================================
-- This creates the trigger that automatically initializes
-- user_profiles and scan_credits when a new user signs up

-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create user profile
  INSERT INTO public.user_profiles (id, age_verified, age_verification_date)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'age_verified')::boolean, FALSE),
    CASE
      WHEN (NEW.raw_user_meta_data->>'age_verified')::boolean = TRUE
      THEN NOW()
      ELSE NULL
    END
  )
  ON CONFLICT (id) DO NOTHING;

  -- Initialize scan credits with 0 credits
  INSERT INTO public.scan_credits (user_id, credits_remaining, credits_purchased)
  VALUES (NEW.id, 0, 0)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signups
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Add comment
COMMENT ON FUNCTION public.handle_new_user() IS 'Automatically creates user_profiles and scan_credits entries when a new user signs up';

-- ============================================
-- Verification: Check if trigger was created
-- ============================================
SELECT
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
