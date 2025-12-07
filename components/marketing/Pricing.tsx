import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export async function Pricing() {
  // Fetch credit packages from Supabase at build time (SSG)
  const supabase = await createClient();
  const { data: packages } = await supabase
    .from("credit_packages")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  // Define free tier manually
  const freeTier = {
    name: "1 Free Scan",
    badge: "Try It Free",
    price: 0,
    credits: 1,
    features: {
      included: [
        "Choice of Quick or Detail Scan",
        "Complete body composition analysis",
        "Body part breakdown",
        "Personalized recommendations",
        "Confidence scoring",
      ],
      excluded: ["Narrower estimate ranges", "PDF export", "Historical tracking"],
    },
    cta: "Get Started Free",
    ctaLink: "/auth/signup",
  };

  // Map packages to display format
  const paidTiers =
    packages?.map((pkg) => ({
      id: pkg.id,
      name: pkg.name,
      badge: pkg.sort_order === 2 ? "Most Popular" : pkg.sort_order === 3 ? "Best Value" : null,
      price: pkg.price,
      pricePerScan: (pkg.price / pkg.credits).toFixed(2),
      credits: pkg.credits,
      discount: pkg.discount_percentage,
      features: {
        included: [
          "Everything in free tier, plus:",
          "Narrower estimate ranges",
          "PDF reports (downloadable)",
          "Historical tracking & charts",
          "Progress comparison",
          "Credits never expire",
        ],
        additional:
          pkg.sort_order === 3 ? ["Maximum savings", "Perfect for weekly tracking"] : undefined,
      },
      cta: "Buy Now",
      ctaLink: "/auth/signup",
      highlighted: pkg.sort_order === 2,
    })) || [];

  return (
    <section
      id="pricing"
      className="scroll-mt-16 py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900"
    >
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-4">
            Simple, <span className="text-blue-600">Transparent</span> Pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            No subscriptions. No hidden fees. Pay only when you need a scan.
          </p>
        </div>

        {/* Free Tier - Full Width */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="flex flex-col md:flex-row md:items-center p-8 border-2 border-gray-200 dark:border-slate-800 hover:shadow-xl transition-all bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="flex-1 md:border-r md:border-gray-200 dark:md:border-slate-800 md:pr-8 mb-6 md:mb-0">
              <Badge className="mb-4 w-fit bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 text-sm px-4 py-1.5">
                {freeTier.badge}
              </Badge>
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-5xl font-extrabold">${freeTier.price}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-semibold text-lg">{freeTier.name}</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Perfect for trying out our technology risk-free
              </p>
            </div>

            <div className="flex-1 md:pl-8">
              <ul className="space-y-3 mb-6">
                {freeTier.features.included.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href={freeTier.ctaLink} className="w-full">
                <Button
                  variant="outline"
                  className="w-full h-11 font-semibold border-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
                >
                  {freeTier.cta}
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Paid Tiers - 3 Column Grid */}
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {paidTiers.map((tier) => (
            <Card
              key={tier.id}
              className={`flex flex-col p-8 relative ${
                tier.highlighted
                  ? "border-2 border-blue-500 dark:border-blue-400 shadow-2xl shadow-blue-500/20 ring-4 ring-blue-500/10 md:-mt-4 md:scale-105"
                  : "border-2 border-gray-200 dark:border-slate-800 hover:shadow-xl"
              } transition-all bg-white dark:bg-slate-900`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  <Sparkles className="h-3 w-3" />
                  MOST POPULAR
                </div>
              )}
              {tier.badge && !tier.highlighted && (
                <Badge className="mb-6 w-fit bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 text-sm px-4 py-1.5">
                  {tier.badge}
                </Badge>
              )}
              {tier.highlighted && <div className="mb-6 h-8" />}

              <div className="mb-8 text-center">
                <div className="flex items-baseline justify-center gap-2 mb-3">
                  <span className="text-5xl font-extrabold">${tier.price}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                  ${tier.pricePerScan}/scan
                </p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-bold">
                  Save {tier.discount}%
                </div>
                <p className="text-xl font-bold mt-3">{tier.name}</p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {tier.features.included.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
                {tier.features.additional?.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={tier.ctaLink} className="w-full">
                <Button
                  className={`w-full h-12 font-semibold transition-all ${
                    tier.highlighted
                      ? "shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/50"
                      : "shadow-md hover:shadow-lg"
                  }`}
                >
                  {tier.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        <p className="mt-16 text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          All scans use the same technology. Paid tiers provide narrower estimate ranges and
          additional features.
        </p>
      </div>
    </section>
  );
}
