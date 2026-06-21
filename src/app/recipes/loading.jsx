"use client";

import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <ClipLoader color="#f97316" size={50} />
    </div>
  );
}