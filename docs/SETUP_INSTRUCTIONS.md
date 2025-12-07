# Setup Instructions - Body Fat View

This guide will help you complete the Phase 1 setup and prepare for development.

## ✅ What's Already Done

Phase 1 (Foundation) is complete! Here's what's been set up:

- ✅ Next.js 15 with TypeScript and App Router
- ✅ Tailwind CSS v3 configured
- ✅ shadcn/ui dependencies installed
- ✅ ESLint and Prettier configured
- ✅ Supabase client libraries installed
- ✅ Environment variables file created (`.env.local`)
- ✅ Project structure (routes, layouts, components folders)
- ✅ Database migration files created
- ✅ Type definitions for all data models
- ✅ Supabase middleware for auth session management

## 🔧 What You Need to Do

### 1. Set Up Supabase Database

You need to run the database migrations in your Supabase project to create all the tables.

#### Steps:

1. **Go to your Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `ewfkdhcqlfietozszxfm`

2. **Open the SQL Editor**
   - In the left sidebar, click "SQL Editor"
   - Click "New query"

3. **Run Migration 1: Initial Schema**
   - Open file: `supabase/migrations/20250101000000_initial_schema.sql`
   - Copy the entire contents
   - Paste into the SQL Editor
   - Click "Run" or press `Cmd/Ctrl + Enter`
   - You should see: "Initial schema created successfully!"

4. **Run Migration 2: RLS Policies**
   - Open file: `supabase/migrations/20250101000001_add_rls_policies.sql`
   - Copy the entire contents
   - Paste into the SQL Editor
   - Click "Run"
   - You should see: "RLS policies created successfully!"

5. **Run Migration 3: Database Functions**
   - Open file: `supabase/migrations/20250101000002_add_database_functions.sql`
   - Copy the entire contents
   - Paste into the SQL Editor
   - Click "Run"
   - You should see: "Database functions and triggers created successfully!"

6. **Verify the Setup**
   - In Supabase Dashboard, go to "Table Editor"
   - You should see these tables:
     - `user_profiles`
     - `scan_credits`
     - `scans`
     - `transactions`
     - `credit_packages`
   - The `credit_packages` table should have 3 rows (Single Scan, 5-Pack, 10-Pack)

### 2. Configure Supabase Auth (Optional for Phase 1, Required for Phase 3)

#### Enable Email/Password Authentication:

1. Go to **Authentication → Providers** in Supabase Dashboard
2. Enable **Email** provider (should be enabled by default)
3. Configure email settings:
   - You can use Supabase's default email service for now
   - Or configure Resend SMTP (optional):
     - Go to **Authentication → Configuration → SMTP Settings**
     - Enter your Resend SMTP credentials

#### Enable Google OAuth (Optional):

