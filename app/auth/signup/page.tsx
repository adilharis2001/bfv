"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Chrome } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ageVerified, setAgeVerified] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!ageVerified) {
      setError("You must confirm you are 18 years or older");
      return;
    }

    if (!termsAccepted) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            age_verified: true,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        // The database trigger will automatically create user_profiles and scan_credits
        // Age verification is captured from the metadata
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError(null);

    if (!ageVerified) {
      setError("You must confirm you are 18 years or older");
      return;
    }

    if (!termsAccepted) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "An error occurred with Google sign in");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-slate-900 dark:to-slate-800 px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get started with your free body composition scan
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-8">
          {/* Important Notices */}
          <Alert className="mb-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-sm text-gray-700 dark:text-gray-300 ml-2">
              <p className="font-bold mb-2">⚠️ IMPORTANT NOTICES:</p>

              <p className="font-semibold mt-3 mb-1">This service is NOT suitable for:</p>
              <ul className="list-disc ml-5 space-y-1 text-xs">
                <li>Pregnant or postpartum individuals (within 12 months)</li>
                <li>Children under 18 years of age</li>
                <li>Individuals with eating disorders or body dysmorphia</li>
                <li>Medical diagnosis or treatment purposes</li>
              </ul>

              <p className="font-semibold mt-3 mb-1">Privacy Notice:</p>
              <ul className="list-disc ml-5 space-y-1 text-xs">
                <li>Your photos are processed by Google&apos;s Gemini AI</li>
                <li>Google may retain data per their privacy policy (up to 18 months)</li>
                <li>We do not store images on our servers</li>
                <li>Read our Privacy Policy and Google&apos;s Privacy Policy before proceeding</li>
              </ul>

              <p className="font-semibold mt-3 mb-1">Accuracy Disclaimer:</p>
              <ul className="list-disc ml-5 space-y-1 text-xs">
                <li>Body composition estimates are for fitness tracking only</li>
                <li>This is NOT a medical device or medical-grade assessment</li>
                <li>Results have not been validated against DEXA or other medical scans</li>
                <li>Do not use for medical, diagnostic, or treatment decisions</li>
                <li>Consult healthcare professionals for medical advice</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Error Alert */}
          {error && (
            <Alert className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <AlertDescription className="text-sm text-red-700 dark:text-red-300 ml-2">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Google Sign Up */}
          <Button
            type="button"
            variant="outline"
            className="w-full mb-6 border-2"
            onClick={handleGoogleSignUp}
            disabled={loading}
          >
            <Chrome className="mr-2 h-5 w-5" />
            Sign up with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-slate-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-800 px-2 text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
                className="mt-1"
              />
            </div>

            {/* Age Verification Checkbox */}
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="ageVerified"
                checked={ageVerified}
                onCheckedChange={(checked) => setAgeVerified(checked as boolean)}
                disabled={loading}
              />
              <label
                htmlFor="ageVerified"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                I confirm I am 18 years or older <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="termsAccepted"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                disabled={loading}
              />
              <label
                htmlFor="termsAccepted"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>{" "}
                <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Acknowledgment */}
            <p className="text-xs text-gray-600 dark:text-gray-400 pt-2">
              By signing up, you acknowledge you have read and understood the important notices above.
            </p>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-6"
              disabled={loading || !ageVerified || !termsAccepted}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-blue-600 hover:underline font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
