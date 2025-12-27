import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock, Zap, Target } from "lucide-react";
import { BodyVisualization } from "./BodyVisualization";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-slate-900 dark:to-slate-800">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />

      <div className="container relative mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center space-y-10">
            <div className="space-y-6">
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl leading-tight">
                Private Body Composition Analysis in{" "}
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                  60 Seconds
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 md:text-xl leading-relaxed max-w-2xl">
                Track your fitness progress with instant body fat estimates. Privacy-first, no
                appointments, no equipment needed.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto text-base px-8 py-6 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all">
                  Get Your Free Scan
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 py-6 border-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
                  See How It Works →
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid gap-6 pt-6 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Privacy-First</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your data stays yours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Instant Results</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Analysis in 60 seconds</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">No Equipment</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Just your smartphone</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Body Visualization */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative h-[500px] w-full max-w-lg md:h-[600px] lg:h-[700px]">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-emerald-600/20 rounded-3xl blur-3xl animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-400/15 to-cyan-600/15 rounded-3xl blur-2xl" />

              {/* Interactive Body Model */}
              <div className="relative z-10 h-full w-full flex items-center justify-center">
                <BodyVisualization />
              </div>

              {/* Decorative elements */}
              <div className="absolute top-20 -left-8 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-20 -right-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-75"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
