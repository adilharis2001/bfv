import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Enter Your Details",
      description:
        "Choose your scan mode (Quick or Detail), then enter your height and weight. This helps improve accuracy of estimates.",
      image: "/images/how-it-works/step-1-enter-details.jpeg",
    },
    {
      number: 2,
      title: "Upload Your Photo(s)",
      description:
        "Take 1 photo for Quick Scan or 2 photos for Detail Scan. Follow our simple pose guides for best results.",
      image: "/images/how-it-works/step-2-upload-photo.jpeg",
    },
    {
      number: 3,
      title: "Get Instant Results",
      description:
        "View detailed body composition breakdown, personalized recommendations, and track progress over time.",
      image: "/images/how-it-works/step-3-get-results.jpeg",
    },
  ];

  return (
    <section id="how-it-works" className="scroll-mt-16 py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-4">
            How It Works - Simple as <span className="text-blue-600">1, 2, 3</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get your body composition analysis in three easy steps
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3 mb-16">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 dark:border-slate-800 group">
                {/* Number Badge */}
                <div className="absolute top-6 left-6 z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-xl font-bold text-white shadow-xl group-hover:scale-110 transition-transform">
                  {step.number}
                </div>

                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="mb-3 text-2xl font-bold">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </Card>

              {/* Arrow between cards (desktop only) */}
              {index < steps.length - 1 && (
                <div className="absolute -right-5 top-1/2 z-30 hidden -translate-y-1/2 md:block">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-lg">
                    <ArrowRight className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/auth/signup">
            <Button size="lg" className="text-base px-8 py-6 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all">
              Ready to try it? Get your free scan →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
