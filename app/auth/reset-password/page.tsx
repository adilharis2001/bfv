"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ResetPasswordPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });

      if (resetError) throw resetError;

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An error occurred while sending reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-slate-900 dark:to-slate-800 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your email to receive a password reset link
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-8">
          {/* Success State */}
          {success ? (
            <div className="space-y-6">
              <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-sm text-green-700 dark:text-green-300 ml-2">
                  <p className="font-semibold mb-1">Check your email!</p>
                  <p>
                    We&apos;ve sent a password reset link to <strong>{email}</strong>. Click the
                    link in the email to reset your password.
                  </p>
                </AlertDescription>
              </Alert>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Didn&apos;t receive the email?</strong>
                </p>
                <ul className="list-disc ml-5 mt-2 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Check your spam/junk folder</li>
                  <li>Make sure you entered the correct email address</li>
                  <li>The link expires in 1 hour</li>
                </ul>
              </div>

              <Link href="/auth/signin">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Error Alert */}
              {error && (
                <Alert className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <AlertDescription className="text-sm text-red-700 dark:text-red-300 ml-2">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Reset Request Form */}
              <form onSubmit={handleResetRequest} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
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
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Enter the email address associated with your account
                  </p>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full mt-6" disabled={loading}>
                  {loading ? "Sending reset link..." : "Send Reset Link"}
                </Button>
              </form>

              {/* Back to Sign In */}
              <div className="mt-6 text-center">
                <Link
                  href="/auth/signin"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:underline inline-flex items-center"
                >
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Additional Help */}
        {!success && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-blue-600 hover:underline font-semibold">
                Sign up for free
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
