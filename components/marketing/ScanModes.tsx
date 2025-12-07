import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Lightbulb } from "lucide-react";

export function ScanModes() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-4">
            Choose Your <span className="text-blue-600">Scan Mode</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Both modes provide detailed body composition analysis. Choose based on your privacy
            preference and accuracy needs.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto mb-12">
          {/* Quick Scan Card */}
          <Card className="relative overflow-hidden p-8 transition-all hover:shadow-2xl border-2 border-gray-200 dark:border-slate-700 group">
            <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 text-sm px-4 py-1.5">
              Best for Privacy
            </Badge>

            <h3 className="mb-6 text-3xl font-bold">Quick Scan</h3>

            <div className="space-y-4 text-base mb-8">
              <div className="flex items-start gap-3">
                <span className="font-bold min-w-[140px]">Photos Required:</span>
                <span className="text-gray-600 dark:text-gray-400">1 photo (front view)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold min-w-[140px]">Clothing:</span>
                <span className="text-gray-600 dark:text-gray-400">Any clothing (avoid heavy coats)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold min-w-[140px]">Time:</span>
                <span className="text-gray-600 dark:text-gray-400">~30 seconds</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold min-w-[140px]">Confidence:</span>
                <span className="text-gray-600 dark:text-gray-400">40-70% baseline</span>
              </div>
            </div>

            <div>
              <p className="mb-4 font-bold text-lg">Best For:</p>
              <ul className="space-y-3">
                {[
                  "Privacy-conscious users",
                  "Quick progress checks",
                  "Staying fully clothed",
                  "Initial assessments",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Detail Scan Card - Highlighted */}
          <Card className="relative overflow-hidden p-8 shadow-2xl border-2 border-blue-500 dark:border-blue-400 ring-4 ring-blue-500/20 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-10 rounded-bl-full"></div>
            
            <Badge className="mb-6 bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 text-sm px-4 py-1.5">
              Most Popular
            </Badge>

            <h3 className="mb-6 text-3xl font-bold">Detail Scan</h3>

            <div className="space-y-4 text-base mb-8">
              <div className="flex items-start gap-3">
                <span className="font-bold min-w-[140px]">Photos Required:</span>
                <span className="text-gray-600 dark:text-gray-400">2 photos (front + side)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold min-w-[140px]">Clothing:</span>
                <span className="text-gray-600 dark:text-gray-400">
                  Minimal (underwear or fitted athletic wear)
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold min-w-[140px]">Time:</span>
                <span className="text-gray-600 dark:text-gray-400">~1-2 minutes</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold min-w-[140px]">Confidence:</span>
                <span className="text-gray-600 dark:text-gray-400">60-85% baseline</span>
              </div>
            </div>

            <div>
              <p className="mb-4 font-bold text-lg">Best For:</p>
              <ul className="space-y-3">
                {[
                  "Serious fitness tracking",
                  "Maximum precision",
                  "Detailed progress tracking",
                  "Body recomposition goals",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        {/* Note */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 p-6 border-2 border-blue-100 dark:border-blue-900">
            <Lightbulb className="mt-0.5 h-6 w-6 flex-shrink-0 text-blue-600 dark:text-blue-400" />
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="font-bold">Both modes cost the same (1 scan credit)</strong> and never store your photos.
              Your privacy is protected regardless of which mode you choose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
