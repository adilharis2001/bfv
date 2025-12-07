"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "How accurate is the analysis?",
      answer:
        "Our AI provides estimates for fitness tracking purposes. These are NOT medical-grade assessments and have not been validated against DEXA or other professional body composition tests. Results depend on image quality, clothing, and pose. Accuracy typically ranges from ±3-5%. For medical-grade accuracy, consult a healthcare professional with DEXA scan equipment.",
    },
    {
      question: "What photos work best?",
      answer:
        "For Quick Scan: 1 full-body photo in good lighting, any clothing (avoid heavy coats).\n\nFor Detail Scan: 2 full-body photos (front + side) in minimal clothing (underwear or fitted athletic wear like sports bra + shorts) with good lighting.\n\nBest practices:\n• Stand straight with arms slightly away from body\n• Ensure head to feet are visible\n• Use natural or bright indoor lighting\n• Avoid shadows and backlighting\n• Mirror selfies work great!",
    },
    {
      question: "Is my data safe?",
      answer:
        "We do NOT store images on our servers. Images are processed by Google's Gemini AI API and may be retained by Google according to their privacy policy (up to 18 months). Only your analysis results (JSON data) are stored in your account.\n\nSecurity measures:\n• End-to-end encrypted transmission\n• Row Level Security (RLS) on database\n• GDPR compliant data handling\n• No third-party advertising or tracking\n\nSee our Privacy Policy for full details.",
    },
    {
      question: "What if I'm not satisfied with my results?",
      answer:
        "Refunds are available for technical failures or validation errors within 14 days of purchase.\n\nEligible for refund:\n• System errors that prevented scan completion\n• Credits charged despite validation failure\n• Duplicate charges due to system error\n\nNOT eligible for refund:\n• User dissatisfaction with estimate accuracy\n• After using >50% of purchased credits\n• More than 14 days after purchase\n• Scans that completed successfully\n\nSee our Refund Policy for full terms.",
    },
    {
      question: "How long does it take?",
      answer:
        "Most scans complete in 30-60 seconds. Quick Scans (1 photo) are typically faster (~30 seconds), while Detail Scans (2 photos) take ~60 seconds for more comprehensive analysis.",
    },
    {
      question: "Do my credits expire?",
      answer:
        "No, credits never expire. Once purchased, they remain in your account indefinitely until you use them for scans.",
    },
    {
      question: "Can pregnant women use this service?",
      answer:
        "No, this service is NOT suitable for pregnant or postpartum individuals (within 12 months). Our AI will detect pregnancy and reject the scan without charging credits.",
    },
    {
      question: "Is this suitable for children?",
      answer:
        "No, this service is only available to adults 18 years and older. Age verification is required at signup.",
    },
    {
      question: "What's the difference between Quick Scan and Detail Scan?",
      answer:
        "Quick Scan: 1 photo, any clothing, faster but broader estimate ranges (±5-8%)\nDetail Scan: 2 photos, minimal clothing, narrower estimate ranges (±2-4%)\n\nBoth modes:\n• Use the same AI technology\n• Cost the same (1 scan credit)\n• Provide body part breakdown\n• Include personalized recommendations\n• Never store your photos\n\nChoose based on your privacy preference vs. accuracy needs.",
    },
    {
      question: "What happens if my photo quality is too low?",
      answer:
        "Our AI validates every image before charging credits. If validation fails (wrong photo type, poor quality, multiple people, etc.), you are NOT charged and receive clear error messaging with guidance on how to improve photo quality.",
    },
  ];

  return (
    <section id="faq" className="scroll-mt-16 py-20 md:py-28 bg-white dark:bg-slate-950">
      <div className="container mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-4">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Everything you need to know about Body Fat View
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="border-2 border-gray-200 dark:border-slate-800 rounded-2xl px-6 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
            >
              <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="whitespace-pre-line text-gray-600 dark:text-gray-400 pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
