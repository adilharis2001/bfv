# Body Fat View

AI-powered body composition analysis SaaS platform built with Next.js 15, Supabase, and Google Gemini AI.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **Database**: PostgreSQL (Supabase)
- **AI**: Google Gemini 2.5 Pro
- **Payments**: Stripe
- **Email**: Resend (via Supabase Auth)
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Google Gemini API key (for Phase 4)
- Stripe account (for Phase 5)

### Installation

1. **Clone and install dependencies**

```bash
npm install
```

2. **Set up environment variables**

Copy the `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual API keys:

- **Supabase**: Get from [Supabase Dashboard](https://supabase.com/dashboard) → Settings → API
- **Gemini AI**: Get from [Google AI Studio](https://aistudio.google.com/app/apikey)
- **Stripe**: Get from [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys) (use test keys for development)
- **Resend**: Get from [Resend Dashboard](https://resend.com/api-keys) (optional for Phase 1)

3. **Set up Supabase database**

Run the database migrations in your Supabase project:

- Go to Supabase Dashboard → SQL Editor
- Run the migration files in `supabase/migrations/` in order

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
├── app/                      # Next.js App Router
│   ├── (marketing)/          # Public landing pages
│   ├── (app)/               # Authenticated app pages
│   ├── auth/                # Authentication pages
│   └── api/                 # API routes
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── marketing/           # Landing page components
│   ├── app/                 # App components
│   └── shared/              # Shared components
├── lib/
│   ├── supabase/            # Supabase client configs
│   ├── types.ts             # TypeScript types
│   └── utils.ts             # Utility functions
├── supabase/
│   ├── functions/           # Edge Functions
│   └── migrations/          # Database migrations
└── public/                  # Static assets
```

## Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Implementation Phases

- [x] **Phase 1**: Foundation - Next.js, TypeScript, Tailwind, Supabase setup
- [ ] **Phase 2**: Landing Page
- [ ] **Phase 3**: Authentication
- [ ] **Phase 4**: Core Scan Feature
- [ ] **Phase 5**: Credits & Billing
- [ ] **Phase 6**: Dashboard & History
- [ ] **Phase 7**: PDF Export
- [ ] **Phase 8**: Settings & Polish
- [ ] **Phase 9**: Testing & Optimization
- [ ] **Phase 10**: Deployment

See [INITIAL_SPEC.md](docs/INITIAL_SPEC.md) for full specification.

## Database Setup

### Supabase Configuration

1. **Enable Auth Providers**
   - Go to Authentication → Providers
   - Enable Email/Password
   - (Optional) Enable Google OAuth

2. **Run Migrations**
   - Go to SQL Editor
   - Copy and paste migration files from `supabase/migrations/`
   - Execute in order

3. **Configure Email Templates** (Optional)
   - Go to Authentication → Email Templates
   - Customize signup, password reset emails
   - Configure Resend SMTP if desired

## Environment Variables Reference

| Variable | Required | Phase | Description |
|----------|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | 1 | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | 1 | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | 1 | Supabase service role key |
| `GEMINI_API_KEY` | ⏸️ | 4 | Google Gemini AI API key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ⏸️ | 5 | Stripe publishable key |
| `STRIPE_SECRET_KEY` | ⏸️ | 5 | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | ⏸️ | 5 | Stripe webhook secret |
| `RESEND_API_KEY` | ⏸️ | 1+ | Resend API key (optional) |
| `NEXT_PUBLIC_SITE_URL` | ✅ | 1 | Site URL (localhost for dev) |

## Contributing

This is a private project. For questions, contact the development team.

## License

Proprietary - All rights reserved
