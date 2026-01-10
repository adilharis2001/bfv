import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Privacy Policy - Body Fat View",
  description: "Privacy policy for Body Fat View body composition analysis service.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-16 md:py-24">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last updated: January 5, 2026
          </p>
        </div>

        <Separator />

        {/* Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Introduction</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Body Fat View (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered body composition analysis service.
          </p>
        </section>

        {/* Data Collection */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Information We Collect</h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-semibold mb-2">Account Information</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Email address (for authentication)</li>
                <li>Age verification status (18+ confirmation)</li>
                <li>Account creation and login timestamps</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Biometric Data</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Height and weight (entered by you for analysis)</li>
                <li>Unit preference (metric or imperial)</li>
                <li>Body composition analysis results (JSON data only, no images)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Payment Information</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Payment transactions are processed by Stripe</li>
                <li>We store transaction IDs and credit purchase history</li>
                <li>We do NOT store credit card information</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Third-Party Processing */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">⚠️ Third-Party Data Processing</h2>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 space-y-3">
            <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-100">
              Google Gemini AI Processing
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Important:</strong> When you upload photos for body composition analysis, your images are sent to Google&apos;s Gemini AI API for processing.
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Data Retention:</strong> Google may retain your image data for up to 18 months according to their privacy policy
              </li>
              <li>
                <strong>We Do NOT Store Images:</strong> We delete images immediately after receiving analysis results from Google
              </li>
              <li>
                <strong>No Control Over Google:</strong> We cannot delete data stored by Google or control their retention practices
              </li>
              <li>
                <strong>Google&apos;s Policy:</strong> Your data is subject to{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google&apos;s Privacy Policy
                </a>
              </li>
            </ul>
            <p className="text-sm text-gray-600 dark:text-gray-400 pt-2">
              If maximum privacy is required, please do not use this service.
            </p>
          </div>
        </section>

        {/* How We Use Data */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">How We Use Your Information</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Provide body composition analysis results</li>
            <li>Track your fitness progress over time</li>
            <li>Process payments and manage scan credits</li>
            <li>Send account-related emails (authentication, receipts)</li>
            <li>Improve our AI analysis algorithms (aggregated, anonymized data only)</li>
          </ul>
        </section>

        {/* Data Storage */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Data Storage and Security</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>All data is stored on Supabase (PostgreSQL database)</li>
            <li>Data is encrypted in transit (HTTPS/TLS)</li>
            <li>Database access is restricted with Row Level Security (RLS) policies</li>
            <li>Images are NEVER stored on our servers (deleted immediately after analysis)</li>
          </ul>
        </section>

        {/* Your Rights (GDPR) */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Your Privacy Rights</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You have the right to:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Access:</strong> Request a copy of your data
            </li>
            <li>
              <strong>Correction:</strong> Update inaccurate information
            </li>
            <li>
              <strong>Deletion:</strong> Delete your account and all associated data (except data retained by Google)
            </li>
            <li>
              <strong>Export:</strong> Download your scan history and results
            </li>
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400 pt-2">
            <strong>Note:</strong> We cannot delete data stored by third-party processors (Google Gemini). Contact them directly for data deletion requests.
          </p>
        </section>

        {/* Cookies */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Cookies and Tracking</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We use essential cookies for:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Authentication (Supabase session cookies)</li>
            <li>Theme preference (light/dark mode)</li>
            <li>Security and fraud prevention</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed pt-3">
            We do NOT use third-party analytics or advertising cookies.
          </p>
        </section>

        {/* Children */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Children&apos;s Privacy</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Our service is NOT intended for individuals under 18 years of age. We do not knowingly collect data from children. If you believe a child has provided us with personal information, contact us immediately.
          </p>
        </section>

        {/* Changes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Changes to This Policy</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            If you have questions about this Privacy Policy or your data, contact us at:
          </p>
          <div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-4">
            <p className="font-mono text-sm text-gray-800 dark:text-gray-200">
              privacy@bodyfatview.com
            </p>
          </div>
        </section>

        <Separator />

        <p className="text-sm text-gray-500 dark:text-gray-400">
          This is a placeholder policy. Consult with a legal professional before launching.
        </p>
      </div>
    </div>
  );
}