1. Go to **Authentication → Providers**
2. Enable **Google** provider
3. Add your Google OAuth credentials:
   - Get them from [Google Cloud Console](https://console.cloud.google.com)
   - Create OAuth 2.0 Client ID
   - Add authorized redirect URI: `https://ewfkdhcqlfietozszxfm.supabase.co/auth/v1/callback`

### 3. Test the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see the landing page with:
- "Private Body Composition Analysis in 60 Seconds"
- A "Get Your Free Scan" button

### 4. Verify Environment Variables

Your `.env.local` file already has:
- ✅ Supabase URL and keys
- ✅ Gemini API key
- ✅ Resend API key

Still needed (for Phase 5):
- ⏸️ Stripe keys - Get from [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)

## 📁 Project Structure Overview

```
/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Public pages (landing, pricing, etc.)
│   │   ├── layout.tsx
│   │   └── page.tsx              # Homepage
│   ├── (app)/                    # Authenticated app pages
│   │   ├── layout.tsx
│   │   └── dashboard/
│   │       └── page.tsx
│   ├── auth/                     # Auth pages
│   │   └── signin/
│   │       └── page.tsx
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
│
├── components/
│   ├── ui/                       # shadcn/ui components (will be added in Phase 2+)
│   ├── marketing/                # Landing page components (Phase 2)
│   ├── app/                      # App components (Phase 4+)
│   └── shared/                   # Shared components
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser Supabase client
│   │   ├── server.ts             # Server Supabase client
│   │   └── middleware.ts         # Auth middleware
│   ├── types.ts                  # TypeScript type definitions
│   └── utils.ts                  # Utility functions (cn for className merging)
│
├── supabase/
│   ├── migrations/               # Database migration SQL files
│   │   ├── 20250101000000_initial_schema.sql
│   │   ├── 20250101000001_add_rls_policies.sql
│   │   └── 20250101000002_add_database_functions.sql
│   └── functions/                # Edge Functions (Phase 4+)
│
├── .env.local                    # Environment variables (not committed to git)
├── .env.example                  # Example env file (template)
├── middleware.ts                 # Next.js middleware (handles auth sessions)
└── README.md                     # Project readme
```

## 🗄️ Database Schema Overview

### Tables Created:

1. **`user_profiles`** - Extended user data
   - Links to `auth.users`
   - Stores: age verification, height, weight, unit preferences

2. **`scan_credits`** - Credit tracking
   - One row per user
   - Tracks: credits remaining, credits purchased, expiration date

3. **`scans`** - Scan results
   - Stores: scan mode, height/weight at time of scan, AI results (JSON)
   - **IMPORTANT**: Images are NEVER stored, only analysis results

4. **`transactions`** - Payment history
   - Tracks: Stripe payment IDs, credits purchased, amount paid

5. **`credit_packages`** - Available packages
   - Pre-seeded with 3 packages: Single Scan, 5-Pack, 10-Pack

### Database Functions:

- `handle_new_user()` - Auto-creates profile + credits when user signs up
- `use_scan_credit(user_id)` - Atomically decrements credits
- `add_scan_credits(user_id, credits, transaction_id)` - Adds credits after purchase
- `can_use_free_scan(user_id)` - Checks free scan eligibility
- `mark_free_scan_used(user_id)` - Marks free scan as used

## 🚀 Next Steps

### Phase 2: Landing Page (Next)

You'll build:
- Hero section
- Privacy section
- How It Works section
- Pricing section
- FAQ section
- Footer

### Phase 3: Authentication

You'll implement:
- Sign up page with age verification
- Sign in page
- Google OAuth integration
- Protected routes

### Phase 4: Core Scan Feature

You'll build:
- Scan mode selection (Quick vs Detail)
- Height/weight input form
- Photo upload interface
- Supabase Edge Function for Gemini AI analysis
- Scan results display page

## ❓ Troubleshooting

### Build fails with Tailwind errors
- Make sure you have Tailwind v3 (not v4): `npm list tailwindcss`
- If v4, run: `npm install -D tailwindcss@^3`

### Supabase connection issues
- Verify your `.env.local` has the correct Supabase URL and keys
- Check that the keys match your Supabase dashboard (Settings → API)

### Database migration errors
- Make sure you run migrations in order (000000, then 000001, then 000002)
- Check for syntax errors in the SQL output
- Verify you're connected to the correct Supabase project

### TypeScript errors
- Run `npm run build` to check for type errors
- Make sure all dependencies are installed: `npm install`

## 📚 Useful Commands

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier

# Database (via Supabase Dashboard)
# - SQL Editor: Run migrations and queries
# - Table Editor: View and edit data
# - Auth: Configure authentication
```

## 🔗 Important Links

- **Supabase Dashboard**: https://supabase.com/dashboard/project/ewfkdhcqlfietozszxfm
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **shadcn/ui Docs**: https://ui.shadcn.com
- **Gemini API Docs**: https://ai.google.dev/docs

---

**Phase 1 Complete! ✅**

Your foundation is ready. The database migrations need to be run in Supabase, then you can start building the landing page (Phase 2).
