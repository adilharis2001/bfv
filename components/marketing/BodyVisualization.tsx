"use client";

import { useState } from "react";
import Model from "react-body-highlighter";

interface ExerciseData {
  name: string;
  muscles: string[];
  frequency?: number;
}

export function BodyVisualization() {
  const [hoveredMuscle, setHoveredMuscle] = useState<any>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Sample body composition data - using exercise format the library expects
  // Frequency: 1 = lean (green), 2 = moderate (yellow), 3 = higher fat (orange/red)
  const bodyData: ExerciseData[] = [
    // Higher fat areas (frequency 3)
    { name: "Abdomen", muscles: ["abs"], frequency: 3 },
    { name: "Obliques", muscles: ["obliques"], frequency: 3 },

    // Moderate fat areas (frequency 2)
    { name: "Chest", muscles: ["chest"], frequency: 2 },
    { name: "Lower Back", muscles: ["lower-back"], frequency: 2 },
    { name: "Triceps", muscles: ["triceps"], frequency: 2 },
    { name: "Inner Thighs", muscles: ["adductor"], frequency: 2 },
    { name: "Outer Thighs", muscles: ["abductors"], frequency: 2 },
    { name: "Glutes", muscles: ["gluteal"], frequency: 2 },

    // Leaner areas (frequency 1)
    { name: "Upper Back", muscles: ["upper-back"], frequency: 1 },
    { name: "Biceps", muscles: ["biceps"], frequency: 1 },
    { name: "Forearms", muscles: ["forearm"], frequency: 1 },
    { name: "Shoulders", muscles: ["front-deltoids", "back-deltoids"], frequency: 1 },
    { name: "Hamstrings", muscles: ["hamstring"], frequency: 1 },
    { name: "Quadriceps", muscles: ["quadriceps"], frequency: 1 },
    { name: "Calves", muscles: ["calves"], frequency: 1 },
  ];

  // Body fat percentage by region - realistic values
  const muscleNames: Record<string, { name: string; fatPercentage: string }> = {
    chest: { name: "Chest", fatPercentage: "14%" },
    abs: { name: "Abdomen", fatPercentage: "22%" },
    obliques: { name: "Waist", fatPercentage: "19%" },
    "lower-back": { name: "Lower Back", fatPercentage: "18%" },
    "upper-back": { name: "Upper Back", fatPercentage: "13%" },
    biceps: { name: "Arms", fatPercentage: "12%" },
    triceps: { name: "Arms", fatPercentage: "13%" },
    forearm: { name: "Forearms", fatPercentage: "10%" },
    "front-deltoids": { name: "Shoulders", fatPercentage: "11%" },
    "back-deltoids": { name: "Shoulders", fatPercentage: "11%" },
    hamstring: { name: "Hamstrings", fatPercentage: "14%" },
    quadriceps: { name: "Thighs", fatPercentage: "16%" },
    adductor: { name: "Inner Thighs", fatPercentage: "17%" },
    abductors: { name: "Outer Thighs", fatPercentage: "16%" },
    calves: { name: "Calves", fatPercentage: "9%" },
    gluteal: { name: "Glutes", fatPercentage: "20%" },
  };

  // Determine color based on actual percentage value
  const getRegionColor = (percentage: string) => {
    const value = parseInt(percentage);
    if (value <= 12) return "lean"; // Green - under 12%
    if (value <= 17) return "moderate"; // Blue - 13-17%
    return "high"; // Orange - 18%+
  };

  // Key regions for the statistics table
  const statsRegions = [
    { muscle: "chest", label: "Chest" },
    { muscle: "abs", label: "Abdomen" },
    { muscle: "upper-back", label: "Upper Back" },
    { muscle: "obliques", label: "Waist" },
    { muscle: "gluteal", label: "Glutes" },
    { muscle: "lower-back", label: "Lower Back" },
    { muscle: "quadriceps", label: "Thighs" },
    { muscle: "calves", label: "Calves" },
  ];

  const getPositionClasses = (position: string) => {
    const positions: Record<string, string> = {
      "left-top": "top-[20%] -left-14 md:-left-16 lg:-left-[68px]",
      "left-upper-middle": "top-[36%] -left-14 md:-left-16 lg:-left-[68px]",
      "left-lower-middle": "top-[52%] -left-14 md:-left-16 lg:-left-[68px]",
      "left-bottom": "top-[68%] -left-14 md:-left-16 lg:-left-[68px]",
      "right-top": "top-[20%] -right-14 md:-right-16 lg:-right-[68px]",
      "right-upper-middle": "top-[36%] -right-14 md:-right-16 lg:-right-[68px]",
      "right-lower-middle": "top-[52%] -right-14 md:-right-16 lg:-right-[68px]",
      "right-bottom": "top-[68%] -right-14 md:-right-16 lg:-right-[68px]",
    };
    return positions[position] || "";
  };

  const getLineClasses = (line: string) => {
    if (line === "left") {
      return "right-full mr-0.5 border-r border-dashed";
    }
    return "left-full ml-0.5 border-l border-dashed";
  };

  const getAnimationDelay = (index: number) => {
    return `${index * 100}ms`;
  };

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      lean: "text-emerald-600 dark:text-emerald-400", // Green - lean/low fat
      moderate: "text-blue-600 dark:text-blue-400", // Blue - moderate fat
      high: "text-orange-600 dark:text-orange-400", // Orange/red - higher fat
    };
    return colors[color] || "text-gray-600";
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center gap-8 lg:gap-12">
      {/* Interactive Body Model */}
      <div className="relative scale-90 md:scale-100 lg:scale-110 flex-shrink-0">
        {/* Enhanced multi-layer glow effects - always active */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-cyan-400/10 to-emerald-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-emerald-400/10 via-transparent to-blue-400/10 rounded-full blur-2xl"></div>

        {/* Scan line effect - always active */}
        <div className="absolute inset-0 overflow-hidden rounded-full opacity-40">
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scan"></div>
        </div>

        {/* Rotating rings - always visible */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-400/20 animate-spin-slow"></div>
        <div className="absolute inset-8 rounded-full border border-cyan-400/15 animate-spin-reverse"></div>

        <div className="drop-shadow-2xl">
          <Model
            data={bodyData}
            onClick={(muscle) => {
              setHoveredMuscle(muscle);
            }}
            highlightedColors={["#10b981", "#34d399", "#fbbf24", "#fb923c", "#f87171"]}
            style={{
              width: "18rem",
              padding: "1.5rem",
            }}
          />
        </div>

      </div>

      {/* Compact Statistics Table - Hidden on mobile */}
      <div className="hidden md:block flex-shrink-0 animate-in fade-in slide-in-from-right-4 duration-700">
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-slate-800 p-4 min-w-[160px]">
          <h3 className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
            Body Fat %
          </h3>
          <div className="space-y-2">
            {statsRegions.map((region, index) => {
              const percentage = muscleNames[region.muscle].fatPercentage;
              const color = getRegionColor(percentage);
              return (
                <div
                  key={region.muscle}
                  className="flex items-center justify-between gap-4 py-1 border-b border-gray-100 dark:border-slate-800 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors rounded px-2 -mx-2"
                  style={{ animationDelay: getAnimationDelay(index) }}
                >
                  <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    {region.label}
                  </span>
                  <span className={`text-sm font-extrabold ${getColorClass(color)} tabular-nums`}>
                    {percentage}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: Simplified percentage-only display */}
      <div className="md:hidden">
        <div className="absolute inset-0 pointer-events-none">
          {/* Chest */}
          <div className="absolute top-[20%] left-[22%] bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-lg shadow-lg px-2 py-1 text-center border border-blue-200 dark:border-blue-800 animate-in fade-in zoom-in duration-500">
            <p className="text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              14%
            </p>
          </div>
          {/* Upper Back */}
          <div
            className="absolute top-[20%] right-[22%] bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-lg shadow-lg px-2 py-1 text-center border border-blue-200 dark:border-blue-800 animate-in fade-in zoom-in duration-500"
            style={{ animationDelay: "100ms" }}
          >
            <p className="text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              13%
            </p>
          </div>

          {/* Abdomen */}
          <div
            className="absolute top-[36%] left-[18%] bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-lg shadow-lg px-2 py-1 text-center border border-orange-200 dark:border-orange-800 animate-in fade-in zoom-in duration-500"
            style={{ animationDelay: "200ms" }}
          >
            <p className="text-xs font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
              22%
            </p>
          </div>
          {/* Waist */}
          <div
            className="absolute top-[36%] right-[18%] bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-lg shadow-lg px-2 py-1 text-center border border-orange-200 dark:border-orange-800 animate-in fade-in zoom-in duration-500"
            style={{ animationDelay: "300ms" }}
          >
            <p className="text-xs font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
              19%
            </p>
          </div>

          {/* Glutes */}
          <div
            className="absolute top-[52%] left-[30%] bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-lg shadow-lg px-2 py-1 text-center border border-orange-200 dark:border-orange-800 animate-in fade-in zoom-in duration-500"
            style={{ animationDelay: "400ms" }}
          >
            <p className="text-xs font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
              20%
            </p>
          </div>
          {/* Lower Back */}
          <div
            className="absolute top-[52%] right-[30%] bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-lg shadow-lg px-2 py-1 text-center border border-orange-200 dark:border-orange-800 animate-in fade-in zoom-in duration-500"
            style={{ animationDelay: "500ms" }}
          >
            <p className="text-xs font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
              18%
            </p>
          </div>

          {/* Thighs */}
          <div
            className="absolute bottom-[22%] left-[26%] bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-lg shadow-lg px-2 py-1 text-center border border-blue-200 dark:border-blue-800 animate-in fade-in zoom-in duration-500"
            style={{ animationDelay: "600ms" }}
          >
            <p className="text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              16%
            </p>
          </div>
          {/* Calves */}
          <div
            className="absolute bottom-[22%] right-[26%] bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-lg shadow-lg px-2 py-1 text-center border border-green-200 dark:border-green-800 animate-in fade-in zoom-in duration-500"
            style={{ animationDelay: "700ms" }}
          >
            <p className="text-xs font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              9%
            </p>
          </div>
        </div>

        {/* Floating data points animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[15%] left-[40%] w-1 h-1 bg-blue-400/40 rounded-full animate-ping" style={{ animationDelay: "0ms", animationDuration: "3s" }}></div>
          <div className="absolute top-[45%] left-[30%] w-1 h-1 bg-cyan-400/40 rounded-full animate-ping" style={{ animationDelay: "1s", animationDuration: "3s" }}></div>
          <div className="absolute top-[65%] right-[35%] w-1 h-1 bg-emerald-400/40 rounded-full animate-ping" style={{ animationDelay: "2s", animationDuration: "3s" }}></div>
        </div>
      </div>

      {/* Enhanced Legend with hover effects */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-xl shadow-lg px-5 py-2.5 border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 group-hover:scale-125 transition-transform"></div>
            <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              Lean
            </span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-400 group-hover:scale-125 transition-transform"></div>
            <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
              Moderate
            </span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 group-hover:scale-125 transition-transform"></div>
            <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              Higher
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
