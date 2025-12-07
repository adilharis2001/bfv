import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60 shadow-sm">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Body Fat View
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="#how-it-works"
              className="text-sm font-semibold text-gray-600 dark:text-gray-300 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-semibold text-gray-600 dark:text-gray-300 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-sm font-semibold text-gray-600 dark:text-gray-300 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              FAQ
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/auth/signin" className="hidden md:inline-block">
            <Button variant="ghost" className="font-semibold">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="font-semibold shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 transition-all">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
