"use client";

import { ClipLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-6">

      <div className="relative">
        {/* Outer Pulse */}
        <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-30"></div>

        {/* Spinner */}
        <div className="relative bg-white dark:bg-slate-900 p-4 rounded-full shadow-xl">
          <ClipLoader
            size={60}
            color="#f97316"
            speedMultiplier={1.2}
          />
        </div>
      </div>

      <div className="text-center">
        <h3 className="font-semibold text-lg">
          Loading...
        </h3>

      </div>

    </div>
  );
}