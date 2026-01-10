"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, Zap, Plus } from "lucide-react";

export default function DashboardPage() {
  const supabase = createClient();
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredits = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("scan_credits")
          .select("credits_remaining")
          .eq("user_id", user.id)
          .single();

        setCredits(data?.credits_remaining ?? 0);
      }
      setLoading(false);
    };

    fetchCredits();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const hasScans = false; // Will be dynamic in Phase 6

  return (
    <div className="max-w-4xl mx-auto space-y-8 md:space-y-12 py-4 md:py-8">
      {/* Credit Display */}
      <div className="flex items-center justify-between px-1 mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Credits</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {credits === 0 ? "1 Free" : credits}
            </p>
          </div>
        </div>
        {credits === 0 && (
          <Link href="/billing">
            <Button variant="outline" size="sm">
              Buy More
            </Button>
          </Link>
        )}
      </div>

      {/* Main CTA */}
      <Link href="/scan">
        <Card className="border hover:border-blue-400 dark:hover:border-blue-600 transition-all hover:shadow-md cursor-pointer group overflow-hidden">
          <div className="p-10 md:p-16 flex flex-col items-center text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 group-hover:scale-105 transition-transform">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                Start New Scan
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Analysis in 60 seconds
              </p>
            </div>
          </div>
        </Card>
      </Link>

      {/* Scan History */}
      {!hasScans ? (
        <Card className="border">
          <div className="p-10 md:p-16 flex flex-col items-center text-center space-y-4">
            <Activity className="h-12 w-12 text-gray-300 dark:text-gray-600" />
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                No scans yet
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your history will appear here
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="border">
          <div className="p-6">
            <h3 className="text-base font-medium mb-4">Recent Scans</h3>
            {/* Scan history table will go here in Phase 6 */}
          </div>
        </Card>
      )}
    </div>
  );
}
