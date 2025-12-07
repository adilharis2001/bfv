# Body Fat View - V1 Specification

**Domain**: bodyfatview.com
**Tagline**: Private body composition analysis powered by AI
**Tech Stack**: Next.js 15 (App Router) + Supabase + Stripe + Google Gemini 2.5 Pro

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Database Schema](#database-schema)
5. [Authentication](#authentication)
6. [Features & User Flows](#features--user-flows)
7. [Supabase Edge Functions](#supabase-edge-functions)
8. [Payment Integration](#payment-integration)
9. [Landing Page Sections](#landing-page-sections)
10. [Design System](#design-system)
11. [API Flow Diagrams](#api-flow-diagrams)
12. [Implementation Phases](#implementation-phases)
13. [Environment Variables](#environment-variables)
14. [Legal & Compliance](#legal--compliance)

---

## 1. Project Overview

### The Problem We're Solving

**Accessible Body Composition Analysis**: Traditional body composition testing requires expensive equipment (DEXA scans, InBody machines) or in-person appointments with fitness professionals. These methods cost $50-200 per scan and require scheduling, travel, and often recurring memberships.

**Privacy Concerns**: Many fitness apps and services require users to upload and store sensitive body photos, creating privacy risks and user hesitation.

**Tracking Progress**: People pursuing fitness goals (weight loss, muscle gain, recomposition) need regular body composition data to track progress, but the cost and inconvenience of traditional methods make consistent tracking prohibitive.

### Our Solution

Body Fat View democratizes body composition analysis by leveraging cutting-edge AI vision technology to provide instant, private, and affordable body fat percentage estimates from a single photo.

**Key Innovation**: We combine Google's Gemini 2.5 Pro vision AI with a privacy-first architecture that analyzes images in real-time without ever storing them. Users get detailed body composition insights in 60 seconds, from anywhere, at a fraction of traditional costs.

### Core Value Proposition

**Instant Analysis**: Upload a photo → Get results in 60 seconds
- Overall body fat percentage with accuracy ranges
- Regional breakdown (arms, chest, abdomen, legs, back)
- Lean mass vs fat mass percentages per body region
- Personalized recommendations based on current composition
- Progress tracking over time with visual charts

**Privacy-First Architecture**: Your photos are analyzed and immediately discarded
- No image storage—ever
- Only analysis results (JSON) are saved to your account
- End-to-end encrypted transmission
- GDPR compliant data handling
- Clear, transparent privacy messaging

**Affordable & Accessible**: No equipment, no appointments, no subscriptions
- Free tier: 1 lifetime scan to try the service
- Pay-per-scan model: Only pay when you need analysis
- Bulk discounts available (5-pack, 10-pack)
- Works with any smartphone camera
- Available 24/7 from anywhere

### Product Features

#### Scan Modes (Available to All Users)

**Quick Scan** - Fast and private
- 1 photo required (full body, any clothing)
- Faster upload and processing
- Privacy-focused (fully clothed acceptable)
- Accuracy: ±5-8% range
- Best for: Initial assessment, privacy-conscious users, quick progress checks
- Confidence range: 40-70%

**Detail Scan** - Maximum accuracy
- 2 photos required (full body front + full body side)
- Minimal clothing (underwear or fitted athletic wear)
- Higher precision analysis
- Accuracy: ±2-4% range
- Best for: Precise tracking, serious fitness goals, detailed body composition
- Confidence range: 60-85%

Both modes:
- Use height/weight data for improved estimates
- Include body part breakdown (when visible in photos)
- Provide personalized recommendations
- Never store your photos
- Cost the same (1 scan credit)

#### For Free Users (1 lifetime scan)
- Choice of Quick Scan or Detail Scan
- Complete body composition analysis
- Overall body fat percentage (broader ranges)
- Body part breakdown by region
- Personalized recommendations
- Confidence scoring based on photo quality
- Interactive results dashboard

#### For Paid Users (Credit-based)
- Everything in free tier, plus:
- More precise percentage ranges (±2% vs ±5%)
- Downloadable PDF reports
- Unlimited scans based on credits purchased
- Historical tracking with trend charts
- Progress comparison across multiple scans

#### Quality Intelligence
- Automatic photo validation (detects multiple people, poor lighting, partial body shots)
- Confidence scoring to indicate accuracy (affected by clothing, pose, image quality)
- Failed scans don't consume credits (if photo quality is too low or invalid)
- Clear guidance on optimal photo setup for best results

### Business Model

**Freemium Pay-Per-Scan**:
- **Free tier**: 1 scan per account (lifetime) to experience the product
- **Paid tier**: Credit packs with volume discounts
  - Single scan: $9.99 (trial the paid experience)
  - 5-pack: $39.99 (20% off, ~$8/scan) — *Most Popular*
  - 10-pack: $69.99 (30% off, ~$7/scan) — *Best Value*

**Why Pay-Per-Scan vs Subscription?**
- Aligns with user behavior (most users scan monthly or quarterly)
- No recurring billing friction or forgotten subscriptions
- Users only pay when they need it
- Better unit economics tied directly to AI costs

### Target Audience

**Primary**: Fitness enthusiasts tracking body recomposition (ages 25-45)
- People losing weight who want to preserve muscle
- Strength athletes monitoring lean mass gains
- General fitness users tracking progress beyond just scale weight

**Secondary**: Health-conscious individuals seeking accountability
- People starting fitness journeys needing baseline measurements
- Users frustrated with scale weight as sole metric
- Anyone curious about their body composition

### Quality Assurance & Trust

- **Validation Logic**: Gemini AI validates every image before charging credits
  - Detects person count (must be exactly 1)
  - Checks for full-body visibility
  - Assesses image quality and lighting
  - Evaluates pose suitability

- **Confidence Transparency**: Every scan includes a confidence score
  - Higher scores for well-lit, fitted clothing, proper poses
  - Lower scores for baggy clothing, poor angles, or partial shots
  - Users understand accuracy expectations upfront

- **No-Charge Failures**: If validation fails (wrong photo type, poor quality), users aren't charged
  - Clear error messaging explaining what went wrong
  - Guidance on how to improve photo quality
  - Maintains trust and reduces refund requests

### Differentiation from Competitors

**vs. DEXA/InBody Scans**:
- 10x cheaper ($7-10 vs $75-150)
- Instant results vs appointment scheduling
- Track progress weekly vs quarterly due to cost

**vs. Traditional Fitness Apps**:
- No image storage (privacy-first)
- AI-powered analysis vs manual tracking
- Scientific body composition vs subjective progress photos

**vs. Other AI Body Scanners**:
- Pay-per-scan vs forced subscriptions
- Transparent pricing with no hidden fees
- Regional breakdown beyond just overall percentage

---

## 2. Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Theme**: Light/Dark mode support
- **State Management**: React Context + Zustand (if needed)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts or Chart.js (for body fat history)

### Backend
- **BaaS**: Supabase (Auth, Database, Storage, Edge Functions)
- **Database**: PostgreSQL (Supabase-managed)
- **Edge Functions**: Deno runtime (Supabase Functions)
- **File Upload**: Direct browser → Edge Function (no storage)

### AI & APIs
- **Vision AI**: Google Gemini 2.5 Pro (`gemini-2.5-pro`)
- **API Format**: REST via Gemini API
- **Structured Output**: JSON mode for consistent response format

### Payments
- **Provider**: Stripe
- **Integration**: Stripe Checkout for one-time payments
- **Webhook**: Stripe webhook → Supabase Edge Function → Update credits

### Email
- **Provider**: Resend
- **Usage**: Auth emails (sign up, password reset, magic links)
- **Integration**: Supabase Auth + Resend SMTP

### Hosting & Deployment
- **Frontend**: Vercel
- **Backend**: Supabase Cloud
- **Edge Functions**: Supabase (auto-deployed)
- **Domain**: bodyfatview.com

### Body Visualization
- **Library**: react-body-highlighter
- **Color Gradient**: Green (lean) → Red (fat)
- **Interactive**: Hover/tap to see region percentages

---

## 3. Project Structure

```
bodyfatview/
├── app/
│   ├── (marketing)/              # SSG - Public landing pages
│   │   ├── page.tsx              # Homepage
│   │   ├── pricing/
│   │   │   └── page.tsx          # Pricing page
│   │   ├── privacy/
│   │   │   └── page.tsx          # Privacy policy
│   │   ├── terms/
│   │   │   └── page.tsx          # Terms of service
│   │   └── layout.tsx            # Marketing layout (header/footer)
│   │
│   ├── (app)/                    # CSR - Authenticated app
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Dashboard (scan history + chart)
│   │   ├── scan/
│   │   │   ├── page.tsx          # Upload & scan interface
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Individual scan result view
│   │   ├── settings/
│   │   │   └── page.tsx          # Account settings
│   │   ├── billing/
│   │   │   └── page.tsx          # Purchase credits, transaction history
│   │   └── layout.tsx            # App layout (sidebar/nav)
│   │
│   ├── auth/                     # Auth pages
│   │   ├── signin/
│   │   │   └── page.tsx          # Sign in
│   │   ├── signup/
│   │   │   └── page.tsx          # Sign up (with age verification)
│   │   └── callback/
│   │       └── page.tsx          # OAuth callback
│   │
│   ├── api/                      # Optional Next.js API routes
│   │   └── stripe-webhook/
│   │       └── route.ts          # Stripe webhook handler
│   │
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles + Tailwind
│
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── marketing/                # Landing page components
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Pricing.tsx
│   │   ├── FAQ.tsx
│   │   └── Footer.tsx
│   ├── app/                      # App components
│   │   ├── HeightWeightForm.tsx
│   │   ├── ScanUpload.tsx
│   │   ├── ScanResult.tsx
│   │   ├── BodyVisualization.tsx
│   │   ├── ScanHistory.tsx
│   │   ├── BodyFatChart.tsx
│   │   ├── WeightChart.tsx
│   │   └── CreditDisplay.tsx
│   └── shared/                   # Shared components
│       ├── Header.tsx
│       ├── ThemeToggle.tsx
│       └── ProtectedRoute.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Supabase browser client
│   │   ├── server.ts             # Supabase server client
│   │   └── middleware.ts         # Auth middleware
│   ├── stripe.ts                 # Stripe client
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Utility functions
│
├── supabase/
│   ├── functions/
│   │   ├── analyze-body-scan/    # Main scan analysis function
│   │   │   ├── index.ts
│   │   │   └── _shared/
│   │   │       └── gemini.ts     # Gemini API client
│   │   ├── stripe-webhook/       # Stripe webhook handler
│   │   │   └── index.ts
│   │   └── generate-pdf/         # PDF report generation
│   │       └── index.ts
│   ├── migrations/               # Database migrations
│   │   ├── 20250101000000_initial_schema.sql
│   │   ├── 20250101000001_add_rls_policies.sql
│   │   └── ...
│   └── config.toml               # Supabase config
│
├── public/
│   ├── hero-body-scan.jpg        # Hero image (to be generated)
│   └── ...
│
├── .env.local                    # Local environment variables
├── .env.example                  # Example env file
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Database Schema

### Tables

#### 1. `users` (Managed by Supabase Auth)
Supabase Auth automatically manages this table. We'll extend it with a custom `user_profiles` table.

#### 2. `user_profiles`
Extends Supabase Auth users with app-specific data.

```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  age_verified BOOLEAN DEFAULT FALSE,
  age_verification_date TIMESTAMPTZ,
  has_used_free_scan BOOLEAN DEFAULT FALSE,
  free_scan_used_at TIMESTAMPTZ,

  -- Biometric data
  height_cm DECIMAL(5,2), -- Height in centimeters (e.g., 175.5)
  height_unit VARCHAR(10) DEFAULT 'cm', -- 'cm' or 'ft/in' for display preference
  last_weight_kg DECIMAL(5,2), -- Last entered weight (for pre-filling)

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);
```

#### 3. `scan_credits`
Tracks user scan credits (purchased and remaining).

```sql
CREATE TABLE scan_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  credits_remaining INTEGER DEFAULT 0,
  credits_purchased INTEGER DEFAULT 0,
  last_purchase_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id)
);

-- RLS Policies
ALTER TABLE scan_credits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own credits"
  ON scan_credits FOR SELECT
  USING (auth.uid() = user_id);

-- Only Edge Functions can update credits (service role)
```

#### 4. `scans`
Stores body scan analysis results (no images stored).

```sql
CREATE TABLE scans (
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

-- Indexes
CREATE INDEX idx_scans_user_id ON scans(user_id);
CREATE INDEX idx_scans_created_at ON scans(created_at DESC);

-- RLS Policies
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scans"
  ON scans FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scans"
  ON scans FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

**`scan_results` JSONB structure**:
```json
{
  "input_data": {
    "height_cm": 175.5,
    "weight_kg": 78.2,
    "bmi": 25.4
  },
  "overall": {
    "body_fat_percentage": { "min": 18, "max": 22 },
    "lean_mass_percentage": { "min": 78, "max": 82 },
    "estimated_fat_mass_kg": { "min": 14.1, "max": 17.2 },
    "estimated_lean_mass_kg": { "min": 61.0, "max": 64.1 }
  },
  "body_parts": {
    "arms": {
      "fat_percentage": { "min": 13, "max": 17 },
      "lean_percentage": { "min": 83, "max": 87 }
    },
    "chest": {
      "fat_percentage": { "min": 15, "max": 19 },
      "lean_percentage": { "min": 81, "max": 85 }
    },
    "abdomen": {
      "fat_percentage": { "min": 22, "max": 28 },
      "lean_percentage": { "min": 72, "max": 78 }
    },
    "legs": {
      "fat_percentage": { "min": 18, "max": 22 },
      "lean_percentage": { "min": 78, "max": 82 }
    },
    "back": {
      "fat_percentage": { "min": 16, "max": 20 },
      "lean_percentage": { "min": 80, "max": 84 }
    }
  },
  "validation": {
    "person_count": 1,
    "is_full_body": true,
    "clothing_coverage": "moderate",
    "image_quality": "good",
    "pose_suitable": true
  },
  "recommendations": [
    "At 175cm and 78kg with 18-22% body fat, you're in a healthy range. Consider incorporating more cardiovascular exercise to reduce overall body fat.",
    "Focus on core strengthening exercises to improve abdominal composition, where you carry slightly more fat.",
    "Maintain current lean muscle mass with resistance training 3-4x per week. Your arms and back show good lean composition."
  ],
  "accuracy_disclaimer": "Estimates are based on visual analysis combined with your height and weight data. Results may vary by ±3-5%. For medical-grade accuracy, consult a healthcare professional with DEXA scan equipment."
}
```

#### 5. `transactions`
Tracks all payment transactions.

```sql
CREATE TABLE transactions (
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

-- Indexes
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_stripe_payment_intent ON transactions(stripe_payment_intent_id);

-- RLS Policies
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);
```

#### 6. `credit_packages`
Defines available credit packages (for dynamic pricing).

```sql
CREATE TABLE credit_packages (
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

-- Seed data
INSERT INTO credit_packages (name, credits, price, discount_percentage, sort_order) VALUES
  ('Single Scan', 1, 9.99, 0, 1),
  ('5-Pack', 5, 39.99, 20, 2),
  ('10-Pack', 10, 69.99, 30, 3);

-- RLS Policies
ALTER TABLE credit_packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active packages"
  ON credit_packages FOR SELECT
  USING (is_active = TRUE);
```

### Database Functions

#### Function: `use_scan_credit`
Decrements user credits atomically.

```sql
CREATE OR REPLACE FUNCTION use_scan_credit(p_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE scan_credits
  SET credits_remaining = credits_remaining - 1,
      updated_at = NOW()
  WHERE user_id = p_user_id
    AND credits_remaining > 0;

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### Function: `add_scan_credits`
Adds credits after successful payment.

```sql
CREATE OR REPLACE FUNCTION add_scan_credits(
  p_user_id UUID,
  p_credits INTEGER,
  p_transaction_id UUID
)
RETURNS VOID AS $$
BEGIN
  -- Upsert credits
  INSERT INTO scan_credits (user_id, credits_remaining, credits_purchased, last_purchase_date)
  VALUES (p_user_id, p_credits, p_credits, NOW())
  ON CONFLICT (user_id)
  DO UPDATE SET
    credits_remaining = scan_credits.credits_remaining + p_credits,
    credits_purchased = scan_credits.credits_purchased + p_credits,
    last_purchase_date = NOW(),
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 5. Authentication

### Providers
1. **Email/Password**: Standard email + password auth
2. **Google OAuth**: Sign in with Google
3. **Magic Link** (optional for V1): Passwordless email link

### Age Verification
- Checkbox on signup: "I confirm I am 18 years or older"
- Store verification in `user_profiles.age_verified`
- Block scan uploads if not verified

### Auth Flow
```
1. User signs up → Supabase creates auth.users entry
2. Trigger creates user_profiles entry
3. Trigger creates scan_credits entry (0 credits)
4. Redirect to /dashboard
```

### Database Trigger for New Users

```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create user profile
  INSERT INTO user_profiles (id)
  VALUES (NEW.id);

  -- Initialize scan credits
  INSERT INTO scan_credits (user_id, credits_remaining, credits_purchased)
  VALUES (NEW.id, 0, 0);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
```

---

## 6. Features & User Flows

### 6.1 Landing Page (Unauthenticated)

**Route**: `/`

**Sections**:
1. **Hero**
   - Headline: "Private Body Composition Analysis in 60 Seconds"
   - Subheadline: "AI-powered body fat analysis. Your images are never stored."
   - CTA: "Get Your Free Scan" → `/auth/signup`
   - Hero image: Stock photo of diverse people in athletic wear

2. **Privacy First**
   - Icon + copy: "Your photos are analyzed in real-time and immediately discarded. We never store images."
   - Trust badges: "End-to-end encrypted", "GDPR compliant"

3. **How It Works**
   - Step 1: Upload a full-body photo
   - Step 2: AI analyzes body composition
   - Step 3: Get detailed report with recommendations

4. **Pricing** (linked from `/pricing`)
   - Free: 1 scan per account
   - Paid: Dynamic packages from `credit_packages` table
   - Clear differentiation: Free = broader ranges, no PDF

5. **FAQ**
   - How accurate is the analysis?
   - What photos work best?
   - Is my data safe?
   - What if I'm not satisfied?
   - How long does it take?

6. **Footer**
   - Privacy Policy | Terms of Service | Contact
   - © 2025 Body Fat View

### 6.2 Sign Up Flow

**Route**: `/auth/signup`

**Fields**:
- Email
- Password
- Confirm password
- ✅ Checkbox: "I confirm I am 18 years or older" (required)
- ✅ Checkbox: "I agree to Terms of Service and Privacy Policy" (required)

**Options**:
- "Sign up with Google" button

**After signup**:
- Verify email (if Resend requires it)
- Redirect to `/dashboard`

### 6.3 Dashboard (Authenticated)

**Route**: `/dashboard`

**Components**:
1. **Credit Display**
   - "You have X scans remaining"
   - If 0 credits: "Buy scans" CTA → `/billing`
   - If eligible for free scan: "You have 1 free scan available!"

2. **Quick Scan CTA**
   - Large button: "Start New Scan" → `/scan`

3. **Scan History**
   - Table/cards of past scans
   - Columns: Date, Weight, Overall BF%, Confidence, Actions (View, Download PDF)
   - Click row → `/scan/[id]`

4. **Progress Tracking Charts** (visible if user has 2+ scans)
   - **Body Fat % Over Time**: Line chart showing body fat % trend
   - **Weight Over Time**: Line chart showing weight trend
   - **Combined View**: Dual-axis chart showing weight + body fat % together
   - Time range selector: 1M, 3M, 6M, 1Y, All

### 6.4 Scan Upload & Analysis

**Route**: `/scan`

**Flow**:

1. **Pre-Upload Checks**
   - Check if user has credits or free scan available
   - Check age verification
   - If not verified: Show modal to verify age

2. **Step 1: Select Scan Mode** (Required)

   **Mode Selection UI**:
   - Two cards side-by-side (mobile: stacked)

   **Quick Scan Card**:
   - Icon/Image preview (pose guide thumbnail)
   - Title: "Quick Scan"
   - Description: "Fast and private. Upload 1 photo with any clothing. Best for quick progress checks."
   - Accuracy badge: "±5-8% accuracy"
   - Photos required: "1 photo"
   - "Select Quick Scan" button

   **Detail Scan Card**:
   - Icon/Image preview (pose guide thumbnails - 2 photos)
   - Title: "Detail Scan"
   - Description: "Maximum precision. Upload 2 photos in minimal clothing for detailed analysis."
   - Accuracy badge: "±2-4% accuracy"
   - Photos required: "2 photos (front + side)"
   - "Select Detail Scan" button (default selected / highlighted)

   **Mode Info Expandable**:
   - "Both modes use your height/weight for improved estimates"
   - "Your photos are never stored - analyzed in real-time and deleted immediately"
   - "Both modes cost the same (1 scan credit)"

3. **Step 2: Height & Weight Input** (Required)

   **Height Input**:
   - If user has saved height in profile: Pre-fill and allow editing
   - If no saved height: Empty fields (required to proceed)
   - Toggle between metric (cm) and imperial (ft/in)
   - Example: "175 cm" or "5'9""
   - Validation: 120cm - 250cm (or 4'0" - 8'2")
   - Checkbox: "Save height to my profile" (checked by default)

   **Weight Input**:
   - Pre-fill with `last_weight_kg` from profile if available
   - Toggle between kg and lbs
   - Example: "78.5 kg" or "173 lbs"
   - Validation: 35kg - 300kg (or 77 - 660 lbs)
   - Auto-save to profile when proceeding (always updated)

   **Display**:
   - Auto-calculate and show BMI: "Your BMI: 25.4"
   - Help text: "Height and weight help improve accuracy of body composition estimates"
   - "Continue" button (disabled until both fields valid)

4. **Step 3: Photo Upload**

   **Quick Scan Mode (1 photo)**:
   - Single upload area
   - Pose guide overlay/image: Full body front view
   - Drag & drop or click to upload
   - File type restriction: JPEG, PNG, HEIC, WebP
   - Max file size: 10MB per photo
   - Preview uploaded image with retake option

   **Detail Scan Mode (2 photos)**:
   - Two upload areas side-by-side
   - **Photo 1 - Front View**:
     - Pose guide: Full body front
     - Label: "Front View (1 of 2)"
     - Upload button
   - **Photo 2 - Side View**:
     - Pose guide: Full body left side
     - Label: "Side View (2 of 2)"
     - Upload button
   - Preview both images with individual retake buttons
   - "Continue" button disabled until both uploaded

   **Option to go back**: Edit scan mode or height/weight

5. **Photo Guidelines** (mode-specific, collapsible)

   **Quick Scan Guidelines**:
   - ✅ Full body visible (head to feet)
   - ✅ Stand straight, arms slightly away from body
   - ✅ Good lighting (natural or bright indoor light)
   - ✅ Any clothing is acceptable (fitted clothing recommended)
   - ⚠️ Avoid thick coats, heavy jackets, or baggy outerwear
   - ❌ No group photos
   - 💡 Tip: Mirror selfies work great!

   **Detail Scan Guidelines**:
   - ✅ Full body visible in both photos (head to feet)
   - ✅ Minimal clothing: Underwear or fitted athletic wear (sports bra + shorts)
   - ✅ Stand straight, arms slightly away from body
   - ✅ Good lighting (front-facing natural or bright indoor light)
   - **Front photo**: Face camera directly, feet shoulder-width apart
   - **Side photo**: Turn 90° to your left, profile fully visible
   - ❌ No group photos
   - ❌ Avoid baggy clothing
   - 💡 Tip: Use a tripod or have someone help for best results

6. **Step 4: Summary Review** (before submission)
   - Display scan mode: "Quick Scan" or "Detail Scan"
   - Display: Height, Weight, BMI
   - Show image preview(s) - 1 or 2 depending on mode
   - Edit buttons for scan mode, height/weight, and images
   - Privacy reminder: "Your photos will be analyzed and immediately deleted"
   - "Analyze My Body" button

7. **Loading State**
   - Animated loader: "Analyzing your image(s)... This may take 30-60 seconds"
   - Progress messages:
     - Quick Scan: "Uploading image..."
     - Detail Scan: "Uploading images..."
     - "Validating photo quality..."
     - "Calculating body composition..."
     - "Generating recommendations..."

8. **Results**
   - If validation fails (major issues):
     - Show error message with specific issue:
       - "We detected multiple people in your image. Please upload a photo with only yourself."
       - "Unable to detect a full body in the image. Please ensure your entire body is visible from head to feet."
       - "Image quality is too low. Please upload a clearer, well-lit photo."
     - **Important**: "Your scan credit was not used."
     - Option to try again (keeps height/weight and mode selection)

   - If clothing warning detected (processed but with warning):
     - **Quick Scan**: "We detected heavy clothing (coat/jacket). This significantly reduces accuracy. Your scan was processed with lower confidence."
     - **Detail Scan**: "We detected more clothing than recommended. For best results, wear minimal clothing (underwear or fitted athletic wear). Your scan was processed with adjusted confidence."
     - Show confidence score adjustment: "Confidence: 42% (reduced due to clothing)"
     - **Note**: Scan credit WAS used (results provided)
     - Redirect to results with warning banner

   - If validation passes (no issues):
     - Redirect to `/scan/[id]` with full results

### 6.5 Scan Result View

**Route**: `/scan/[id]`

**Components**:

1. **Scan Info Card**
   - Scan Mode badge: "Quick Scan" or "Detail Scan"
   - Scan Date: Jan 15, 2025
   - **If clothing warning**: Warning banner at top
     - Icon + "Clothing detected may have reduced accuracy"
     - Brief explanation specific to mode

2. **Input Data Summary Card**
   - Height: 175 cm (5'9")
   - Weight: 78.2 kg (172 lbs)
   - BMI: 25.4

3. **Overall Summary Card**
   - Overall body fat %: "18-22%" (Quick Scan shows wider range)
   - Lean mass %: "78-82%"
   - Estimated fat mass: "14.1-17.2 kg" (31-38 lbs)
   - Estimated lean mass: "61.0-64.1 kg" (134-141 lbs)
   - Confidence score: 85% (or lower if clothing warning)
   - Accuracy note based on mode:
     - Quick Scan: "±5-8% accuracy range"
     - Detail Scan: "±2-4% accuracy range"

4. **Body Visualization**
   - Interactive body map (react-body-highlighter)
   - Color-coded regions: green (lean) → red (fat)
   - Grayed out regions if not visible in photo(s)
   - Hover/click region to see specific % or "Not visible in scan"

5. **Body Part Breakdown Table**
   - Arms: 13-17% fat | 83-87% lean (or "Not visible" if null)
   - Chest: 15-19% fat | 81-85% lean
   - Abdomen: 22-28% fat | 72-78% lean
   - Legs: 18-22% fat | 78-82% lean (or "Not visible" if cropped photo)
   - Back: 16-20% fat | 80-84% lean (or "Not visible" for Quick Scan - no back photo)

5. **Recommendations**
   - Personalized list of 3-5 recommendations
   - Example: "At 175cm and 78kg with 18-22% body fat, you're in a healthy range. Focus on core strengthening exercises..."
   - Recommendations reference height/weight/BMI for context

6. **Accuracy Disclaimer**
   - "Estimates are based on visual analysis combined with your height and weight data. Results may vary by ±3-5%. For medical-grade accuracy, consult a healthcare professional with DEXA scan equipment."

7. **Actions**
   - Button: "Download PDF Report" (if paid tier scan)
   - Button: "Start New Scan" → `/scan`

### 6.6 Billing & Credits

**Route**: `/billing`

**Components**:

1. **Current Balance**
   - "You have X scans remaining"

2. **Purchase Credits**
   - Display credit packages from `credit_packages` table
   - Each package card shows:
     - Number of credits
     - Price
     - Discount % (if applicable)
     - "Buy Now" button → Stripe Checkout

3. **Transaction History**
   - Table of past purchases
   - Columns: Date, Package, Credits, Amount, Status

**Purchase Flow**:
1. User clicks "Buy Now"
2. Create Stripe Checkout session (via Edge Function or API route)
3. Redirect to Stripe Checkout
4. After payment:
   - Stripe webhook → Update `transactions` table
   - Stripe webhook → Call `add_scan_credits()` function
   - Redirect back to `/billing?success=true`

### 6.7 Settings

**Route**: `/settings`

**Sections**:

1. **Profile**
   - Email (read-only, from Supabase Auth)
   - Change password button

2. **Biometric Data**
   - **Height**: Editable field with unit toggle (cm / ft+in)
     - Shows current saved height
     - Update button
   - **Last Weight**: Display only (read-only)
     - Shows: "Last recorded: 78.2 kg on Jan 15, 2025"
     - Note: "Weight is updated each time you create a scan"

3. **Age Verification**
   - Status: "Verified on [date]" or "Not verified"
   - If not verified: Checkbox to verify

4. **Preferences**
   - **Theme**: Toggle between Light / Dark mode
   - **Unit System**: Metric (kg/cm) or Imperial (lbs/ft+in) - affects display throughout app

5. **Account Actions**
   - Delete account (with confirmation)
   - Warning: "This will permanently delete all your scan history and account data"

---

## 7. Supabase Edge Functions

### 7.1 `analyze-body-scan`

**Purpose**: Accepts uploaded image(s) + biometric data, sends to Gemini API, validates results, stores in DB, manages credits.

**Endpoint**: `POST /functions/v1/analyze-body-scan`

**Request**:
```typescript
{
  scanMode: 'quick' | 'detail';
  images: string[]; // Array of base64-encoded image data (1 for quick, 2 for detail)
  userId: string;
  heightCm: number; // e.g., 175.5
  weightKg: number; // e.g., 78.2
}
```

**Flow**:
1. Authenticate request (verify Supabase JWT)
2. Validate input data:
   - Scan mode: 'quick' or 'detail'
   - Images array length: 1 for quick, 2 for detail
   - Height: 120-250 cm
   - Weight: 35-300 kg
3. Calculate BMI: `weight / (height/100)^2`
4. Check if user has credits or free scan available
5. Send images + biometric data to Gemini 2.5 Pro with mode-specific structured prompt
   - **Quick Scan**: Single image inline
   - **Detail Scan**: Two images inline (front + side) in single API call
6. Parse Gemini response (JSON)
7. Validate quality (major issues - don't charge if these fail):
   - `person_count === 1`
   - `is_full_body === true` OR `confidence_score >= 0.4`
   - `image_quality !== "poor"`
8. Check for clothing warnings (still charge, but adjust confidence):
   - **Quick Scan**: Detect heavy clothing (coat, thick jacket)
   - **Detail Scan**: Detect excessive clothing (not minimal/fitted)
   - Reduce confidence score by 15-30% if detected
   - Add warning to validation_issues array
9. If validation passes (or passes with warnings):
   - Deduct credit (call `use_scan_credit()` or mark free scan used)
   - Store results in `scans` table with:
     - `was_charged: true`
     - `scan_mode: 'quick'` or `'detail'`
     - `photos_uploaded: 1` or `2`
     - `height_cm` and `weight_kg`
   - Update `user_profiles.last_weight_kg`
10. If validation fails (major issues):
    - Store results with `was_charged: false`, `validation_passed: false`
    - Don't deduct credit
11. Return scan ID and results

**Response**:
```typescript
{
  success: boolean;
  scanId: string;
  results: ScanResults; // Full JSON
  wasCharged: boolean;
  creditsRemaining: number;
  hasWarnings: boolean; // True if clothing warnings detected
  validationIssues?: string[]; // Major failures or warnings
}
```

**Gemini API Prompts** (mode-specific):

### Quick Scan Prompt (1 image):
```
You are a body composition analysis AI. The user has chosen QUICK SCAN mode with a single photo.
They may be wearing regular clothing. Analyze the provided image along with biometric data.

SCAN MODE: Quick Scan (1 photo, any clothing acceptable)

USER BIOMETRIC DATA:
- Height: {heightCm} cm
- Weight: {weightKg} kg
- BMI: {calculatedBMI}

REQUIREMENTS:

1. Validate the image:
   - Count people (must be exactly 1)
   - Check if full body is visible (head to feet)
   - Assess image quality (lighting, clarity, resolution)
   - Evaluate pose suitability (standing, front-facing preferred)
   - **Clothing assessment**:
     - Set clothing_coverage to "heavy_coat" if thick jacket/coat detected
     - Set clothing_coverage to "baggy" if loose/oversized clothing
     - Set clothing_coverage to "moderate" for regular fitted clothing
     - Set clothing_coverage to "fitted" for tight/athletic clothing
     - Set clothing_coverage to "minimal" for underwear/swimwear

2. Estimate body fat percentage using BOTH visual analysis AND biometric data:
   - IMPORTANT: Provide WIDER ranges (±5-8%) for Quick Scan mode
   - Account for clothing obscuring body contours
   - Overall body fat % range (min/max) - use height, weight, and visual cues
   - Overall lean mass % range (min/max)
   - Estimated fat mass in kg (min/max) - calculate from body fat % and weight
   - Estimated lean mass in kg (min/max) - calculate from lean % and weight
   - Body part breakdown: arms, chest, abdomen, legs, back
   - For each body part: fat % range (min/max) and lean % range (min/max)
   - **IMPORTANT**: If a body part is not clearly visible (cropped, obscured by clothing), return NULL for that body part

3. Provide 3-5 personalized recommendations:
   - Reference the user's height, weight, and BMI in recommendations
   - Tailor advice based on body composition analysis
   - Include specific, actionable fitness/nutrition guidance
   - Highlight body parts with higher fat % for targeted improvement

4. Include confidence score (0.0-1.0):
   - **Quick Scan baseline**: 0.4-0.7 max (due to single photo + clothing)
   - Reduce further for: heavy coats (set to 0.3-0.45), baggy clothing, poor lighting
   - Increase for: fitted clothing, good lighting, clear full body shot

5. Calculate and include input data in response:
   - Height, weight, BMI (as provided)

6. Add accuracy disclaimer mentioning Quick Scan mode and clothing impact

Return JSON in this exact format:
{
  "input_data": { ... },
  "overall": { ... },
  "body_parts": {
    "arms": { ... } or null,
    "chest": { ... } or null,
    "abdomen": { ... },
    "legs": { ... } or null,
    "back": null  // No back photo in Quick Scan
  },
  "validation": {
    "person_count": 1,
    "is_full_body": true,
    "clothing_coverage": "heavy_coat" | "baggy" | "moderate" | "fitted" | "minimal",
    "image_quality": "excellent" | "good" | "fair" | "poor",
    "pose_suitable": true
  },
  "recommendations": [ ... ],
  "accuracy_disclaimer": "Quick Scan estimates with clothing may vary by ±5-8%..."
}
```

### Detail Scan Prompt (2 images: front + side):
```
You are a body composition analysis AI. The user has chosen DETAIL SCAN mode with TWO photos (front + side).
They should be wearing minimal clothing (underwear or fitted athletic wear) for maximum accuracy.

SCAN MODE: Detail Scan (2 photos: front view + left side view, minimal clothing expected)

USER BIOMETRIC DATA:
- Height: {heightCm} cm
- Weight: {weightKg} kg
- BMI: {calculatedBMI}

IMAGES PROVIDED:
- Image 1: Full body front view
- Image 2: Full body left side view

REQUIREMENTS:

1. Validate BOTH images:
   - Count people in each image (must be exactly 1 in each)
   - Check if full body is visible in both (head to feet)
   - Assess image quality for both (lighting, clarity, resolution)
   - Verify poses: front view facing camera, side view showing left profile
   - **Clothing assessment**:
     - Expect "minimal" (underwear) or "fitted" (athletic wear: sports bra + shorts)
     - Set clothing_coverage to "moderate" or "baggy" if more clothing detected
     - Flag as warning if not minimal/fitted clothing

2. Estimate body fat percentage using BOTH images + biometric data:
   - IMPORTANT: Provide TIGHTER ranges (±2-4%) for Detail Scan mode
   - Use front AND side views for more accurate depth/contour assessment
   - Overall body fat % range (min/max) - use height, weight, and visual cues from both angles
   - Overall lean mass % range (min/max)
   - Estimated fat mass in kg (min/max) - calculate from body fat % and weight
   - Estimated lean mass in kg (min/max) - calculate from lean % and weight
   - Body part breakdown: arms, chest, abdomen, legs, back
   - For each body part: fat % range (min/max) and lean % range (min/max)
   - **Use side view** to better estimate back, legs, and overall depth
   - **IMPORTANT**: If a body part is not clearly visible in EITHER image, return NULL for that body part

3. Provide 3-5 personalized recommendations:
   - Reference the user's height, weight, and BMI in recommendations
   - Tailor advice based on body composition analysis
   - Include specific, actionable fitness/nutrition guidance
   - Highlight body parts with higher fat % for targeted improvement

4. Include confidence score (0.0-1.0):
   - **Detail Scan baseline**: 0.6-0.85 max (two angles + minimal clothing)
   - Reduce for: moderate/baggy clothing (down to 0.5-0.65), poor lighting, unclear images
   - Increase for: minimal clothing, excellent lighting, clear full body in both photos

5. Calculate and include input data in response:
   - Height, weight, BMI (as provided)

6. Add accuracy disclaimer mentioning Detail Scan mode with two angles

Return JSON in this exact format:
{
  "input_data": {
    "height_cm": <number>,
    "weight_kg": <number>,
    "bmi": <number>
  },
  "overall": {
    "body_fat_percentage": { "min": <number>, "max": <number> },
    "lean_mass_percentage": { "min": <number>, "max": <number> },
    "estimated_fat_mass_kg": { "min": <number>, "max": <number> },
    "estimated_lean_mass_kg": { "min": <number>, "max": <number> }
  },
  "body_parts": {
    "arms": { ... } or null,
    "chest": { ... } or null,
    "abdomen": { ... },
    "legs": { ... } or null,
    "back": { ... } or null  // Can estimate from side view
  },
  "validation": {
    "person_count": 1,
    "is_full_body": true,
    "clothing_coverage": "minimal" | "fitted" | "moderate" | "baggy",
    "image_quality": "excellent" | "good" | "fair" | "poor",
    "pose_suitable": true
  },
  "recommendations": [ ... ],
  "accuracy_disclaimer": "Detail Scan with two angles and minimal clothing. Estimates may vary by ±2-4%..."
}
```

---

**Note on Gemini API Implementation**:
- Send both images inline in a single API call (Gemini supports up to 3,600 images per request)
- Format: `contents: [prompt, image1_inline_data, image2_inline_data]`
- Each image consumes ~1,120 tokens
- Total request size must be <20MB (iPhone photos typically 2-5MB each = 4-10MB total, well within limit)

---

### 7.2 `stripe-webhook`

**Purpose**: Handle Stripe webhook events (payment success).

**Endpoint**: `POST /functions/v1/stripe-webhook`

**Events**:
- `checkout.session.completed`
- `payment_intent.succeeded`

**Flow**:
1. Verify Stripe signature
2. Parse event
3. If payment succeeded:
   - Extract user_id, credits, amount from metadata
   - Create `transactions` entry with status: 'completed'
   - Call `add_scan_credits(user_id, credits, transaction_id)`
4. Return 200 OK

### 7.3 `generate-pdf` (Optional for V1)

**Purpose**: Generate PDF report from scan results.

**Endpoint**: `POST /functions/v1/generate-pdf`

**Request**:
```typescript
{
  scanId: string;
  userId: string;
}
```

**Flow**:
1. Fetch scan results from DB
2. Generate PDF using library (e.g., Puppeteer, jsPDF)
3. Return PDF as downloadable file or upload to temporary storage

**Alternative**: Generate PDF client-side using `jsPDF` + `html2canvas` (simpler for V1).

---

## 8. Payment Integration

### Stripe Setup

1. **Create Stripe account**
2. **Get API keys**: Publishable key + Secret key
3. **Configure webhook endpoint**: Point to Supabase Edge Function
4. **Create products** (optional): Can dynamically create checkout sessions

### Checkout Flow

**Client-side** (`/billing`):
1. User clicks "Buy Now" on a credit package
2. Call Edge Function or API route: `POST /api/create-checkout-session`
3. Receive Stripe Checkout URL
4. Redirect to Stripe Checkout

**Edge Function/API Route**: `create-checkout-session`
```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  const { userId, packageId, credits, price } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${credits} Body Fat Scans`,
          },
          unit_amount: price * 100, // Convert to cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/billing?canceled=true`,
    metadata: {
      userId,
      credits,
    },
  });

  return Response.json({ url: session.url });
}
```

**Webhook Handler** (Supabase Edge Function):
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'stripe';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')!;
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!
    );
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { userId, credits } = session.metadata;

    // Add credits to user
    // Insert transaction record
    // (Use Supabase client here)
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
});
```

---

## 9. Landing Page Sections

### Hero Section
- **Background**: Gradient (light blue → mint green)
- **Headline**: "Private Body Composition Analysis in 60 Seconds"
- **Subheadline**: "AI-powered body fat analysis. Your images are never stored."
- **CTA Button**: "Get Your Free Scan" (prominent, primary color)
- **Hero Image**: Stock photo (to be generated and placed in `/public/hero-body-scan.jpg`)

### Privacy Section
- **Headline**: "Your Privacy is Our Priority"
- **Icons + Copy**:
  - 🔒 "Images are never stored"
  - ⚡ "Real-time analysis"
  - 🛡️ "GDPR compliant"

### How It Works
- **3 Simple Steps**:
  1. 📏 Enter your height and weight
  2. 📸 Upload a full-body photo
  3. 📊 Get AI-powered body composition analysis with personalized recommendations

### Pricing
- **Free Tier Card**:
  - "1 Free Scan"
  - Personalized recommendations
  - Body part breakdown (broader ranges)
  - No PDF export
  - CTA: "Sign Up Free"

- **Paid Tier Cards**:
  - Display packages from DB (`credit_packages` table)
  - Show discount % if applicable
  - "Most Popular" badge on 5-pack
  - CTA: "Buy Now"

### FAQ
- **Q: How accurate is the analysis?**
  - A: Our AI provides estimates within ±3-5%. Results depend on image quality, clothing, and pose.

- **Q: What photos work best?**
  - A: Full-body, well-lit photos with fitted clothing provide the most accurate results.

- **Q: Is my data safe?**
  - A: Yes. We never store your images. They're analyzed in real-time and immediately discarded.

- **Q: What if I'm not satisfied?**
  - A: If technical issues prevent a valid scan, we don't charge you. Refunds are handled case-by-case.

- **Q: How long does it take?**
  - A: Most scans complete in 30-60 seconds.

### Footer
- **Links**: Privacy Policy | Terms of Service | Contact
- **Copyright**: © 2025 Body Fat View
- **Theme Toggle**: Light/Dark mode switcher

---

## 10. Design System

### Color Palette

**Light Mode**:
- **Primary**: `#3B82F6` (Blue 500)
- **Primary Dark**: `#2563EB` (Blue 600)
- **Secondary**: `#10B981` (Green 500)
- **Accent**: `#06B6D4` (Cyan 500)
- **Background**: `#FFFFFF`
- **Surface**: `#F9FAFB` (Gray 50)
- **Text Primary**: `#111827` (Gray 900)
- **Text Secondary**: `#6B7280` (Gray 500)
- **Border**: `#E5E7EB` (Gray 200)

**Dark Mode**:
- **Primary**: `#60A5FA` (Blue 400)
- **Primary Dark**: `#3B82F6` (Blue 500)
- **Secondary**: `#34D399` (Green 400)
- **Accent**: `#22D3EE` (Cyan 400)
- **Background**: `#0F172A` (Slate 900)
- **Surface**: `#1E293B` (Slate 800)
- **Text Primary**: `#F1F5F9` (Slate 100)
- **Text Secondary**: `#94A3B8` (Slate 400)
- **Border**: `#334155` (Slate 700)

### Typography
- **Font Family**: `Inter` (Google Fonts)
- **Headings**: Font weight 700 (bold)
- **Body**: Font weight 400 (regular)
- **Buttons**: Font weight 600 (semibold)

### Body Fat Visualization Colors
- **Lean (Low Fat)**: `#10B981` (Green 500)
- **Moderate**: `#F59E0B` (Amber 500)
- **High Fat**: `#EF4444` (Red 500)
- **Gradient**: Green → Yellow → Orange → Red

### Spacing
- Use Tailwind's default spacing scale (4px base unit)

### Border Radius
- **Buttons/Cards**: `0.5rem` (8px)
- **Inputs**: `0.375rem` (6px)

### Shadows
- **Card**: `shadow-md`
- **Hover**: `shadow-lg`
- **Modal**: `shadow-2xl`

---

## 11. API Flow Diagrams

### Scan Upload Flow

```
┌─────────┐
│ User    │
└────┬────┘
     │ 1. Upload image
     ▼
┌─────────────────┐
│ /scan (Next.js) │
└────┬────────────┘
     │ 2. Send image (base64) + userId
     ▼
┌──────────────────────────────┐
│ Supabase Edge Function:      │
│ analyze-body-scan            │
└────┬─────────────────────────┘
     │ 3. Check credits/free scan
     ▼
┌──────────────────┐
│ Gemini 2.5 Pro   │ ◄──── 4. Send image
│ Vision API       │ ────► 5. Return JSON
└──────────────────┘
     │ 6. Validate results
     ▼
┌──────────────────┐
│ Quality Check    │
│ - person_count   │
│ - is_full_body   │
│ - confidence     │
└────┬─────────────┘
     │
     ├─► Pass ────► 7a. Deduct credit
     │              8a. Store scan (was_charged: true)
     │              9a. Return results
     │
     └─► Fail ────► 7b. Don't deduct
                    8b. Store scan (was_charged: false)
                    9b. Return error + results
```

### Payment Flow

```
┌─────────┐
│ User    │
└────┬────┘
     │ 1. Click "Buy Now"
     ▼
┌──────────────────────┐
│ /billing (Next.js)   │
└────┬─────────────────┘
     │ 2. POST /api/create-checkout-session
     ▼
┌──────────────────────────┐
│ API Route / Edge Func    │
└────┬─────────────────────┘
     │ 3. Create Stripe Checkout Session
     ▼
┌─────────────┐
│ Stripe API  │
└────┬────────┘
     │ 4. Return checkout URL
     ▼
┌─────────────────┐
│ User redirected │
│ to Stripe       │
└────┬────────────┘
     │ 5. Complete payment
     ▼
┌──────────────────┐
│ Stripe Webhook   │ ──► POST to Supabase Edge Function
└──────────────────┘
     │ 6. Verify signature
     ▼
┌───────────────────────────┐
│ Supabase Edge Function:   │
│ stripe-webhook            │
└────┬──────────────────────┘
     │ 7. Parse event (checkout.session.completed)
     ▼
┌──────────────────┐
│ Database Updates │
│ - transactions   │
│ - scan_credits   │
└──────────────────┘
     │ 8. Redirect user to /billing?success=true
     ▼
┌─────────────────┐
│ User sees       │
│ updated credits │
└─────────────────┘
```

---

## 12. Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Set up Next.js project with Tailwind + shadcn/ui
- [ ] Configure TypeScript, ESLint, Prettier
- [ ] Set up Supabase project (create on dashboard)
- [ ] Create database schema (run migrations)
- [ ] Configure Supabase Auth (email/password + Google OAuth)
- [ ] Set up Resend for email
- [ ] Create basic app structure (routes, layouts)

### Phase 2: Landing Page (Week 1)
- [ ] Build Hero section
- [ ] Build Privacy section
- [ ] Build How It Works section
- [ ] Build Pricing section
- [ ] Build FAQ section
- [ ] Build Footer
- [ ] Implement light/dark mode toggle
- [ ] Add SEO metadata (title, description, OG tags)
- [ ] Optimize performance (image optimization, lazy loading)

### Phase 3: Authentication (Week 2)
- [ ] Build sign-up page with age verification
- [ ] Build sign-in page
- [ ] Implement Google OAuth flow
- [ ] Create protected route wrapper
- [ ] Add auth state management
- [ ] Create user profile initialization (trigger)

### Phase 4: Core Scan Feature (Week 2-3)
- [ ] Build height/weight input form (`HeightWeightForm.tsx`)
  - [ ] Unit conversion logic (cm ↔ ft/in, kg ↔ lbs)
  - [ ] BMI calculation
  - [ ] Pre-fill from user profile
  - [ ] Save to profile option
- [ ] Build scan upload UI (`/scan`)
- [ ] Implement multi-step scan flow (height/weight → image upload → review)
- [ ] Implement drag & drop image upload
- [ ] Create Supabase Edge Function: `analyze-body-scan`
  - [ ] Accept height/weight parameters
  - [ ] Update Gemini prompt with biometric data
  - [ ] Store height/weight in scans table
  - [ ] Update user_profiles.last_weight_kg
- [ ] Integrate Gemini 2.5 Pro API
- [ ] Implement quality validation logic
- [ ] Build loading state with progress indicator
- [ ] Build scan result view (`/scan/[id]`)
  - [ ] Display input data (height, weight, BMI)
  - [ ] Show fat mass and lean mass in kg/lbs
- [ ] Implement body visualization (react-body-highlighter)
- [ ] Display body part breakdown table
- [ ] Display recommendations (now personalized with height/weight)

### Phase 5: Credits & Billing (Week 3)
- [ ] Build billing page (`/billing`)
- [ ] Display current credit balance
- [ ] Fetch and display credit packages
- [ ] Set up Stripe account and get API keys
- [ ] Create Stripe Checkout session (API route or Edge Function)
- [ ] Implement purchase flow
- [ ] Create Supabase Edge Function: `stripe-webhook`
- [ ] Test webhook locally (Stripe CLI)
- [ ] Implement transaction history display

### Phase 6: Dashboard & History (Week 4)
- [ ] Build dashboard page
- [ ] Display credit balance
- [ ] Implement scan history table/cards (include weight column)
- [ ] Build body fat trend chart (Recharts)
- [ ] Build weight trend chart
- [ ] Build combined weight + body fat chart (dual-axis)
- [ ] Implement time range selector (1M, 3M, 6M, 1Y, All)
- [ ] Implement scan filtering/sorting

### Phase 7: PDF Export (Week 4)
- [ ] Research PDF generation library (jsPDF, Puppeteer, or Edge Function)
- [ ] Design PDF template
- [ ] Implement PDF generation (client-side or server-side)
- [ ] Add "Download PDF" button to scan results
- [ ] Test PDF output across devices

### Phase 8: Settings & Polish (Week 5)
- [ ] Build settings page
- [ ] Implement height management (editable, with unit conversion)
- [ ] Display last weight (read-only)
- [ ] Add unit system preference (metric/imperial)
- [ ] Implement password change
- [ ] Implement account deletion
- [ ] Add theme toggle to settings
- [ ] Write Privacy Policy page
- [ ] Write Terms of Service page
- [ ] Add legal disclaimers to scan results

### Phase 9: Testing & Optimization (Week 5-6)
- [ ] End-to-end testing (Playwright or Cypress)
- [ ] Test payment flow (Stripe test mode)
- [ ] Test free scan vs paid scan logic
- [ ] Test quality validation edge cases
- [ ] Test height/weight input and unit conversions
- [ ] Test BMI calculations
- [ ] Test weight tracking across multiple scans
- [ ] Verify height/weight stored correctly in scans table
- [ ] Performance optimization (Lighthouse audit)
- [ ] SEO optimization (meta tags, sitemap, robots.txt)
- [ ] Mobile responsiveness testing (especially height/weight forms)
- [ ] Cross-browser testing

### Phase 10: Deployment (Week 6)
- [ ] Set up Vercel project
- [ ] Configure environment variables on Vercel
- [ ] Deploy to production
- [ ] Set up custom domain (bodyfatview.com)
- [ ] Configure DNS
- [ ] Deploy Supabase Edge Functions
- [ ] Enable Stripe live mode
- [ ] Test production environment
- [ ] Set up error monitoring (Sentry or similar)
- [ ] Set up analytics (Vercel Analytics, Google Analytics, or Plausible)

---

## 13. Environment Variables

### Next.js (`.env.local`)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Resend (optional, if using for custom emails)
RESEND_API_KEY=re_...
```

### Supabase Edge Functions (`.env`)

```bash
# Gemini API
GEMINI_API_KEY=your-gemini-api-key

# Stripe (for webhook function)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 14. Legal & Compliance

### Privacy Policy
Must include:
- Data collection: Email, scan results (JSON only, no images)
- Data storage: Supabase (specify region)
- Data retention: How long scans are stored
- User rights: Access, deletion, export (GDPR)
- Cookies: If using analytics
- Third parties: Stripe, Gemini API (data processors)
- Age restriction: 18+

### Terms of Service
Must include:
- Service description
- User responsibilities (accurate age, appropriate images)
- Age requirement: 18+
- Disclaimers: Not medical advice, accuracy limitations
- Refund policy
- Account termination conditions
- Limitation of liability
- Governing law

### Health Disclaimers
**On scan results page**:
> "This analysis is for informational purposes only and is not a substitute for professional medical advice. Body fat estimates may vary by ±3-5% based on image quality, clothing, and pose. Consult a healthcare provider for medical-grade body composition analysis."

### GDPR Compliance
- [ ] Cookie consent banner (if using analytics)
- [ ] Data export feature (user can download their scan history)
- [ ] Account deletion feature (cascade delete all user data)
- [ ] Privacy Policy clearly explains data usage

---

## 15. Future Enhancements (V2+)

### DEXA Scan Calibration (V2)
Allow users to upload previous DEXA scan results to improve accuracy and calibrate AI estimates.

**Concept**:
- User uploads DEXA scan report (PDF/image)
- Extract body fat % and date from report (OCR or manual entry)
- Store as baseline calibration data
- Use DEXA data to adjust future AI scan estimates
- Show comparison: "Your DEXA scan showed 19% on Dec 1. Our latest AI estimate: 20-24%"

**Benefits**:
- Increases trust and accuracy
- Allows users to validate AI results against medical-grade tests
- Personalized calibration improves subsequent scans

**Implementation**:
- Add `dexa_scans` table (user_id, body_fat_percentage, scan_date, report_url)
- Update Gemini prompt to include DEXA baseline if available
- UI: Upload section in Settings or during scan flow

### Other V2 Ideas
- **3D Body Scan**: Use multiple angles for more accurate analysis
- **Progress Photos**: Side-by-side comparison view
- **Meal Plan Integration**: Partner with nutrition services
- **Workout Recommendations**: Link to exercise libraries
- **Social Features**: Share progress (opt-in, privacy-focused)
- **Mobile App**: Native iOS/Android apps
- **API Access**: For fitness apps/wearables to integrate

---

## Tech Stack Summary

| Category | Technology |
|----------|-----------|
| **Frontend Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Auth** | Supabase Auth |
| **Database** | Supabase (PostgreSQL) |
| **Backend** | Supabase Edge Functions (Deno) |
| **AI/Vision** | Google Gemini 2.5 Pro |
| **Payments** | Stripe |
| **Email** | Resend (via Supabase Auth) |
| **Body Visualization** | react-body-highlighter |
| **Charts** | Recharts |
| **Hosting** | Vercel |
| **Domain** | bodyfatview.com |

---

## Next Steps

1. **Generate hero image**: Use Gemini to create `/public/hero-body-scan.jpg`
2. **Create Supabase project**: Set up on Supabase dashboard, get API keys
3. **Set up Stripe account**: Get test API keys
4. **Set up Resend account**: Get API key, configure SMTP
5. **Initialize Next.js project**: Run `npx create-next-app@latest bodyfatview`
6. **Install dependencies**: Tailwind, shadcn/ui, Supabase client, etc.
7. **Run database migrations**: Apply schema to Supabase
8. **Start coding**: Begin with Phase 1 (Foundation)

---

**End of Specification**

Ready to start building! 🚀
