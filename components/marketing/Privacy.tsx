import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Lock, Shield, FileText, AlertCircle } from "lucide-react";

export function Privacy() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-slate-950">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-4">
            Built with <span className="text-emerald-600">Privacy</span> in Mind
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your privacy matters. Here's our commitment to protecting your data.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          {/* Card 1: No Image Storage */}
          <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-gray-100 dark:border-slate-800">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg">
              <Lock className="h-7 w-7 text-white" />
            </div>
            <h3 className="mb-3 text-xl font-bold">Images Never Stored</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Your photos are processed instantly and immediately deleted. We only save your body
              composition results (percentages and recommendations).
            </p>
          </Card>

          {/* Card 2: Secure & Compliant */}
          <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-gray-100 dark:border-slate-800">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <h3 className="mb-3 text-xl font-bold">Enterprise-Grade Security</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              End-to-end encrypted transmission. GDPR, CCPA, and SOC 2 compliant data handling.
              Your data is protected at every step.
            </p>
          </Card>

          {/* Card 3: Full Transparency */}
          <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-gray-100 dark:border-slate-800">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-lg">
              <FileText className="h-7 w-7 text-white" />
            </div>
            <h3 className="mb-3 text-xl font-bold">Clear Privacy Policy</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              No hidden data practices. Read exactly what we collect, how we process it, and your
              rights. Full transparency guaranteed.
            </p>
          </Card>
        </div>

        {/* Compact Important Notice */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4 rounded-2xl border-2 border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 p-6 shadow-md">
            <AlertCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-amber-600 dark:text-amber-400" />
            <div className="flex-1">
              <p className="font-semibold text-amber-900 dark:text-amber-200 mb-2">
                Third-Party Processing Notice
              </p>
              <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                Your photos are processed by Google's Gemini AI. While we don't store images, Google may retain data per their{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline hover:text-amber-900 dark:hover:text-amber-100"
                >
                  privacy policy
                </a>
                .{" "}
                <Link href="/privacy" className="font-medium underline hover:text-amber-900 dark:hover:text-amber-100">
                  Learn more
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
