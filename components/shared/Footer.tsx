import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-slate-800 bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto max-w-7xl py-16 md:py-20 px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Body Fat View
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Private body composition analysis powered by AI. Track your fitness journey with confidence.
            </p>
          </div>

          {/* Product Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-gray-100">
              Product
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#how-it-works"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-gray-100">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@bodyfatview.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-gray-100">
              Resources
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-12 bg-gray-200 dark:bg-slate-800" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 Body Fat View. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
