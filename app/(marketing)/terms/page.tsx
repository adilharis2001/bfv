import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Terms of Service - Body Fat View",
  description: "Terms of service for Body Fat View body composition analysis service.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-16 md:py-24">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">Terms of Service</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last updated: January 5, 2026
          </p>
        </div>

        <Separator />

        {/* Agreement */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Agreement to Terms</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            By accessing or using Body Fat View, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our service.
          </p>
        </section>

        {/* Service Description */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Service Description</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Body Fat View provides AI-powered body composition analysis for fitness tracking purposes. We estimate body fat percentage and body composition using computer vision and machine learning.
          </p>
        </section>

        {/* Age Requirement */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Age Requirement</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You must be 18 years or older to use this service. By creating an account, you confirm that you meet this requirement.
          </p>
        </section>

        {/* Unsuitable Use */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">⚠️ Service Limitations</h2>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 space-y-3">
            <h3 className="text-xl font-semibold text-red-900 dark:text-red-100">
              This Service is NOT Suitable For:
            </h3>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Pregnant or postpartum individuals (within 12 months of giving birth)</li>
              <li>Children under 18 years of age</li>
              <li>Individuals with eating disorders or body dysmorphia</li>
              <li>Medical diagnosis, treatment, or clinical decision-making</li>
            </ul>
            <p className="text-sm text-gray-600 dark:text-gray-400 pt-2">
              If any of these apply to you, do NOT use this service.
            </p>
          </div>
        </section>

        {/* Disclaimers */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Important Disclaimers</h2>
          <div className="space-y-3">
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                Not Medical Advice
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                This service is NOT a medical device and does NOT provide medical advice, diagnosis, or treatment. Body composition estimates are for fitness tracking purposes only.
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                Accuracy Limitations
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                AI-generated estimates have NOT been validated against medical-grade body composition testing (DEXA, Bod Pod, etc.). Actual body fat percentage may differ significantly from our estimates.
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                Third-Party Data Processing
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Your photos are processed by Google&apos;s Gemini AI and may be retained for up to 18 months. We do NOT control Google&apos;s data retention practices.
              </p>
            </div>
          </div>
        </section>

        {/* User Responsibilities */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Your Responsibilities</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            You agree to:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Provide accurate age verification (18+ only)</li>
            <li>Upload appropriate images (no nudity, no minors, no third parties without consent)</li>
            <li>Not use the service for medical, diagnostic, or treatment purposes</li>
            <li>Not share your account credentials</li>
            <li>Not attempt to reverse-engineer, abuse, or exploit the service</li>
          </ul>
        </section>

        {/* Payment Terms */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Payment and Credits</h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold mb-2">Free Tier</h3>
              <ul className="list-disc ml-6 space-y-1 text-gray-700 dark:text-gray-300">
                <li>1 free scan per account (lifetime)</li>
                <li>Cannot be transferred or refunded</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Paid Credits</h3>
              <ul className="list-disc ml-6 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Credits are purchased through Stripe</li>
                <li>Credits expire 12 months after purchase</li>
                <li>Credits are non-transferable and non-refundable (except as stated in Refund Policy)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Refund Policy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Refund Policy</h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold mb-2">Eligible for Refund:</h3>
              <ul className="list-disc ml-6 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Technical failures (Edge Function errors, no results returned)</li>
                <li>Credits charged despite validation failure</li>
                <li>Duplicate charges</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">NOT Eligible for Refund:</h3>
              <ul className="list-disc ml-6 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Dissatisfaction with estimate accuracy</li>
                <li>Disagreement with AI results</li>
                <li>After using more than 50% of purchased credits</li>
                <li>More than 14 days after purchase date</li>
                <li>Expired credits</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Refund Process:</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Contact support@bodyfatview.com within 14 days of purchase with your transaction ID. Partial refunds calculated as: (Price ÷ credits purchased) × unused credits.
              </p>
            </div>
          </div>
        </section>

        {/* Account Termination */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Account Termination</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We may suspend or terminate your account if you:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Violate these Terms of Service</li>
            <li>Engage in fraudulent activity (fake accounts, chargebacks, etc.)</li>
            <li>Upload inappropriate content (nudity, minors, offensive material)</li>
            <li>Abuse the service or attempt to exploit vulnerabilities</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed pt-3">
            You may delete your account at any time from Settings. Unused credits are forfeited upon account deletion.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Limitation of Liability</h2>
          <div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-6 space-y-3">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>We are NOT liable for inaccurate body composition estimates</li>
              <li>We are NOT liable for decisions made based on our analysis</li>
              <li>We are NOT liable for data retained by third-party processors (Google)</li>
              <li>We are NOT liable for health consequences related to fitness tracking</li>
              <li>Total liability is limited to the amount you paid in the last 12 months</li>
            </ul>
          </div>
        </section>

        {/* Intellectual Property */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Intellectual Property</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            All content, branding, and technology on Body Fat View is owned by us or our licensors. You may not copy, modify, or redistribute our content without permission.
          </p>
        </section>

        {/* Governing Law */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Governing Law</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            These Terms are governed by the laws of [Your Jurisdiction]. Any disputes will be resolved in [Your Jurisdiction] courts.
          </p>
        </section>

        {/* Changes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Changes to Terms</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We may update these Terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Questions about these Terms? Contact us at:
          </p>
          <div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-4">
            <p className="font-mono text-sm text-gray-800 dark:text-gray-200">
              legal@bodyfatview.com
            </p>
          </div>
        </section>

        <Separator />

        <p className="text-sm text-gray-500 dark:text-gray-400">
          This is a placeholder Terms of Service. Consult with a legal professional before launching.
        </p>
      </div>
    </div>
  );
}
